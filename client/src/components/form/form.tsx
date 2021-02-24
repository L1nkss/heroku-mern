import React, { memo } from "react";

import Registration from "./components/registration";
import Login from "./components/login";

interface IFormProps {
  className?: string;
  successCallback: () => void;
  type: "login" | "registration";
}

const Form: React.FC<IFormProps> = (props: IFormProps) => {
  const { type, ...otherProps } = props;
  return (
    <>
      { type === "registration" && <Registration {...otherProps} />}
      { type === "login" && <Login {...otherProps} />}
    </>
  );
};

export default memo(Form);
