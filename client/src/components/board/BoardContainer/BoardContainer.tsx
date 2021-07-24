import React from "react";
import BoardCard from "components/board/BoardCard";
import { BoardContainerProps } from "./";

import "./BoardContainer.scss";

const BoardContainer: React.FC<BoardContainerProps> = ({
  boards,
  removeBoard,
  className,
  noBoardsMessage = "empty",
}) => {
  return (
    <div className={`board-container ${className || ""}`}>
      <section className="board-container__boards">
        {boards.map(({ _id, name }) => (
          <BoardCard
            key={_id}
            boardId={_id}
            removeBoard={removeBoard}
            boardName={name}
          />
        ))}
        {boards.length < 1 && (
          <div className="board-container__empty-message">{noBoardsMessage}</div>
        )}
      </section>
    </div>
  );
};

export default BoardContainer;
