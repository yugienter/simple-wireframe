import React, { useRef, useContext } from "react";
import DropdownMenu from "components/general/DropdownMenu/DropdownMenu";
import DropdownMenuItem from "components/general/DropdownMenu/DropdownMenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { deleteBoard } from "service";
import BoardUpdate from "components/modalForms/BoardEditor/BoardUpdate";
import { ModalContext, ModalActionType } from "context/ModalContext";
import { BoardOptionsProps } from "./";


const BoardOptions: React.FC<BoardOptionsProps> = ({ boardId, removeBoardCallback }) => {
  const moreOptionsAnchor = useRef(null);
  const { modalDispatch } = useContext(ModalContext);

  const editEventModal = () => {
    modalDispatch({
      type: ModalActionType.OPEN,
      payload: {
        title: "Edit Board",
        render: <BoardUpdate boardId={boardId} />,
      },
    });
  };

  const deleteBoardHandler = async () => {
    const shouldDelete = window.confirm("are you sure you want to delete this board?");
    if (shouldDelete) {
      const { error } = await deleteBoard({ boardId });
      if (!error) removeBoardCallback(boardId);
    }
  };

  return (
    <div className="board-options">
      <MoreVertIcon ref={moreOptionsAnchor} />
      <DropdownMenu anchorEl={moreOptionsAnchor}>
        <DropdownMenuItem onClick={editEventModal}>edit</DropdownMenuItem>
        <DropdownMenuItem onClick={deleteBoardHandler}>delete</DropdownMenuItem>
      </DropdownMenu>
    </div>
  );
};

export default BoardOptions
