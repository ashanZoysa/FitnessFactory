//Navigation bar/header component
import axios from "axios";
import React from "react";

import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import "../styles/NavBar.css";

function NavBar() {

  const userLogOut = (e) => {

    axios.delete("http://localhost:8070/user/logout").then((res) => {
      console.log(res);
      window.location.href = "/";
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div>
      <Navbar
        sticky="top"
        bg="dark"
        variant="dark"
        expand="lg"
        className="navBar"
      >
        <Container>
          <Navbar.Brand href="#home">FitnessFactory</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Events</Nav.Link>
              <Nav.Link href="#link">Store</Nav.Link>

              <NavDropdown title="Admin" id="basic-nav-dropdown">
                <NavDropdown.Item href="/createAccountPage">User Accounts</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">Suppliers</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">Inventory</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">Financial</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href="/logout" onClick={userLogOut}>Log out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
