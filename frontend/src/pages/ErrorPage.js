import React from "react";
import { useRouteError } from "react-router-dom";
import Navigation from "../components/Navigation";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  let message;
  let title;
  if (error.status === 404) {
    title = "NOT FOUND";
    message = error.data.message;
  }
  if (error.status === 500) {
    title = "Server Error ";
    message = error.data.message;
  }

  return (
    <>
      <Navigation />
      <h2>{title}</h2>
      <p>{message}</p>
    </>
  );
};

export default ErrorPage;
