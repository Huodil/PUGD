import React from 'react'
const spanStyles = {
    bottom: 54,
    right: 100

};
const ButtonPopUp = ({hrf, icon, children, ...props }) => {

    return (
        <div style={spanStyles} className="fixed-action-btn direction-top" {...props}>
            <a className="btn-floating btn-large primary-text gradient-shadow
            compose-email-trigger
            waves-effect waves-block waves-light sidenav-trigger"
               data-target="slide-out-right" href={hrf}>
                <i className="material-icons">{icon}</i>
            </a>
        </div>
    )
};
export default ButtonPopUp

