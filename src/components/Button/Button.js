import React from "react";
import "./Button.scss";

const Button = ({ children, ...rest }) => {
  return <button {...rest}>{children}</button>;
};

export default Button;