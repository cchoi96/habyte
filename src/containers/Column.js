import React, { useState } from "react";
import styled from "styled-components";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import NewTask from "../components/NewTask";
const Column = ({ column, projectState, setProjectState, tasks }) => {
  let [newTask, setNewTask] = useState(false);
  let [addTaskButton, setAddTaskButton] = useState(true);
  let addATask = addTaskButton ? "New Task" : "Close";

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
              <Task
                columnid={column.id}
                key={task.id}
                task={task}
                index={index}
                projectState={projectState}
                setProjectState={setProjectState}
              />
            ))}
            {provided.placeholder}
            {newTask && (
              <NewTask
                setNewTask={setNewTask}
                setProjectState={setProjectState}
                columnId={column.id}
                projectState={projectState}
                addTaskButton={addTaskButton}
                setAddTaskButton={setAddTaskButton}
              />
            )}
            <StyledDiv
              onClick={() => {
                setNewTask(!newTask);
                setAddTaskButton(!addTaskButton);
              }}
            >
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
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 7.5px 7.5px 15px 7.5px;
  :first-child {
    margin-left: 15px;
  }
  width: 40%;
  min-width: 200px;
  height: fit-content;
  border-radius: 10px;
  overflow-y: auto;
  box-shadow: rgba(26, 24, 29, 0.16) 0px 2px 2px 0px,
    rgba(26, 24, 29, 0.12) 0px 1px 4px 0px;
  @media only screen and (max-width: 950px) {
    min-width: 60%;
  }
`;
const Title = styled.h3`
  overflow-wrap: break-word;
  padding: 8px;
  margin-bottom: 0;
  text-align: center;
  font-weight: 600;
  height: 100%;
  color: #fff;
  background-color: rgba(140, 218, 254.5, 1);
`;
const TaskList = styled.div`
  padding: 8px;
  background-color: white;
  flex-grow: 1;
  width: 100%;
  min-height: 100px;
  height: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
