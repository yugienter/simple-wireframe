import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./TaskDisplay.scss";
import Button from "components/general/Button";

import { ModalContext, ModalActionType } from "context/ModalContext";
import { UserContext } from "context/UserContext";

import TaskUpdate from "components/modalForms/TaskEditor/TaskUpdate";
import { getBoardTask, deleteTask } from "service";
import LoadingOverlay from "components/layout/LoadingOverlay";
import { TaskDisplayProps } from ".";
import { TaskI } from "types/general";

const TaskDisplay: React.FC<TaskDisplayProps> = ({ taskId }) => {
  const { modalDispatch } = useContext(ModalContext);
  const {
    userState: { currentBoard },
  } = useContext(UserContext);

  const history = useHistory();

  const [taskDetails, setTaskDetails] = useState<TaskI>({
    _id: "",
    title: "",
    description: "",
    author: {
      _id: "",
      username: "",
    },
  });
  const [isTaskLoading, setTaskLoading] = useState(true);

  useEffect(() => {
    let _isMounted = true;
    const getTaskInfo = async () => {
      const { data, status } = await getBoardTask({ boardId: currentBoard?.id || "", taskId });
      if (_isMounted) setTaskLoading(false);
      if (status === 400) {
        modalDispatch({ type: ModalActionType.CLOSE });
      } else if (!!data && _isMounted) {
        history.push({
          search: `?task=${taskId}`,
        });
        const { task } = data;
        setTaskDetails(task);
      }
    };
    getTaskInfo();
    return () => {
      history.push({
        search: "",
      });
      _isMounted = false;
    };
  }, [currentBoard, taskId, history, modalDispatch]);

  const deleteTaskk = async () => {
    const shouldDelete = window.confirm("are you sure you want to delete this task?");
    if (shouldDelete) {
      deleteTask({
        boardId: currentBoard?.id || "",
        payload: {
          taskId,
        },
        res: (res) => {
          if (res.success) modalDispatch({ type: ModalActionType.CLOSE });
        },
      });
    }
  };

  const openTaskEditModal = () => {
    modalDispatch({
      type: ModalActionType.OPEN,
      payload: {
        title: "Edit Task",
        render: <TaskUpdate taskId={taskId} boardId={currentBoard?.id || ""} />,
      },
    });
  };

  return (
    <div className="display-task-wrapper">
      <LoadingOverlay show={isTaskLoading} opacity={0}>
        <div className="display-task">
          <div className="text-details">
            <div className="info-header">
              <Button className="edit-btn delete-btn" onClick={deleteTaskk}>
                Delete
              </Button>
              <Button className="edit-btn" onClick={openTaskEditModal}>
                Edit
              </Button>
            </div>
            <h1 className="task-title">{taskDetails.title}</h1>
            <p className="task-description">{taskDetails.description}</p>
          </div>
        </div>
      </LoadingOverlay>
    </div>
  );
};

export default TaskDisplay;
