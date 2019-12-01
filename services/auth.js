import jwtDecode from "jwt-decode";
import fetch from "isomorphic-unfetch";
import Cookie from "js-cookie";
import Router from "next/router";

const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || "http://localhost:21700";

export const SESSION_KEY = "__session";

export const login = async (username, password) => {
  const response = await fetch(`${USER_SERVICE_URL}/auth/login/`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  });

  const json = await response.json();
  if ("token" in json) {
    Cookie.set(SESSION_KEY, json.token);
  }

  return json;
};

export default class AuthToken {
  constructor(token) {
    this.decodedToken = { email: "", exp: 0 };
    this.token = token;

    try {
      if (token) {
        this.decodedToken = jwtDecode(token);
      }
    } catch (error) {}
  }

  expiresAt() {
    return new Date(this.decodedToken.exp * 1000);
  }

  isExpired() {
    return new Date() > this.expiresAt();
  }

  isAuthenticated() {
    return !this.isExpired();
  }
}
