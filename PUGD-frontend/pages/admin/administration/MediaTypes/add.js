import React from 'react';
import AdminLayout from "../../../../components/adminLayout";
import SidebarItems from "../../../../components/admin/SidebarItems";
import Header from "../../../../components/admin/administration/shared/Header";
import Structure from "../../../../components/admin/administration/shared/structrePage";
import {useQuery} from "@apollo/react-hooks";
import {GET_MEDIATYPES} from "../../../../graphql/queries/admin/administration/MediatypeQuerie";
import AllMediaTypes from "../../../../components/admin/administration/MediaTypes/AllMediaTypes";
import AddMediaTypes from "../../../../components/admin/administration/MediaTypes/AddMediaTypes";


const add = () => {

    return <React.Fragment>
        <Structure>
            <Header title={"add MediaTypes"}/>
            <AddMediaTypes/>
        </Structure>
    </React.Fragment>
}

AdminLayout.SidebarItems = SidebarItems
add.Layout = AdminLayout

export default add