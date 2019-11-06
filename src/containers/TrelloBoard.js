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
            <Column
              projectState={projectState}
              setProjectState={setProjectState}
              key={column.id}
              column={column}
              tasks={tasks}
            />
          );
        })}
        <div id="new-column">
          <StyledAddNewColumn
            onClick={() => {
              setNewColumn(!newColumn);
            }}
          >
            <div id="add-project">
              <img src="/assets/other/white-plus.png"></img>
            </div>
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
  display: flex;
  height: 68%;
  background-color: rgba(25, 181, 254, 0.7);
  width: 95%;
  overflow-x: scroll;
  border-top: 1px solid
    rgba(
      ${25 * 0.5 + 255 * 0.5},
      ${181 * 0.5 + 255 * 0.5},
      ${254 * 0.5 + 255 * 0.5},
      1
    );
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  justify-content: flex-start;
  padding-top: 7.5px;
  #new-column {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: fit-content;
    width: 150px;
  }

  @media only screen and (max-width: 950px) {
    height: 64.5%;
  }
`;

const StyledAddNewColumn = styled.div`
  #add-project {
    height: 60px;
    width: 60px;
    margin-top: 7.5px;
    transition: 0.1s ease-out;
    border-radius: 10px;
    box-shadow: rgba(26, 24, 29, 0.16) 0px 2px 2px 0px,
      rgba(26, 24, 29, 0.12) 0px 1px 4px 0px;
    background-color: rgba(
      ${25 * 0.5 + 255 * 0.5},
      ${181 * 0.5 + 255 * 0.5},
      ${254 * 0.5 + 255 * 0.5},
      1
    );
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
    &:hover {
      cursor: pointer;
      transform: scale(1.05);
    }
  }
  img {
    width: 40px;
    height: 40px;
    margin: 0px 10px;
  }
`;

export default TrelloBoard;
