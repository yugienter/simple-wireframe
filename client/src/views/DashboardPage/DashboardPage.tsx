import React, { useState, useContext, useEffect } from "react";
import "./DashboardPage.scss";
import Button from "components/general/Button";
import BoardCreate from "components/modalForms/BoardEditor/BoardCreate";
import ContainerBox from "components/layout/ContainerBox/ContainerBox";
import { ModalContext, ModalActionType } from "context/ModalContext";
import { getBoards } from "service";
import BoardContainer from "components/board/BoardContainer";
import { BoardI } from "types/general";
import LoadingOverlay from "components/layout/LoadingOverlay/LoadingOverlay";

const DashboardPage: React.FC = () => {
  const [boards, setBoards] = useState<{ items: BoardI[]; isLoading: boolean }>({
    items: [],
    isLoading: false,
  });
  const { modalDispatch } = useContext(ModalContext);

  const setBoardsLoading = (loadingState: boolean) => {
    setBoards((prevState) => ({ ...prevState, isLoading: loadingState }));
  };
  useEffect(() => {
    const fetchBoards = async () => {
      const { data } = await getBoards({
        setLoading: setBoardsLoading,
      });
      if (!!data) {
        const { boards } = data;
        setBoards((boardState) => ({ ...boardState, items: boards }));
      }
    };
    fetchBoards();
    return () => { };
  }, []);

  const openCreateNewBoardModal = () => {
    modalDispatch({
      type: ModalActionType.OPEN,
      payload: {
        render: <BoardCreate />,
        title: "Create new Board",
      },
    });
  };

  const removeBoard = (boardId: string) => {
    setBoards((boards) => ({
      ...boards,
      items: boards.items.filter(({ _id }) => _id !== boardId),
    }));
  };

  return (
    <ContainerBox className="board-dashboard">
      <Button
        onClick={openCreateNewBoardModal}
        className="board-dashboard__new-btn">
        + New Board
      </Button>
      <LoadingOverlay show={boards.isLoading} opacity={0}>
        <h1 className="board-container__title">
          Boards List
        </h1>
        <BoardContainer
          className="board-dashboard__main"
          boards={boards.items}
          removeBoard={removeBoard}
          noBoardsMessage="No board"
        />
      </LoadingOverlay>
    </ContainerBox>
  );
};

export default DashboardPage;
