import React, { useState, useCallback, memo } from "react";
import {
  Form,
  Button,
  Container,
  Alert,
  Card,
  InputGroup,
} from "react-bootstrap";
import { Envelope, Lock, Person } from "react-bootstrap-icons";
import { useAuth } from '../context/AuthContext';

const GOLD_GRADIENT = "linear-gradient(135deg, #d4af37 0%, #b8860b 100%)";
const INPUT_STYLE = {
  borderColor: "#d4af37",
  boxShadow: "0 0 5px rgba(212, 175, 55, 0.2)",
};

const Login = memo(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = await login({ email, password });
      if (!success) {
        throw new Error("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [email, password, login]);

  return (
    <div className="d-flex min-vh-100 bg-lightgolden">
      <Container className="d-flex align-items-center justify-content-center">
        <Card
          className="shadow-lg border-0 rounded-4"
          style={{
            maxWidth: "500px",
            background: "linear-gradient(145deg, #fffcf5, #ffffff)",
            border: "2px solid transparent",
            backgroundImage: `linear-gradient(white, white), ${GOLD_GRADIENT}`,
            backgroundOrigin: "border-box",
            backgroundClip: "content-box, border-box",
          }}
        >
          <Card.Body className="p-4 p-md-5">
            <div className="text-center mb-4">
              <div
                className="rounded-circle d-inline-flex p-3 mb-3"
                style={{
                  background: GOLD_GRADIENT,
                  boxShadow: "0 4px 20px rgba(212, 175, 55, 0.3)",
                }}
              >
                <Person className="text-white" size={28} />
              </div>
              <h3 className="mb-2 fw-bold text-darkgold">Welcome Back</h3>
              <p className="text-muted mb-0">Sign in to continue</p>
            </div>

            {error && (
              <Alert
                variant="warning"
                className="d-flex align-items-center py-2 mb-4"
                style={{
                  background: "#fff9e6",
                  border: "2px solid #d4af37",
                  borderRadius: "10px",
                }}
              >
                <i className="bi bi-exclamation-circle-fill me-2 text-gold"></i>
                <span className="small">{error}</span>
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold text-darkgold">
                  Email
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text
                    className="bg-light border-end-0"
                    style={{ borderColor: "#d4af37" }}
                  >
                    <Envelope className="text-gold" size={18} />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="user@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={INPUT_STYLE}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="small fw-semibold text-darkgold">
                  Password
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text
                    className="bg-light border-end-0"
                    style={{ borderColor: "#d4af37" }}
                  >
                    <Lock className="text-gold" size={18} />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={INPUT_STYLE}
                  />
                </InputGroup>
              </Form.Group>

              <Button
                className="w-100 fw-bold py-2 rounded-3"
                type="submit"
                disabled={isLoading}
                style={{
                  background: GOLD_GRADIENT,
                  border: "none",
                  transition: "all 0.3s ease",
                }}
              >
                {isLoading ? (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                ) : null}
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>

              <div className="text-center small mt-4">
                New user?{" "}
                <a
                  href="/register"
                  className="text-decoration-none text-gold hover-gold"
                >
                  Create Account
                </a>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
});

export default Login;