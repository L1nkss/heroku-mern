import React from "react";
import { Link } from "react-router-dom";

const withLink = (linkPath, Component) => {
  return (props) => {
    return <Link to={linkPath}><Component {...props} /></Link>;
  };
};

export default withLink;
