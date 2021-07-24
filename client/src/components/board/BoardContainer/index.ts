import { BoardI } from "types/general";
export { default } from "./BoardContainer";

export interface BoardContainerProps {
  boards: BoardI[];
  removeBoard: (boardId: string) => void;
  className?: string;
  noBoardsMessage?: string;
}