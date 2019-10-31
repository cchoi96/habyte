import React, { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

const Header = ({ cookies, setMode, className }) => {
  return (
    <StyledNavbar className={className} expand="lg">
      <StyledBrand onClick={() => setMode("farm")}>habyte</StyledBrand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link onClick={() => setMode("new-habits")}>New Habits</Nav.Link>
          <Nav.Link href="/new-habits">Past Habits</Nav.Link>
        </Nav>
        <NavDropdown title={cookies.github_id} id="basic-nav-dropdown">
          <NavDropdown.Item href="/username">My Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    </StyledNavbar>
  );
};

const StyledNavbar = styled(Navbar)`
  font-size: 1.1em;
  background: inherit;
`;

const StyledBrand = styled(Navbar)`
  font-size: 1.5em;
`;

export default Header;
