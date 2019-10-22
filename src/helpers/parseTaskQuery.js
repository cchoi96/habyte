import React, { useEffect } from "react";
import TrelloBoard from "../containers/TrelloBoard";

const parseTaskQuery = ({ taskslist }) => {
  //columns={'Categoryname':['tasks']}
  let columns = {};
  let result = [];
  for (let taskItem of taskslist) {
    columns[taskItem.category_name] =
      columns[taskItem.category_name].push(taskItem.name) || [];
  }
  for (let columnTitle of Object.keys(columns)) {
    result.push({ title: columnTitle, list: columns[columnTitle] });
  }

  return <TrelloBoard columns={result} />;
};

export default parseTaskQuery;
