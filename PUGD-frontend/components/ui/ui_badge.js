

import React from 'react'

const BtnBadge = ({ children, className = "" }) => {
    return (
    <span className={`${className}`}
        style={{ "display": "nowrap", "background": "orange", "border-radius": "100px",

                 "width": "20px", "height": "20px", "line-height": "20px"}}>
        {children}
    </span>

    )
}

export default BtnBadge