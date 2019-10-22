import React from "react";

const ColumnListItem = ({ text, status }) => {
  return (
    <li>
      {text}
      <div>{status.toString()}</div>
    </li>
  );
};

export default ColumnListItem;
