"use client";

import {
  RoomProvider,
  ClientSideSuspense,
  LiveblocksProvider,
} from "@liveblocks/react/suspense";
import { ReactNode } from "react";

interface RoomProps {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
}

const Room = ({ children, fallback, roomId }: RoomProps) => {
  return (
    <LiveblocksProvider
      // publicApiKey="pk_dev_ZUNActkKsEItKjNy8jOVvRfAcfLrrSz0A51dIPL7XFKogqFVvK1-IQbPPo92eC8n"
      authEndpoint="/api/liveblocks-auth"
    >
      <RoomProvider id={roomId} initialPresence={{}}>
        <ClientSideSuspense fallback={fallback}>
          {() => children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};

export { Room };
