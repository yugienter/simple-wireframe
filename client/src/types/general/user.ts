
export interface UserI {
  _id: string;
  username: string;
  name: string;
  surname: string;
  email: string;
  avatarImageURL?: string;
}

export type UserShortI = Pick<UserI, "_id" | "username" | "avatarImageURL">;

export interface BoardUserI {
  user: UserShortI;
}
