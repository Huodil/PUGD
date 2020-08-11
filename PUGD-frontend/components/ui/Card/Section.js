
import React from 'react'

const Section = ({children}) => {
    return (
        <div className="section">
            <div id="work-collections">
                <div className="row">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Section