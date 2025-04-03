import React from "react";
export default function LogoComponent({style,imageUrl}) { // Removed outStyle from props
  return (
    <div> {/* Removed style={outStyle} */}
        <img src={imageUrl} alt='image' style={style}></img>
    </div>
  )
}

