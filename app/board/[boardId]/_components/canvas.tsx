"use client"
import { useState , useCallback} from 'react'
import {Info} from './Info'
import Participants from './Participants'
import Toolbar from './Toolbar'
import { useSelf }  from "@/liveblocks.config"
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

interface CanvasProps {
    boardId : string;
}


const Canvas = ({boardId}: CanvasProps) => {  
  const info = useSelf((me) => me.info)
  const  [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None
})
const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });



const history = useHistory()
const canUndo = useCanUndo()
const canRedo = useCanRedo()

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
        >
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  )
}

export default Canvas
