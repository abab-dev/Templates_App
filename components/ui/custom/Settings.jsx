'use client'
import { useSelectedElement } from "@/app/provider";
import React, { useState, useEffect } from "react";
import InputField from "./Settings/InputField";
import ColourPickerField from "./Settings/ColourPickerField";
export default function Settings() {
  const { selectedElement, setSelectedElement } = useSelectedElement()
  const [element, setElement] = useState()
  useEffect(() => {
    setElement(selectedElement?.layout?.[selectedElement?.index])
  }, [selectedElement])
  const onHandleInputChange = (fieldName, value) => {
    const updatedData = { ...selectedElement }
    updatedData.layout[selectedElement.index][fieldName] = value
    setSelectedElement(updatedData)
  }
  const onHandleStyleChange = (fieldName, fieldValue) => {
    const updatedData = {
      ...selectedElement,
      layout: {
        ...selectedElement.layout,
        [selectedElement.index]: {
          ...selectedElement.layout[selectedElement.index],
          style: {
            ...selectedElement?.layout[selectedElement.index]?.style,
            [fieldName]: fieldValue

          }
        }
      }

    }
    setSelectedElement(updatedData)
  }
  return (
    <div className="p-5">
      <h2 className="font-bold text-xl">Settings</h2>
      {
        element?.content &&
        <InputField label={'Content'} value={element?.content}
          onHandleInputChange={(value) => onHandleInputChange("content", value)}></InputField>
      }
      {
        element?.style?.backgroundColor &&
        <ColourPickerField label={"Color"} value={element?.style?.backgroundColor}
          onHandleStyleChange={(value) => onHandleStyleChange('backgroundColor', value)} />
      }
    </div>
  )
}


