import React, { useState } from "react";
import SideBar from "@/components/Layout/sidenav/sideBar";
import HeaderBar from "./Layout/header/headerNav";
import RightNav from "./Layout/rightNav";
// import getMenu from "../core/buildMenu";
const AdminLayout = (props) => {
  const CollapsedState = useState(false);

  return (
    <React.Fragment>
      <HeaderBar collapsed={true} />
      <RightNav />

      <SideBar
        SidebarItems={AdminLayout.SidebarItems}
        collapsedState={CollapsedState}
      />
      <div className="container">
        <div id="main" className={CollapsedState[0] ? "main-full" : undefined}>
          {props.children}
        </div>
      </div>
    </React.Fragment>
  );
};
export default AdminLayout;
