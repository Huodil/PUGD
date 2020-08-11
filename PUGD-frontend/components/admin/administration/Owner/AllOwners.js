import React from "react";
import Table from "../../../ui/Table/Table";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import {DELETE_BORROWER} from "../../../../graphql/mutations/admin/circulation/Borrowers.mutation";
import {useMutation} from "@apollo/react-hooks";
import {DELETE_OWNER} from "../../../../graphql/mutations/admin/administartion/owen.mutation";


const AllOwners = ({refetch,...props}) => {
    // const { allPosts, _allPostsMeta } = data
    const [delate] = useMutation(DELETE_OWNER,{
        onCompleted: () => {
            refetch()
        }
    });
    return <React.Fragment>
        <ul id="issues-collection" className="collection z-depth-1 animate fadeUp">
            <li className="collection-item avatar">
                <i className="material-icons orange darken-4 circle">list</i>
                <h6 className="collection-header m-0">{props.title}</h6>
                <span>List Of Owner </span>
            </li>
            <div>
                <Table className="pt-0"
                    Thead={
                        <tr>
                            <th></th>
                            <th>Nome du propriétaire</th>
                            <th></th>
                            <th></th>
                        </tr>
                    }
                    Tbody={

                        props.owners && props.owners.map(owner => (
                            <tr>
                                <td></td>
                                <td key={owner._id}>
                                    {owner.owner_name}
                                </td>
                                <td>
                                    <a
                                        href={`/admin/administration/Owner/UpdateOwner?id=${(
                                            owner._id
                                        )}`}
                                        className="invoice-action-edit"
                                    >
                                        <i className="material-icons">edit</i>
                                    </a>
                                </td>
                                <td key={owner._id}>
                                <a
                                    href="#"
                                    className="invoice-action-view mr-4"
                                    onClick={(e) =>
                                        window.confirm("Are you sure you wish to delete this Borrower") &&
                                        // Router.push("/admin/circulation/Circulations/pret_document")&&
                                        delate({
                                            variables: { id: owner._id},

                                        })

                                    }
                                >
                                    <i className="material-icons">delete</i>
                                </a>
                                </td>
                            </tr>
                        ))
                    }
                />
            </div>
        </ul>
    </React.Fragment>
}
export default AllOwners