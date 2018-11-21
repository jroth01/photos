import React from 'react';

const NotFound = (props) => (
<div>
  <h1>404</h1>
  {props.resource ? <div>"{props.resource}" not found</div> : null}
</div>);

export default NotFound;