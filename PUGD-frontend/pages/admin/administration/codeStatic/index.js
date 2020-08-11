import React from 'react';
import AdminLayout from "../../../../components/adminLayout";
import SidebarItems from "../../../../components/admin/SidebarItems";
import Header from "../../../../components/admin/administration/shared/Header";
import Structure from "../../../../components/admin/administration/shared/structrePage";
import {useQuery} from "@apollo/react-hooks";
import {GET_MEDIATYPES} from "../../../../graphql/queries/admin/administration/MediatypeQuerie";
import AllMediaTypes from "../../../../components/admin/administration/MediaTypes/AllMediaTypes";
import AllCodeStatic from "../../../../components/admin/administration/CodeStatic/AllCodeStatic";
import {GET_ALL_CODE_STATUS} from "../../../../graphql/queries/admin/administration/codeStatic.Queris";
import AllOwners from "../../../../components/admin/administration/Owner/AllOwners";
import AddOwner from "../../../../components/admin/administration/Owner/AddOwner";
import AddCodeStatic from "../../../../components/admin/administration/CodeStatic/AddCodeStatic";


const index = () => {
    const {err, data, refetch} = useQuery(GET_ALL_CODE_STATUS)
    console.log("data : ", data)
    if( data !== undefined){
        return <React.Fragment>
            <Structure>
                <Header title={"Code Static"}/>
                <div className="row">
                    <div className="col m6 l6">
                        <AllCodeStatic
                            codes={data && data.GetAllCodeStatics} title={"Code Statics"}
                            refetch={refetch}
                        />
                    </div>
                    <div className="col m6 l6">
                        <AddCodeStatic refetch={refetch}/>
                    </div>
                </div>
            </Structure>
        </React.Fragment>
    }
    return <p>loading</p>

}

AdminLayout.SidebarItems = SidebarItems
index.Layout = AdminLayout

export default index