import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";

export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState(""); // ✅ Add username state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", {
        name,
        username, // ✅ Send username
        email,
        password,
      });

      setMessage("Registration successful! You can now log in.");
      setName("");
      setUsername(""); // ✅ Clear username after submission
      setEmail("");
      setPassword("");
    } catch (err) {
      setMessage("Error registering user.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "22rem" }}>
        <Card.Body>
          <h3 className="text-center">Register</h3>
          {message && <Alert variant="info">{message}</Alert>}
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label> {/* ✅ Add Username Input */}
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Register
            </Button>
          </Form>
          <p className="text-center mt-3">
            Already have an account? <a href="/">Login</a>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}
