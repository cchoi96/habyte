import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

const HabitModal = ({
  setIsOpen,
  isOpen,
  github_id,
  habit_name,
  refreshSpecificHabits
}) => {
  const customStyles = {
    content: {
      width: "100%",
      overflow: "scroll",
      height: "80vh",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
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
        <h2>New Habit!</h2>
        <button onClick={closeModal}>close</button>
        <form>
          <label>Habit: </label>
          <input
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
          <label>Frequency: </label>
          <input
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
          <label>Notes: </label>
          <textarea
            id="notes"
            onChange={event => {
              event.persist();
              setNewHabit(prev => ({
                ...prev,
                ...(prev["notes"] = event.target.value)
              }));
            }}
          ></textarea>
          <button onClick={saveHabit}>Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default HabitModal;
