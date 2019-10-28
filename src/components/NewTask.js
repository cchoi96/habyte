import React, { useState } from "react";
import axios from "axios";

const NewTask = ({ setNewTask, projectState, setProjectState, columnId }) => {
  const [taskText, setTaskText] = useState("");
  let clickHandler = e => {
    e.preventDefault();
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
  };
  return (
    <div>
      <form>
        <input type="text" onChange={e => setTaskText(e.target.value)} />
        <input onClick={clickHandler} type="submit" value="Add task" />
      </form>
    </div>
  );
};

export default NewTask;
