import React, { useState } from "react";
import styled from "styled-components";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import NewTask from "../components/NewTask";
const Column = ({ key, column, projectState, setProjectState, tasks }) => {
  let [newTask, setNewTask] = useState(false);
  let isShown = true;
  let addATask;
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
            <StyledDiv id="add-new-task-button" onClick={() => {

              console.log(isShown)
              console.log(addATask)
              setNewTask(!newTask)
              }}> 
              {addATask}
            </StyledDiv>
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};
export default Column;

const StyledDiv = styled.div`
  text-align: center;
  margin-top: 5px;
  &:hover {
    cursor: pointer;
    background-color: rgba(200,133,63,0.8);
    color: #ffffff;
    border-radius: 10px;
  }
`;

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: fit-content;
  display: flex;
  justify-content: center;
  min-width: 25%;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 1px 1px 2px 1px;
  &: hover {
    cursor: pointer;
    transform: scale(1.01);
  }
`;
const Title = styled.h3`
  padding: 8px;
  text-align: center;
  font-weight: 700;

`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? "grey" : "white")};
  flex-grow: 1;
  width: 100%;
  min-height: 100px;
  height: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;


`;
