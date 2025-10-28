# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Environment Setup

### Prerequisites
Before running the project, you need to set up accounts and obtain API keys:

1. **Convex** (Backend Database)
   - Create account at https://dashboard.convex.dev
   - Create a new project
   - Copy your deployment URL

2. **Clerk** (Authentication)
   - Create account at https://dashboard.clerk.com
   - Create a new application
   - Copy your Publishable Key

3. **Liveblocks** (Real-time Collaboration)
   - Create account at https://liveblocks.io
   - Create a new project
   - Copy your Secret Key

### Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Then update `.env` with your actual credentials:

**Important**: Never commit `.env` to version control. The `.env.example` file shows the required variables without secrets.

## Quick Start Commands

- **Development**: `npm run dev` - Runs Next.js dev server on port 3008
- **Build**: `npm run build` - Production build
- **Lint**: `npm lint` - Run ESLint
- **Start**: `npm run start` - Start production server

## Project Overview

This is a Miro-like collaborative whiteboard application built with Next.js 15. It enables real-time collaborative drawing and shape editing with multiple users.

## Architecture

### Core Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
- **Real-time Collaboration**: Liveblocks (for presence, multiplayer sync) + Convex (backend database)
- **Authentication**: Clerk
- **State Management**: Zustand (UI modals), Liveblocks Storage (canvas state)
- **UI Components**: Radix UI primitives with custom styling

### Key Architectural Patterns

#### 1. Canvas State Management

The canvas operates through a state machine defined in `src/types/canvas.ts:35-43`:

```
CanvasMode: None | Pressing | SelectionNet | Translating | Inserting | Resizing | Pencil
```

Each mode represents a distinct interaction state (e.g., drawing, selecting, moving objects). The main Canvas component (`src/app/board/[boardId]/_components/canvas.tsx:59`) manages these state transitions through pointer events.

#### 2. Layer System

- **Layers** are drawable objects (Rectangle, Ellipse, Path, Text, Note) defined in `src/types/canvas.ts:56-134`
- Stored in Liveblocks Storage as `LiveMap<string, LiveObject<Layer>>` for real-time sync
- Layer rendering is abstracted into individual layer components (`src/app/board/[boardId]/_components/layers/*.tsx`)
- Each layer has position (x, y), dimensions (width, height), and fill color

#### 3. Real-time Collaboration Flow

- **Storage Layer**: Liveblocks manages `layers` (LiveMap) and `layerIds` (LiveList)
- **Presence Layer**: Tracks user cursor position, selection state, and pencil draft
- **Mutations**: Use `useMutation` hook to broadcast changes to all connected clients
- **Sync**: Changes are automatically persisted and distributed via Liveblocks

#### 4. Persistence & Database

- **Convex** handles board metadata (title, orgId, author info) in `convex/schema.ts`
- Board metadata queries: `convex/boards.ts:6-74` (with search and favorites support)
- Canvas layers/shapes are ephemeral and stored only in Liveblocks (not persisted to DB)
- User favorites stored in `userFavorites` table with multi-field indices

### Component Organization

```
src/app/(dashboard)/          # Dashboard/board list pages
src/app/board/[boardId]/      # Canvas editor page
  _components/
    canvas.tsx               # Main canvas state machine & event handling
    layer-preview.tsx        # Renders individual layers
    layers/                  # Layer-specific renderers (rect, ellipse, path, text, note)
    toolbar.tsx              # Tool selection UI
    selection-tools.tsx      # Color picker & properties for selected objects
src/components/              # Reusable components
  ui/                        # Radix UI wrapper components
  room.tsx                   # Liveblocks RoomProvider wrapper
  convex-client-provider.tsx # Convex provider
src/hooks/
  use-delete-layers.ts       # Custom hook for deletion logic
  use-api-mutation.ts        # Wrapper around Convex mutations with loading states
  use-selection-bounds.ts    # Calculate bounding box of selected layers
src/store/
  use-rename-modal.ts        # Zustand store for rename dialog state
```

### Important Type Definitions

- `CanvasState`: Union type defining all possible interaction modes (src/types/canvas.ts:1-33)
- `Layer`: Union type of all layer types with common properties (x, y, width, height, fill, value)
- `Camera`: Pan/zoom state object (x, y coordinates)

## Keyboard Shortcuts & Input Handling

Keyboard shortcuts are handled in `src/app/board/[boardId]/_components/canvas.tsx:401-416`:

- `Ctrl/Cmd + Z`: Undo (via Liveblocks history)
- `Ctrl/Cmd + Shift + Z`: Redo
- `Backspace`: Delete selected layers

## Data Flow for Canvas Mutations

1. User interaction triggers `onPointerDown`, `onPointerMove`, or `onPointerUp` events
2. Event handler calls appropriate mutation (e.g., `insertLayer`, `translateSelectedLayer`)
3. Mutation updates Liveblocks Storage (layers/layerIds or presence)
4. Liveblocks syncs changes to all connected clients
5. Components re-render via useStorage/useOthers hooks
6. All users see the same canvas state in real-time

## Common Development Tasks

### Adding a New Shape Layer Type

1. Add new enum value to `LayerType` in `src/types/canvas.ts:107-113`
2. Create new layer type (e.g., `CircleLayer`) in `src/types/canvas.ts`
3. Add case handling in `Canvas.insertLayer` mutation
4. Create renderer component in `src/app/board/[boardId]/_components/layers/`
5. Update `LayerPreview` to render the new type

### Modifying Canvas Interaction

Edit the relevant event handler in `canvas.tsx` (onPointerDown, onPointerMove, onPointerUp) and update the `CanvasState` type if introducing new modes.

### Adding UI Controls

UI components generally wrap Radix UI primitives. Add new controls in `Toolbar` or `SelectionTools` components and dispatch canvas state changes via the canvas callbacks.

## Testing Notes

No test framework is currently configured. Manual testing on localhost:3008 after `npm run dev`.

## Deployment

Build process: `npm run build` → Next.js generates optimized production build. Convex functions are deployed separately (see Convex documentation for backend deployment).

## Libraries & Dependencies

### Core Framework

- `next` (^15.1.7) - Next.js framework for React with App Router
- `react` (^19.0.0) - React library for UI components
- `react-dom` (^19.0.0) - React DOM rendering
- `typescript` (^5) - TypeScript for type safety

### Real-time Collaboration & Backend

- `@liveblocks/client` (^2.19.0) - Liveblocks client for real-time sync
- `@liveblocks/react` (^2.19.0) - Liveblocks React hooks (useStorage, useOthers, useMutation)
- `@liveblocks/node` (^2.19.0) - Liveblocks Node.js library for server-side operations
- `convex` (^1.19.2) - Backend database and API framework
- `convex-helpers` (^0.1.71) - Helper utilities for Convex

### Authentication

- `@clerk/nextjs` (^6.12.0) - Clerk authentication for Next.js

### State Management & UI

- `zustand` (^5.0.3) - Lightweight state management (modal dialogs)
- `@radix-ui/react-avatar` (^1.1.3) - Avatar component
- `@radix-ui/react-dialog` (^1.1.6) - Dialog/modal component
- `@radix-ui/react-dropdown-menu` (^2.1.6) - Dropdown menu component
- `@radix-ui/react-tooltip` (^1.1.8) - Tooltip component
- `@radix-ui/react-slot` (^1.1.2) - Slot utility component
- `lucide-react` (^0.476.0) - Icon library with React components
- `sonner` (^2.0.1) - Toast notification library

### Styling & CSS

- `tailwindcss` (^3.4.1) - Utility-first CSS framework
- `tailwind-merge` (^3.0.2) - Merge Tailwind CSS classes intelligently
- `tailwindcss-animate` (^1.0.7) - Tailwind CSS animations
- `class-variance-authority` (^0.7.1) - CSS class variance management
- `clsx` (^2.1.1) - Utility for constructing CSS class names
- `next-themes` (^0.4.4) - Theme management for Next.js
- `postcss` (^8) - CSS post-processor

### Utilities & Helpers

- `perfect-freehand` (^1.2.2) - Smooth freehand drawing/pencil strokes
- `nanoid` (^5.1.2) - Tiny, secure URL-friendly unique ID generator
- `date-fns` (^4.1.0) - Modern date utility library
- `react-contenteditable` (^3.3.7) - Contenteditable component for text editing
- `query-string` (^9.1.1) - Parse and stringify URL query strings
- `usehooks-ts` (^3.1.1) - Collection of TypeScript React hooks

### Development Tools

- `eslint` (^9) - JavaScript linter
- `eslint-config-next` (15.1.7) - ESLint configuration for Next.js
- `@eslint/eslintrc` (^3) - ESLint configuration utilities
- `@types/node` (^20) - TypeScript definitions for Node.js
- `@types/react` (^19) - TypeScript definitions for React
- `@types/react-dom` (^19) - TypeScript definitions for React DOM
