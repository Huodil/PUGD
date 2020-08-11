
import React, {useEffect} from 'react'
import AdminLayout from '../components/adminLayout';
import Router from "next/router";
 
const WithAdminLayout = function (Child) {


            return class Higher extends React.Component {

            render() {
                  console.log("Router ...IS:\n");
                  console.log(Router.pathname)

                  return <AdminLayout>
                        <Child {...this.props} />
                  </AdminLayout>

            }
      }
}

export default WithAdminLayout;