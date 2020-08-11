import React from 'react'

const Steeper = ({ children, ...props }) => {
    return (
            <ul {...props}>
                {children}
            </ul>
    )
}

export default Steeper
