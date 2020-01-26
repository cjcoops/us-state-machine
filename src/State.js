import React, { useState } from 'react';

export default function State({ path, state, onHover, fillIndex }) {
  const [style, setStyle] = useState();

  const handleMouseEnter = event => {
    const { x, y, height, width } = event.target.getBBox();
    const centerX = x + width / 2;
    const centerY = y + height / 2;

    const scale = 1;

    const translateX = (1 - scale) * centerX;
    const translateY = (1 - scale) * centerY;

    // setStyle({
    //   //   fill: 'red',
    //   transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`
    // });

    onHover();
  };

  const handleMouseLeave = event => {
    // setStyle({});
  };

  return (
    <g
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={style}
      id={`${state}-group`}
      dangerouslySetInnerHTML={{ __html: path }}
      className={`fill${fillIndex}`}
    ></g>
  );
}
