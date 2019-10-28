import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import Column from "./Column";
import axios from "axios";
import NewColumn from "./NewColumn";
const Container = styled.div`
  display: flex;
`;

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
      <Container>
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
        {newColumn && (
          <NewColumn
            projectState={projectState}
            projectSelected={projectSelected}
            setNewColumn={setNewColumn}
            setProjectState={setProjectState}
          />
        )}
        <StyledAddNewColumn onClick={() => setNewColumn(!newColumn)}>
          Add new column
        </StyledAddNewColumn>
      </Container>
    </DragDropContext>
  );
};
const StyledAddNewColumn = styled.div`
  &:hover {
    cursor: pointer;
    color: red;
  }
`;
export default TrelloBoard;
