import React from 'react';
import AdminLayout from "../../../../components/adminLayout";
import SidebarItems from "../../../../components/admin/SidebarItems";
import Header from "../../../../components/admin/administration/shared/Header";
import Structure from "../../../../components/admin/administration/shared/structrePage";
import {useQuery} from "@apollo/react-hooks";
import {GET_MEDIATYPES} from "../../../../graphql/queries/admin/administration/MediatypeQuerie";
import AllMediaTypes from "../../../../components/admin/administration/MediaTypes/AllMediaTypes";


const index = () => {
    const {err, data, refetch} = useQuery(GET_MEDIATYPES)
    console.log("data : ", data)
    return <React.Fragment>
        <Structure>
            <Header title={"Owner"}/>
            <AllMediaTypes
                mediaTypes={data && data.GetAllMediaTypes} title={"List Owner"}
                refetch={refetch}
            />
        </Structure>
    </React.Fragment>
}

AdminLayout.SidebarItems = SidebarItems
index.Layout = AdminLayout

export default index