import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

const Header = ({ cookies, setMode, className, userCoin }) => {
  let userCoinInfo = userCoin ? userCoin : 0;
  return (
    <StyledNavbar collapseOnSelect expand="md" className={className}>
      <StyledBrand>habyte</StyledBrand>
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
          </NavDropdown>
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
  font-size: 1.1em;
  color: #fff;
  background: rgba(36, 204, 143);
  #basic-nav-dropdown,
  #responsive-navbar-nav a {
    background-color: rgba(36, 204, 143);
    color: #fff;

    &:hover {
      font-weight: 900;
      border-bottom: 1px solid #ffffff
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
    margin-right: 100px;
  }
`;

const StyledBrand = styled(Navbar)`
  font-family: "Roboto", sans-serif;
  font-size: 1.5em;
`;

export default Header;

// .navbar-nav > a {
//   display: flex;
//   width: 100%;
// }

// @media only screen and (max-width: 992px) {
//   .navbar {
//     display: flex;
//     justify-content: center;
//   }

//   .nav-link {
//     text-align: center;
//   }

//   .navbar-nav {
//     width: 80%;
//     border: 1px solid black;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }

// .navbar-nav {
//   display: flex;
//   justify-content: space-around;
//   text-align: center;
//   margin: 0px 30px;
// }

// .dropdown-toggle {
//   margin: 0px auto;
//   text-align: center;

// }

// .nav-link,
// .navbar-right {
//   margin: 0px 30px;
// }
