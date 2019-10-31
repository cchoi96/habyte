import React from "react";
import Modal from "react-modal";
import {
  XYPlot,
  LineSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  LineMarkSeries
} from "react-vis";
// import "../node_modules/react-vis/dist/style.css";

const CurrentHabitModal = ({ habit, setIsStatsOpen, isStatsOpen }) => {
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

  const data = new Array(19).fill(0).reduce(
    (prev, curr) => [
      ...prev,
      {
        x: prev.slice(-1)[0].x + 1,
        y: prev.slice(-1)[0].y * (0.9 + Math.random() * 0.2)
      }
    ],
    [{ x: 0, y: 10 }]
  );

  // Required to set link modal to react app
  Modal.setAppElement(document.getElementById("root"));

  const openModal = () => {
    setIsStatsOpen(true);
  };

  const closeModal = e => {
    e.stopPropagation();
    setIsStatsOpen(false);
  };

  const closeHabitModal = e => {
    e.preventDefault();
    closeModal();
  };

  console.log(habit);
  return (
    <div>
      <Modal
        isOpen={isStatsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Habit Modal"
      >
        <h2>{habit.name}</h2>
        <div>Graph thingy goes here</div>
        <XYPlot width={400} height={300}>
          <XAxis />
          <YAxis />
          <HorizontalGridLines />
          <VerticalGridLines />
          <LineMarkSeries data={data} />
        </XYPlot>
        ;<button onClick={closeModal}>close</button>
      </Modal>
    </div>
  );
};

export default CurrentHabitModal;
