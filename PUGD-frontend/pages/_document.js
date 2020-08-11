import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            type="text/css"
            href="/app-assets/vendors/vendors.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/app-assets/vendors/animate-css/animate.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/app-assets/css/themes/vertical-modern-menu-template/materialize.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/app-assets/css/themes/vertical-modern-menu-template/style.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/app-assets/css/custom.css"
          />

          {/* <script src="/app-assets/js/materialize.js"></script>
          <script src="/app-assets/js/plugins.js"></script> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>

        {/* <script src="/app-assets/js/jquery.min.js"></script>   
           
         <script src="/app-assets/js/plugins.js" ></script>  */}
        {/* <script src="/app-assets/js/jquery.min.js"></script>    */}

        {/* <script src="/app-assets/js/vendors.min.js"></script>
        <script src="/app-assets/js/plugins.js"></script> 
        <script src="/app-assets/js/custom/custom-script.js"></script>
        <script src="/app-assets/js/scripts/customizer.js"></script>

        <script src="/app-assets/js/scripts/dashboard-modern.js"></script>
        <script src="/app-assets/js/scripts/intro.js"></script> */}
        {/* <script src="/app-assets/js/materialize.js"></script> */}
        <script src="/app-assets/js/vendors.min.js"></script>
        {/* <script src="/app-assets/js/plugins.js"></script> */}
      </Html>
    );
  }
}

export default MyDocument;
