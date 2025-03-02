"use client";

import { useMutation, useSelf } from "@liveblocks/react";
import { BringToFrontIcon, SendToBackIcon, Trash2Icon } from "lucide-react";
import { memo } from "react";

import { TooltipWrapper } from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { Camera, Color } from "@/types/canvas";
import { ColorPicker } from "./color-picker";

interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection) || [];

    const moveToBack = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");
        const indeces: number[] = [];

        const arr = liveLayerIds.toImmutable();

        for (let i = 0; i < arr.length; i++) {
          if (selection.includes(arr[i])) {
            indeces.push(i);
          }
        }

        for (let i = 0; i < indeces.length; i++) {
          liveLayerIds.move(indeces[i], i);
        }
      },
      [selection]
    );

    const moveToFront = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");
        const indeces: number[] = [];

        const arr = liveLayerIds.toImmutable();

        for (let i = 0; i < arr.length; i++) {
          if (selection.includes(arr[i])) {
            indeces.push(i);
          }
        }

        for (let i = indeces.length - 1; i >= 0; i--) {
          liveLayerIds.move(
            indeces[i],
            arr.length - 1 - (indeces.length - 1 - i)
          );
        }
      },
      [selection]
    );

    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);

        selection.forEach((id) => {
          liveLayers.get(id)?.set("fill", fill);
        });
      },
      [selection, setLastUsedColor]
    );

    const deleteLayers = useDeleteLayers();
    const selectionBounds = useSelectionBounds();

    if (!selectionBounds) {
      return null;
    }

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
      <div
        className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
        style={{
          transform: `
            translate(
              calc(${x}px - 50%),
              calc(${y - 16}px - 100%)
            )
          `,
        }}
      >
        <ColorPicker onChange={setFill} />
        <div className="flex flex-col gap-y-0.5">
          <TooltipWrapper label="Bring to front">
            <Button variant="board" size="icon" onClick={moveToFront}>
              <BringToFrontIcon />
            </Button>
          </TooltipWrapper>
          <TooltipWrapper label="Send to back" side="bottom">
            <Button variant="board" size="icon" onClick={moveToBack}>
              <SendToBackIcon />
            </Button>
          </TooltipWrapper>
        </div>
        <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
          <TooltipWrapper label="Delete">
            <Button variant="board" size="icon" onClick={deleteLayers}>
              <Trash2Icon />
            </Button>
          </TooltipWrapper>
        </div>
      </div>
    );
  }
);

SelectionTools.displayName = "SelectionTools";

export { SelectionTools };
