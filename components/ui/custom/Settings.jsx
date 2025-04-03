'use client'
import { useSelectedElement } from "@/app/provider";
import React, { useState, useEffect } from "react";
import InputField from "./Settings/InputField";
import ColourPickerField from "./Settings/ColourPickerField";
import InputStyleField from "./Settings/InputStyleField";
import SliderField from "./Settings/SliderField";
import SelectField from "./Settings/SelectField"; // Import the new component
export default function Settings() {
  const { selectedElement, setSelectedElement } = useSelectedElement()
  const [element, setElement] = useState()
  useEffect(() => {
    setElement(selectedElement?.layout?.[selectedElement?.index])
  }, [selectedElement])
  const onHandleInputChange = (fieldName, value) => {
    const updatedData = { ...selectedElement }
    updatedData.layout[selectedElement.index][fieldName] = value
    setSelectedElement(updatedData);
  };

  // Generic handler for style changes (style and outerStyle)
  const handleStylePropertyChange = (fieldName, fieldValue, styleType = 'style') => {
    const updatedData = { ...selectedElement };
    if (!updatedData.layout || !updatedData.layout[selectedElement.index]) return;

    // Ensure the style object exists
    if (!updatedData.layout[selectedElement.index][styleType]) {
      updatedData.layout[selectedElement.index][styleType] = {};
    }

    updatedData.layout[selectedElement.index][styleType] = {
      ...updatedData.layout[selectedElement.index][styleType],
      [fieldName]: fieldValue,
    };

    setSelectedElement(updatedData);
  };


  // Specific handlers calling the generic one
  const onHandleStyleChange = (fieldName, fieldValue) => {
    handleStylePropertyChange(fieldName, fieldValue, 'style');
  };

  const onHandleOuterStyleChange = (fieldName, fieldValue) => {
    handleStylePropertyChange(fieldName, fieldValue, 'outerStyle');
  };


  // Helper to check if a style property exists
  const hasStyleProperty = (propName, styleType = 'style') => {
    return selectedElement?.layout?.[selectedElement?.index]?.[styleType]?.[propName] !== undefined;
  };
  const getStyleProperty = (propName, styleType = 'style') => {
     return selectedElement?.layout?.[selectedElement?.index]?.[styleType]?.[propName];
  }


  return (
    <div className="p-5 flex flex-col gap-4 overflow-y-auto h-full"> {/* Added overflow and height */}
      <h2 className="font-bold text-xl">Settings</h2>
      {/* --- Element Specific Fields --- */}
      { element?.content &&
        <InputField label={'Content'} value={element?.content}
          onHandleInputChange={(value) => onHandleInputChange("content", value)} />
      }
      { element?.url &&
        <InputField label={'URL'} value={element?.url}
          onHandleInputChange={(value) => onHandleInputChange("url", value)} />
      }
      { element?.textarea &&
        <InputField label={'Text Content'} value={element?.textarea}
          onHandleInputChange={(value) => onHandleInputChange("textarea", value)} />
      }
       { element?.imageUrl &&
        <InputField label={'Image URL'} value={element?.imageUrl}
          onHandleInputChange={(value) => onHandleInputChange("imageUrl", value)} />
      }
       { element?.alt &&
        <InputField label={'Alt Text'} value={element?.alt}
          onHandleInputChange={(value) => onHandleInputChange("alt", value)} />
      }

      {/* --- Style Fields --- */}
      { hasStyleProperty('fontSize') &&
        <InputStyleField label={"Font Size"} value={getStyleProperty('fontSize')}
          onHandleStyleChange={(value) => onHandleStyleChange('fontSize', value)} />
      }
      { hasStyleProperty('backgroundColor') &&
        <ColourPickerField label={"Background Color"} value={getStyleProperty('backgroundColor')}
          onHandleStyleChange={(value) => onHandleStyleChange('backgroundColor', value)} />
      }
      { hasStyleProperty('color') &&
        <ColourPickerField label={"Text/Element Color"} value={getStyleProperty('color')}
          onHandleStyleChange={(value) => onHandleStyleChange('color', value)} />
      }
      { hasStyleProperty('padding') &&
        <InputStyleField label={"Padding"} value={getStyleProperty('padding')}
          onHandleStyleChange={(value) => onHandleStyleChange('padding', value)} />
      }
       { hasStyleProperty('margin') && // Added Margin
        <InputStyleField label={"Margin"} value={getStyleProperty('margin')}
          onHandleStyleChange={(value) => onHandleStyleChange('margin', value)} />
      }
      { hasStyleProperty('borderRadius') &&
        <SliderField label={"Border Radius"} value={getStyleProperty('borderRadius')}
          onHandleStyleChange={(value) => onHandleStyleChange('borderRadius', value)} />
      }
      { hasStyleProperty('width', 'style') && // Specify style type for clarity
        <SliderField label={"Width"} value={getStyleProperty('width', 'style')} type={"%"} // Assuming % for inner width often
          onHandleStyleChange={(value) => onHandleStyleChange('width', value)} />
      }
       { hasStyleProperty('height', 'style') && // Added Height
        <SliderField label={"Height"} value={getStyleProperty('height', 'style')} type={"%"}
          onHandleStyleChange={(value) => onHandleStyleChange('height', value)} />
      }
      { hasStyleProperty('textAlign') && // Added Text Align
        <SelectField label={"Text Align"} value={getStyleProperty('textAlign')} fieldName="textAlign"
          options={[
            { value: 'left', label: 'Left' },
            { value: 'center', label: 'Center' },
            { value: 'right', label: 'Right' },
          ]}
          onHandleChange={onHandleStyleChange} />
      }
      { hasStyleProperty('fontWeight') && // Added Font Weight
        <SelectField label={"Font Weight"} value={getStyleProperty('fontWeight')} fieldName="fontWeight"
          options={[
            { value: 'normal', label: 'Normal' },
            { value: 'bold', label: 'Bold' },
            { value: 'lighter', label: 'Lighter' },
            { value: 'bolder', label: 'Bolder' },
            { value: '100', label: '100' },{ value: '200', label: '200' },{ value: '300', label: '300' },
            { value: '400', label: '400 (normal)' },{ value: '500', label: '500' },{ value: '600', label: '600' },
            { value: '700', label: '700 (bold)' },{ value: '800', label: '800' },{ value: '900', label: '900' },
          ]}
          onHandleChange={onHandleStyleChange} />
      }
       { hasStyleProperty('textTransform') && // Added Text Transform
        <SelectField label={"Text Transform"} value={getStyleProperty('textTransform')} fieldName="textTransform"
          options={[
            { value: 'none', label: 'None' },
            { value: 'uppercase', label: 'Uppercase' },
            { value: 'lowercase', label: 'Lowercase' },
            { value: 'capitalize', label: 'Capitalize' },
          ]}
          onHandleChange={onHandleStyleChange} />
      }
       { hasStyleProperty('objectFit') && // Added Object Fit
        <SelectField label={"Object Fit"} value={getStyleProperty('objectFit')} fieldName="objectFit"
          options={[
            { value: 'contain', label: 'Contain' },
            { value: 'cover', label: 'Cover' },
            { value: 'fill', label: 'Fill' },
            { value: 'none', label: 'None' },
            { value: 'scale-down', label: 'Scale Down' },
          ]}
          onHandleChange={onHandleStyleChange} />
      }


      {/* --- Outer Style Fields --- */}
      <h3 className="font-semibold text-lg mt-4 border-t pt-4">Container Styles</h3>
      { hasStyleProperty('backgroundColor', 'outerStyle') &&
        <ColourPickerField label={"Container Background"} value={getStyleProperty('backgroundColor', 'outerStyle')}
          onHandleStyleChange={(value) => onHandleOuterStyleChange('backgroundColor', value)} />
      }
      { hasStyleProperty('width', 'outerStyle') &&
        <SliderField label={"Container Width"} value={getStyleProperty('width', 'outerStyle')} type={"%"}
          onHandleStyleChange={(value) => onHandleOuterStyleChange('width', value)} />
      }
       { hasStyleProperty('display', 'outerStyle') &&
        <SelectField label={"Display"} value={getStyleProperty('display', 'outerStyle')} fieldName="display" styleType="outerStyle"
          options={[
            { value: 'block', label: 'Block' },
            { value: 'flex', label: 'Flex' },
            { value: 'grid', label: 'Grid' },
            { value: 'inline', label: 'Inline' },
            { value: 'inline-block', label: 'Inline Block' },
          ]}
          onHandleChange={onHandleOuterStyleChange} />
      }
       { hasStyleProperty('justifyContent', 'outerStyle') &&
        <SelectField label={"Justify Content"} value={getStyleProperty('justifyContent', 'outerStyle')} fieldName="justifyContent" styleType="outerStyle"
          options={[
            { value: 'flex-start', label: 'Start' },
            { value: 'flex-end', label: 'End' },
            { value: 'center', label: 'Center' },
            { value: 'space-between', label: 'Space Between' },
            { value: 'space-around', label: 'Space Around' },
            { value: 'space-evenly', label: 'Space Evenly' },
          ]}
          onHandleChange={onHandleOuterStyleChange} />
      }
       { hasStyleProperty('alignItems', 'outerStyle') &&
        <SelectField label={"Align Items"} value={getStyleProperty('alignItems', 'outerStyle')} fieldName="alignItems" styleType="outerStyle"
          options={[
            { value: 'stretch', label: 'Stretch' },
            { value: 'flex-start', label: 'Start' },
            { value: 'flex-end', label: 'End' },
            { value: 'center', label: 'Center' },
            { value: 'baseline', label: 'Baseline' },
          ]}
          onHandleChange={onHandleOuterStyleChange} />
      }
       { hasStyleProperty('gap', 'outerStyle') && // Added Gap for Social Icons
        <InputStyleField label={"Gap"} value={getStyleProperty('gap', 'outerStyle')}
          onHandleStyleChange={(value) => onHandleOuterStyleChange('gap', value)} />
      }


    </div>
  )
}
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
    </div>
  )
}


