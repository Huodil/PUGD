import React from "react";
import Input from "../../../../../components/ui/Input";


const Filters = ({value,handlerChange}) =>{
    return <React.Fragment>

        <div>
            <span>filter :</span>
            <Input value={value} onChange={handlerChange}/>
        </div>
    </React.Fragment>
}

export default Filters