import React, { useState } from 'react';
import { Button, Navbar, Container, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', password: '', confirmPassword: '' });

  const [registrationConfirmation, setRegistrationConfirmation] = useState(null);
  const [loginConfirmation, setLoginConfirmation] = useState(null);

  const handleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
    setLoginConfirmation(null); // Reset confirmation message on modal open
  };

  const handleRegisterModal = () => {
    setShowRegisterModal(!showRegisterModal);
    setRegistrationConfirmation(null); // Reset confirmation message on modal open
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Make API call to login endpoint
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      console.log('Login Response:', data);
      // Handle response as needed (e.g., store token, redirect, etc.)
      setLoginConfirmation('Login successful!'); // Set confirmation message
    } catch (error) {
      console.error('Login Error:', error);
      setLoginConfirmation('Login failed. Please check your credentials.'); // Set confirmation message
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (registerData.password !== registerData.confirmPassword) {
        // Passwords do not match
        console.error('Passwords do not match');
        setRegistrationConfirmation('Registration failed. Passwords do not match.'); // Set confirmation message
        return;
      }

      // Make API call to register endpoint
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: registerData.username,
          password: registerData.password,
        }),
      });
      const data = await response.json();
      console.log('Register Response:', data);
      // Handle response as needed (e.g., store token, redirect, etc.)
      setRegistrationConfirmation('Registration successful!'); // Set confirmation message
    } catch (error) {
      console.error('Register Error:', error);
      setRegistrationConfirmation('Registration failed. Please try again.'); // Set confirmation message
    }
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Bloogpage (home)</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Button variant="outline-light" onClick={handleLoginModal} style={{ marginRight: '10px' }}>Login</Button>
            <Button variant="outline-light" onClick={handleRegisterModal}>Register</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <h1>Hello, welcome to my bloogpage!</h1>
      </Container>

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={handleLoginModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="loginUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
              Login
            </Button>
          </Form>
          {loginConfirmation && <p style={{ marginTop: '10px', color: 'green' }}>{loginConfirmation}</p>}
        </Modal.Body>
      </Modal>

      {/* Register Modal */}
      <Modal show={showRegisterModal} onHide={handleRegisterModal}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="registerUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={registerData.username}
                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="registerPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
              Register
            </Button>
          </Form>
          {registrationConfirmation && <p style={{ marginTop: '10px', color: 'green' }}>{registrationConfirmation}</p>}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
