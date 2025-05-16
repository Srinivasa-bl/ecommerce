import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FiLock, FiMail, FiTool, FiLoader } from "react-icons/fi";

const ArtisanLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("artisanToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (
          Date.now() < decoded.exp * 1000 &&
          decoded.role === "ROLE_ARTISAN"
        ) {
          navigate("/artisan/dashboard", { replace: true });
        }
      } catch (err) {
        localStorage.removeItem("artisanToken");
        localStorage.removeItem("artisanId");
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/artisan/auth/login",
        credentials
      );

      if (response.data.token) {
        const decoded = jwtDecode(response.data.token);
        localStorage.setItem("artisanToken", response.data.token);
        localStorage.setItem("artisanId", decoded.artisanId); // Updated to artisanId
        navigate("/artisan/dashboard", { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.error || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-pattern">
      <div
        className="card border-0 shadow-luxe rounded-xxl overflow-hidden mx-auto"
        style={{ width: "100%", maxWidth: "440px" }}
      >
        <div className="card-header bg-primary text-center py-5 position-relative">
          <div
            className="position-absolute w-100 h-100 top-0 start-0 opacity-10"
            style={{
              background:
                "url(data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' fill='%23fff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E)",
            }}
          />
          <FiTool className="fs-2 text-secondary mb-3" />
          <h1 className="h3 fw-semibold text-white mb-2">Artisan Atelier</h1>
          <p className="text-secondary-200 mb-0">Master Craftsman Portal</p>
        </div>

        <div className="card-body p-4 p-xl-5 bg-white">
          {error && (
            <div className="alert alert-luxe mb-4" role="alert">
              <div className="d-flex align-items-center gap-2">
                <FiLoader className="flex-shrink-0" />
                <div className="small">{error}</div>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="needs-validation" noValidate>
            <div className="mb-4">
              <div className="form-floating">
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                  required
                />
                <label htmlFor="email" className="text-muted">
                  <FiMail className="me-2" /> Email Address
                </label>
              </div>
            </div>

            <div className="mb-4">
              <div className="form-floating">
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  required
                />
                <label htmlFor="password" className="text-muted">
                  <FiLock className="me-2" /> Password
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 py-3 fw-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FiLoader className="spinner me-2" />
                  Authenticating...
                </>
              ) : (
                "Access Atelier"
              )}
            </button>
          </form>

          <div className="text-center mt-4 pt-3 border-top border-light">
            <p className="small text-muted mb-2">
              New to the guild?{" "}
              <Link
                to="/artisan-register"
                className="text-decoration-none text-primary-hover"
              >
                Join exclusive collective
              </Link>
            </p>
            <Link
              to="/forgot-password"
              className="small text-decoration-none text-muted-hover"
            >
              Recover master key
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        :root {
          --primary: #b89b5e;
          --secondary: #2a3d66;
          --accent: #eaeaea;
          --light: #fdfdfd;
        }

        .bg-pattern {
          background-color: var(--light);
          background-image: radial-gradient(
              var(--primary) 0.5px,
              transparent 0.5px
            ),
            radial-gradient(var(--primary) 0.5px, var(--light) 0.5px);
          background-size: 20px 20px;
          background-position: 0 0, 10px 10px;
        }

        .btn-primary {
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          border: none;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          color: var(--accent);
          font-weight: bold;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(184, 155, 94, 0.4);
        }

        .alert-luxe {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid var(--primary);
          border-left: 4px solid var(--secondary);
          border-radius: 0.75rem;
          backdrop-filter: blur(4px);
          color: var(--secondary);
        }

        .form-control {
          border-radius: 0.75rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          padding: 1rem 1.25rem;
          transition: all 0.3s ease;
          background: var(--light);
          color: var(--secondary);
        }

        .form-control:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(184, 155, 94, 0.1);
        }

        .text-primary-hover {
          color: var(--primary);
          transition: all 0.3s ease;
        }

        .text-primary-hover:hover {
          color: var(--secondary);
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) rotate(45deg);
          }
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .card {
          border: none;
          border-radius: 1rem;
          background: linear-gradient(135deg, var(--light), #ffffff);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }

        .card-header {
          padding: 1.5rem;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          color: var(--accent);
          text-align: center;
          font-size: 1.25rem;
          font-weight: bold;
        }

        .card-body {
          padding: 2rem;
          background: var(--light);
        }
      `}</style>
    </div>
  );
};

export default ArtisanLogin;