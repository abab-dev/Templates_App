"use client";
import React, { useState, useEffect } from "react";
import { useSelectedElement, useEmailTemplate } from "@/app/provider";
import { Label } from "@/components/ui/label"; // Assuming shadcn/ui Label
import { Input } from "@/components/ui/input"; // Assuming shadcn/ui Input
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Assuming shadcn/ui Select
import { Textarea } from "@/components/ui/textarea"; // Assuming shadcn/ui Textarea

// Basic Color Picker (replace with a proper one if available)
const ColorPicker = ({ value, onChange, ...props }) => (
  <input type="color" value={value || '#000000'} onChange={onChange} {...props} className="w-full h-8" />
);

export default function Settings() {
  const { selectedElement } = useSelectedElement();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const [elementData, setElementData] = useState(null);

  // Update local state when selected element changes
  useEffect(() => {
    if (selectedElement && selectedElement.layout && typeof selectedElement.index !== 'undefined') {
      const currentElement = selectedElement.layout[selectedElement.index];
      setElementData(currentElement);
    } else {
      setElementData(null);
    }
  }, [selectedElement]);

  // Function to update the email template state
  const updateEmailTemplate = (updatedElement) => {
    setEmailTemplate((prevItems) =>
      prevItems.map((layout) =>
        layout.id === selectedElement.layout.id
          ? { ...layout, [selectedElement.index]: updatedElement }
          : layout
      )
    );
  };

  // Generic handler for input changes
  const handleChange = (event) => {
    const { name, value, type } = event.target;
    const [key, subKey] = name.split('.'); // Handle nested properties like style.color

    setElementData((prevData) => {
      let newValue = type === 'number' ? parseFloat(value) : value;
      let updatedData;

      if (subKey) {
        // Handle nested properties (style, outerStyle)
        updatedData = {
          ...prevData,
          [key]: {
            ...prevData[key],
            [subKey]: newValue,
          },
        };
      } else {
        // Handle direct properties
        updatedData = {
          ...prevData,
          [name]: newValue,
        };
      }
      // Update the global state immediately on change
      updateEmailTemplate(updatedData);
      return updatedData;
    });
  };

  // Render specific settings based on element type
  const renderSettings = () => {
    if (!elementData) return null;

    const commonStyleFields = (styleObject, styleKey) => (
      <>
        <div className="grid grid-cols-2 gap-2 items-center">
          <Label htmlFor={`${styleKey}.backgroundColor`}>Background</Label>
          <ColorPicker name={`${styleKey}.backgroundColor`} value={styleObject?.backgroundColor} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-2 gap-2 items-center">
          <Label htmlFor={`${styleKey}.padding`}>Padding (px)</Label>
          <Input type="number" name={`${styleKey}.padding`} value={parseInt(styleObject?.padding) || 0} onChange={handleChange} />
        </div>
         {/* Add more common style fields here if needed */}
      </>
    );

     const commonOuterStyleFields = (outerStyleObject, outerStyleKey) => (
      <>
        <div className="grid grid-cols-2 gap-2 items-center">
          <Label htmlFor={`${outerStyleKey}.backgroundColor`}>Outer BG</Label>
          <ColorPicker name={`${outerStyleKey}.backgroundColor`} value={outerStyleObject?.backgroundColor} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-2 gap-2 items-center">
          <Label htmlFor={`${outerStyleKey}.width`}>Width (%)</Label>
          <Input type="text" name={`${outerStyleKey}.width`} value={outerStyleObject?.width || '100%'} onChange={handleChange} placeholder="e.g., 100% or 600px"/>
        </div>
         <div className="grid grid-cols-2 gap-2 items-center">
          <Label htmlFor={`${outerStyleKey}.display`}>Display</Label>
           <Select name={`${outerStyleKey}.display`} value={outerStyleObject?.display || 'block'} onValueChange={(value) => handleChange({ target: { name: `${outerStyleKey}.display`, value } })}>
            <SelectTrigger><SelectValue placeholder="Display" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="block">Block</SelectItem>
              <SelectItem value="flex">Flex</SelectItem>
              {/* Add other display options if needed */}
            </SelectContent>
          </Select>
        </div>
        {outerStyleObject?.display === 'flex' && (
          <>
            <div className="grid grid-cols-2 gap-2 items-center">
              <Label htmlFor={`${outerStyleKey}.justifyContent`}>Justify Content</Label>
              <Select name={`${outerStyleKey}.justifyContent`} value={outerStyleObject?.justifyContent || 'center'} onValueChange={(value) => handleChange({ target: { name: `${outerStyleKey}.justifyContent`, value } })}>
                <SelectTrigger><SelectValue placeholder="Justify" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="flex-start">Start</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="flex-end">End</SelectItem>
                  <SelectItem value="space-between">Space Between</SelectItem>
                  <SelectItem value="space-around">Space Around</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2 items-center">
              <Label htmlFor={`${outerStyleKey}.alignItems`}>Align Items</Label>
              <Select name={`${outerStyleKey}.alignItems`} value={outerStyleObject?.alignItems || 'center'} onValueChange={(value) => handleChange({ target: { name: `${outerStyleKey}.alignItems`, value } })}>
                <SelectTrigger><SelectValue placeholder="Align" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="flex-start">Start</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="flex-end">End</SelectItem>
                  <SelectItem value="stretch">Stretch</SelectItem>
                  <SelectItem value="baseline">Baseline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
         {/* Add more common outer style fields here */}
      </>
    );


    switch (elementData.type) {
      case "Button":
        return (
          <div className="space-y-3">
            <h3 className="font-semibold">Button Settings</h3>
            <div>
              <Label htmlFor="content">Text</Label>
              <Input name="content" value={elementData.content} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="url">URL</Label>
              <Input name="url" value={elementData.url} onChange={handleChange} />
            </div>
            <h4 className="font-medium text-sm mt-2">Button Styles</h4>
            <div className="grid grid-cols-2 gap-2 items-center">
              <Label htmlFor="style.textAlign">Text Align</Label>
              <Select name="style.textAlign" value={elementData.style?.textAlign} onValueChange={(value) => handleChange({ target: { name: 'style.textAlign', value } })}>
                <SelectTrigger><SelectValue placeholder="Align" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2 items-center">
              <Label htmlFor="style.color">Text Color</Label>
              <ColorPicker name="style.color" value={elementData.style?.color} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-2 gap-2 items-center">
              <Label htmlFor="style.fontSize">Font Size (px)</Label>
              <Input type="number" name="style.fontSize" value={parseInt(elementData.style?.fontSize) || 16} onChange={handleChange} />
            </div>
             <div className="grid grid-cols-2 gap-2 items-center">
              <Label htmlFor="style.fontWeight">Font Weight</Label>
              <Select name="style.fontWeight" value={elementData.style?.fontWeight || 'normal'} onValueChange={(value) => handleChange({ target: { name: 'style.fontWeight', value } })}>
                <SelectTrigger><SelectValue placeholder="Weight" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="bold">Bold</SelectItem>
                  <SelectItem value="lighter">Lighter</SelectItem>
                   {/* Add other weights if needed */}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2 items-center">
              <Label htmlFor="style.borderRadius">Border Radius (px)</Label>
              <Input type="number" name="style.borderRadius" value={parseInt(elementData.style?.borderRadius) || 0} onChange={handleChange} />
            </div>
            {commonStyleFields(elementData.style, 'style')}
             <h4 className="font-medium text-sm mt-2">Container Styles</h4>
            {commonOuterStyleFields(elementData.outerStyle, 'outerStyle')}
          </div>
        );
      case "Text":
        return (
          <div className="space-y-3">
            <h3 className="font-semibold">Text Settings</h3>
            <div>
              <Label htmlFor="textarea">Content</Label>
              <Textarea name="textarea" value={elementData.textarea} onChange={handleChange} />
            </div>
             <h4 className="font-medium text-sm mt-2">Text Styles</h4>
             <div className="grid grid-cols-2 gap-2 items-center">
              <Label htmlFor="style.color">Color</Label>
              <ColorPicker name="style.color" value={elementData.style?.color} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-2 gap-2 items-center">
              <Label htmlFor="style.textAlign">Align</Label>
              <Select name="style.textAlign" value={elementData.style?.textAlign} onValueChange={(value) => handleChange({ target: { name: 'style.textAlign', value } })}>
                <SelectTrigger><SelectValue placeholder="Align" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2 items-center">
              <Label htmlFor="style.fontSize">Font Size (px)</Label>
              <Input type="number" name="style.fontSize" value={parseInt(elementData.style?.fontSize) || 22} onChange={handleChange} />
            </div>
             <div className="grid grid-cols-2 gap-2 items-center">
              <Label htmlFor="style.fontWeight">Font Weight</Label>
              <Select name="style.fontWeight" value={elementData.style?.fontWeight || 'normal'} onValueChange={(value) => handleChange({ target: { name: 'style.fontWeight', value } })}>
                <SelectTrigger><SelectValue placeholder="Weight" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="bold">Bold</SelectItem>
                  <SelectItem value="lighter">Lighter</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="grid grid-cols-2 gap-2 items-center">
              <Label htmlFor="style.textTransform">Text Transform</Label>
              <Select name="style.textTransform" value={elementData.style?.textTransform || 'none'} onValueChange={(value) => handleChange({ target: { name: 'style.textTransform', value } })}>
                <SelectTrigger><SelectValue placeholder="Transform" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="uppercase">Uppercase</SelectItem>
                  <SelectItem value="lowercase">Lowercase</SelectItem>
                  <SelectItem value="capitalize">Capitalize</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {commonStyleFields(elementData.style, 'style')}
             <h4 className="font-medium text-sm mt-2">Container Styles</h4>
            {commonOuterStyleFields(elementData.outerStyle, 'outerStyle')}
          </div>
        );
      case "Image":
      case "Logo":
      case "LogoHeader":
         return (
          <div className="space-y-3">
            <h3 className="font-semibold">{elementData.type} Settings</h3>
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input name="imageUrl" value={elementData.imageUrl} onChange={handleChange} />
            </div>
             <div>
              <Label htmlFor="alt">Alt Text</Label>
              <Input name="alt" value={elementData.alt} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="url">Link URL</Label>
              <Input name="url" value={elementData.url} onChange={handleChange} />
            </div>
            <h4 className="font-medium text-sm mt-2">Image Styles</h4>
             <div className="grid grid-cols-2 gap-2 items-center">
              <Label htmlFor="style.width">Width (%)</Label>
              <Input type="text" name="style.width" value={elementData.style?.width || '100%'} onChange={handleChange} placeholder="e.g., 70% or 150px"/>
            </div>
             <div className="grid grid-cols-2 gap-2 items-center">
              <Label htmlFor="style.height">Height (%)</Label>
              <Input type="text" name="style.height" value={elementData.style?.height || 'auto'} onChange={handleChange} placeholder="e.g., 50% or 100px"/>
            </div>
             <div className="grid grid-cols-2 gap-2 items-center">
              <Label htmlFor="style.borderRadius">Border Radius (px)</Label>
              <Input type="number" name="style.borderRadius" value={parseInt(elementData.style?.borderRadius) || 0} onChange={handleChange} />
            </div>
            {commonStyleFields(elementData.style, 'style')}
             <h4 className="font-medium text-sm mt-2">Container Styles</h4>
            {commonOuterStyleFields(elementData.outerStyle, 'outerStyle')}
          </div>
        );
       case "Divider":
        return (
          <div className="space-y-3">
            <h3 className="font-semibold">Divider Settings</h3>
             <h4 className="font-medium text-sm mt-2">Divider Styles</h4>
             <div className="grid grid-cols-2 gap-2 items-center">
              <Label htmlFor="style.color">Color</Label>
              <ColorPicker name="style.color" value={elementData.style?.color} onChange={handleChange} />
            </div>
             <div className="grid grid-cols-2 gap-2 items-center">
              <Label htmlFor="style.width">Width (%)</Label>
              <Input type="text" name="style.width" value={elementData.style?.width || '100%'} onChange={handleChange} placeholder="e.g., 100% or 600px"/>
            </div>
             <div className="grid grid-cols-2 gap-2 items-center">
              <Label htmlFor="style.padding">Padding (Vertical px)</Label>
              <Input type="number" name="style.padding" value={parseInt(elementData.style?.padding) || 10} onChange={handleChange} />
            </div>
             {/* No outer style for divider typically */}
          </div>
        );
        case "SocialIcons":
          // TODO: Implement settings for Social Icons (add/remove icons, URLs, styles)
          return (
             <div className="space-y-3">
              <h3 className="font-semibold">Social Icons Settings</h3>
              <p className="text-sm text-gray-500">Social Icon settings not yet implemented.</p>
               {/* Add inputs for style.width, style.height, outerStyle.gap etc. */}
               {/* Add mechanism to edit individual icons (URL, link) */}
             </div>
          );
      default:
        return <p>Settings for {elementData.type} not implemented yet.</p>;
    }
  };

  return (
    <div className="p-4 border-l h-full overflow-y-auto bg-white">
      {selectedElement && elementData ? (
        renderSettings()
      ) : (
        <p className="text-center text-gray-500 mt-10">Select an element on the canvas to edit its settings.</p>
      )}
    </div>
  );
}


