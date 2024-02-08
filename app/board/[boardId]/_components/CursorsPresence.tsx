"use client";

import { memo } from "react";
import { shallow } from "@liveblocks/client";
import { Cursor } from "./Cursor";
import { 
  useOthersConnectionIds, 
  useOthersMapped
} from "@/liveblocks.config";
// import { colorToCss } from "@/lib/utils";

const Cursors = () => {
    const ids = useOthersConnectionIds();
  
    return (
      <>
        {ids.map((connectionId) => (
          <Cursor
            key={connectionId}
            connectionId={connectionId}
          />
        ))}
      </>
    );
  };

export const CursorsPresence = memo(()=> {
  
    return (
      <>
       <Cursors />
      </>    
    )

})

CursorsPresence.displayName = "CursorsPresence";