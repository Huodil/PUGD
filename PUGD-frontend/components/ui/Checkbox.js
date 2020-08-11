import React from 'react'

const Checkbox = ({ label, ...props }) => {
    return (
        <label>
            <input type="checkbox" {...props }/>
            <span>{label}</span>
        </label>
    )
}

export default Checkbox

