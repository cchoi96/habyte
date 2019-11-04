import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

const StoreModal = ({ buyingItem, setIsOpen, isOpen, className, buyItem }) => {
  const customStyles = {
    content: {
      width: "65%",
      overflow: "scroll",
      height: "70vh",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      textAlign: "left",
      backgroundColor: "#f8f9fa",
      borderRadius: "10px"
    },
    overlay: {
      zIndex: "999"
    }
  };

  Modal.setAppElement(document.getElementById("root"));

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      className={className}
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      buyingItem={buyingItem}
      buyItem={buyItem}
    >
      <StyledDiv className="content">
        <h2>{buyingItem.name}</h2>
        <img
          src={buyingItem.image_url}
          alt={buyingItem.name}
          className="tree"
        />
        <div className="infoBox">
          <img
            src="/assets/other/lewis_chat.png"
            alt="chatbox"
            className="chatbox"
          />
          <div className="info">
            <p>{buyingItem.description}</p>
            <p id="price">
              <img
                src="/assets/other/coin.png"
                alt="coin"
                style={{ width: "25px" }}
              />{" "}
              {buyingItem.price}
              <button
                onClick={() => {
                  closeModal();
                  buyItem(buyingItem);
                }}
              >
                Plant
              </button>
            </p>
          </div>
        </div>
      </StyledDiv>
    </Modal>
  );
};

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .tree {
    width: 10%;
    min-width: 75px;
  }
  .chatbox {
    width: 100%;
    height: 200px;
    border-radius: 5px
  }
  .infoBox {
    position: relative;
  }
  .info {
    position: absolute;
    width: 90%;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;

    #price {
      margin: 0 auto;
      button {
        margin-left: 10px;
      }
    }

  }
  button {
    width: 70px;
    margin: 0 auto;
    border-radius: 5px;
    border: 2px solid rgba(136, 54, 0);
    background-color: rgba(172, 79, 1, 1);
    color: #fff;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    outline: none;
  }

  button:hover {
    background-color: rgba(172, 79, 1, 0.85);
  }

  @media only screen and (max-width: 830px) {
    .chatbox {
      height: 250px;
    }
  }

  @media only screen and (max-width: 420px) {
    .chatbox {
      height: 350px;
    }
  }

  @media only screen and (max-width: 350px) {
    .chatbox {
      height: 400px;
    }
  }
  }
`;

export default StoreModal;
