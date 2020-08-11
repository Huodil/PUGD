import React from 'react'

const Card = ({ children, ...props }) => {
    return (
        <div className="card-body">

        <div className="card" {...props}>
            <div className="card-content">
            {children}
            </div>
        </div>
        </div>
    )
}

export default Card