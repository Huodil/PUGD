import React from "react";
import Table from "../../../ui/Table/Table";
import Button from "../../../ui/Button";

import {useMutation} from "@apollo/react-hooks";
import {DELETE_MEDIATYPES} from "../../../../graphql/mutations/admin/administartion/mediaTypes.mutation";
import Link from "next/link";


const AllMediaTypes = ({refetch, ...props}) => {
    const [delate] = useMutation(DELETE_MEDIATYPES, {
        onCompleted: () => {
            refetch()
        }
    });
    return <React.Fragment>
        <ul id="issues-collection" className="collection z-depth-1 animate fadeUp">
            <li className="collection-item avatar m12 l6">

                <i className="material-icons orange darken-4 circle">list</i>
                <h6 className="collection-header m-0">{props.title}</h6>
                <span>List Of Owner </span>

                <Link href={{
                    pathname: '/admin/administration/MediaTypes/add'
                }}>
                    <Button className="float-right" icon="add" rounded={4}
                    >Media Types</Button>
                </Link>

            </li>
        <div>
            <Table className="pt-0"
                Thead={
                    <tr>
                        <th></th>
                        <th>Nome</th>
                        <th>Preiode de Pret</th>
                        <th>Preiode de Reservation</th>
                        <th>Code Owner</th>
                        <th>import code</th>
                        <th></th>
                        <th></th>
                    </tr>
                }
                Tbody={

                    props.mediaTypes && props.mediaTypes.map(item => (
                        <tr key={item._id}>
                            <td></td>
                            <td>
                                {item.media_types_name}
                            </td>
                            <td>
                                {item.dure_pret}
                            </td>
                            <td>
                                {item.dure_reservation}
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
                            <td>
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
export default AllMediaTypes