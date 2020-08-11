import React from 'react'

const TextArea = ({ label, value, text, ...props }) => {
    const id = "id"+Math.random()*10000;
    return (
        <div className="row">
            <div className="input-field col s12">
                <textarea id={id} value={value} className="materialize-textarea" {...props }>{text}</textarea>
                <label htmlFor={id} className={value !== "" ? "active" : ""}>{label}</label>
            </div>
        </div>
    )
}

export default TextArea

