import React from "react";

const ButtonSubmit = ({ children, className, ...props }) => {
  return (
    <div>
      <br></br>
      <button className={className} {...props}>
        {children}
      </button>
      <br></br>
      <br></br>
    </div>
  );
};

export default ButtonSubmit;
