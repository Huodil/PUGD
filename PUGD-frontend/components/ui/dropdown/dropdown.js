import React from 'react';
const DropDown = (children,...props) => {
  return (
    <ul {...props}>
    {children}
  </ul>
         
  )
}
export default DropDown