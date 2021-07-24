import React from "react";
import "./User.scss";
import { UserProps } from "./";

const User: React.FC<UserProps> = ({ imageSrc, username, children }) => {
  return (
    <div className="user-card">
      <span className="user-card__username">{username}</span>
      <div className="user-card__buttons">{children}</div>
    </div>
  );
};

export default User;
