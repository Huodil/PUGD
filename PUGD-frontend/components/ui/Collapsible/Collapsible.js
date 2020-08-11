import React, { useRef, useEffect } from 'react'

const Collapsible = ({ children, ...props }) => {
    const collapsibleRef = useRef();
    useEffect(() => {
        var instances = M.Collapsible.init(collapsibleRef.current);

    }, [])

    return <ul className="collapsible" {...props} ref={collapsibleRef} >
        {children}
    </ul>
}
export default Collapsible;