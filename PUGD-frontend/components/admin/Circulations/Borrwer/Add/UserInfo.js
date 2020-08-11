import AdminLayout from "../../../../adminLayout";
import React from "react";
import Checkbox from "../../../../ui/Checkbox";
import Button from "../../../../ui/Button";
import SelectBox from "../../../../ui/SelectBox";
import Address from "./Right_Informations";
import Principal_Informatino from "./Left_Informatino";

class UserInfo extends React.Component  {


    render() {
        return <React.Fragment>
            <ul id="projects-collection" className="collection z-depth-1 animate fadeLeft">
                <li className="collection-item avatar">
                    <i className="material-icons cyan accent-5 circle">assignment_ind</i>
                    <h6 className="collection-header m-0">Principal Name</h6>
                    <p>Your information </p>
                </li>
                <li className="input-field col s6">
                    <i className="material-icons prefix">account_circle</i>
                    <input id="first_name" type="text" className="validate"/>
                    <label htmlFor="first_name">First Name</label>
                </li>
                <div className="input-field col s6">
                    <input id="last_name" type="text" className="validate"/>
                    <label htmlFor="last_name">Last Name</label>
                </div>


                <div className="input-field col s12 ">
                    <i className="material-icons prefix">today</i>
                    <input id="date" type="text" className="validate"/>
                    <label htmlFor="date">Date Brith day</label>
                </div>

                <div className=" col s12 ">
                    <p>Gender</p>

                </div>


            </ul>
        </React.Fragment>
    }
}

UserInfo.Layout = AdminLayout
export default UserInfo