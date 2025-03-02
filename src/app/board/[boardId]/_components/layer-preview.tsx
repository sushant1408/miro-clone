"use client";

import { useStorage } from "@liveblocks/react";
import { memo, PointerEvent } from "react";

import { LayerType } from "@/types/canvas";
import { Rectangle } from "./layers/rectangle";

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: PointerEvent, layerId: string) => void;
  selectionColor?: string;
}

const LayerPreview = memo(
  ({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));

    if (!layer) {
      return null;
    }

    switch (layer.type) {
      case LayerType.Rectangle:
        return (
          <Rectangle
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      default:
        console.warn("unknown layer type");
        return null;
    }
  }
);

LayerPreview.displayName = "LayerPreview";

export { LayerPreview };
