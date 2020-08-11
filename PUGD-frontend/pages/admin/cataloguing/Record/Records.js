import React, {useState}  from 'react'
import AdminLayout from '../../../../components/adminLayout'
import {useLazyQuery} from "@apollo/react-hooks";
import Table from "../../../../components/ui/Table/Table";
import TextBox from "../../../../components/ui/TextBox";
import Button from "../../../../components/ui/Button";
import {GET_RECORD_ALL_FIELDS} from "../../../../graphql/queries/admin/cataloguing/RecordQuerie";
import Router from "next/router";
import Swal from 'sweetalert2'
import {DELETE_RECORD} from '../../../../graphql/mutations/admin/cataloguing/Record-mutation';
import {useMutation} from "@apollo/react-hooks";
const catalogingHome = () => {
    const [ISBN, setISBN] = useState('')
    const [findRecord, { loading, error, data }] = useLazyQuery(GET_RECORD_ALL_FIELDS);
    const [DeleteRecord] = useMutation(DELETE_RECORD);
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
                DeleteRecord({
                    variables: {
                        Id: id,
                    }
                });
              Swal.fire(
                'Deleted!',
                'This Record has been deleted.',
                'success'
              ).then((result) => {
                window.location.reload(true);

              })
            }
          })
        } 

    const onSearchHandler = (e) => {
        e.preventDefault();
        findRecord({
            variables: {
                ISBN: ISBN,
            }
        });
    }
    
            return (

            
                <div className="row">
                {/*=== get Groups initial pages */}

                <div className="col s12">
                <form>
                        <span>Search Record by ISBN</span>
                        <div className="row">
                        <div className="input-field col s8">
                            <TextBox label={"Search Record Of Document (ISBN) by name "}
                                     type="text"
                                     onChange={event => {setISBN(event.target.value)}}
                                     value={ISBN} 
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
                                href="AddRecords"
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
                                    <span>ISBN</span>
                                </th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>RecYear </th>
                                
                                <th>Action</th>
                                
                            </tr>
                        } Tbody={
                            (data != null || data !== undefined) && data.records.map((items) => (
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <a key={items.id} href={`"app-invoice-view.html"${items._id}`}>
                                            {items.ISBN}
                                        </a>
                                    </td>
                                    <td>
                                        <span className="chip lighten-5 red red-text">{items.Title}  </span>
                                    </td>
                                    <td>
                                        <span className="chip lighten-5 red red-text">{items.Responsibility[0].Author.name_auth}</span>
                                    </td>
                                   
                                    <td>
                                        <span className="chip lighten-5 red red-text">{items.RecYear}</span>
                                    </td>
                               

                                    <td>
                                        <div className="invoice-action">
                                            <a onClick={(e) => {Router.push("/admin/cataloguing/Record/DisplayRecord/[id]",
                                             "/admin/cataloguing/Record/DisplayRecord/" + items._id.split("\"")[1])}}  className="invoice-action-view mr-4">
                                                <i className="material-icons">remove_red_eye</i>
                                            </a>
                                            <a onClick={(e) =>{deleteAlert(items._id.split("\"")[1])}} className="invoice-action-view mr-4">
                                                <i className="material-icons">delete</i>
                                            </a>
                                            <a onClick={(e) => {Router.push("/admin/cataloguing/Record/UpdateRecord/[id]",
                                             "/admin/cataloguing/Record/UpdateRecord/" + items._id.split("\"")[1])}} 
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
