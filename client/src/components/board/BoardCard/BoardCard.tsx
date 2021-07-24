import React from "react";
import { useHistory } from "react-router-dom";
import "./BoardCard.scss";
import BoardOptions from "./BoardOptions/BoardOptions";
import { BoardcardProps } from "./";

const BoardCard: React.FC<BoardcardProps> = ({
  boardName,
  boardId,
  removeBoard,
}) => {
  const history = useHistory();

  const goToBoard = () => {
    history.push(`/board/${boardId}`);
  };

  return (
    <div className="board-card">
      <div className="board-card__content">
        <h1 onClick={goToBoard} className="board-card__content__title">
          {boardName}
        </h1>
        <div className="board-card__content__menu">
          <BoardOptions boardId={boardId} removeBoardCallback={removeBoard} />
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
