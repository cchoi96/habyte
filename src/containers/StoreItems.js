import React, { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const StoreItems = ({ items, setItems }) => {
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
    });
  }, []);

  const handleChange = event => {
    const itemName = event.target.name;
    const itemQuantity = event.target.value;
    let updatedItems = { ...items };
    updatedItems[itemName]["quantity"] = itemQuantity;
    setItems(updatedItems);
  };

  const StoreItemList = Object.keys(items).map(item => {
    return (
      <label className="item" key={items[item].name}>
        <div className="item-info">
          <div className="item-name">{items[item].name}</div>
          <div className="item-description">{items[item].description}</div>
          <div className="item-price-quantity-container">
            <div className="item-price">${items[item].price}/each</div>
            <div className="item-quantity-content">How Many Trees Do You Want To Plant Today? --> </div>
            <input
              className="item-quantity"
              onChange={event => handleChange(event)}
              id={items[item].name}
              type="number"
              name={items[item].name}
              min="0"
              max="99"
            />
          </div>
        </div>
        <img className="store-image" src={items[item].image_url} />
      </label>
    );
  });
  return (
    <StyledContainer>
      <StyledStoreItemList>{StoreItemList}</StyledStoreItemList>
    </StyledContainer>
  );
};

export default StoreItems;

const StyledStoreItemList = styled.div`
  display: flex;
  flex-wrap: wrap;
  .item {
    border: 1px solid green;
    border-radius: 5px;
    display: flex;
    height: 35vh;
    .store-image {
      width: 20vw;
    }
  }

  .item-info {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 20px;
  }

  .item-name {
    font-size: 35px;
  }

  .item-description {
    margin: 10px;
  }

  .item-price-quantity-container {
    display: flex;
    margin-left: 10px;
    justify-content: flex-start;
  }

  .item-price {
    margin-right: 30px;
    width: 20%;
  }
  
  .item-quantity-content {
    width: 40%;
    font-size: 0.8em;
    margin-right: 8px;
    text-align: center;
  }


  .item-quantity {
    border: 0.5px solid black;
    border-radius: 5px;
    width: 5vw;
    text-align: center;
  }



  .store-image {
    border: 3px #009933 solid;
    border-radius: 5px;
    height: 200px;
    width: 200px;
    align-self: center;
    margin-right: 10px;
  }
`;

const StyledContainer = styled.div`
  width: 100%;
`;
