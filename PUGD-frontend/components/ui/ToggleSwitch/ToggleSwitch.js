import React from 'react'

const ToggleSwitch =
    ({ prefix, colorSufix, sufix,sufixActive, sufixDesactive, label, type = "checkbox", ...props }) => {

        return (
        <React.Fragment>
            {
                    <div className="switch" {...props}>
                        <span>{label}</span>
                        <label>
                            {prefix}<input type={type} {...props} />
                            <span className="lever"/>
                            <label style={{color: colorSufix === true ? '#d60e28' : '#707587'  }}>
                                {colorSufix === true ? sufix+sufixActive : sufix+sufixDesactive }
                            </label>
                        </label>
                    </div>
            }


        </React.Fragment>

    )
}
export default ToggleSwitch
