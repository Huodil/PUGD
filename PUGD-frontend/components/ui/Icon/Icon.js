import React from 'react'

const Icon = ({ children,className="", ...props }) => {

    return (
        <i className={`material-icons ${className}`} {...props}>{children}</i>
    )
}

export default Icon