import React, { useState } from 'react';

export default function State({ path, stateCode, onHover, fillIndex }) {
  return (
    <g
      id={`${stateCode}-group`}
      dangerouslySetInnerHTML={{ __html: path }}
      className={`state fill${fillIndex}`}
    ></g>
  );
}
