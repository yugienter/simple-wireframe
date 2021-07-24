import React from "react";
import "./ErrorPage.scss";
import { getReasonPhrase } from "http-status-codes";
import { ErrorPageProps } from "./";

const ErrorPage: React.FC<ErrorPageProps> = ({ match }) => {
  const translateErrorCode = () => {
    try {
      return getReasonPhrase(match.params.code);
    } catch (error) {
      return "UKNOWN ERROR"
    }
  };

  return (
    <div className="error-page__wrapper">
      <div className="error-page">
        <h2 className="error-page__title">{`ERROR: ${match.params.code}`}</h2>
        <p className="error-page__reason-phrase">{translateErrorCode()}</p>
      </div>
    </div>
  );
};

export default ErrorPage;
