import React from 'react'

const Alert = ({Message, Title}) => {

    return (
        <div className="card-alert card cyan lighten-5">
            <div className="card-content cyan-text darken-1">
                <span className="card-title cyan-text darken-1">{Title}</span>
                <p>{Message}</p>
            </div>
            <button type="button" className="close cyan-text" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">×</span>
            </button>
        </div>
    )
}

export default Alert


