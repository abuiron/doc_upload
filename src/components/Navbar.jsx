import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Document Upload System</Navbar.Brand>
        <Button variant="danger" onClick={() => navigate("/")}>Logout</Button>
      </Container>
    </Navbar>
  );
};

export default NavBar;
