import React from 'react';

const Heading = ({title, children}) => (
  <div>
    <h1 style={{margin:0}}>{title}</h1>
    {children}
  </div>
)

export default Heading;