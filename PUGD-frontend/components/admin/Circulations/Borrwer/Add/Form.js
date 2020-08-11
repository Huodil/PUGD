import React, {lazy} from "react";
import AdminLayout from "../../../../adminLayout";
import Button from "../../../../ui/Button";
import Left_Information from "./Left_Informatino";
import Right_Information from "./Right_Informations";
import {CHECK_CODE_BAR} from "../../../../../graphql/queries/admin/Ciruclation/Borrowers.query";
import {Query} from "@apollo/react-components";

export const MContext = React.createContext(); // exporting Context Object

/*const Left_Information = lazy(()=> { import Left_Information from "./Left_Informatino"; })*/
/*const Right_Information = lazy(()=> { import Right_Information from "./Right_Informations";"; })*/

const initialForm = {
    barcode:'',
    first_name:'',
    last_name:'',
    birth_day:'',
    phone_number:'',
    email:'',
    ru1:'',
    ru2:'',
    vill:'',
    contr:'',
    code_postal:'',
    username_opac:'',
    password_opac:'',
    lang_opac:'',
    communes:'',
    categories:'',
    group:'',
    message:'',
    comment:'',
}
class Form extends React.Component  {
   /* state = initialForm;*/
   /* onchange = (e) => {

        this.setState({
            [e.target.name] :  e.target.value,

        })

    }*/
    render() {

        /*<Query query={CHECK_CODE_BAR}>
            {({ loading, error, data }) => {
                if (loading) return "Loading...";
                if (error) return "`Error! ${error.message}\`";

                console.log(data)
                console.log(this.state.barcode)
                return (*/
        return <React.Fragment>

            <div className="section">
                <div id="work-collections">
                    <div className="row">



                        <Left_Information/>
                        <Right_Information/>

                        <div className="col s12 m12 l12">
                            <Button children="Send" className="float-right"/>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    }
}

Form.Layout = AdminLayout
export default Form