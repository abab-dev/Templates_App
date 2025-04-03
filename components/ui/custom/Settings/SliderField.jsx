import React from "react";
import { Slider } from "../../slider";
export default function SliderField({ label, value, onHandleStyleChange, type = 'px' }) {
  const formattedValue = (value_) => {
    return Number(value_?.toString().replace(type, ''))
  }
  return (
    <div>

      <label>{label} ({value})</label>
      <Slider defaultValue={[formattedValue(value)]} step={1} max={100}
        onValueChange={(v) => onHandleStyleChange(v + type)}></Slider>
    </div>
  )
}




