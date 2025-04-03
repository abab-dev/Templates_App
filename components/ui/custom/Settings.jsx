'use client'
import { useSelectedElement } from "@/app/provider";
import React, { useState, useEffect } from "react";
import InputField from "./Settings/InputField";
import ColourPickerField from "./Settings/ColourPickerField";
import InputStyleField from "./Settings/InputStyleField";
import SliderField from "./Settings/SliderField";
import TextAreaField from "./Settings/TextAreaField";
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
        element?.textarea &&
        <TextAreaField label={'TextArea'} value={element?.textarea}
          onHandleInputChange={(value) => onHandleInputChange("textarea", value)}></TextAreaField>
      }{
        element?.imageUrl &&
        <InputField label={'Image URL'} value={element?.imageUrl}
          onHandleInputChange={(value) => onHandleInputChange("imageUrl", value)}></InputField>
      }{
        element?.alt &&
        <InputField label={'Alt Text'} value={element?.alt}
          onHandleInputChange={(value) => onHandleInputChange("alt", value)}></InputField>
      }
      {
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
        element?.style?.backgroundColor &&
        <ColourPickerField label={"Background Color"} value={element?.style?.backgroundColor}
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
        <SliderField label={"Width"} value={element?.style?.width} type={element?.type === 'Image' || element?.type === 'Logo' || element?.type === 'LogoHeader' ? "%" : "px"} // Use % for images/logos
          onHandleStyleChange={(value) => onHandleStyleChange('width', value)} />
      }{
        element?.style?.height &&
        <SliderField label={"Height"} value={element?.style?.height} type={element?.type === 'Image' || element?.type === 'Logo' || element?.type === 'LogoHeader' ? "%" : "px"} // Use % for images/logos
          onHandleStyleChange={(value) => onHandleStyleChange('height', value)} />
      }{
        element?.style?.margin &&
        <InputStyleField label={"Margin"} value={element?.style?.margin}
          onHandleStyleChange={(value) => onHandleStyleChange('margin', value)} />
      }
      <div>
        <h2 className="font-bold mb-2">Outer Style</h2>
        {
          element?.outerStyle?.backgroundColor &&
          <ColourPickerField label={"Background Color"} value={element?.outerStyle?.backgroundColor}
            onHandleStyleChange={(value) => onHandleOuterStyleChange('backgroundColor', value)} />
        }{
          element?.outerStyle?.gap &&
          <InputStyleField label={"Gap"} value={element?.outerStyle?.gap}
            onHandleStyleChange={(value) => onHandleOuterStyleChange('gap', value)} />
        }


      </div>
    </div>
  )
}


