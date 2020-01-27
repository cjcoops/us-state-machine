import React, { useState } from 'react';

export default function State({ path, stateCode, onClick, classes }) {
  console.log(classes);

  return (
    <g
      //   id={`${stateCode}-group`}
      dangerouslySetInnerHTML={{ __html: path }}
      className={`state ${classes}`}
      onClick={onClick}
    ></g>
  );
}
