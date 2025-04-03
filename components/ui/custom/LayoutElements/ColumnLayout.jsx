"use client";
import { useState } from "react";
import React from "react";
import { useDragElementLayout, useEmailTemplate, useSelectedElement } from '@/app/provider';
import ButtonComponent from "@/components/elements/ButtonComponent";
import TextComponent from "@/components/elements/TestComponent"; // Assuming typo: TestComponent -> TextComponent
import ImageComponent from "@/components/elements/ImageComponent";
import LogoComponent from "@/components/elements/LogoComponent";
import DividerComponent from "@/components/elements/DividerComponent";
import { X } from "lucide-react";

export default function ColumnLayout({ layout }) {
  const [dragOver, setDragOver] = useState(null);
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const { dragElementLayout, setDragElementLayout } = useDragElementLayout(); // setDragElementLayout is not used here, but kept for consistency if needed elsewhere
  const { selectedElement, setSelectedElement } = useSelectedElement();

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
          ? { ...col, [index]: dragElementLayout?.dragElement }
          : col
      )
    );
    setDragOver(null); // Reset highlight after drop
  };

  const onDeleteElement = (event, index) => {
    event.stopPropagation(); // Prevent triggering the setSelectedElement click
    setEmailTemplate((prevItems) =>
      prevItems?.map((col) =>
        col?.id === layout?.id
          ? { ...col, [index]: null } // Set the element to null to delete it
          : col
      )
    );
  };

  const getElementComponent = (element) => {
    console.log(element)
    if (element?.type == "Button") {
      return (<ButtonComponent {...element} />)
    }
    else if (element?.type == "Text") {
      return (<TextComponent {...element} />)
    }
    else if (element?.type == "Image") {
      return (<ImageComponent{...element} />)
    }
    else if (element?.type == "Logo") {
      return (<LogoComponent{...element} />)
    }
    else if (element?.type == "Divider") {
      return (<DividerComponent{...element} />)
    }
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
            className={`p-2 border border-dashed
            ${dragOver?.index === index && dragOver?.columnId === layout?.id ? "bg-green-100" : ""}
            ${selectedElement?.layout?.id == layout?.id && selectedElement?.index == index && 'border-blue-500 border border-solid relative'}
            `}
            style={{
              display: 'flex', // Ensure flex display for alignment
              justifyContent: layout?.[index]?.outerStyle?.justifyContent || 'center', // Apply horizontal alignment
              alignItems: layout?.[index]?.outerStyle?.alignItems || 'center', // Apply vertical alignment
              backgroundColor: layout?.[index]?.outerStyle?.backgroundColor || 'transparent', // Use transparent default
            }}
            onDragOver={(event) => onDragOverHandle(event, index)}
            onDragLeave={(event) => onDragLeaveHandle(event, index)}
            onDrop={onDropHandle}
            onClick={() => setSelectedElement({ layout: layout, index: index })}
          >
            {getElementComponent(layout?.[index])}
            {selectedElement?.layout?.id == layout?.id && selectedElement?.index == index && (
              <button
                onClick={(event) => onDeleteElement(event, index)}
                className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                style={{ zIndex: 10 }} // Ensure the button is on top
              >
                <X size={12} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
