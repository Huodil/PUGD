import React from 'react'

const Radio = ({ children,label,group, ...props }) => {

    return (
        <label>
            <input name={`${group}`} type="radio" {...props }/>
            <span>{label}</span>
        </label>
    )
}

export default Radio