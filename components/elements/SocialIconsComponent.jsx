import React from "react";

export default function SocialIconsComponent({ socialIcons, style, outerStyle }) {
  return (
    <div style={outerStyle}>
      {socialIcons?.map((icon, index) => (
        <a key={index} href={icon.url}>
          <img src={icon.icon} alt="social icon" style={style} />
        </a>
      ))}
    </div>
  );
}
