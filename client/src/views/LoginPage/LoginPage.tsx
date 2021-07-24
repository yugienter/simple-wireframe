import React, { useContext } from "react";
import "./LoginPage.scss";
import Button from "components/general/Button";
import { ModalContext, ModalActionType } from "context/ModalContext";
import Login from "components/modalForms/Login";
import Register from "components/modalForms/Register/Register";

const LoginPage: React.FC = () => {
  const { modalDispatch } = useContext(ModalContext);

  const openLoginModal = () => {
    modalDispatch({
      type: ModalActionType.OPEN,
      payload: { render: <Login />, title: "Login" },
    });
  };
  const openRegisterModal = () => {
    modalDispatch({
      type: ModalActionType.OPEN,
      payload: { render: <Register />, title: "Register" },
    });
  };

  return (
    <div className="welcome-section">
      <div className="welcome-section_content">
        <Button onClick={openRegisterModal} variant="glow" className="join-now">
          Register
        </Button>
        <Button onClick={openLoginModal} variant="glow" className="join-now">
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
