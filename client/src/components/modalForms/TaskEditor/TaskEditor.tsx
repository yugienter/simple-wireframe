import React, { useEffect, useContext } from "react";
import "./TaskEditor.scss";
import { TextField, TextAreaField } from "components/general/TextInput";
import { ModalContext, ModalActionType } from "context/ModalContext";

import Button from "components/general/Button/Button";
import { FormikProps, Form, Field } from "formik";
import { TaskEditorFormProps, FormValues } from ".";

const TaskEditorForm:
  React.FC<TaskEditorFormProps & FormikProps<FormValues>> = (props) => {
    const {
      setValues,
      handleSubmit,
      errors,
      isSubmitting,
      isValid,
      submitType,
      status,
    } = props;

    const { modalDispatch } = useContext(ModalContext);

    useEffect(() => {
      if (status?.submitStatus === "SUCCESS") {
        modalDispatch({ type: ModalActionType.CLOSE });
      }
      return () => { };
    }, [status, modalDispatch]);

    const submitHandler = () => {
      setValues((vals) => ({ ...vals, }));
      handleSubmit();
    };

    return (
      <section className="task-editor">
        <Form className="task-editor__inputs">
          <Field
            name="title"
            error={!!errors["title"]}
            as={TextField}
          />
          <Field
            name="description"
            error={errors["description"]}
            as={TextAreaField}
          />
        </Form>
        <div className="task-editor__btn">
          <Button
            onClick={submitHandler}
            disabled={isSubmitting || !isValid}
            type="submit"
            variant="glow">
            {submitType as String}
          </Button>
        </div>
      </section>
    );
  };

export default TaskEditorForm;
