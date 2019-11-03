import React, { useState } from "react";
import styled from "styled-components";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import NewTask from "../components/NewTask";
const Column = ({ key, column, projectState, setProjectState, tasks }) => {
  let [newTask, setNewTask] = useState(false);
  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id} type="TASK">
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            innerRef={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
            {newTask && (
              <NewTask
                setNewTask={setNewTask}
                setProjectState={setProjectState}
                columnId={column.id}
                projectState={projectState}
              />
            )}
            <StyledDiv onClick={() => setNewTask(!newTask)}>
              + Add new task
            </StyledDiv>
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};
export default Column;

const StyledDiv = styled.div`
  &:hover {
    cursor: pointer;
    color: red;
  }
`;

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 300px;
  display: flex;
  min-width: 25%;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? "grey" : "white")};
  flex-grow: 1;
  width: 100%;
  min-height: 100px;
`;
