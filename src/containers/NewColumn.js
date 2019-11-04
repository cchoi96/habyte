import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
const NewColumn = ({
  setProjectState,
  setNewColumn,
  projectSelected,
  projectState
}) => {
  const [columnText, setColumnText] = useState("");

  let clickHandler = e => {
    e.preventDefault();
    if (columnText) {
      setNewColumn(false);
      axios
        .post("http://0.0.0.0:8080/projects/column", {
          name: columnText,
          project_id: projectSelected
        })
        .then(res => res.data[0])
        .then(data => {
          setProjectState(prevState => ({
            ...prevState,
            ...(prevState.columns[data.id] = {
              id: data.id,
              taskIds: [],
              title: data.name
            }),
            ...prevState.columnOrder.push(data.id)
          }));
          console.log(projectState);
        });
    }
    // .then(id => {
    //   temp.tasks[id] = { id: id, content: taskText };
    //   temp.columns[columnId].taskIds.push(id);
    //   setProjectState(projectState => ({ ...projectState }));
    // });
  };

  return (
    <div>
      <form>
        <input
          type="text"
          onChange={e => setColumnText(e.target.value)}
          placeholder="column title"
        />
        <input onClick={clickHandler} type="submit" value="Add column" />
      </form>
    </div>
  );
};

export default NewColumn;
