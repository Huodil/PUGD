import React from 'react';
import AdminLayout from "../../../../components/adminLayout";
import SidebarItems from "../../../../components/admin/SidebarItems";
import Header from "../../../../components/admin/administration/shared/Header";
import AddOwner from "../../../../components/admin/administration/Owner/AddOwner";
import Structure from "../../../../components/admin/administration/shared/structrePage";
import {useQuery} from "@apollo/react-hooks";
import {GET_ALL_OWNERS} from "../../../../graphql/queries/admin/administration/OwnerQuerie";
import AllOwners from "../../../../components/admin/administration/Owner/AllOwners";


const index = () => {
    const {err, data, refetch} = useQuery(GET_ALL_OWNERS)
    console.log("data : ", data)
    return <React.Fragment>
        <Structure>
            <Header title={"Owner"}/>
            <div className="row">
                <div className="col m6 l6">
                    <AllOwners
                        owners={data && data.GetAllOwners} title={"List Owner"}
                        refetch={refetch}
                    />
                </div>
                <div className="col m6 l6">
                    <AddOwner refetch={refetch}/>
                </div>
            </div>
        </Structure>
    </React.Fragment>
}

AdminLayout.SidebarItems = SidebarItems
index.Layout = AdminLayout

export default index