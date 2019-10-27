import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = ({ cookies }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/home">CodeVille</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/farm">Farm</Nav.Link>
        </Nav>
        <NavDropdown title={cookies.github_id} id="basic-nav-dropdown">
          <NavDropdown.Item href="/username">My Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;
