import React, {useEffect, useState} from "react";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import {useRouter} from "next/router";
import AdminLayout from "../../../../components/adminLayout";
import SidebarItems from "../../../../components/admin/SidebarItems";
import Link from "next/link";
import client from "apollo-client/ApolloClient";
import {GET_ONE_OWNER} from "../../../../graphql/queries/admin/administration/OwnerQuerie";
import {func} from "prop-types";
import {useQuery} from "@apollo/react-hooks";

const UpdateOwner = ({refetch, ...props}) => {

    const router = useRouter()
    const _id = router.query.id;

    console.log(_id);
    const {data ,error } = useQuery(GET_ONE_OWNER,{
        variables: { id :_id}
    });
    console.log("vdata :", data)

    console.log(data && data.GetOneOwner !== undefined ? data && data.GetOneOwner.owner_name : "")

    const [name, setName] = useState(data && data.GetOneOwner !== undefined ? data && data.GetOneOwner.owner_name : "")
    const [err] = useState("can't is null")

    const onSubmit = () => {

        console.log(_id)
        console.log(name)
    }
    return <React.Fragment>
        <ul id="issues-collection" className="collection z-depth-1 animate fadeUp">
            <li className="collection-item avatar">
                <i className="material-icons teal darken-4 circle">brush</i>
                <h6 className="collection-header m-0">Update Owner</h6>
                <span>Update existing Owner </span>
            </li>

            <li className="input-field col l6">
                <Input
                    icon="home"
                    className="validate" required
                    label="Add Owner"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    dataErrorHelper={err}
                />
            </li>
            <li className=" input-field col l6">
                <Link href={{
                    pathname: '/admin/administration/Owner'
                }}>
                    <Button icon="arrow_back" rounded={4}
                    >Cancal</Button>
                </Link>
                <Button onClick={onSubmit} icon="send" rounded={4}>Update</Button>
            </li>

        </ul>

    </React.Fragment>
}
AdminLayout.SidebarItems = SidebarItems
UpdateOwner.Layout = AdminLayout
export default UpdateOwner