import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../../node_modules/react-vis/dist/style.css";
import styled from "styled-components";
import axios from "axios";
import { XYPlot, XAxis, YAxis, LineMarkSeries } from "react-vis";

// import "../node_modules/react-vis/dist/style.css";

const CurrentHabitModal = ({ habit, setIsStatsOpen, isStatsOpen }) => {
  const [modalData, setModalData] = useState([{ x: 0, y: 0 }]);

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
      height: "max-content",
      backgroundColor: backgroundColor(habit.category_name),
      height: "max-content",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      paddingTop: "0px",
      borderRadius: "10px"
    },
    overlay: {
      zIndex: "999"
    }
  };

  useEffect(() => {
    axios
      .get(`http://0.0.0.0:8080/user/project/${habit.id}`)
      .then(res => res.data)
      .then(data => {
        const habit_history = [];

        for (let [index, val] of data.entries()) {
          habit_history.push({ x: index + 1, y: val.counter });
        }
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
        <StyledFlexColumn>
          <StyledFlexDiv>
            <StyledTitle category_name={habit.category_name}>
              {habit.name}
            </StyledTitle>
          </StyledFlexDiv>
          <img
            src={`/assets/crops/${habit.crop_name}/${habit.crop_name}_Stage_${habit.crop_state}.png`}
            alt=""
          />
          <div>Stats</div>
          <p>Habit created on {habit.created_at.slice(0, 10)}</p>
          <p>
            Current habit progress: {habit.counter} / {habit.frequency} for the
            week
          </p>
          {modalData.length > 1 && (
            <XYPlot width={400} height={300}>
              <XAxis tickValues={[1, 2, 3, 4]} />
              <YAxis tickValues={[0, 1, 2, 3, 4, 5, 6, 7]} />
              <LineMarkSeries
                data={[{ x: 0, y: 0 }, ...modalData]}
                animation={"noWobble"}
              />
            </XYPlot>
          )}
        </StyledFlexColumn>
      </Modal>
    </div>
  );
};

export default CurrentHabitModal;

const StyledFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
`;
const StyledTitle = styled.h2`
  color: white;
  text-align: center;
  width: 75%;
  margin: 0 auto 10px auto;
  padding: 5px 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  justify-self: center;
  background-color: ${props =>
    props.category_name === "coding"
      ? "rgba(34, 167, 240, 1)"
      : props.category_name === "health"
      ? "rgba(247, 78, 82, 1)"
      : props.category_name === "finance"
      ? "rgba(248, 148, 6, 1)"
      : props.category_name === "misc"
      ? "rgba(145, 61, 136, 1)"
      : "rgba(36, 204, 143, 1)"};
`;

const StyledFlexDiv = styled.div`
  display: flex;
  align-items: flex-end;
`;
