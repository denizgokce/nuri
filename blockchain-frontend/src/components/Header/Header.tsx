import React from "react";
import styles from "./Header.module.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Header = () => (
  <Navbar bg="light" expand="lg" className={styles.Header} data-testid="Header" fixed={"top"}>
    <Container>
      <Navbar.Brand href="#home">Blockchain</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavLink to="/">Home</NavLink>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Header;
