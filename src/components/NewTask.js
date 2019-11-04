import React, { useState } from "react";
import axios from "axios";
import styled from 'styled-components';

const NewTask = ({ setNewTask, projectState, setProjectState, columnId }) => {
  const [taskText, setTaskText] = useState("");
  let clickHandler = e => {
    e.preventDefault();
    if (taskText.length > 0) {
      let temp = projectState;

      setNewTask(false);
      axios
        .post("http://0.0.0.0:8080/projects/tasks", {
          name: taskText,
          task_categories_id: columnId,
          task_description: ""
        })
        .then(res => res.data[0].id)
        .then(id => {
          temp.tasks[id] = { id: id, content: taskText };
          temp.columns[columnId].taskIds.push(id);
          setProjectState(projectState => ({ ...projectState }));
        });
    }
  };
  return (
    <StyledNewTask>
      <form>
        <input className="new-task-name" type="text" onChange={e => setTaskText(e.target.value)} />
        <input className="add-new-task" onClick={clickHandler} type="submit" value="Add task" />
      </form>
    </StyledNewTask>
  );
};

const StyledNewTask = styled.div`

  form {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }

  .new-task-name {
    width: 100%;
    text-align: center;
    margin-bottom: 5px;
    border-radius: 10px;
  }

  .add-new-task {
    border-radius: 10px;
    box-shadow: 0px 0.5px 0.5px;

    &: hover {
      cursor: pointer;
      background-color: rgba(200,133,63,0.8);
      color: #ffffff;
      border-radius: 10px;
    }

  }

`;

export default NewTask;
