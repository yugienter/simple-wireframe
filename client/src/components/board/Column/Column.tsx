import React, { useState, useContext, useRef } from "react";
import "./Column.scss";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Task from "components/board/Task";
import DropdownMenu from "components/general/DropdownMenu/DropdownMenu";
import DropdownMenuItem from "components/general/DropdownMenu/DropdownMenuItem";
import { ModalContext, ModalActionType } from "context/ModalContext";
import { TaskContext, TasksActionType } from "context/TaskContext";
import ColumnNameInput from "./ColumnNameInput";
import { updateBoardColumn } from "service";
import { deleteColumn } from "service";

import { Droppable } from "react-beautiful-dnd";

import TaskCreate from "components/modalForms/TaskEditor/TaskCreate";
import { ColumnProps } from "./";

const Column: React.FC<ColumnProps> = ({
  columnName,
  columnId,
  columnIndex,
  boardId,
  listOfTasks,
}) => {
  const { modalDispatch } = useContext(ModalContext);
  const { tasksDispatch } = useContext(TaskContext);

  const [showTitleInput, setShowTitleInput] = useState<boolean>(false);

  const anchorElement = useRef(null);

  const openBoardTagsModal = () => {
    modalDispatch({
      type: ModalActionType.OPEN,
      payload: {
        render: <TaskCreate columnId={columnId} boardId={boardId} />,
        title: "New Task",
        size: "l",
      },
    });
  };

  const removeColumn = async () => {
    const shouldDelete = window.confirm("are you sure you want to delete this column?");
    if (shouldDelete) {
      deleteColumn({ boardId, payload: { columnId, columnIndex } });
    }
  };

  const activateColumnNameEditInput = () => {
    setShowTitleInput(true);
  };
  const dissableColumnNameEditInput = () => {
    setShowTitleInput(false);
  };

  const changeColumnNameOnKeyPressEnter = async (newName: string) => {
    const { status } = await updateBoardColumn({
      boardId,
      columnId,
      payload: {
        name: newName,
      },
    });
    if (status === 200) {
      tasksDispatch({
        type: TasksActionType.CHANGE_COLUMN_NAME,
        payload: {
          columnId,
          newName,
        },
      });
      setShowTitleInput(false);
    }
  };

  return (
    <Droppable droppableId={columnId} type="droppableTaskToColumn">
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={
              `task-column ${snapshot.isDraggingOver
                ? "task-column--active"
                : ""}`
            }
          >
            <header
              className="task-column__header"
            // style={{ backgroundColor: randomColors }}
            >
              <ColumnNameInput
                hideInput={dissableColumnNameEditInput}
                initialVal={columnName}
                onEnter={changeColumnNameOnKeyPressEnter}
                editTitle={showTitleInput}
              />
              <button ref={anchorElement} className="task-column__header__more-options">
                <MoreVertIcon />
              </button>
              <DropdownMenu anchorEl={anchorElement}>
                <DropdownMenuItem>
                  <span onClick={removeColumn}>delete</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span onClick={activateColumnNameEditInput}>edit</span>
                </DropdownMenuItem>
              </DropdownMenu>
            </header>
            <div className="task-column__container scrollbar">
              {listOfTasks &&
                listOfTasks.map(({ _id, title }, index) => (
                  <Task
                    key={_id}
                    taskId={_id}
                    title={title}
                    indexes={{ taskIndex: index, columnIndex }}
                  />
                ))}
              <div className="task-column__add-btn" onClick={openBoardTagsModal}>
                <span>+ Add a card</span>
              </div>
            </div>
          </div>
        );
      }}
    </Droppable>
  );
};

export default Column;
