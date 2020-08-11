import React,  {useState} from "react";
import Button from "../../../../../components/ui/Button";
import {useMutation, useQuery} from "@apollo/react-hooks";
import AdminLayout from '../../../../../components/adminLayout'
import Input from "../../../../../components/ui/Input";
import Radio from "../../../../../components/ui/Radio/Radio";
import Router from "next/router";
import {AllBorrowers} from "../../../../../graphql/queries/admin/Ciruclation/Borrowers.query";
import {INSERT_BORROWERS} from "../../../../../graphql/mutations/admin/circulation/Borrowers.mutation";


const Updating = () => {
    const {dataa} = useQuery(AllBorrowers);

    const [bar_code, setBar_code] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [gender, setGender] = useState('')
    const [phone_number, setPhone_number] = useState('')
    const [email, setEmail] = useState('')


    const [Insert] = useMutation(INSERT_BORROWERS, {
        onCompleted() {
            Router.push("/admin/circulation/Circulation/pret_document")
        }
    });
    const onSubmitHandler = () => {
        console.log(bar_code)
        console.log(first_name)
        console.log(last_name)
        console.log(phone_number)
        console.log( email)



        window.confirm("Are you sure you wish to add this Borrower") &&
        Insert({
            variables: {
                barcode: bar_code,
                first_name: first_name,
                last_name: last_name,
                gender: gender,
                phone_number: phone_number,
                email: email
            }
        });
    }

    return(
       <React.Fragment>
       <form>
           <div className="col s12 m12 l6">


               <ul id="projects-collection" className="collection z-depth-1 animate fadeLeft">
                   <li className="collection-item avatar">
                       <i className="material-icons cyan accent-5 circle">assignment_ind</i>
                       <h6 className="collection-header m-0">Principal Name</h6>
                       <p>Your information </p>
                   </li>
                   <li className="input-field col s6 ">
                   <Input
                       icon="credit_card"
                       label="BareCode"
                       type="Text"
                       required
                       className="validate"
                       onChange={e => setBar_code(e.target.value)}
                       value={bar_code}
                   />
                   </li>
                   <li className="input-field col s6 m12 ">

                       <Input
                           icon="account_circle"
                           label="First Name"
                           type="Text"
                           required
                           className="validate"
                           onChange={e => setFirst_name(e.target.value)}
                           value={first_name}
                       />


                   </li>
                   <div className="input-field col l12">
                       <Input
                           icon="account_circle"
                           label="Last Name"
                           type="Text"
                           required
                           className="validate"
                           onChange={e => setLast_name(e.target.value)}
                           value={last_name}
                       />

                   </div>

                       <div className="input-field col s12">
                           <Input
                               icon="email"
                               label="Email"
                               type="Text"
                               required
                               className="validate"
                               onChange={e => setEmail(e.target.value)}
                               value={email}
                           />

                       </div>

                           <div className="input-field col s12">
                               <Input
                                   icon="phone"
                                   label="Phone"
                                   type="Text"
                                   required
                                   className="validate"
                                   onChange={e => setPhone_number(e.target.value)}
                                   value={phone_number}
                               />

                           </div>
                   <div className="col s12 ">
                       <p>Gender</p>
                       <p><Radio group="Male" label="Male" children="gren"

                       /></p>
                       <p><Radio group="Female" label="Female" children="gren"/></p>
                   </div>






                   <div className="col mb-5  l12 m12 s12">

                   <Button onClick={onSubmitHandler} children="Send" className="float-right "/>

                   </div>

               </ul>
           </div>
       </form>
       </React.Fragment>


    )
    }


Updating.Layout = AdminLayout
export default Updating
