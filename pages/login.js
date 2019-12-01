import React from "react";
import Router from "next/router";
import NextCookie from "next-cookies";

import { useInput } from "../hooks/input";
import { redirectTo } from "../utils/redirect";
import AuthToken, { login, SESSION_KEY } from "../services/auth";

const LoginPage = () => {
  const { value: username, bind: usernameBind } = useInput("");
  const { value: password, bind: passwordBind } = useInput("");

  const handleSubmit = async evt => {
    evt.preventDefault();

    const auth = await login(username, password);
    if ("non_field_errors" in auth) {
      window.alert(auth.non_field_errors);
    } else if ("token" in auth) {
      Router.push("/");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          username :<input type="text" {...usernameBind} />
        </label>
        <br />
        <label>
          password :<input type="password" {...passwordBind} />
        </label>
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

LoginPage.getInitialProps = ctx => {
  const token = NextCookie(ctx)[SESSION_KEY];
  const auth = new AuthToken(token);

  if (auth.isAuthenticated) {
    redirectTo("/", ctx.res);
    return {};
  }

  return {};
};

export default LoginPage;
