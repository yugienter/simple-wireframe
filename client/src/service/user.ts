import callAPI from "./utils/fetchData";
import { serviceParams } from "types/service/request";

import {
  isAuthenticatedResponse,
  GeneralResponse,
  loginResponse,
} from "types/service/response";
import {
  registerParams,
  loginParams,
  changePasswrdParams,
} from "types/service/request";

const ROUTE_PREFIX = "/user";

// IS AUTHENTICATED
export const isUserAuthenticated = async ({ setLoading }: serviceParams = {}) => {
  return await callAPI<isAuthenticatedResponse>({
    url: "/isAuth",
    token: true,
    method: "GET",
    setLoading,
  });
};

// REGISTER
export const register = async ({ payload, setLoading }: registerParams) => {
  return await callAPI<GeneralResponse>({
    method: "POST",
    url: "/register",
    payload,
    setLoading,
  });
};

// LOGIN
export const login = async ({ payload, setLoading }: loginParams) => {
  return await callAPI<loginResponse>({
    method: "POST",
    url: "/login",
    payload,
    setLoading,
  });
};

// PASSWORD - UPDATE
export const changePassword = async ({ payload, setLoading }: changePasswrdParams) => {
  return await callAPI<GeneralResponse>({
    method: "PATCH",
    url: `${ROUTE_PREFIX}/change_password`,
    token: true,
    payload,
    setLoading,
  });
};