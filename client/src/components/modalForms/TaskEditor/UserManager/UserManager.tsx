import React, { useState } from "react";
import User from "components/board/User";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import "./UserManager.scss";
import { UserManagerProps } from ".";
import { BoardUserI } from "types/general";

interface BoardUserSearchRes extends BoardUserI {
  _id: string;
  text: string;
}

const UserManager: React.FC<UserManagerProps> = ({ users, setUsers, boardId }) => {
  const [userSearchResult, setUserSearchResult] = useState<BoardUserSearchRes[]>([]);

  const addUserToList = (user: any) => {
    setUsers((users: any) => {
      const newUsers = [...users];
      newUsers.push(user);
      return newUsers;
    });
    setUserSearchResult([]);
  };

  const removeUserFromList = (userIndex: number) => {
    setUsers((users: any) => {
      const newUsers = [...users];
      newUsers.splice(userIndex, 1);
      return newUsers;
    });
  };

  const clearUserSearchResults = () => {
    setUserSearchResult([]);
  };

  return (
    <div className="user-manager">
      <div className="user-manager__users scrollbar">
        {users.map(({ _id, username, avatarImageURL }, index) => (
          <User key={_id} username={username} imageSrc={avatarImageURL}>
            <RemoveCircleOutlineIcon
              className="remove-user-icon"
              onClick={() => removeUserFromList(index)}
            />
          </User>
        ))}
      </div>
    </div>
  );
};

export default UserManager;
