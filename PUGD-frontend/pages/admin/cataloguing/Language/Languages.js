import React, {useState} from 'react'
import AdminLayout from '../../../../components/adminLayout'
import {useLazyQuery} from "@apollo/react-hooks";
import Table from "../../../../components/ui/Table/Table";
import TextBox from "../../../../components/ui/TextBox";
import Button from "../../../../components/ui/Button";
import Swal from 'sweetalert2'
import {GET_LANGUAGE_ALL_FIELDS} from "../../../../graphql/queries/admin/cataloguing/LanguageQuerie";
import Router from "next/router";
import {DELETE_LANGUAGE} from '../../../../graphql/mutations/admin/cataloguing/Language-mutation.js';
import {useMutation} from "@apollo/react-hooks";

const catalogingHome = () => {
    const [Value, setValue] = useState('')
    const [findLanguage, { loading, error, data }] = useLazyQuery(GET_LANGUAGE_ALL_FIELDS);
    const [DeleteLanguage] = useMutation(DELETE_LANGUAGE);
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
                
                DeleteLanguage({
                    variables: {
                        Id: id,
                    }
                });
              Swal.fire(
                'Deleted!',
                'your languague has been deleted.',
                'success'
              ).then((result) => {
                window.location.reload(false);

              })
            }
          })
        }   
    const onSearchHandler = (e) => {
        e.preventDefault();
        findLanguage({
            variables: {
                Value: Value,
            }
        });
    }
    
            return (

            
                <div className="row">
                {/*=== get Groups initial pages */}

                <div className="col s12">
                <form>
                        <span>Search Language by Value</span>
                        <div className="row">
                        <div className="input-field col s8">
                            <TextBox label={"Search Of Document (Language) by Value "}
                                     type="text"
                                     onChange={event => {setValue(event.target.value)}}
                                     value={Value} 
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
                                href="AddLanguage"
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
                                    <span>language</span>
                                </th>
                                
                                <th>Action</th>
                                
                            </tr>
                        } Tbody={
                            (data != null || data !== undefined) && data.languages.map((items) => (
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <a key={items.id} href={`"app-invoice-view.html"${items._id}`}>
                                            {items.Value}
                                        </a>
                                    </td>
                                    
                                    

                                    <td>
                                        <div className="invoice-action">
                                            
                                            <a onClick={(e) =>{deleteAlert(items._id.split("\"")[1])}} className="invoice-action-view mr-4">
                                                <i className="material-icons">delete</i>
                                            </a>
                                           
                                            <a onClick={(e) => {Router.push("/admin/cataloguing/Language/UpdateLanguage/[id]",
                                             "/admin/cataloguing/Language/UpdateLanguage/" + items._id.split("\"")[1])}} 
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
