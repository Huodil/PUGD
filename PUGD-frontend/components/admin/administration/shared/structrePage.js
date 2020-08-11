import React from "react";

const Structure = ({ children }) => {

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col s12 m12 l12">
                        {children}
                    </div>
                </div>
            </div>
        </React.Fragment>)
}
export default Structure