import React from "react";
import { CircularProgress } from '@material-ui/core';
import "./LoadingOverlay.scss";
import { LoadingOverlayProps } from ".";

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  show = true,
  opacity = 1,
  color = { light: "255, 255, 255", dark: "83, 86, 87" },
  children,
  className,
}) => {
  let overlayColor = true ? "255, 255, 255" : "71, 74, 75";
  if (!!color) {
    overlayColor = true ? color.light : color.dark;
  }

  if (show) {
    return (
      <div
        className={`loading-overlay ${className || ""}`}
        style={{ backgroundColor: `rgba(${overlayColor}, ${opacity})` }}>
        <CircularProgress />
      </div>
    );
  } else {
    return <div>{children}</div>;
  }
};

export default LoadingOverlay;
