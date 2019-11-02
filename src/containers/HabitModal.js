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
  const customStyles = {
    content: {
      width: "30%",
      overflow: "scroll",
      height: "auto",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      backgroundColor: "lightgrey",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
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

  const openModal = () => {
    setIsOpen(true);
  };

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
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Habit Modal"
      >
        <StyledTitle>New Habit!</StyledTitle>
        <StyledButton onClick={closeModal}>x</StyledButton>

        <StyledForm>
          <StyledInputs>
            <input
              placeholder="Habit:"
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
              placeholder="Frequency:"
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
              placeholder="Notes: "
              onChange={event => {
                event.persist();
                setNewHabit(prev => ({
                  ...prev,
                  ...(prev["notes"] = event.target.value)
                }));
              }}
            ></textarea>
          </StyledInputs>
          <button onClick={saveHabit}>Submit</button>
        </StyledForm>
      </Modal>
    </div>
  );
};

export default HabitModal;

const StyledTitle = styled.h2`
  text-align: center;
`;

const StyledButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
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
`;
