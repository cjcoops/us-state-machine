import React from 'react';

export default function State({ path, onClick, classes }) {
  return (
    <g
      dangerouslySetInnerHTML={{ __html: path }}
      className={`state ${classes}`}
      onClick={onClick}
    ></g>
  );
}
