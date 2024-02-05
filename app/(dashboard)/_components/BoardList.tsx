"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

// import { BoardCard } from "./board-card";
import { EmptyBoards } from "./EmptyBoards";
import { EmptySearch } from "./EmptySearch";
import BoardCard from "./board-card";


interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
};

export const BoardList = ({
  orgId,
  query,
}: BoardListProps) => {
  const data = useQuery(api.boards.get, { 
    orgId,
    ...query,
  });

  if (data === undefined) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  if (!data?.length && query.search) {
    return <EmptySearch />;
  }

  if (!data?.length && query.favorites) {
    return <EmptySearch />
  }

  if (!data?.length) {
    return <EmptyBoards />
  }

  return (
    <div>
        <h2 className="text-3xl">
          {query.favorites ? "Favourite Boards" : "Teams Board"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        
        {data?.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={board._creationTime}
            imageUrl={board.imageUrl}
            orgId={board.orgId}
            isFavorite  //fututre error loading
            
          />
        ))}
      </div>
    </div>
  );
};