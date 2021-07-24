import { serviceParams } from "./general";

export interface registerParams extends serviceParams {
  payload: {
    username: string;
    password: string;
    matchPassword: string;
  };
}

export interface loginParams extends serviceParams {
  payload: {
    username: string;
    password: string;
  };
}

export interface changePasswrdParams extends serviceParams {
  payload: {
    newPassword: string;
    matchPassword: string;
  };
}