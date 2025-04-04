import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function CaseSwitchingField({ label, value, onHandleStyleChange }) {
  const handleChange = (newValue) => {
    onHandleStyleChange(newValue === 'uppercase' ? 'uppercase' : 'normal');
  };

  return (
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
      <ToggleGroup type="single" value={value === 'uppercase' ? 'uppercase' : 'normal'} onValueChange={handleChange}>
        <ToggleGroupItem value="normal" aria-label="Normal Case">
          Normal
        </ToggleGroupItem>
        <ToggleGroupItem value="uppercase" aria-label="Uppercase">
          Uppercase
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
