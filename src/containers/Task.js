import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index }) => {
  const isDragDisabled = task.id === "task-1";
  return (
    <Draggable
      draggableId={task.id}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          innerRef={provided.innerRef}
          isDragging={snapshot.isDragging}
          isDragDisabled={isDragDisabled}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;


const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin: 0 auto;
  margin-bottom: 8px;
  width: 95%;
  border-radius: 10px;
  &:hover {
    color: steelblue;
  }

`;


// background-color: ${props =>
//   props.isDragDisabled
//     ? "lightgrey"
//     : props.isDragging
//     ? "steelblue"
//     : "white"};