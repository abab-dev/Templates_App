"use client"
import { useState } from "react";
import React from "react";
import { useDragElementLayout, useEmailTemplate } from '@/app/provider';

export default function ColumnLayout({ layout }) {
  const [dragOver, setDragOver] = useState(null);
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const { dragElementLayout,setDragElementLayout } = useDragElementLayout();

  const onDragOverHandle = (event, index) => {
    event.preventDefault();
    setDragOver({
      index: index,
      columnId: layout?.id,
    });
  };

  const onDragLeaveHandle = (event, index) => {
    event.preventDefault();
    // Reset highlight only if it's the active element
    if (dragOver?.index === index && dragOver?.columnId === layout?.id) {
      setDragOver(null);
    }
  };

  const onDropHandle = (event) => {
    event.preventDefault();
    if (dragOver?.index === undefined) return;

    const index = dragOver.index;
    setEmailTemplate((prevItems) =>
      prevItems?.map((col) =>
        col?.id === layout?.id
          ? { ...col,[index]:dragElementLayout?.dragElement }
          : col
      )
    );
    setDragOver(null); // Reset highlight after drop
  };

  const getElementComponent = (element) => {
    return element?.type || "Drag element here";
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${layout?.numOfCol}, 1fr)`,
          gap: "0px",
        }}
      >
        {Array.from({ length: layout?.numOfCol }).map((_, index) => (
          <div
            key={index}
            className={`p-2 flex items-center bg-gray-100 border border-dashed justify-center ${
              dragOver?.index === index && dragOver?.columnId === layout?.id ? "bg-green-100" : ""
            }`}
            onDragOver={(event) => onDragOverHandle(event, index)}
            onDragLeave={(event) => onDragLeaveHandle(event, index)}
            onDrop={onDropHandle}
          >
            {getElementComponent(layout?.[index])}
          </div>
        ))}
      </div>
    </div>
  );
}
