"use client"
import {EmptySearch} from "./EmptySearch"
import {EmptyBoards} from "./EmptyBoards"

interface BoardListProps {
 orgId: string;
 query: {
   search?: string;
   favourites?: string;
 };
}

const BoardList = ({
  orgId,
  query,
}: BoardListProps) => {
  
  const data = [];

  if(!data?.length && query.search)
  {
     return (
       <EmptySearch />
     )
  }

  if(!data?.length && query.favourites)
  {
     return (
        <EmptySearch />
     )
  }

  if(!data.length) {
    return (
        <EmptyBoards />
    );
  }

  return (
    <div>
      {JSON.stringify(query)}
    </div>
  )
}

export default BoardList
