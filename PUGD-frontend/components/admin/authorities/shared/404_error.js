import React from "react"
const error_404 = ( {Text}) => {
    return (
        <div style={{
            display: "inline-block",
            height: "100%",
            width: "100%",
            textAlign: "center"
        }}>
            <img src="/404.svg" width="150px" style={{
                textAlign: "center"
            }} />
            <h6>{Text}</h6>
        </div>)
}
export default error_404