import React from "react";
import Modal from "react-modal";
import "../../node_modules/react-vis/dist/style.css";
import styled from "styled-components";
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
      width: "50%",
      overflow: "scroll",
      height: "60vh",
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
        <StyledFlexDiv>
          <img
            src={`/assets/crops/${habit.crop_name}/${habit.crop_name}_Stage_${habit.crop_state}.png`}
            alt=""
          />
          <h2>{habit.name}</h2>
        </StyledFlexDiv>
        <div>Stats</div>
        <p>Habit created on {habit.created_at.slice(0, 10)}</p>
        <p>
          Current habit progress: {habit.counter} / {habit.frequency} for the
          week
        </p>

        <p></p>
        <XYPlot width={400} height={300}>
          <XAxis />
          <YAxis />
          {/* <HorizontalGridLines />
          <VerticalGridLines /> */}
          <LineMarkSeries data={data} />
        </XYPlot>

        <button onClick={closeModal}>close</button>
      </Modal>
    </div>
  );
};

export default CurrentHabitModal;

const StyledFlexDiv = styled.div`
  display: flex;
  align-items: flex-end;
`;
