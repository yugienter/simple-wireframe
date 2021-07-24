import { UserShortI, BoardUserI } from "./user";

export interface TaskI {
  _id: string;
  title: string;
  description: string;
  author: UserShortI;
}

export interface ColumnI {
  _id: string;
  name: string;
  tasks: TaskI[];
}

export interface BoardFullI {
  _id: string;
  name: string;
  description: string;
  author: string;
  columns: ColumnI[];
}

export interface BoardI {
  _id: string;
  name: string;
  description: string;
  author: string;
}
