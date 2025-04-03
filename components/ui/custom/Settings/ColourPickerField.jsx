import React from "react";
import { Input } from "../../input";
export default function ColourPickerField({ label, value, onHandleStyleChange }) {
  return (
    <div>
      <label>{label}</label>
      <Input type="color" value={value}
        onChange={(e) => onHandleStyleChange(e.target.value)}></Input>
    </div >
  )
}

