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
            +
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
  height: 70%;
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
    width: 100px;
  }
`;

const StyledAddNewColumn = styled.div`
  height: auto;
  margin-top: 7.5px;
  text-align: center;
  border-radius: 10px;
  color: #fff;
  box-shadow: rgba(26, 24, 29, 0.16) 0px 2px 2px 0px,
    rgba(26, 24, 29, 0.12) 0px 1px 4px 0px;
  background-color: rgba(
    ${25 * 0.5 + 255 * 0.5},
    ${181 * 0.5 + 255 * 0.5},
    ${254 * 0.5 + 255 * 0.5},
    1
  );
  min-width: 100px;
  transition: 0.1s ease-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
  }
`;

export default TrelloBoard;
