import React from "react";


const Numbers = ({ persone }) => {
    return <React.Fragment>
        {
            persone.map((perone,i) =>(
                <div key={i}>
                    <li>
                        {persone.name} &nbsp; <span>{persone.number}</span>
                    </li>
                </div>
            ))
        }
    </React.Fragment>
}

export default Numbers