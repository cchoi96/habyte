import React from "react";
import Column from "./Column";
//prop.columns array of objects
//
//

const TrelloBoard = ({ columns }) => {
  let columnsArr = columns.map(column => {
    return <Column columnTitle={column.title} columnList={column.list} />;
  });
  return <div>{columnsArr}</div>;
};

export default TrelloBoard;
