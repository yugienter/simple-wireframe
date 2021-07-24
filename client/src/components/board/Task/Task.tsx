import React, { useContext } from "react";
import "./Task.scss";
import TaskDisplay from "components/modalForms/TaskDisplay/TaskDisplay";
import { ModalContext, ModalActionType } from "context/ModalContext";

import { Draggable } from "react-beautiful-dnd";
import { TaskProps } from "./";

const Task: React.FC<TaskProps> = ({ taskId, title, indexes }) => {
  const { modalDispatch } = useContext(ModalContext);
  const { taskIndex } = indexes;

  const openTaskDetailsModal = () => {
    modalDispatch({
      type: ModalActionType.OPEN,
      payload: {
        render: <TaskDisplay taskId={taskId} />,
        title: "Task Details",
      },
    });
  };

  return (
    <Draggable
      draggableId={taskId}
      index={taskIndex}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task-card ${snapshot.isDragging ? "task-card--dragging" : ""}`}
          onClick={openTaskDetailsModal}
          style={{ ...provided.draggableProps.style }}>
          <h3
            className={`${snapshot.isDragging ? "task-card__title--dragging" : "task-card__title"}`}>
            {title}
          </h3>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
