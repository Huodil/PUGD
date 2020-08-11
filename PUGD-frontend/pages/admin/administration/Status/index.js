import {useQuery} from "@apollo/react-hooks";
import React from "react";
import Structure from "../../../../components/admin/administration/shared/structrePage";
import Header from "../../../../components/admin/administration/shared/Header";
import AdminLayout from "../../../../components/adminLayout";
import SidebarItems from "../../../../components/admin/SidebarItems";
import {GET_ALL_STATUS} from "../../../../graphql/queries/admin/administration/StatusQuerie";
import AllStatus from "../../../../components/admin/administration/Status/AllStatus";
import Card from "../../../../components/ui/card/card";

const index = () => {
    const {err, data, refetch} = useQuery(GET_ALL_STATUS)
    console.log("data : ", data)
    return <React.Fragment>
        <Structure>
            <Header title={"Code Static"}/>
            <AllStatus
                status={data && data.GetAllStatus} title={"Status"}
                refetch={refetch}
            />
        </Structure>
    </React.Fragment>
}

AdminLayout.SidebarItems = SidebarItems
index.Layout = AdminLayout

export default index