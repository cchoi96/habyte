import React, { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

const Header = ({ cookies, setMode, className, userCoin }) => {
  if (userCoin) {
    let userCoinInfo = userCoin[0]["coin"];
    return (
      <StyledNavbar collapseOnSelect expand="md" className={className}>
        <Navbar.Brand>habyte</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => setMode("farm")}>Farm</Nav.Link>
            <NavDropdown
              title="Categories"
              id="basic-nav-dropdown"
              className="navbar-right"
            >
              <NavDropdown.Item onClick={() => setMode("coding")}>
                Coding
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => setMode("health")}>
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
              <NavDropdown.Item href="/username">My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
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
  width: 95%;
  margin: 0 auto;
  .dropdown:hover .dropdown-menu {
    display: block;
    margin-right: 20%;
  }
  .dropdown-toggle:after {
    content: none;
  }
`;

export default Header;
