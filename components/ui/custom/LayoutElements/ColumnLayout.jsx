import { useState } from "react";
import React from "react";
export default function ColumnLayout({ layout }) {
  const [dragOver,setDragOver] = useState(false)
 const onDragOverHandle = (event,index)=>{
  event.preventDefault()
  setDragOver ({
    index:index,
    columnId:layout?.id
  })
 }
  return (
    <div>
      <div
      // className={`grid  grid-rows-${layout?.numOfCol} gap-0`}>
      style={{
        display:'grid',
        gridTemplateColumns: `repeat(${layout?.numOfCol},1fr)`,
        gap:'0px'

      }}>
        {
        Array.from({ length: layout?.numOfCol }).map((_,index)=>(
          <div key={index} className={`p-2 flex items-center 
          bg-gray-100 border border-dashed justify-center
          ${(index==dragOver?.index && dragOver?.columnId) && 'bg-green-100'} `}
          onDragOver={(event)=>onDragOverHandle(event,index)}>
            {index+1}
          </div>
        )) }

      </div>
    </div>
  )
}
