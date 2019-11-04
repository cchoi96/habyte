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
            <div className="item-quantity-content">please, buy some 🌲...</div>
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
  justify-content: center;
  .item {
    width: 90%;
    border: 1px solid green;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    
    margin-bottom: 5vh;
    box-shadow: 0 2px 1px 0.6px;

    &:hover {
      box-shadow: 0px 3px 4px 2px;
      cursor: pointer;
    }
    background-color:#fff
  }

  .item-info {
    display: flex;
    flex-wrap: wrap;
    width: 60%;
    margin: 20px;
  }

  .item-name {
    font-size: 35px;
    color: rgba(36, 140, 143, 1);
    font-weight: 500;
  }

  .item-description {
    margin: 10px;
    margin-top: 3px;
    border: 0.5px solid rgba(36, 160, 143, 1);
    border-radius: 10px;
    padding: 20px;
    align-self: center;
  }

  .item-price-quantity-container {
    display: flex;
    margin-left: 20px;
    justify-content: flex-start;
    align-items: center;
  }

  .item-price {
    margin-right: 30px;
    width: 20%;
  }
  
  .item-quantity-content {
    font-size: 0.9em;
    margin-right: 1px;
    text-align: right;
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
    margin-right: 15px;
  }

  @media only screen and (max-width: 1024px) {
    .item {
      height: initial
      flex-direction: column;
      justify-content: center;
    }

    .item-name {
      margin: 5px auto;
    }

    .item-info {
      width: 90%;
      margin: 10px auto;
    }

    .item-description {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      margin-top: 5px;
    }
    
    .item-quantity {
      width: 8vh;
    }

    .item-price-quantity-container {
      margin: 10px auto;
    }

    .store-image {
      margin-bottom: 20px;
    }
  }

  @media only screen and (max-width: 420px) {
    .item-price-quantity-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

    }
    .item-price {
      text-align: center;
      width: 100%;
      margin-bottom: 5px;
    }

    .item-quantity-content {
      width: 100%;
      text-align: center;
      margin-bottom: 5px;
    }

    .item-quantity {
      width: 25%;
    }

  }

`;

const StyledContainer = styled.div`
  width: 100%;
`;
