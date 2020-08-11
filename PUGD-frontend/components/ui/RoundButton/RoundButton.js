import React from 'react'

const RoundButton = ({ children, icon, size, ...props }) => {

    return (
        <a className="btn-floating waves-effect waves-light purple lightrn-1"      {...props}
            style={{ height: `${size}px`, margin: "auto 5px", width: `${size}px` }}
       
        >
            <i className="material-icons"
                style={{ lineHeight: `${size}px` }}>{icon}</i>
        </a>
    )
}

export default RoundButton