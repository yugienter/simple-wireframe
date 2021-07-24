import { serviceParams } from "./general";
import { BoardI } from "types/general";

export interface deleteBoardParams extends serviceParams {
  boardId: string;
}

export interface createBoardParams extends serviceParams {
  payload: {
    name: string;
    description: string;
  };
}

export interface createBoardParams extends serviceParams {
  payload: {
    name: string;
    description: string;
  };
}

export interface getBoardParams extends serviceParams {
  boardId: string;
  short?: boolean;
}

export interface updateBoardParams extends serviceParams {
  boardId: string;
  payload: {
    name?: string;
    description?: string;
  };
}