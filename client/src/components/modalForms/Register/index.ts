import * as Yup from "yup";

export { default } from "./Register";

export interface RegisterOneFormValues {
  username: string;
}

export interface RegisterTwoFormValues {
  password: string;
  matchPassword: string;
}

export interface RegisterFields
  extends RegisterOneFormValues, RegisterTwoFormValues { }

export type RegisterFieldsOr = RegisterOneFormValues | RegisterTwoFormValues;

export interface RegisterStepProps {
  data: RegisterFields;
  changeStep: (step: number, newData: RegisterFieldsOr, final?: boolean) => void;
  serverErrors?: Object;
}

export const validationSchemaStepOne = Yup.object({
  username: Yup.string()
    .min(3, "username is too short")
    .max(25, "username is too long")
    .required("field is required"),
});

export const validationSchemaStepTwo = Yup.object({
  password: Yup.string()
    .min(5, "must be at least 5 characters")
    .required("field is required"),
  matchPassword: Yup.string()
    .oneOf([Yup.ref("password")], "password does not match")
    .required("Password confirm is required"),
});
