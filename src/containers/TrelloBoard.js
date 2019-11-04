import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import Column from "./Column";
import axios from "axios";
import NewColumn from "./NewColumn";

const TrelloBoard = ({ projectState, setProjectState, projectSelected }) => {
  const [newColumn, setNewColumn] = useState(false);

  let onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = projectState.columns[source.droppableId];
    const finish = projectState.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      const newState = {
        ...projectState,
        columns: {
          ...projectState.columns,
          [newColumn.id]: newColumn
        }
      };

      setProjectState(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };

    const newState = {
      ...projectState,
      columns: {
        ...projectState.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };
    setProjectState(newState);

    axios.post("http://0.0.0.0:8080/project/category/task", {
      task_id: draggableId,
      category_id: finish.id
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StyledTrelloBoard>
        {projectState.columnOrder.map(columnId => {
          const column = projectState.columns[columnId];
          const tasks = column.taskIds.map(
            taskId => projectState.tasks[taskId]
          );
          return (
            <StyledColumn
              projectState={projectState}
              setProjectState={setProjectState}
              key={column.id}
              column={column}
              tasks={tasks}
            />
          );
        })}
        <div id="new-column">
          <StyledAddNewColumn onClick={() => {
            setNewColumn(!newColumn)
            }}>
            Add New Column
          </StyledAddNewColumn>
          {newColumn && (
            <NewColumn
              projectState={projectState}
              projectSelected={projectSelected}
              setNewColumn={setNewColumn}
              setProjectState={setProjectState}
            />
          )}
        </div>
      </StyledTrelloBoard>
    </DragDropContext>
  );
};

const StyledTrelloBoard = styled.div`
  padding: 2%;
  display: flex;
  background-color: rgba(67, 40, 116, 0.4);
  width: 100%;
  overflow-x: scroll;
  border-radius: 10px;
  justify-content: flex-start;

    
  #new-column {
    display: flex;
    justify-content: flex-start;
    height: fit-content;
    width: 20%;
    flex-wrap: wrap;
  }
`;

const StyledColumn = styled(Column)`
  height: 100%;
  border: 1px solid green;
`;

const StyledAddNewColumn = styled.div`

  height: auto;
  width: 100%;
  margin: 5%;
  padding: 5%;
  text-align: center;
  border-radius: 10px;
  background-color: rgba(205,133,63,0.8);
  font-weight: 500;
  box-shadow: 0.5px 0.5px 1px 1px;
  margin-bottom: 20px;
  min-width: 100px;
  margin-right: 20px;



  &:hover {
    cursor: pointer;
    background-color: rgba(212,126,48,0.9);
    transform: scale(1.05);
    color: #ffffff
  }
`;

export default TrelloBoard;
