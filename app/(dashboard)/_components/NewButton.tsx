"use client"

import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { CreateOrganization } from "@clerk/nextjs"
import { DialogContent } from "@radix-ui/react-dialog"
import { Plus } from "lucide-react"


const NewButton = () => {
  return (
    <Dialog>
       <DialogTrigger asChild>
        <div className="aspect-square">
          <button className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
            <Plus className="text-white" />
          </button>
          </div>
       </DialogTrigger>
       
       <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
           <CreateOrganization />
       </DialogContent>

    </Dialog>
  )
}

export default NewButton
