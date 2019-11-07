import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const NewColumn = ({ setProjectState, setNewColumn, projectSelected }) => {
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
        });
    }
  };

  return (
    <StyledNewColumn>
      <form>
        <input
          id="input-new-column"
          className="new-column-title"
          type="text"
          onChange={e => setColumnText(e.target.value)}
          placeholder="Title"
        />
        <input
          id="add-column"
          onClick={clickHandler}
          type="submit"
          value="Save"
        />
      </form>
    </StyledNewColumn>
  );
};

const StyledNewColumn = styled.div`
  margin-top: 15px;
  .new-column-title {
    border-radius: 10px;
    border: none;
    margin-left: 10px;
    margin-bottom: 15px;
    padding-left: 5px;
    width: 100%;
    text-align: left;
  }

  form {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  #add-column {
    border-radius: 10px;
    border: none;
    margin-left: 10px;
    padding: 2px 12px;
    background-color: rgba(140, 218, 254.5, 1);
    box-shadow: rgba(26, 24, 29, 0.16) 0px 2px 2px 0px,
      rgba(26, 24, 29, 0.12) 0px 1px 4px 0px;
    color: #fff;
    transition: 0.1s ease-out;

    &: hover {
      transform: scale(1.02);
    }
  }
`;

export default NewColumn;
