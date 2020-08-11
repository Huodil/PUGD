import React, {useState}  from 'react'
import AdminLayout from '../../../../components/adminLayout'
import {useLazyQuery} from "@apollo/react-hooks";
import Table from "../../../../components/ui/Table/Table";
import TextBox from "../../../../components/ui/TextBox";
import Button from "../../../../components/ui/Button";
import Router from 'next/router';
import {GET_COPY_ALL_FIELDS} from "../../../../graphql/queries/admin/cataloguing/CopyQuerie";
import Swal from 'sweetalert2'
import {DELETE_COPY} from '../../../../graphql/mutations/admin/cataloguing/Copy-mutation';
import {useMutation} from "@apollo/react-hooks";
const catalogingHome = () => {
    const [BareCode, setBareCode] = useState('')
    const [findCopy, { loading, error, data }] = useLazyQuery(GET_COPY_ALL_FIELDS);
    const [DeleteCopy] = useMutation(DELETE_COPY)
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
                DeleteCopy({
                    variables: {
                        Id: id,
                    }
                });
              Swal.fire(
                'Deleted!',
                'This copy has been deleted.',
                'success'
              ).then((result) => {
                window.location.reload(true);

              })
            }
          })
        }  


    const onSearchHandler = (e) => {
        e.preventDefault();
        findCopy({
            variables: {
                BareCode: BareCode,
            }
        });
    }

       

            
            
    
            return (

            
                <div className="row">
                {/*=== get Groups initial pages */}

                <div className="col s12">
                <form>
                        <span>Search Copy by Bare Code</span>
                        <div className="row">
                        <div className="input-field col s8">
                            <TextBox label={"Search Of Document (Copy) by Bare Code "}
                                     type="text"
                                     onChange={event => {setBareCode(event.target.value)}}
                                     value={BareCode} 
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
                                href="AddCopy"
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
                                    <span>Bare Code</span>
                                </th>
                                <th>Price</th>
                                <th>Cote</th>
                                <th>Record</th>
                                <th>Action</th>
                                
                            </tr>
                        } Tbody={
                            
                            (data != null || data !== undefined) && data.copies.map((items) => (
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>
                                       
                                            {items.BareCode}
                                        
                                    </td>
                                    
                                    <td>
                                        <span className="chip lighten-5 red red-text">{items.Price}  </span>
                                    </td>
                                    <td>
                                        <span className="chip lighten-5 red red-text">{items.Cote}  </span>
                                    </td>
                                    <td>
                                        <span className="chip lighten-5 red red-text">{items.Record.ISBN}  </span>
                                    </td>
                     
                                    <td>
                                        <div className="invoice-action">
                                            <a onClick={(e) => {Router.push("/admin/cataloguing/Copy/DisplayCopy/[id]",
                                             "/admin/cataloguing/Copy/DisplayCopy/" + items._id.split("\"")[1])}}  className="invoice-action-view mr-4">
                                                <i className="material-icons">remove_red_eye</i>
                                            </a>
                                            <a onClick={(e) =>{deleteAlert(items._id.split("\"")[1])}} className="invoice-action-view mr-4">
                                                <i className="material-icons">delete</i>
                                            </a>
                                            <a onClick={(e) => {Router.push("/admin/cataloguing/Copy/UpdateCopy/[id]",
                                             "/admin/cataloguing/Copy/UpdateCopy/" + items._id.split("\"")[1])}} 
                                             className="invoice-action-edit"> <i className="material-icons">edit</i>
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            ))


                           
                        }/>


                        
                    </div>
                </div>
        
        );
    

  
}


catalogingHome.Layout = AdminLayout
export default catalogingHome
