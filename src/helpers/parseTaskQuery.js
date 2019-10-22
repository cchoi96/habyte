import React, { useEffect } from "react";
import TrelloBoard from "../containers/TrelloBoard";

const ParseTaskQuery = ({ taskslist }) => {
  //columns={'Categoryname':['tasks']}
  let columns = {};
  let result = [];
  for (let taskItem of taskslist) {
    if (!columns[taskItem.category_name]) {
      columns[taskItem.category_name] = [];
      console.log(columns);
    }
    columns[taskItem.category_name].push({
      name: taskItem.name,
      status: taskItem.status
    });
  }
  for (let columnTitle of Object.keys(columns)) {
    result.push({ title: columnTitle, list: columns[columnTitle] });
  }

  return <TrelloBoard columns={result} />;
};

export default ParseTaskQuery;
