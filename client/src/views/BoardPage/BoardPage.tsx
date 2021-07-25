import React, { useState, useContext, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import "./BoardPage.scss";
import TaskBoard from "./TaskBoard";
import { ModalContext, ModalActionType } from "context/ModalContext";
import { UserContext, UserActionType } from "context/UserContext";
import TaskDisplay from "components/modalForms/TaskDisplay/TaskDisplay";
import { TaskContext, TasksActionType } from "context/TaskContext";
import { getBoard } from "service";
import LoadingOverlay from "components/layout/LoadingOverlay/LoadingOverlay";
import { onDragEnd } from "./dragHelper";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { BoardPageProps } from ".";
import { ws } from "config/socket.conf";

const BoardPage: React.FC<BoardPageProps> = ({ match, location }) => {
  const boardId: string = match.params.id;

  const [boardInfo, setBoardInfo] = useState<{
    name: string;
    description: string;
  }>({
    name: "",
    description: "",
  });
  const { tasksState, tasksDispatch } = useContext(TaskContext);
  const [isTaskLoading, setTaskLoading] = useState<boolean>(false);
  const { modalDispatch } = useContext(ModalContext);
  const {
    userState: { user },
    userDispatch,
  } = useContext(UserContext);

  const history = useHistory();

  useEffect(() => {
    let _isMounted = true;
    let waitingTimout: ReturnType<typeof setTimeout> | null = null;
    const query = queryString.parse(location.search);

    const openTask = () => {
      modalDispatch({
        type: ModalActionType.OPEN,
        payload: {
          render: <TaskDisplay taskId={query.task as string} />,
          title: "Task Details",
        },
      });
    };
    if (!!query && !!query.task) {
      waitingTimout = setTimeout(openTask, 1000);
    }

    const getLoggedIn = async () => {
      if (_isMounted) {
        ws.emit("joinBoardRoom", { room: boardId });
        userDispatch({
          type: UserActionType.ROLE,
          payload: { boardId },
        });
      }
    };

    const getBoardTaskss = async () => {
      const { data, status } = await getBoard({
        boardId,
        setLoading: setTaskLoading
      });
      if (!!data) {
        const { columns, name, description } = data;
        tasksDispatch({
          type: TasksActionType.SET_TASKS,
          payload: { columns }
        });
        setBoardInfo({ name, description });
      } else {
        history.replace(`/error/${status}`);
      }
    };
    getBoardTaskss();
    !!user && getLoggedIn();

    return () => {
      if (waitingTimout) clearTimeout(waitingTimout);
      ws.emit("leaveBoardRoom", { room: boardId });
      _isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, boardId, userDispatch, history, modalDispatch, tasksDispatch]);

  return (
    <LoadingOverlay show={isTaskLoading} opacity={0} className="task-loading">
      <div className="board-page">
        <h1 className="board-page__title">{boardInfo.name}</h1>
        <div className="board-page__description">{boardInfo.description}</div>
        <DragDropContext
          onDragEnd={
            (result) => onDragEnd(boardId, result, tasksState, tasksDispatch)
          }
        >
          <TaskBoard boardId={boardId} />
        </DragDropContext>
      </div>
    </LoadingOverlay>
  );
};

export default BoardPage;
