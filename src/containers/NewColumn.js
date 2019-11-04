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
    <StyledNewColumn>
      <form>
        <input
          className="new-column-title"
          type="text"
          onChange={e => setColumnText(e.target.value)}
          placeholder="column title"
        />
        <input id="add-column" onClick={clickHandler} type="submit" value="Add Column" />
      </form>
    </StyledNewColumn>
  );
};

const StyledNewColumn = styled.div`
  .new-column-title {
    border-radius: 10px;
    margin-bottom: 15px;
    width: 100%;
    text-align: center;
  }

  form {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  #add-column {
    border-radius: 10px;

    &: hover {
      transform: scale(1.02);
      background-color: rgba(205,133,63,0.8)
    }
  }

`;

export default NewColumn;
