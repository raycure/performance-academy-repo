import React from "react";
import "./containerStyle.css";
import "./columnStlye.css";
function Container({ children, className}) {
  return <div className={`${className} container `}>{children}</div>;
}
export default Container;
