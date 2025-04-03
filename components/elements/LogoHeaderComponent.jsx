import React from "react";

export default function LogoHeaderComponent({ style, imageUrl, outStyle }) {
  return (
    <div style={outStyle}>
      <img src={imageUrl} alt="logo" style={style} />
    </div>
  );
}
