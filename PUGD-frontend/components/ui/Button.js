import React, {Component} from 'react'

class Button extends Component {

    render() {
        const {children, icon="", className = "", rounded = "", fullwidth = "", ...props} = this.props
        return (
            <a className={`waves-effect waves-light btn mb-1 mr-1 ${className} ${rounded && "border-round"}${fullwidth && "col s12"}`}
               {...props}
            >
                <i className="material-icons left">{icon}</i>
                {children}
            </a>


        )
    }
}

export default Button