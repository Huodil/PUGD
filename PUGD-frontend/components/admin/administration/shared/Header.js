import React from "react";
import Card from "../../../ui/card/card";
import Structure from "./structrePage";


const Header = ({title}) => {
    return <React.Fragment>
        <Card>
            <div className="header-container">
                <i className="material-icons amber-text " style={{margin: "auto"}}>
                    fiber_manual_record
                </i>
                <h6 className="uk-icon">{title}</h6>
            </div>
        </Card>

        <style jsx>
            {`
                .uk-icon { 
                    margin-left:10px;
                display:inline-block;
                } 
                .header-container{
                    display: flex;
                width: fit-content;
                }
            `}
        </style>
    </React.Fragment>
}
export default Header