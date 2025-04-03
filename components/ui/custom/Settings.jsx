'use client'
import { useSelectedElement } from "@/app/provider";
import React, { useState, useEffect } from "react";
import InputField from "./Settings/InputField";
import ColourPickerField from "./Settings/ColourPickerField";
import InputStyleField from "./Settings/InputStyleField";
import SliderField from "./Settings/SliderField";
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
  const onHandleOuterStyleChange = (fieldName, fieldValue) => {
    const updatedData = {
      ...selectedElement,
      layout: {
        ...selectedElement.layout,
        [selectedElement.index]: {
          ...selectedElement.layout[selectedElement.index],
          outerStyle: {
            ...selectedElement?.layout[selectedElement.index]?.outerStyle,
            [fieldName]: fieldValue

          }
        }
      }

    }
    console.log(selectedElement?.layout[selectedElement.index]?.outerStyle)
    setSelectedElement(updatedData)
  }
  return (
    <div className="p-5 flex flex-col gap-4">
      <h2 className="font-bold text-xl">Settings</h2>
      {
        element?.content &&
        <InputField label={'Content'} value={element?.content}
          onHandleInputChange={(value) => onHandleInputChange("content", value)}></InputField>
      }{
        element?.style?.fontSize &&
        <InputStyleField label={"fontsize"} value={element?.style?.fontSize}
          onHandleStyleChange={(value) => onHandleStyleChange('fontSize', value)} />
      }
      {
        element?.url &&
        <InputField label={'url'} value={element?.url}
          onHandleInputChange={(value) => onHandleInputChange("url", value)}></InputField>
      }
      {
        element?.textarea &&
        <InputField label={'Content'} value={element?.textarea}
          onHandleInputChange={(value) => onHandleInputChange("textarea", value)}></InputField>
      }
      {
        element?.style?.backgroundColor &&
        <ColourPickerField label={"Color"} value={element?.style?.backgroundColor}
          onHandleStyleChange={(value) => onHandleStyleChange('backgroundColor', value)} />
      }{
        element?.style?.color &&
        <ColourPickerField label={"Element Color"} value={element?.style?.color}
          onHandleStyleChange={(value) => onHandleStyleChange('color', value)} />
      }{
        element?.style?.padding &&
        <InputStyleField label={"Padding"} value={element?.style?.padding}
          onHandleStyleChange={(value) => onHandleStyleChange('padding', value)} />
      }{
        element?.style?.borderRadius &&
        <SliderField label={"Border Radius"} value={element?.style?.borderRadius}
          onHandleStyleChange={(value) => onHandleStyleChange('borderRadius', value)} />
      }{
        element?.style?.width &&
        <SliderField label={"Width"} value={element?.style?.width} type={"%"}
          onHandleStyleChange={(value) => onHandleStyleChange('width', value)} />
      }
      <div>
        <h2 className="font-bold mb-2">Outer Style</h2>
        {
          element?.outerStyle?.backgroundColor &&
          <ColourPickerField label={"Color"} value={element?.outerStyle?.backgroundColor}
            onHandleStyleChange={(value) => onHandleOuterStyleChange('backgroundColor', value)} />
        }


      </div>
    </div>
  )
}


