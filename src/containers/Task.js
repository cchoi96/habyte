import React, { useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index, projectState, setProjectState }) => {
  const [onHover, setOnHover] = useState(false);

  const deleteTask = () => {
    console.log("task", task);
    console.log("index", index);
    console.log("projectState", projectState);
    let temp = projectState;
    delete temp.tasks[task.id];
    setProjectState(temp);
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
            <>
              <div onClick={deleteTask}>X</div>
              <div onClick={editTask}>Edit</div>
            </>
          )}
        </Container>
      )}
    </Draggable>
  );
};

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
