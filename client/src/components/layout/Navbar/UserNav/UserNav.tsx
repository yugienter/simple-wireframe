import React, { useContext } from "react";
import NavItem from "components/layout/Navbar/NavItem";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";
import { UserContext, UserActionType } from "context/UserContext";
import "./UserNav.scss";

const UserNav: React.FC = () => {
  const history = useHistory();

  const { userDispatch } = useContext(UserContext);

  const goToHomePage = () => {
    history.push("/");
  };

  const logOutUser = () => {
    userDispatch({ type: UserActionType.LOGOUT });
  };

  return (
    <>
      <NavItem name="home" onClick={goToHomePage} Icon={HomeIcon} />
      <NavItem name="logout" onClick={logOutUser} Icon={ExitToAppIcon} />
    </>
  );
};

export default UserNav;
