import React from "react";
import "./containerStyle.css";
import "./columnStlye.css"
function Heading({ children, className}) {
  return <div className={`container ${className}`}>{children}</div>;
}
export default Heading;
{}