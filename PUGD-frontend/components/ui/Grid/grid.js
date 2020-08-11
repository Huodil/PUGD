import React from 'react'

const Grid = ({ children, ...props }) => {

    return (

        <div className="row" {...props}>
            {children}
        </div>
    )
}

export default Grid