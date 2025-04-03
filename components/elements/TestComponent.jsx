import React from "react";
export default function TextComponent({style,textarea}) {
  return (
    <div>
    <h2 style={style}>{textarea}</h2>
    </div>
  )
}

