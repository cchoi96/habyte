import React, { useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index, projectState, setProjectState, columnid }) => {
  const [onHover, setOnHover] = useState(false);

  const deleteTask = () => {
    console.log("task", task);
    console.log("index", index);

    let temp = { ...projectState };
    delete temp.tasks[task.id];
    temp.columns[columnid].taskIds = temp.columns[columnid].taskIds.filter(
      ele => ele != task.id
    );
    setProjectState(temp);
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
              {/* <StyledEdit onClick={editTask}>Edit</StyledEdit> */}
            </div>
          )}
        </Container>
      )}
    </Draggable>
  );
};

const StyledDelete = styled.div`
  position: absolute;
  right: 0px;
  bottom: 0px;
`;
const StyledEdit = styled.div`
  position: absolute;
  left: 0px;
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
