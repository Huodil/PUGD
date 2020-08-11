import React from 'react'

const Input = ({label, helperText ,dataSuccessHelper, dataErrorHelper , value, icon, type = "text", ...props }) =>{
    const id = "input" + Math.floor(Math.random() * 100000)

    return (
        <React.Fragment>
            {icon && <i className="material-icons prefix pt-1">{icon}</i>}
            <input id={id} type={type} value={value}  {...props} />
            <label htmlFor={id} className={value !== "" ? "active" : ""}>{label}</label>
            <span className="helper-text" data-error={dataErrorHelper}
                  data-success={dataSuccessHelper}>
                {helperText}</span>
        </React.Fragment>

    )
}

export default Input