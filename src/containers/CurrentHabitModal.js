import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../../node_modules/react-vis/dist/style.css";
import styled from "styled-components";
import axios from "axios";
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
  const [modalData, setModalData] = useState();
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
    },
    overlay: {
      zIndex: "999"
    }
  };
  let habit_history = [];

  useEffect(() => {
    axios
      .get(`http://0.0.0.0:8080/user/project/${habit.id}`)
      .then(res => res.data)
      .then(data => {
        console.log(data);
        for (let [index, val] of data.entries()) {
          habit_history.push({ x: index, y: val.counter });
        }
        console.log(habit_history);
        setModalData(habit_history);
      });
  }, []);

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
          <LineMarkSeries data={modalData} />
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
