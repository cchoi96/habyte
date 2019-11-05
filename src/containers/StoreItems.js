import React, { useEffect, useState } from "react";
import StoreModal from "./StoreModal";
import axios from "axios";
import styled from "styled-components";

const StoreItems = ({ items, setItems, buyItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [buyingItem, setBuyingItem] = useState([]);

  useEffect(() => {
    axios.get(`http://0.0.0.0:8080/store`).then(res => {
      let response = {};
      for (let data of res.data) {
        response[data.name] = {
          name: data.name,
          price: data.price,
          description: data.description,
          quantity: 0,
          image_url: data.image_url
        };
      }
      setItems(response);
      console.log(response);
    });
  }, []);

  const StoreItemList = Object.keys(items).map(item => {
    return (
      <div
        className="item"
        key={items[item].name}
        onClick={() => {
          setIsOpen(true);
          setBuyingItem(items[item]);
        }}
      >
        <h5 className="item-name">{items[item].name}</h5>
        <img className="store-image" src={items[item].image_url} />
        <div className="item-price">
          <img
            src="/assets/other/coin.png"
            alt="coin"
            style={{ width: "25px" }}
          />{" "}
          {items[item].price}
        </div>
      </div>
    );
  });
  return (
    <StyledContainer>
      <StyledStoreItemList>{StoreItemList}</StyledStoreItemList>
      {isOpen && (
        <StoreModal
          buyingItem={buyingItem}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          buyItem={buyItem}
        />
      )}
    </StyledContainer>
  );
};

export default StoreItems;

const StyledStoreItemList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin: 0 auto;
  justify-content: center;
  color: #fff;
  img {
    width: 80px;
  }

  .item {
    width: 40%;
    padding: 20px;
    margin: 10px 2.5%;
    border-radius: 10px;
    box-shadow: 0 2px 2px 0 rgba(26, 24, 29, 0.16),
      0 1px 4px 0 rgba(26, 24, 29, 0.12);
    height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url("/assets/other/shop-background.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center bottom;
    cursor: pointer;
    position: relative;

    &:hover {
      opacity: 0.8;
    }

    .item-name,
    .item-price {
      position: absolute;
    }

    .item-price {
      bottom: 10px;
    }

    .item-name {
      top: 5px;
    }
  }

  @media only screen and (max-width: 400px) {
    .item {
      width: 100%;
    }
  }
`;

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
