import { Input } from "../../input";
import React from "react";
export default function InputStyleField({ label, value, onHandleStyleChange }) {
  const formattedValue = (value_) => {
    return Number(value_?.toString().replace('px', ''))
  }
  return (
    <div>
      <div>
        <label>{label}</label>
      </div>
      <div className='flex'>
        <Input type={"text"} value={formattedValue(value)} onChange={(event) => onHandleStyleChange(event.target.value+'px')} />
        <h2 className="p-1 bg-gray-100 rounded-r-lg -ml-2">px</h2>
      </div> </div>
  )
}



