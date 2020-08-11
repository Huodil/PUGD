import React from 'react'

const Circulation = ({ children }) => {

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col s12 m12 ">
                        {children}
                    </div>
                </div>
            </div>
        </React.Fragment>)
}
export default Circulation