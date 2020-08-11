
import React from 'react'
const errorPage = () => {
    return (
        <div style={{
            display: "inline-block",
            height: "100%",
            width: "100%",
            textAlign: "center"
        }}>
            <img src="/404.svg" width="75%" style={{
                textAlign: "center"
            }} />
            <h5>Page not Found </h5>
        </div>)
}
export default errorPage