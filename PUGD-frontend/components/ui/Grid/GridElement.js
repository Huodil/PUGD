import React, { useEffect, useState } from 'react'
const GridElement = ({ children, s, m, l, xl, ...props }) => {
    const [className, setClassName] = useState("");
    useEffect(() => {
        setClassName(`col ${s ? 's' + s : ""} ${m ? 'm' + m : ""} ${l ? 'l' + l : ""} ${xl ? 'xl' + xl : ""}`)
    }, [s, m, l, xl])
    return (
        <div className={className} {...props}>
            {children}
        </div>
    )
}
export default GridElement