import React, {useState} from 'react'
import AdminLayout from '../../../../components/adminLayout'
import {useLazyQuery} from "@apollo/react-hooks";
import Table from "../../../../components/ui/Table/Table";
import TextBox from "../../../../components/ui/TextBox";
import Button from "../../../../components/ui/Button";
import Router from 'next/router';
import {GET_SERIAL_ALL_FIELDS} from "../../../../graphql/queries/admin/cataloguing/SerialQuerie";
import Swal from 'sweetalert2'
import {DELETE_SERIAL} from '../../../../graphql/mutations/admin/cataloguing/Serial-mutation';
import {useMutation} from "@apollo/react-hooks";
const catalogingHome = () => {
    const [ISSN, setISSN] = useState('');
    const [findSerial, { loading, error, data }] = useLazyQuery(GET_SERIAL_ALL_FIELDS);
    const [DeleteSerial] = useMutation(DELETE_SERIAL);
    
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    function deleteAlert(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                DeleteSerial({
                    variables: {
                        Id: id,
                    }
                });
              Swal.fire(
                'Deleted!',
                'This Serial has been deleted.',
                'success'
              ).then((result) => {
                window.location.reload(true);

              })
            }
          })
        }  
    
    const onSearchHandler = (e) => {
        e.preventDefault();
        findSerial({
            variables: {
                ISSN: ISSN,
            }
        });
    }

       

            
            
    
            return (

            
                <div className="row">
                {/*=== get Groups initial pages */}

                <div className="col s12">
                <form>
                        <span>Search Serial by ISSN</span>
                        <div className="row">
                        <div className="input-field col s8">
                            <TextBox label={"Search Of Document (Serial) by ISSN "}
                                     type="text"
                                     onChange={event => {setISSN(event.target.value)}}
                                     value={ISSN} 
                            />
                            </div>
                            <div className="input-field col s2">
                                <br />
                            <Button
                                onClick={onSearchHandler} 
                                rounded={4}>Search</Button></div>
                                <div className="input-field col s2">
                                <br />
                            <Button
                                href="AddSerial"
                                rounded={4}> Add</Button></div>
                         </div>
                    </form>
                         <Table Thead={
                            <tr>
                                {/*<!-- data table responsive icons --> */}
                                <th></th>
                                {/*<!-- data table checkbox -->*/}
                                <th></th>
                                <th>
                                    <span>ISSN</span>
                                </th>
                                <th>TitleProper</th>

                                <th>Author</th>
                                <th>RecYear</th>
                                
                                
                                
                                <th>Action</th>
                                
                            </tr>
                        } Tbody={
                            (data != null || data !== undefined) && data.serials.map((items) => (
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <a key={items.id} href={`"app-invoice-view.html"${items._id}`}>
                                            {items.ISSN}
                                        </a>
                                    </td>
                                    <td>
                                        <span className="chip lighten-5 red red-text">{items.TitleProper}  </span>
                                    </td>
                                    <td>
                                        <span className="chip lighten-5 red red-text">{items.Responsibility[0].Author.name_auth}</span>
                                    </td>
                                    <td>
                                        <span className="chip lighten-5 red red-text">{items.RecYear}</span>
                                    </td>
                                    
                              
                                
                                    <td>
                                        <div className="invoice-action">
                                            <a onClick={(e) => {Router.push("/admin/cataloguing/Serial/DisplaySerial/[id]",
                                             "/admin/cataloguing/Serial/DisplaySerial/" + items._id.split("\"")[1])}} 
                                             className="invoice-action-view mr-4">  
                                                <i className="material-icons">remove_red_eye</i>
                                            </a>
                                            <a onClick={(e) =>{deleteAlert(items._id.split("\"")[1])}} className="invoice-action-view mr-4">
                                                <i className="material-icons">delete</i>
                                            </a>
                                            <a onClick={(e) => {Router.push("/admin/cataloguing/Serial/UpdateSerial/[id]",
                                             "/admin/cataloguing/Serial/UpdateSerial/" + items._id.split("\"")[1])}} 
                                             className="invoice-action-edit"> <i className="material-icons">edit</i>
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            ))}


                        />


                        
                    </div>
                </div>
        
        );
    

  


}
catalogingHome.Layout = AdminLayout
export default catalogingHome
