'use client'
import { useSelectedElement } from "@/app/provider";
import React, { useState, useEffect } from "react";
import InputField from "./Settings/InputField";
import ColourPickerField from "./Settings/ColourPickerField";
import InputStyleField from "./Settings/InputStyleField";
import SliderField from "./Settings/SliderField";
import TextAreaField from "./Settings/TextAreaField";
import SelectField from "./Settings/SelectField";
import CaseSwitchingField from "./Settings/CaseSwitchingField";
// Import the new component

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
      {element?.content != null && (
        <InputField
          label="Content"
          value={element.content}
          onHandleInputChange={(value) => onHandleInputChange("content", value)}
        />
      )}

      {element?.textarea != null && (
        <TextAreaField
          label="TextArea"
          value={element.textarea}
          onHandleInputChange={(value) => onHandleInputChange("textarea", value)}
        />
      )}

      {element?.imageUrl != null && (
        <InputField
          label="Image URL"
          value={element.imageUrl}
          onHandleInputChange={(value) => onHandleInputChange("imageUrl", value)}
        />
      )}
      {element?.alt != null && (
        <InputField
          label="Alt Text"
          value={element.alt}
          onHandleInputChange={(value) => onHandleInputChange("alt", value)}
        />
      )}
      {element?.style?.fontSize != null && (
        <InputStyleField
          label="fontsize"
          value={element.style.fontSize}
          onHandleStyleChange={(value) => onHandleStyleChange("fontSize", value)}
        />
      )}
      {element?.url != null && (
        <InputField
          label="url"
          value={element.url}
          onHandleInputChange={(value) => onHandleInputChange("url", value)}
        />
      )}
      {element?.style?.backgroundColor != null && (
        <ColourPickerField
          label="Background Color"
          value={element.style.backgroundColor}
          onHandleStyleChange={(value) => onHandleStyleChange("backgroundColor", value)}
        />
      )}
      {element?.style?.color != null && (
        <ColourPickerField
          label="Element Color"
          value={element.style.color}
          onHandleStyleChange={(value) => onHandleStyleChange("color", value)}
        />
      )}
      {element?.style?.padding != null && (
        <InputStyleField
          label="Padding"
          value={element.style.padding}
          onHandleStyleChange={(value) => onHandleStyleChange("padding", value)}
        />
      )}
      {element?.style?.borderRadius != null && (
        <SliderField
          label="Border Radius"
          value={element.style.borderRadius}
          onHandleStyleChange={(value) => onHandleStyleChange("borderRadius", value)}
        />
      )}
      {element?.style?.width != null && (
        <SliderField
          label="Width"
          value={element.style.width}
          type={
            element.type === "Image" || element.type === "Logo" || element.type === "LogoHeader" ? "%" : "px"
          } // Use % for images/logos
          onHandleStyleChange={(value) => onHandleStyleChange("width", value)}
        />
      )}
      {element?.style?.height != null && (
        <SliderField
          label="Height"
          value={element.style.height}
          type={
            element.type === "Image" || element.type === "Logo" || element.type === "LogoHeader" ? "%" : "px"
          } // Use % for images/logos
          onHandleStyleChange={(value) => onHandleStyleChange("height", value)}
        />
      )}
      {element?.style?.margin != null && (
        <InputStyleField
          label="Margin"
          value={element.style.margin}
          onHandleStyleChange={(value) => onHandleStyleChange("margin", value)}
        />
      )}
      {element?.content != null && (
        <CaseSwitchingField
          label="Content Case"
          element={element}
          fieldName="content"
          value={element?.style?.textTransform}
          onHandleInputChange={(fieldName, value) => {
            const newValue = value === "uppercase" ? element?.content?.toUpperCase() : element?.content?.toLowerCase();
            onHandleInputChange(fieldName, newValue);
          }}
        />
      )}
      {element?.textarea != null && (
        <CaseSwitchingField
          label="Textarea Case"
          element={element}
          fieldName="textarea"
          value={element?.style?.textTransform}
          onHandleInputChange={(fieldName, value) => {
            const newValue = value === "uppercase" ? element?.textarea?.toUpperCase() : element?.textarea?.toLowerCase();
            onHandleInputChange(fieldName, newValue);
          }}
        />
      )}
      <div>
        <h2 className="font-bold mb-2">Outer Style</h2>
        {element?.outerStyle?.backgroundColor != null && (
          <ColourPickerField
            label="Background Color"
            value={element.outerStyle.backgroundColor}
            onHandleStyleChange={(value) => onHandleOuterStyleChange("backgroundColor", value)}
          />
        )}
        {element?.outerStyle?.gap != null && (
          <InputStyleField
            label="Gap"
            value={element.outerStyle.gap}
            onHandleStyleChange={(value) => onHandleOuterStyleChange("gap", value)}
          />
        )}
        {element?.outerStyle?.justifyContent != null && (
          <SelectField
            label="Justify Content"
            value={element.outerStyle.justifyContent}
            options={justifyContentOptions}
            onHandleChange={(value) => onHandleOuterStyleChange("justifyContent", value)}
          />
        )}
        {element?.outerStyle?.alignItems != null && (
          <SelectField
            label="Align Items"
            value={element.outerStyle.alignItems}
            options={alignItemsOptions}
            onHandleChange={(value) => onHandleOuterStyleChange("alignItems", value)}
          />
        )}
      </div>
    </div>
  );
}

