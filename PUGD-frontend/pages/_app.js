import React, {useEffect} from "react";
import App from "next/app";
import Router from "next/router";
import Protect from "@/shared/protect";
import withApollo from "@/shared/apollo";
// import AdminLayout from '../components/adminLayout';
const Nolayout = ({ children }) => <React.Fragment>{children}</React.Fragment>;
class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;

    const Layout = Component.Layout || Nolayout;

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

 export default withApollo({ ssr: true })(Protect(MyApp));
//export default withApollo({ ssr: true })(MyApp);
