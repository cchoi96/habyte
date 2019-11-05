import React, { useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import axios from "axios";

const Task = ({ task, index, projectState, setProjectState, columnid }) => {
  const [onHover, setOnHover] = useState(false);

  const deleteTask = () => {
    let temp = { ...projectState };
    delete temp.tasks[task.id];
    temp.columns[columnid].taskIds = temp.columns[columnid].taskIds.filter(
      ele => ele != task.id
    );
    setProjectState(temp);
    // ! needs testing to confirm
    axios
      .delete("http://0.0.0.0:8080/projects/tasks", {
        data: { task: task.id }
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));

    console.log("projectState", projectState);
  };
  const editTask = () => {
    console.log("edit");
  };
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          onMouseEnter={() => setOnHover(true)}
          onMouseLeave={() => setOnHover(false)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          innerRef={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {task.content}
          {onHover && (
            <div style={{ position: "relative" }}>
              <StyledDelete onClick={deleteTask}>X</StyledDelete>
              <StyledEdit onClick={editTask}>Edit</StyledEdit>
            </div>
          )}
        </Container>
      )}
    </Draggable>
  );
};

const StyledDelete = styled.span`
  position: absolute;
  right: 0px;
  bottom: 0px;
`;
const StyledEdit = styled.span`
  position: absolute;
  right: 20px;
  bottom: 0px;
`;

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;
  &:hover {
    color: steelblue;
  }
  background-color: ${props =>
    props.isDragDisabled
      ? "lightgrey"
      : props.isDragging
      ? "steelblue"
      : "white"};
`;
export default Task;
