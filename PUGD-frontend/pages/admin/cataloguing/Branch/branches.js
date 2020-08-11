import React, {useState} from 'react'
import AdminLayout from '../../../../components/adminLayout'
import {useLazyQuery} from "@apollo/react-hooks";
import Table from "../../../../components/ui/Table/Table";
import TextBox from "../../../../components/ui/TextBox";
import Button from "../../../../components/ui/Button";
import Swal from 'sweetalert2'
import {GET_BRANCH_ALL_FIELDS} from "../../../../graphql/queries/admin/cataloguing/BranchQuerie";
import Router from 'next/router';
import {DELETE_BRANCH} from '../../../../graphql/mutations/admin/cataloguing/Branch-mutation.js';
import {useMutation} from "@apollo/react-hooks";
import i18next from '../../../../components/admin/localisation/i18nextInit';
import { useTranslation } from 'react-i18next';
const catalogingHome = () => {
    const [BranchName, setBranchName] = useState('')
    const [findBranchName, { loading, error, data }] = useLazyQuery(GET_BRANCH_ALL_FIELDS);
    const [DeleteBranch] = useMutation(DELETE_BRANCH);
    const { t, i18n } = useTranslation();
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
                
                DeleteBranch({
                    variables: {
                        Id: id,
                    }
                });
              Swal.fire(
                'Deleted!',
                'Your branch has been deleted.',
                'success'
              ).then((result) => {
                window.location.reload(false);

              })
            }
          })
        }  

    const onSearchHandler = (e) => {
        e.preventDefault();
        findBranchName({
            variables: {
                BranchName: BranchName,
            }
        });
    }

            return (

            
                <div className="row">
                {/*=== get Groups initial pages */}

                <div className="col s12">
                <form>
                        <span>{t("Allbranches_Header")}</span>
                        <div className="row">
                        <div className="input-field col s8">
                            <TextBox label={"Search Copies Of Document (Branch) by name "}
                                     type="text"
                                     onChange={event => {setBranchName(event.target.value)}}
                                     value={BranchName} 
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
                                href="AddBranch"
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
                                    <span>Branch Name</span>
                                </th>
                                <th>Address</th>
                                <th>Branch Fax</th>
                                <th>Branch Phone</th>
                                <th>Library</th>
                                
                                <th>Action</th>
                                
                            </tr>
                        } Tbody={
                            (data != null || data !== undefined) && data.branches.map((items) => (
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <a key={items.id} href={`"app-invoice-view.html"${items._id}`}>
                                            {items.BranchName}
                                        </a>
                                    </td>
                                    <td>
                                        <span className="chip lighten-5 red red-text">{items.BranchZip} {items.BranchCity}
                                        {items.BranchState} {items.BranchCountry} </span>
                                    </td>
                                    <td>
                                        <span className="chip lighten-5 red red-text">{items.BranchFax}</span>
                                    </td>
                                    <td>
                                        <span className="chip lighten-5 red red-text">{items.BranchPhone}</span>
                                    </td>
                                    <td>
                                        <span className="chip lighten-5 red red-text">{items.Library.Name}</span>
                                    </td>
                                   
                                   

                                    <td>
                                        <div className="invoice-action">
                                       
                                            
                                            <a onClick={(e) =>{deleteAlert(items._id.split("\"")[1])}} className="invoice-action-view mr-4">
                                                <i className="material-icons">delete</i>
                                            </a>
                                            <a onClick={(e) => {Router.push("/admin/cataloguing/Branch/UpdateBranch/[id]",
                                             "/admin/cataloguing/Branch/UpdateBranch/" + items._id.split("\"")[1])}} 
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
