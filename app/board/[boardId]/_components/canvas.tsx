"use client"
import { useState , useCallback} from 'react'
import {Info} from './Info'
import Participants from './Participants'
import Toolbar from './Toolbar'
import {nanoid} from "nanoid"
import { useSelf, useStorage }  from "@/liveblocks.config"
import {  Camera, 
  CanvasMode, 
  CanvasState, 
  Color,
  LayerType,
  Point,
  Side,
  XYWH, } from "@/types/canvas"

import {useHistory, useCanUndo, useCanRedo, useMutation} from "@/liveblocks.config"
import { CursorsPresence } from './CursorsPresence'
import { pointerEventToCanvasPoint } from '@/lib/utils'
import { 
  createClient,
  LiveList,
  LiveMap,
  LiveObject

} from "@liveblocks/client";

const MAX_LAYERS = 100;

interface CanvasProps {
    boardId : string;
}


const Canvas = ({boardId}: CanvasProps) => {  
 
  const layerIds = useStorage((root) => root.layerIds)
  
  const info = useSelf((me) => me.info)
  const  [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None
})
const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

const [lastUsedColor, setLastUsedColor] = useState<Color>({
  r:0,
  g:0,
  b:0
})


const history = useHistory()
const canUndo = useCanUndo()
const canRedo = useCanRedo()

const insertLayer = useMutation((
  { storage, setMyPresence },
  layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note,
  position: Point,
) => {
  const liveLayers = storage.get("layers");
  if (liveLayers.size >= MAX_LAYERS) {
    return;
  }

  const liveLayerIds = storage.get("layerIds");
  const layerId = nanoid();
  const layer = new LiveObject({
    type: layerType,
    x: position.x,
    y: position.y,
    height: 100,
    width: 100,
    fill: lastUsedColor,
  });

  liveLayerIds.push(layerId);
  liveLayers.set(layerId, layer);

  setMyPresence({ selection: [layerId] }, { addToHistory: true });
  setCanvasState({ mode: CanvasMode.None });
}, [lastUsedColor]);

const onWheel = useCallback((e: React.WheelEvent) => {
  setCamera((camera) => ({
    x: camera.x - e.deltaX,
    y: camera.y - e.deltaY,
  }));
}, []);



const onPointerMove = useMutation((
  { setMyPresence }, 
  e: React.PointerEvent
) => {
  e.preventDefault();

  const current = pointerEventToCanvasPoint(e, camera);

  setMyPresence({cursor: current})

}, [])

const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null })
}, [])

const onPointerUp = useMutation((
  {},
  e
) => {
  const point = pointerEventToCanvasPoint(e, camera);

  if (
    canvasState.mode === CanvasMode.Inserting
  ) {
    // unselectLayers();
    // setCanvasState({
    //   mode: CanvasMode.None,
    // });
    insertLayer(canvasState.layerType, point)
  } else {
    setCanvasState({
      mode: CanvasMode.None,
    });
  }

  history.resume();
}, 
[
  setCanvasState,
  camera,
  canvasState,
  history,
  insertLayer
]);
  
return (
    <main className='h-full w-full relative bg-neutral-100 touch-none'>
      <Info  boardId={boardId} />
      <Participants />
      <Toolbar 
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        undo={history.undo}
        redo={history.redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />

      <svg 
        className='h-[100vh] w-[100vw]'
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        >
        <g style={{
          transform: `translate(${camera.x}px , ${camera.y}px)`
        }}>
          {layerIds.map((layerId)=> (
             <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={()=>{}} 
              selectionColor={null}
             />
          ))}
          <CursorsPresence />
        </g>
      </svg>
    </main>
  )
}

export default Canvas
