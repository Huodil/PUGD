import React from 'react';
import SidebarItems from '@/components/admin/authorities/SidebarItems';
import AdminLayout from '@/components/adminLayout';

const sideBar = () => {

 
    return (
        <div>this is the administration page</div>
    )
}

AdminLayout.SidebarItems=SidebarItems
sideBar.Layout = AdminLayout

export default sideBar