import React from 'react'
import Card from '../../../ui/Card/Card'
import TextBox from "../../../ui/TextBox";
import Button from "../../../ui/Button";
import Router from "next/router";
import ReportingSideItems from "../../SidebarItems";
import {route} from "next/dist/next-server/server/router";
const ReportingHeader = ({ ReportingModule, children }) => {
    const module = Router.route.split('/')[2]
    //console.log("router : ",ReportingSideItems[module][1].Children[1].Label)

    //console.log("router : ",ReportingSideItems[module][1].Children.source)

    return (
        <React.Fragment>
            <Card>
                <div className="header-container card-content">
                    <i className="material-icons pink-text-blue" style={{ margin: "auto" }}>
                        fiber_manual_record
                    </i>
                    <h5 className="uk-icon"> Edition </h5>
                </div>
                {children}
            </Card>
            <style jsx>
                {`
                    .uk-icon { 
                        margin-left:5px;
                        display:inline-block;
                    } 
                    .header-container{
                        display: flex;
                        width: fit-content;
                    }
                `}
            </style>
        </React.Fragment>)
}
export default ReportingHeader
