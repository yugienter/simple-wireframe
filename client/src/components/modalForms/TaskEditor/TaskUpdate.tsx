import React, { useEffect, useState } from "react";
import TaskEditor from "./TaskEditor";
import { withFormik } from "formik";
import { FormValues, validationSchema, TaskUpdateProps, TaskUpdateFormik } from ".";
import { getBoardTask, updateBoardTask } from "service/task";
import LoadingOverlay from "components/layout/LoadingOverlay";

const TaskUpdate: React.FC<TaskUpdateProps> = (props) => {
  const { boardId, taskId } = props;
  const [isLoading, setLoading] = useState<boolean>(true);
  const [task, setTask] = useState<FormValues>({
    _id: "",
    author: {
      _id: "",
      username: "",
    },
    title: "",
    description: "",
  });

  useEffect(() => {
    const getTaskDetails = async () => {
      setLoading(true);
      const { data } = await getBoardTask({
        boardId,
        taskId: taskId || "",
      });
      if (!!data) {
        const { task } = data;
        setTask(task);
        setLoading(false);
      }
    };
    getTaskDetails();
    return () => { };
  }, [boardId, taskId]);
  return (
    <LoadingOverlay show={isLoading}>
      <TaskUpdateWrapper {...props} initialValues={task} submitType="Update" />
    </LoadingOverlay>
  );
};

const TaskUpdateWrapper = withFormik<TaskUpdateFormik, FormValues>({
  mapPropsToValues: (props) => {
    return { ...props.initialValues };
  },
  validationSchema: validationSchema,
  handleSubmit: async (submittedData, { setStatus, props }) => {
    const payload = { ...submittedData };
    const { boardId, taskId } = props;
    const res = await updateBoardTask({ boardId, taskId, payload });
    if (res.status === 200) {
      setStatus({
        submitStatus: "SUCCESS",
        message: "task updated",
      });
    } else {
      setStatus({
        submitStatus: "ERROR",
        message: "error - while updating task",
      });
    }
  },
})(TaskEditor);

export default TaskUpdate;
