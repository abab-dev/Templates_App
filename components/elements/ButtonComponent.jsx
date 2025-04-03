import React from "react";
export default function ButtonComponent({style,content,url}) {
  return (
    <div>
        <a href={url}>
    <button style={style}>{content}</button>
    </a>
    </div>
  )
}

