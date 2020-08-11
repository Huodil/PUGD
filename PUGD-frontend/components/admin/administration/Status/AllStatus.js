import React from "react";
import Table from "../../../ui/Table/Table";
import {useMutation} from "@apollo/react-hooks";
import {DELATE_STATUS} from "../../../../graphql/mutations/admin/administartion/Statics.mutation";
import Link from "next/link";
import Button from "../../../ui/Button";


const AllStatus = ({refetch,...props}) => {
    const [delate] = useMutation(DELATE_STATUS,{
        onCompleted: () => {
            refetch()
        }
    });
    return <React.Fragment>
        <ul id="issues-collection" className="collection z-depth-1 animate fadeUp">
            <li className="collection-item avatar">
                <i className="material-icons orange darken-4 circle">list</i>
                <h6 className="collection-header m-0">{props.title}</h6>
                <span>
                    statuts la notion de statut est utilisée pour spécifier si le document peut être emprunté ou non
                </span>
                <Link href={{
                    pathname: '/admin/administration/Status/addStatus'
                }}>
                    <Button className="float-right" icon="add" rounded={4}
                    >Static</Button>
                </Link>

            </li>
            <div>
                <Table className="pt-0"
                    Thead={
                        <tr>
                            <th></th>
                            <th>
                                GESTION
                                    <td>Nome</td>
                                    <td>Can Borrowed</td>
                                    <td>Can Pret</td>
                                    <td>Codage import</td>
                                    <td>Propetaire Codage import</td>

                            </th>
                            <th>
                                OPAC
                                    <td>Label Opac</td>
                                    <td>Visible</td>
                            </th>
                            <th></th>
                        </tr>
                    }
                    Tbody={

                        props.status && props.status.map(item => (
                            <tr key={item._id}>
                                <td></td>
                                <td>
                                    <td>{item.status_name}</td>
                                    <td>{item.status_name}</td>
                                    <td>{item.status_name}</td>
                                    <td>{item.status_name}</td>
                                    <td>{item.status_name}</td>
                                </td>

                                <td >
                                    {item.label_opac}
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

export default AllStatus