const Toolbar = ()=> {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 ">
        <div className="bg-white rounded-md p-1.15 flex gap-y-1 flex-col items-center shadow-md">
            <div>
                Pencil
            </div>

            <div>
                Pencil
            </div>

            <div>
                Pencil
            </div>

            <div>
                Pencil
            </div>
        </div>

        <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
           <div>
            Undo
           </div>

           <div>
            Redo
           </div>
        </div>
    </div>   
  )
}

export default Toolbar