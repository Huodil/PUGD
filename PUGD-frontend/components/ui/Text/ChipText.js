import React from "react";

const ChipText = ({ children,className,ligthen,color}) => {
    return <span className={`chip lighten-${ligthen} ${color}-text ${color} ${className}`}>
                {children}
            </span>

}
export default ChipText;
