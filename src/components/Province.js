import React from 'react';

export default function Province({ path, onClick, provinceClass }) {
  return (
    <g
      dangerouslySetInnerHTML={{ __html: path }}
      className={`province ${provinceClass}`}
      onClick={onClick}
    ></g>
  );
}
