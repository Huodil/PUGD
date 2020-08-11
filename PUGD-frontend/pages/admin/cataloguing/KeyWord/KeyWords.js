import React, {useState} from 'react'
import AdminLayout from '../../../../components/adminLayout'
import {useLazyQuery} from "@apollo/react-hooks";
import Table from "../../../../components/ui/Table/Table";
import TextBox from "../../../../components/ui/TextBox";
import Button from "../../../../components/ui/Button";
import {GET_KEYWORD_ALL_FIELDS} from "../../../../graphql/queries/admin/cataloguing/KeyWordQuerie";
import Swal from 'sweetalert2'
import {DELETE_KEYWORD} from '../../../../graphql/mutations/admin/cataloguing/KeyWord-mutation';
import Router from "next/router";
import {useMutation} from "@apollo/react-hooks";
const catalogingHome = () => {
    const [Word, setWord] = useState('')
    const [findKeyWord, { loading, error, data }] = useLazyQuery(GET_KEYWORD_ALL_FIELDS);
    const [DeleteKeyword] = useMutation(DELETE_KEYWORD);
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
                DeleteKeyword({
                    variables: {
                        Id: id,
                    }
                });
              Swal.fire(
                'Deleted!',
                'This Keyword has been deleted.',
                'success'
              ).then((result) => {
                window.location.reload(true);

              })
            }
          })
        }  


            
    const onSearchHandler = (e) => {
        e.preventDefault();
        findKeyWord({
            variables: {
                Word: Word,
            }
        });
    }

    
            return (

            
                <div className="row">
                {/*=== get Groups initial pages */}

                <div className="col s12">
                <form>
                        <span>Search Key Word by Name</span>
                        <div className="row">
                        <div className="input-field col s8">
                            <TextBox label={"Search Of Document (Key Word ) by Name "}
                                     type="text"
                                     onChange={event => {setWord(event.target.value)}}
                                     value={Word} 
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
                                href="AddKeyWord"
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
                                    <span>The KeyWord</span>
                                </th>
                                <th>Language</th>
                                <th>Action</th>
                                
                            </tr>
                        } Tbody=
                            {(data != null || data !== undefined) && data.keywords.map((items) => (
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <a key={items.id} href={`"app-invoice-view.html"${items._id}`}>
                                            {items.Word}
                                        </a>
                                    </td>
                                    <td>
                                        <span className="chip lighten-5 red red-text">{items.Lang}</span>
                                    </td>
                                    
                                    

                                    <td>
                                        <div className="invoice-action">
                                            
                                            <a onClick={(e) =>{deleteAlert(items._id.split("\"")[1])}} className="invoice-action-view mr-4">
                                                <i className="material-icons">delete</i>
                                            </a>
                                            <a onClick={(e) => {Router.push("/admin/cataloguing/KeyWord/UpdateKeyWord/[id]",
                                             "/admin/cataloguing/KeyWord/UpdateKeyWord/" + items._id.split("\"")[1])}} 
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
