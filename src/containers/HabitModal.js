import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import styled from "styled-components";

const HabitModal = ({
  setIsOpen,
  isOpen,
  github_id,
  habit_name,
  refreshSpecificHabits,
  updateHabits
}) => {
  // Formula to convert colors to colors with 0.5 opacity but have 1 opacity
  const backgroundColor = habit => {
    return habit === "coding"
      ? `rgba(${67 * 0.5 + 255 * 0.5}, ${40 * 0.5 + 255 * 0.5}, ${116 * 0.5 +
          255 * 0.5}, 1)`
      : habit === "health"
      ? `rgba(${247 * 0.5 + 255 * 0.5}, ${78 * 0.5 + 255 * 0.5}, ${82 * 0.5 +
          255 * 0.5}, 1)`
      : habit === "finance"
      ? `rgba(${248 * 0.5 + 255 * 0.5}, ${148 * 0.5 + 255 * 0.5}, ${6 * 0.5 +
          255 * 0.5}, 1)`
      : habit === "misc"
      ? `rgba(${145 * 0.5 + 255 * 0.5}, ${61 * 0.5 + 255 * 0.5}, ${136 * 0.5 +
          255 * 0.5}, 1)`
      : `rgba(${36 * 0.5 + 255 * 0.5}, ${204 * 0.5 + 255 * 0.5}, ${143 * 0.5 +
          255 * 0.5}, 1)`;
  };

  const customStyles = {
    content: {
      width: "30%",
      minWidth: "300px",
      overflow: "scroll",
      height: "auto",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      backgroundColor: backgroundColor(habit_name),
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      color: "#fff",
      padding: "0 20px 20px 20px"
    },
    overlay: {
      zIndex: "999"
    }
  };

  const pickCrop = () => {
    const cropNumber = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
    const cropName =
      cropNumber === 1
        ? "blueberry"
        : cropNumber === 2
        ? "corn"
        : cropNumber === 3
        ? "eggplant"
        : cropNumber === 4
        ? "grape"
        : cropNumber === 5
        ? "melon"
        : cropNumber === 6
        ? "pumpkin"
        : cropNumber === 7
        ? "strawberry"
        : "sunflower";
    return cropName;
  };

  const [newHabit, setNewHabit] = useState({
    habit: "",
    frequency: 0,
    notes: "",
    type: habit_name,
    crop: pickCrop()
  });

  // Required to set link modal to react app
  Modal.setAppElement(document.getElementById("root"));

  const closeModal = () => {
    setIsOpen(false);
  };

  const saveHabit = event => {
    event.preventDefault();
    closeModal();
    axios
      .post("http://0.0.0.0:8080/habit-save", {
        newHabit,
        github_id
      })
      .then(() => {
        refreshSpecificHabits(github_id, habit_name);
      })
      .then(() => {
        updateHabits(github_id);
      });
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel="Habit Modal"
      >
        <StyledTitle habit_name={habit_name}>New Habit!</StyledTitle>

        <StyledForm>
          <StyledInputs>
            <input
              placeholder="Habit"
              type="text"
              name="habit_name"
              id="habit"
              required
              onChange={event => {
                event.persist();
                setNewHabit(prev => ({
                  ...prev,
                  ...(prev["habit"] = event.target.value)
                }));
              }}
            />
          </StyledInputs>
          <StyledInputs>
            <input
              placeholder="Times per week"
              type="number"
              name="frequency"
              id="frequency"
              onChange={event => {
                event.persist();
                setNewHabit(prev => ({
                  ...prev,
                  ...(prev["frequency"] = event.target.value)
                }));
              }}
              required
            />
          </StyledInputs>
          <StyledInputs>
            <textarea
              id="notes"
              placeholder="Notes"
              onChange={event => {
                event.persist();
                setNewHabit(prev => ({
                  ...prev,
                  ...(prev["notes"] = event.target.value)
                }));
              }}
            ></textarea>
          </StyledInputs>
          <StyledButton onClick={saveHabit}>Submit</StyledButton>
        </StyledForm>
      </Modal>
    </div>
  );
};

export default HabitModal;

const StyledTitle = styled.h2`
  text-align: center;
  width: 75%;
  margin: 0 auto 10px auto;
  padding: 5px 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  justify-self: center;
  background-color: ${props =>
    props.habit_name === "coding"
      ? "rgba(34, 167, 240, 1)"
      : props.habit_name === "health"
      ? "rgba(247, 78, 82, 1)"
      : props.habit_name === "finance"
      ? "rgba(248, 148, 6, 1)"
      : props.habit_name === "misc"
      ? "rgba(145, 61, 136, 1)"
      : "rgba(36, 204, 143, 1)"};
`;

const StyledButton = styled.button`
  margin: 0 20px 0 20px;
  border-radius: 5px;
  border: 2px solid rgba(136, 54, 0);
  background-color: rgba(172, 79, 1, 1);
  color: #fff;
  box-shadow: 0 2px 2px 0 rgba(26, 24, 29, 0.16),
    0 1px 4px 0 rgba(26, 24, 29, 0.12);
  cursor: pointer;
  outline: none;

  :hover {
    background-color: rgba(172, 79, 1, 0.85);
  }
`;
const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const StyledInputs = styled.div`
  width: 100%;
  margin: 10px;
  text-align: center;
  -webkit-appearance: none;
  input,
  textarea {
    border-radius: 5px;
    padding-left: 5px;
    border: none;
    box-shadow: 0 2px 2px 0 rgba(26, 24, 29, 0.16),
      0 1px 4px 0 rgba(26, 24, 29, 0.12);
  }
`;
