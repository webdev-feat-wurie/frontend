import React, { Component } from "react";
import NextCookie from "next-cookies";
import Cookie from "js-cookie";
import Router from "next/router";

import AuthToken, { SESSION_KEY } from "../services/auth";

const protectedComponent = WrappedComponent => {
  return class extends Component {
    static async getInitialProps(ctx) {
      const token = NextCookie(ctx)[SESSION_KEY];
      const auth = new AuthToken(token);
      const initialProps = { auth };

      if (auth.isExpired()) {
        if (ctx.res) {
          ctx.res.writeHead(302, {
            Location: "/login"
          });
          ctx.res.end();
        } else {
          Router.push("/login");
        }
      }

      if (WrappedComponent.getInitialProps) {
        return WrappedComponent.getInitialProps(initialProps);
      }

      return initialProps;
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default protectedComponent;
