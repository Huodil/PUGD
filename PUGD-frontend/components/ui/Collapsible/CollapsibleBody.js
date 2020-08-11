import React from 'react'

const CollapsibleBody = ({children, ...props}) => {
    return <div className="collapsible-body" {...props}>
        {children}
    </div>

}
export default CollapsibleBody;