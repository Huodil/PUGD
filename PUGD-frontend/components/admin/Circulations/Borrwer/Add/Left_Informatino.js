import AdminLayout from "../../../../adminLayout";
import React from "react";
import Checkbox from "../../../../ui/Checkbox";
import Button from "../../../../ui/Button";
import SelectBox from "../../../../ui/SelectBox";
import UserInfo from "./UserInfo";
import Contact from "./Contact_Info";
import SendMessage from "./SendMessage";
import Address from "./Address";
import {SecurityInfo} from "./Security";

const Left_Information = () =>  {
        return <React.Fragment>
            <div className="col s12 m12 l6">

                <SecurityInfo/>
                <UserInfo/>
                <Contact/>
                <Address/>

            </div>

        </React.Fragment>
}
Left_Information.Layout = AdminLayout
export default Left_Information