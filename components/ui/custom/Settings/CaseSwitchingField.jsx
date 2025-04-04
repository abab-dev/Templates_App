import React from "react";
import { Switch } from "@/components/ui/switch";

export default function CaseSwitchingField({ label, value, onHandleStyleChange }) {
  const handleChange = (e) => {
    onHandleStyleChange(e.target.checked ? 'uppercase' : 'normal');
  };

  return (
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
      <Switch
        id="case-switch"
        checked={value === 'uppercase'}
        onCheckedChange={handleChange}
      />
    </div>
  );
}
