"use client";

import { useSelf } from "@liveblocks/react";

import { Id } from "../../../../../convex/_generated/dataModel";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";

interface CanvasProps {
  boardId: Id<"boards">;
}

const Canvas = ({ boardId }: CanvasProps) => {
  const me = useSelf(me => me.info);

  console.log({me});

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info />
      <Participants />
      <Toolbar />
    </main>
  );
};

export { Canvas };
