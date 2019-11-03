import React, { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

const Header = ({ cookies, setMode, className, userCoin }) => {
  if (userCoin) {
    let userCoinInfo = userCoin[0]["coin"];
    return (
      <StyledNavbar collapseOnSelect expand="md" className={className}>
        <StyledBrand>habyte</StyledBrand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => setMode("farm")}>Farm</Nav.Link>
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
              <NavDropdown.Divider />
              <NavDropdown.Item
                className="item"
                onClick={() => setMode("health")}
              >
                Health
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={() => setMode("store")}>Store</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link>
              <img
                src="/assets/other/coin.png"
                style={{ width: "25px" }}
                alt="coin"
              />{" "}
              {userCoinInfo}
            </Nav.Link>
            <NavDropdown
              title={cookies.name || cookies.github_id}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item className="item" href="/username">
                My Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className="item" href="/logout">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </StyledNavbar>
    );
  } else {
    return <div></div>;
  }
};

const StyledNavbar = styled(Navbar)`
  width: 100%;
  margin: 0 auto;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  font-size: 1.1em;
  color: #fff;
  background: rgba(36, 204, 143);

  #basic-nav-dropdown,
  #responsive-navbar-nav a {
    background-color: rgba(36, 204, 143);
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
