"use client";

import { memo } from "react";
import { Rectangle } from "./rectangle";
import { Ellipse } from "./ellipse";
import { colorToCss } from "@/lib/utils";
import { LayerType } from "@/types/canvas";
import { useStorage } from "@/liveblocks.config";

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor? : string
}



const LayerPreview = memo(({
 id,
 onLayerPointerDown,
 selectionColor

}: LayerPreviewProps ) => {

  const  layer = useStorage((root) => root.layers.get(id));

  
  if (!layer) {
    return null;
  }

  switch(layer.type) {
    case LayerType.Rectangle:
        return (
            <Rectangle
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />   
        )
        case LayerType.Ellipse:
      return (
        <Ellipse
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    default:
        console.log("Unknown Layer Type")
        return null;
  }


})

LayerPreview.displayName = 'LayerPreview'

export default LayerPreview
