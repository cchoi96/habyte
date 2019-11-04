import React, { useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import axios from "axios";

const Task = ({ task, index, projectState, setProjectState, columnid }) => {
  const [onHover, setOnHover] = useState(false);
  const [inEdit, setInEdit] = useState(false);
  const [editText, setEditText] = useState("asdf");
  const deleteTask = () => {
    let temp = { ...projectState };
    delete temp.tasks[task.id];
    temp.columns[columnid].taskIds = temp.columns[columnid].taskIds.filter(
      ele => ele != task.id
    );
    setProjectState(temp);

    axios
      .delete("http://0.0.0.0:8080/projects/tasks", {
        data: { task: task.id }
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  const editTask = () => {
    setEditText("");
    setInEdit(prev => !prev);
  };
  const blurtask = e => {
    if (editText.length > 0) {
      submitEdit(e);
    } else {
      setInEdit(false);
    }
  };
  const submitEdit = e => {
    e.preventDefault();
    if (editText.length > 0) {
      setProjectState(prev => ({
        ...prev,
        ...(prev.tasks[task.id].content = editText)
      }));
      axios.post("http://0.0.0.0:8080/projects/tasks/edit", {
        task: task,
        new: editText
      });
      setInEdit(false);
    }
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
          {!inEdit && task.content}
          {inEdit && (
            <StyledForm onSubmit={submitEdit}>
              <input
                autoFocus
                onBlur={blurtask}
                onChange={e => setEditText(e.currentTarget.value)}
              />
              <input type="submit" value="Edit" />
            </StyledForm>
          )}
          {onHover && !inEdit && (
            <div style={{ position: "relative" }}>
              <StyledDelete onClick={deleteTask}>X</StyledDelete>
              <StyledEdit onClick={editTask}>Edit</StyledEdit>
            </div>
          )}
        </Container>
      )}
    </Draggable>
  );
};

const StyledForm = styled.form`
  width: 100%;
  display: flex;
`;

const StyledDelete = styled.span`
  position: absolute;
  right: 0px;
  bottom: 0px;
`;
const StyledEdit = styled.span`
  position: absolute;
  right: 20px;
  bottom: 0px;
`;

const Container = styled.div`
  border: 1px solid rgba(140, 218, 254.5, 1);
  border-radius: 2px;
  padding: 8px;
  margin: 10px auto;
  width: 95%;
  border-radius: 10px;
  text-align: left;
  padding-left: 10px;
  &:hover {
    color: steelblue;
  }
`;
export default Task;

// background-color: ${props =>
//   props.isDragDisabled
//     ? "lightgrey"
//     : props.isDragging
//     ? "steelblue"
//     : "white"};
