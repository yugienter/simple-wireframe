import React from "react";
import { FormikProps, Form, Field, withFormik } from "formik";
import { TextField } from "components/general/TextInput";
import Button from "components/general/Button";
import {
  RegisterStepProps,
  RegisterOneFormValues,
  validationSchemaStepOne
} from ".";


const RegisterStage1: React.FC<FormikProps<RegisterOneFormValues>> =
  (props) => {
    const { errors, isValid } = props;

    return (
      <Form>
        <Field name="username" error={errors["username"]} as={TextField} />
        <Button
          className="register-stage-controll-btn stage-next"
          disabled={!isValid}
          type="submit"
        >
          Next
        </Button>
      </Form>
    );
  };

const RegisterStage1WithFormik =
  withFormik<RegisterStepProps, RegisterOneFormValues>({
    mapPropsToValues: (props) => {
      const { data } = props;
      return { ...data };
    },
    validationSchema: validationSchemaStepOne,
    handleSubmit: async (submittedData, { props }) => {
      props.changeStep(1, submittedData);
    },
  })(RegisterStage1);

export default RegisterStage1WithFormik;
