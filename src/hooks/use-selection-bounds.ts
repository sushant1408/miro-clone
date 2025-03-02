import { shallow, useStorage, useSelf } from "@liveblocks/react";

import { Layer, XYWH } from "@/types/canvas";

const boundingBox = (layers: Layer[]): XYWH | null => {
  const first = layers[0];

  if (!first) {
    return null;
  }

  let left = first.x;
  let right = first.x + first.width;
  let top = first.y;
  let bottom = first.y + first.height;

  for (let i = 1; i < layers.length; i++) {
    const { x, y, height, width } = layers[i];

    if (left > x) {
      left = x;
    }

    if (right < x + width) {
      right = x + width;
    }

    if (top > y) {
      top = y;
    }

    if (bottom < y + height) {
      bottom = y + height;
    }
  }

  return {
    height: bottom - top,
    width: right - left,
    x: left,
    y: top,
  };
};

const useSelectionBounds = () => {
  const selection = useSelf((me) => me.presence.selection) || [];

  return useStorage((root) => {
    const selectedLayers = selection
      .map((layerId) => root.layers.get(layerId)!)
      .filter(Boolean);

      return boundingBox(selectedLayers);
  }, shallow);
};

export { useSelectionBounds };
