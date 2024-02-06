"use client"

import Link from "next/link";
import Image from "next/image";
import { Overlay } from "./overlay";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow }  from "date-fns"
import { Footer } from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { MoreHorizontal } from  'lucide-react'
import { Actions } from "@/components/actions";
import { api } from '@/convex/_generated/api'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { toast } from "sonner";
import { useMutation } from "convex/react";



interface BoardCardProps {
  
    id: string;
    title: string;
    authorName: string;
    authorId: string;
    createdAt: number;
    imageUrl: string;
    orgId: string;
    isFavorite: boolean;

}

const BoardCard = ({
  id,
  title,
  authorId,
  authorName,
  createdAt,
  imageUrl,
  orgId,
  isFavorite,
}: BoardCardProps) => {
   
    const  { userId } = useAuth()
    const authLabel = userId === authorId ? "You" : "AUthorName";
    const createdAtLabel = formatDistanceToNow(createdAt, {
     addSuffix : true,
    })

    

    const { 
      mutate: onFavorite,
      pending: pendingFavorite
    } = useApiMutation(api.board.favorite)
    const {
      mutate: onUnFavorite,
      pending: pendingUnFavorite
    } = useApiMutation(api.board.unfavorite)

    const toogleFavorite = () => {
       if(isFavorite) {
         onUnFavorite({ id })
         .catch(() => toast.error("Failed To Unfavorite"))
       }
       else
       {
         onFavorite({id, orgId})
         .catch(() => toast.error("Failed To favorite"))
       }
       
    }

  return (
    <Link href={`/board/${id}`}>
    <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
      <div className="relative flex-1 bg-amber-50">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-fit"
        />
        <Overlay />

        <Actions
            id={id}
            title={title}
            side="right"
          >
            <button
              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none"
            >
              <MoreHorizontal
                className="text-white opacity-75 hover:opacity-100 transition-opacity"
              />
            </button>
          </Actions>

        </div>
        <Footer 
         isFavorite={isFavorite}
         title={title}
         authorLabel={authLabel}
         createdAtLabel={createdAtLabel}
         onClick={toogleFavorite}
         disabled={pendingFavorite || pendingUnFavorite}
        />
        </div>
    </Link>
  )
}

export default BoardCard

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};