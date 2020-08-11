import React from "react"
const noData = () => {
    return (
        <div style={{
            display: "inline-block",
            // height: "100%",
             width: "100%",
            textAlign: "center"
        }}>
            <img src="/no_data.svg" height="150px" />
            <h6>No data matched the search terms </h6>
        </div>)
}
export default noData