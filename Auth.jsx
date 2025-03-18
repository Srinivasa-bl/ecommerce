import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsSignup(!isSignup);
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
      style={{ paddingTop: '60px' }} // Add padding to push content down
    >
      <Card className="shadow-lg p-4 rounded-4 border-0" style={{ width: "350px", background: "#fff" }}>
        <h2 className="text-center fw-bold mb-4">{isSignup ? "Create Account" : "Welcome Back"}</h2>

        <Form>
          {isSignup && (
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" required className="p-2" />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required className="p-2" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" required className="p-2" />
          </Form.Group>

          <Button variant="dark" className="w-100 fw-semibold p-2 rounded-3">
            {isSignup ? "Signup" : "Signin"}
          </Button>
        </Form>

        <div className="text-center mt-3">
          <p className="mb-0">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              className="text-primary fw-bold"
              style={{ cursor: "pointer" }}
              onClick={toggleAuthMode}
            >
              {isSignup ? "Signin" : "Signup"}
            </span>
          </p>
        </div>
      </Card>
    </Container>
  );
};

export default Auth;