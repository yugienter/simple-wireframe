export { default } from "./BoardCard";

export interface BoardcardProps {
  boardName: string;
  boardId: string;
  removeBoard: (boardId: string) => void;
}