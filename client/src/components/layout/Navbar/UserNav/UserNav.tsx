import React, { useContext } from "react";
import NavItem from "components/layout/Navbar/NavItem";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory, Link } from "react-router-dom";
import { UserContext, UserActionType } from "context/UserContext";
import DropdownMenuItem from "components/general/DropdownMenu/DropdownMenuItem";
import { ModalContext, ModalActionType } from "context/ModalContext";
import ChangePassword from "components/modalForms/ChangePassword";
import "./UserNav.scss";

const UserNav: React.FC = () => {
  const history = useHistory();

  const { userDispatch } = useContext(UserContext);
  const { modalDispatch } = useContext(ModalContext);

  const goToHomePage = () => {
    history.push("/");
  };

  const logOutUser = () => {
    userDispatch({ type: UserActionType.LOGOUT });
  };

  const changePasswordModalOpen = () => {
    modalDispatch({
      type: ModalActionType.OPEN,
      payload: {
        render: <ChangePassword />,
        title: "Change password",
      },
    });
  };

  return (
    <>
      <NavItem name="home" onClick={goToHomePage} Icon={HomeIcon} />
      <NavItem
        name="profile"
        offset={{ x: -60, y: 10 }}
        Icon={AccountBoxIcon}
        className="profile-nav">
        <DropdownMenuItem>
          <span className="logout-btn" onClick={changePasswordModalOpen}>
            Change Password
          </span>
        </DropdownMenuItem>
      </NavItem>
      <NavItem name="logout" onClick={logOutUser} Icon={ExitToAppIcon} />
    </>
  );
};

export default UserNav;
