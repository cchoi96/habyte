import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

const Header = ({ cookies, setMode, className, userCoin }) => {
  let userCoinInfo = userCoin ? userCoin : 0;
  return (
    <StyledNavbar collapseOnSelect expand="md" className={className}>
      <StyledBrand>
        <img
          style={{ width: "100px", height: "60px" }}
          src="/assets/other/Habytelogo.png"
          alt=""
        />
      </StyledBrand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={() => setMode("farm")}>Farm</Nav.Link>
          <Nav.Link onClick={() => setMode("store")}>Store</Nav.Link>
          <NavDropdown
            title="Categories"
            id="basic-nav-dropdown"
            className="navbar-right"
          >
            <NavDropdown.Item
              className="item"
              onClick={() => setMode("coding")}
            >
              Coding
            </NavDropdown.Item>
            <NavDropdown.Item
              className="item"
              onClick={() => setMode("health")}
            >
              Health
            </NavDropdown.Item>
            <NavDropdown.Item
              className="item"
              onClick={() => setMode("finance")}
            >
              Finance
            </NavDropdown.Item>
            <NavDropdown.Item className="item" onClick={() => setMode("misc")}>
              Misc
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <div id="coin">
            <img
              src="/assets/other/coin.png"
              style={{ width: "25px" }}
              alt="coin"
            />{" "}
            {userCoinInfo}
          </div>
          <NavDropdown
            title={cookies.name || cookies.github_id}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item className="item" href="/logout">
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </StyledNavbar>
  );
};

const StyledNavbar = styled(Navbar)`
  font-family: "Roboto", sans-serif;
  font-weight: 550;
  font-size: 1.5em;
  color: #fff;
  background: rgba(36, 204, 143);
  box-shadow: 0 4px 10px 0 rgba(0,81,131,0.12);
  #basic-nav-dropdown,
  #responsive-navbar-nav a {
    background-color: rgba(36, 204, 143);
    color: #fff;
    &:hover {
      font-weight: 900;
    }
  }
  .dropdown-menu.show {
    background-color: rgba(36, 204, 143);
    border: none;
  }


  .dropdown-menu.show a:hover {
    background-color: rgba(36, 204, 143);
  }

  .dropdown.nav-item > .dropdown-toggle.nav-link {
    margin-right: 20px;
  }

  #coin {
    text-align: center;
    display: flex;
    align-items: center
    margin-right: 15px
    padding: 0px 10px;
  }

  @media only screen and (max-width: 767px) {
    .nav-link, .dropdown-toggle, .dropdown-item {
      width: 100%;
      text-align: center;
      margin-top: 5px;
    }

    #coin {
      justify-content: center;
      border: none;
      box-shadow: none;
      width: 100%;
      margin-top: 5px;

      &:hover {
        border-radius: 0px;
        cursor: pointer;
        font-weight: 900;
      }
    }
  }
`;

const StyledBrand = styled(Navbar)`
  font-family: "Roboto", sans-serif;
  font-size: 1.5em;
`;

export default Header;
