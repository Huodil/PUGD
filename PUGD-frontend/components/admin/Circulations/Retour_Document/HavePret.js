import React from "react";

const HavePret = ({ children,color,text,...props }) => {
    return <React.Fragment>
        <span  className={`chip ${color} ${text} white-text darken-1 float-right`}
               //style={{color:'#d60e28'teal}}
        >
            <b>{children}</b>
        </span>
    </React.Fragment>
}
export default HavePret