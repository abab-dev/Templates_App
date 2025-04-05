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
    // Update local element state when the selectedElement context changes
    if (selectedElement?.layout && selectedElement.index !== undefined) {
      setElement(selectedElement.layout[selectedElement.index]);
    } else {
      setElement(undefined); // Reset if no element is selected
    }
  }, [selectedElement])

  // *** CORRECTED FUNCTION ***
  const onHandleInputChange = (fieldName, fieldValue) => {
    if (!selectedElement || !selectedElement.layout || selectedElement.index === undefined || selectedElement.layout[selectedElement.index] === undefined) {
      console.error("Cannot update property: selectedElement structure is invalid.", { selectedElement, fieldName });
      return;
    }

    const updatedData = {
      ...selectedElement,
      layout: {
        ...selectedElement.layout,
        [selectedElement.index]: {
          ...selectedElement.layout[selectedElement.index],
          [fieldName]: fieldValue
        }
      }
    };
    setSelectedElement(updatedData);
  }

  const onHandleStyleChange = (fieldName, fieldValue) => {
    if (!selectedElement || !selectedElement.layout || selectedElement.index === undefined || !selectedElement.layout[selectedElement.index]?.style) {
      console.error("Cannot update style: selectedElement structure is invalid.", { selectedElement, fieldName });
      return;
    }
    const updatedData = {
      ...selectedElement,
      layout: {
        ...selectedElement.layout,
        [selectedElement.index]: {
          ...selectedElement.layout[selectedElement.index],
          style: {
            ...selectedElement.layout[selectedElement.index].style, // Use guaranteed non-null style here
            [fieldName]: fieldValue
          }
        }
      }
    }
    setSelectedElement(updatedData)
  }

  const onHandleOuterStyleChange = (fieldName, fieldValue) => {
    if (!selectedElement || !selectedElement.layout || selectedElement.index === undefined || !selectedElement.layout[selectedElement.index]?.outerStyle) {
      console.error("Cannot update outerStyle: selectedElement structure is invalid.", { selectedElement, fieldName });
      return;
    }
    const updatedData = {
      ...selectedElement,
      layout: {
        ...selectedElement.layout,
        [selectedElement.index]: {
          ...selectedElement.layout[selectedElement.index],
          outerStyle: {
            ...selectedElement.layout[selectedElement.index].outerStyle, // Use guaranteed non-null outerStyle here
            [fieldName]: fieldValue
          }
        }
      }
    }
    setSelectedElement(updatedData)
  }

  // Use optional chaining more safely for rendering
  const currentElement = selectedElement?.layout?.[selectedElement?.index];

  return (
    <div className="p-4 border-l flex flex-col gap-5 h-full overflow-y-auto">
      <h2 className="font-semibold text-lg border-b pb-2">Settings</h2>
      {!currentElement && <p className="text-gray-500">Select an element to edit its settings.</p>}

      { // Use currentElement for checks and value access
        currentElement?.content != null &&
        <InputField
          label="Content"
          value={currentElement.content}
          onHandleInputChange={(value) => onHandleInputChange("content", value)}
        />
      }
      {
        currentElement?.textarea != null &&
        <TextAreaField label={'TextArea'} value={currentElement.textarea}
          onHandleInputChange={(value) => onHandleInputChange("textarea", value)} />
      }{
        currentElement?.imageUrl != null &&
        <InputField label={'Image URL'} value={currentElement.imageUrl}
          onHandleInputChange={(value) => onHandleInputChange("imageUrl", value)} />
      }{
        currentElement?.alt != null && // Changed from element?.alt to currentElement?.alt
        <InputField label={'Alt Text'} value={currentElement.alt}
          onHandleInputChange={(value) => onHandleInputChange("alt", value)} />
      }
      {
        currentElement?.style?.fontSize != null && // Changed from element?.style?.fontSize
        <InputStyleField label={"fontsize"} value={currentElement.style.fontSize}
          onHandleStyleChange={(value) => onHandleStyleChange('fontSize', value)} />
      }
      {
        currentElement?.url != null &&
        <InputField label={'url'} value={currentElement.url}
          onHandleInputChange={(value) => onHandleInputChange("url", value)} />
      }
      {
        currentElement?.style?.backgroundColor != null && // etc.
        <ColourPickerField label={"Background Color"} value={currentElement.style.backgroundColor}
          onHandleStyleChange={(value) => onHandleStyleChange('backgroundColor', value)} />
      }{
        currentElement?.style?.color != null &&
        <ColourPickerField label={"Element Color"} value={currentElement.style.color}
          onHandleStyleChange={(value) => onHandleStyleChange('color', value)} />
      }{
        currentElement?.style?.padding != null &&
        <InputStyleField label={"Padding"} value={currentElement.style.padding}
          onHandleStyleChange={(value) => onHandleStyleChange('padding', value)} />
      }{
        currentElement?.style?.borderRadius != null &&
        <SliderField label={"Border Radius"} value={currentElement.style.borderRadius}
          onHandleStyleChange={(value) => onHandleStyleChange('borderRadius', value)} />
      }{
        currentElement?.style?.width != null &&
        <SliderField label={"Width"} value={currentElement.style.width} type={currentElement?.type === 'Image' || currentElement?.type === 'Logo' || currentElement?.type === 'LogoHeader' ? "%" : "px"}
          onHandleStyleChange={(value) => onHandleStyleChange('width', value)} />
      }{
        currentElement?.style?.height != null &&
        <SliderField label={"Height"} value={currentElement.style.height} type={currentElement?.type === 'Image' || currentElement?.type === 'Logo' || currentElement?.type === 'LogoHeader' ? "%" : "px"}
          onHandleStyleChange={(value) => onHandleStyleChange('height', value)} />
      }{
        currentElement?.style?.margin != null &&
        <InputStyleField label={"Margin"} value={currentElement.style.margin}
          onHandleStyleChange={(value) => onHandleStyleChange('margin', value)} />
      }
      {/* Add spacing and border before Outer Style section if outerStyle exists */}
      {currentElement?.outerStyle && (
        <div className="pt-4 border-t mt-2">
          <h3 className="font-semibold text-md mb-3">Container Style</h3>
          {
            currentElement.outerStyle.backgroundColor != null &&
            <ColourPickerField label={"Background Color"} value={currentElement.outerStyle.backgroundColor}
              onHandleStyleChange={(value) => onHandleOuterStyleChange('backgroundColor', value)} />
          }{
            currentElement.outerStyle.gap != null &&
            <InputStyleField label={"Gap"} value={currentElement.outerStyle.gap}
              onHandleStyleChange={(value) => onHandleOuterStyleChange('gap', value)} />
          }{
            currentElement.outerStyle.justifyContent !== undefined && // Check if property exists
            <SelectField
              label={"Justify Content"}
              value={currentElement.outerStyle.justifyContent}
              options={justifyContentOptions}
              onHandleChange={(value) => onHandleOuterStyleChange('justifyContent', value)}
            />
          }{
            currentElement.outerStyle.alignItems !== undefined && // Check if property exists
            <SelectField
              label={"Align Items"}
              value={currentElement.outerStyle.alignItems}
              options={alignItemsOptions}
              onHandleChange={(value) => onHandleOuterStyleChange('alignItems', value)}
            />
          }
        </div>
      )
      }
    </div>
  )
}
