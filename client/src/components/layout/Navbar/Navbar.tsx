import React from "react";
import "./Navbar.scss";

import UserNav from "./UserNav";
import { NavbarProps } from "./";

const Navbar: React.FC<NavbarProps> = ({ isAuth }) => {
  return <nav className="navbar">{isAuth ? <UserNav /> : null}</nav>;
};

export default Navbar;
