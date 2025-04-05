'use client'
import { useSelectedElement } from "@/app/provider";
import React, { useState, useEffect } from "react";
import InputField from "./Settings/InputField";
import ColourPickerField from "./Settings/ColourPickerField";
import InputStyleField from "./Settings/InputStyleField";
import SliderField from "./Settings/SliderField";
import TextAreaField from "./Settings/TextAreaField";
import SelectField from "./Settings/SelectField"; // Import the new component

// Define options for the select fields
const justifyContentOptions = [
  { value: 'flex-start', label: 'Start' },
  { value: 'center', label: 'Center' },
  { value: 'flex-end', label: 'End' },
];

const alignItemsOptions = [
  { value: 'flex-start', label: 'Start' },
  { value: 'center', label: 'Center' },
  { value: 'flex-end', label: 'End' },
];


export default function Settings() {
  const { selectedElement, setSelectedElement } = useSelectedElement()
  const [element, setElement] = useState()
  useEffect(() => {
    setElement(selectedElement?.layout?.[selectedElement?.index])
  }, [selectedElement])
  const onHandleInputChange = (fieldName, value) => {
    const updatedData = { ...selectedElement }
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
    setSelectedElement(updatedData)
  }
  return (
     // Adjust padding, add border for separation
    <div className="p-4 border-l flex flex-col gap-5 h-full overflow-y-auto">
       {/* Slightly smaller, less bold heading */}
      <h2 className="font-semibold text-lg border-b pb-2">Settings</h2>
      {
  element?.content != null &&
  <InputField
    label="Content"
    value={element.content}
    onHandleInputChange={(value) => onHandleInputChange("content", value)}
  />
}
{
         element?.textarea != null &&
        <TextAreaField label={'TextArea'} value={element?.textarea}
          onHandleInputChange={(value) => onHandleInputChange("textarea", value)}></TextAreaField>
      }{
        element?.imageUrl != null &&
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
        element?.url != null  &&
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
       {/* Add spacing and border before Outer Style section */}
      <div className="pt-4 border-t mt-2">
         {/* Consistent heading style */}
        <h3 className="font-semibold text-md mb-3">Container Style</h3>
        {
          element?.outerStyle?.backgroundColor &&
          <ColourPickerField label={"Background Color"} value={element?.outerStyle?.backgroundColor}
            onHandleStyleChange={(value) => onHandleOuterStyleChange('backgroundColor', value)} />
        }{
          element?.outerStyle?.gap &&
          <InputStyleField label={"Gap"} value={element?.outerStyle?.gap}
            onHandleStyleChange={(value) => onHandleOuterStyleChange('gap', value)} />
        }{
          element?.outerStyle?.justifyContent !== undefined && // Check if property exists
          <SelectField
            label={"Justify Content"}
            value={element?.outerStyle?.justifyContent}
            options={justifyContentOptions}
            onHandleChange={(value) => onHandleOuterStyleChange('justifyContent', value)}
          />
        }{
          element?.outerStyle?.alignItems !== undefined && // Check if property exists
          <SelectField
            label={"Align Items"}
            value={element?.outerStyle?.alignItems}
            options={alignItemsOptions}
            onHandleChange={(value) => onHandleOuterStyleChange('alignItems', value)}
          />
        }


      </div>
    </div>
  )
}


