import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

const Header = ({ cookies, setMode, className, userCoin }) => {
  console.log("userCoin inside navbar -> ", userCoin);
  if (userCoin) {
    let userCoinInfo = userCoin[0]["coin"];
    return (
      <StyledNavbar className={className} expand="lg">
        <StyledBrand onClick={() => setMode("farm")}>habyte</StyledBrand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" id="toggle" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav.Link onClick={() => setMode("farm")}>Farm</Nav.Link>
          <Nav.Link>Categories</Nav.Link>
          <Nav.Link onClick={() => setMode("store")}>Store</Nav.Link>
          <Nav.Link>{userCoinInfo} Coin!</Nav.Link>
          <NavDropdown
            title={cookies.name || cookies.github_id}
            id="basic-nav-dropdown"
            className="navbar-right"
          >
            <NavDropdown.Item href="/username">My Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </StyledNavbar>
    );
  }
  return <div></div>;
};

const StyledNavbar = styled(Navbar)`
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  font-size: 1.1em;
  color: #fff;
  background: rgba(36, 204, 143);
  #basic-nav-dropdown,
  #basic-navbar-nav a {
    color: #fff;
  }
  .dropdown-menu.show {
    background-color: rgba(36, 204, 143);
    border: none;
  }
  .dropdown-menu.show a:hover {
    background-color: rgba(36, 204, 143);
  }
`;

const StyledBrand = styled(Navbar)`
  font-family: "Roboto", sans-serif;
  font-size: 1.5em;
`;

export default Header;
