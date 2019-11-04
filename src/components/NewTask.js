import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const NewTask = ({
  setNewTask,
  projectState,
  setProjectState,
  columnId,
  addTaskButton,
  setAddTaskButton
}) => {
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
        <input
          className="new-task-name"
          autoFocus
          type="text"
          onChange={e => setTaskText(e.target.value)}
        />
        <input
          className="add-new-task"
          onClick={event => {
            clickHandler(event);
            if (taskText.length > 0) {
              setAddTaskButton(!addTaskButton);
            }
          }}
          type="submit"
          value="Add Task"
        />
      </form>
    </StyledNewTask>
  );
};

const StyledNewTask = styled.div`
  form {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 95%;
    flex-wrap: wrap;
    justify-content: center;
  }

  .new-task-name {
    width: 50%;
    margin: 0 auto 5px auto;
    border: 1px solid rgba(140, 218, 254.5, 1);
    border-radius: 10px;
  }

  .add-new-task {
    margin: 5px auto;
    text-align: center;
    box-shadow: 0.5px 0.5px 1px 1px;
    border-radius: 10px;
    width: fit-content;
    padding: 2px 12px;
    background-color: rgba(140, 218, 254.5, 1);
    box-shadow: rgba(26, 24, 29, 0.16) 0px 2px 2px 0px,
      rgba(26, 24, 29, 0.12) 0px 1px 4px 0px;
    color: #fff;
    transition: 0.1s ease-out;

    &:hover {
      cursor: pointer;
      transform: scale(1.02);
    }
  }
`;

export default NewTask;
