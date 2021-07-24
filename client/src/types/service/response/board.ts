import { BoardI, BoardFullI } from "types/general";

export interface getMyBoardsResponse {
  boards: BoardI[];
}

export interface createdBordResponse {
  board: BoardFullI;
  message: string;
}

export interface updateBoardresponse {
  message: string;
  boardId: string;
}
