import { UserActionType } from ".";

export interface LoginSuccessAction {
  type: UserActionType.LOGIN_SUCCESS;
  payload: {
    token?: string;
    user: any;
  };
}

export interface LoginFailAction {
  type: UserActionType.LOGIN_FAIL;
}

export interface LogoutAction {
  type: UserActionType.LOGOUT;
}

export type UserAction =
  | LoginSuccessAction
  | LoginFailAction
  | LogoutAction