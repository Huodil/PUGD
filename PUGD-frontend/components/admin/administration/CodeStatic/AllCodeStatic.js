import React from "react";
import Link from "next/link";
import Button from "../../../ui/Button";
import Table from "../../../ui/Table/Table";
import {useMutation} from "@apollo/react-hooks";
import {DELETE_OWNER} from "../../../../graphql/mutations/admin/administartion/owen.mutation";
import {DELATE_CODE_STATUS} from "../../../../graphql/mutations/admin/administartion/codeStatic.mutations";


const AllCodeStatic = ({refetch,...props}) => {

    const [delate] = useMutation(DELATE_CODE_STATUS,{
        onCompleted: () => {
            refetch()
        }
    });

    return <React.Fragment>
        <ul id="issues-collection" className="collection z-depth-1 animate fadeUp " style={{minHeight:"188px"}}>
            <li className="collection-item avatar m12 l6">

                <i className="material-icons orange darken-4 circle">list</i>
                <h6 className="collection-header m-0">{props.title}</h6>
                <span>List Of Code Statics </span>

                {/*<Link href={{
                    pathname: '/admin/administration/MediaTypes/add'
                }}>
                    <Button className="float-right" icon="add" rounded={4}
                    >Code Static</Button>
                </Link>*/}

            </li>
            <div >
                <Table className="pt-0"
                    Thead={
                        <tr>
                            <th></th>
                            <th>Nome</th>
                            <th></th>
                            <th></th>
                        </tr>
                    }
                    Tbody={

                        props.codes && props.codes.map(item => (
                            <tr>
                                <td></td>
                                <td key={item._id}>
                                    {item.static_name}
                                </td>
                                <td>
                                    <a
                                        /* href={`/admin/circulation/Circulations/pretDoc/UpdateBorrowers?id=${(
                                             owner._id
                                         )}`}*/
                                        className="invoice-action-edit"
                                    >
                                        <i className="material-icons">edit</i>
                                    </a>
                                </td>
                                <td key={item._id}>
                                    <a
                                        href="#"
                                        className="invoice-action-view mr-4"
                                        onClick={(e) =>
                                            window.confirm("Are you sure you wish to delete this Borrower") &&
                                            // Router.push("/admin/circulation/Circulations/pret_document")&&
                                            delate({
                                                variables: {id: item._id},

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

export default AllCodeStatic