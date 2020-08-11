import React from "react";
import Router from "next/router";

const allowedRoutes = ["/auth/login", "/auth/register"];

const protect = function(Child) {

  return class Higher extends React.Component {
    static async getInitialProps({ ctx }) {
      console.log(ctx.pathname)
      if (allowedRoutes.includes(ctx.pathname)) {
        return { allowed: true };
      }
      return { allowed: false };
    }

    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
      };
    }

    haveToken() {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        return token;
      }
      return null;
    }
    render() {
      if (this.props.allowed || this.haveToken()) {
        return <Child {...this.props} />;
      }

      if (typeof window !== "undefined") {
        Router.push("/auth/login");
      }
      return <div> Loading ....</div>;
    }
  };
};

export default protect;
