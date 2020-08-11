import React, {useEffect} from "react";
import AdminLayout from "@/components/adminLayout";
import Router from "next/router";

// import Router from "next/router";

const Home = () => {
  useEffect(() => {
    console.log(Router.pathname)

    if(Router.pathname === '/' ){
      Router.push('/admin')
    }
    });



  return null;
};

Home.Layout = AdminLayout;

export default Home;
