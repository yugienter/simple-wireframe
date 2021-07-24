import callAPI from "./utils/fetchData";
import { BoardFullI } from "types/general";
import {
  deleteBoardParams,
  createBoardParams,
  getBoardParams,
  updateBoardParams,
} from "types/service/request";
import {
  getMyBoardsResponse,
  updateBoardresponse,
  GeneralResponse,
  createdBordResponse,
} from "types/service/response";

// BOARDS - GET
export const getBoards = async (
  { setLoading }: any
) => {
  return await callAPI<getMyBoardsResponse>({
    method: "GET",
    url: `/board`,
    token: true,
    setLoading,
  });
};

// BOARD - DELETE
export const deleteBoard = async ({ boardId, setLoading }: deleteBoardParams) => {
  return await callAPI<GeneralResponse>({
    method: "DELETE",
    url: `/board/${boardId}`,
    token: true,
    setLoading,
  });
};

// BOARD - POST
export const createBoard = async ({ setLoading, payload }: createBoardParams) => {
  return await callAPI<createdBordResponse>({
    method: "POST",
    url: `/board/`,
    token: true,
    setLoading,
    payload,
  });
};

// BOARD - GET
export const getBoard = async ({ short = false, boardId, setLoading }: getBoardParams) => {
  return await callAPI<BoardFullI>({
    method: "GET",
    url: `/board/${boardId}?short=${short}`,
    token: true,
    setLoading,
  });
};

// BOARD UPDATE - POST
export const updateBoard = async ({ boardId, setLoading, payload }: updateBoardParams) => {
  return await callAPI<updateBoardresponse>({
    method: "POST",
    url: `/board/${boardId}`,
    token: true,
    setLoading,
    payload,
  });
};