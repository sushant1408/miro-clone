import {
  CircleIcon,
  MousePointer2Icon,
  PencilIcon,
  Redo2Icon,
  SquareIcon,
  StickyNoteIcon,
  TypeIcon,
  Undo2Icon,
} from "lucide-react";

import { ToolButton } from "./tool-button";

const Toolbar = () => {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center gap-y-1 shadow-md">
        <ToolButton
          label="Select"
          icon={MousePointer2Icon}
          onClick={() => {}}
        />
        <ToolButton label="Text" icon={TypeIcon} onClick={() => {}} />
        <ToolButton
          label="Sticky note"
          icon={StickyNoteIcon}
          onClick={() => {}}
        />
        <ToolButton label="Rectangle" icon={SquareIcon} onClick={() => {}} />
        <ToolButton label="Ellipse" icon={CircleIcon} onClick={() => {}} />
        <ToolButton label="Pen" icon={PencilIcon} onClick={() => {}} />
      </div>

      <div className="bg-white rounded-md p-1.5 flex flex-col items-center gap-y-1 shadow-md">
        <ToolButton label="Undo" icon={Undo2Icon} onClick={() => {}} />
        <ToolButton label="Redo" icon={Redo2Icon} onClick={() => {}} />
      </div>
    </div>
  );
};

const ToolbarSkeleton = () => {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] shadow-md rounded-md" />
  );
};

export { Toolbar, ToolbarSkeleton };
