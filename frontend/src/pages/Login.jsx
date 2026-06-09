import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { users } from "../data/dummyData";
import Navbar from "../components/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      alert(`Welcome ${user.name} (${user.role})`);
      if (user.role === "CLIENT") {
        navigate("/client");
      } else if (user.role === "FREELANCER") {
        navigate("/freelancer");
      }
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #dff6e4 0%, #ffffff 50%, #eef7ff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px",
      }}
    >
     
      <div
        className="bg-white rounded-4 p-4 p-md-5"
        style={{
          width: "100%",
          maxWidth: "420px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        }}
      >
        {/* HEADER */}
        <div className="text-center mb-4">
          <span
            className="badge rounded-pill px-3 py-2 mb-3"
            style={{ backgroundColor: "#e8f5e9", color: "#198754", fontSize: "0.8rem" }}
          >
            Welcome Back
          </span>
          <h4 className="fw-bold mb-1" style={{ color: "#1f2937" }}>
            Sign in to <span style={{ color: "#198754" }}>GigConnect</span>
          </h4>
          <p className="text-muted" style={{ fontSize: "0.9rem" }}>
            Enter your credentials to continue
          </p>
        </div>

        {/* EMAIL */}
        <div className="mb-3">
          <label className="form-label fw-semibold" style={{ fontSize: "0.85rem", color: "#374151" }}>
            Email address
          </label>
          <input
            className="form-control"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ borderRadius: "10px", border: "1px solid #d1d5db", padding: "10px 14px" }}
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-1">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <label className="form-label fw-semibold mb-0" style={{ fontSize: "0.85rem", color: "#374151" }}>
              Password
            </label>
            {/* FORGOT PASSWORD LINK */}
            <Link
              to="/forgot-password"
              style={{ fontSize: "0.8rem", color: "#198754", textDecoration: "none", fontWeight: 600 }}
            >
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            className="form-control"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            style={{ borderRadius: "10px", border: "1px solid #d1d5db", padding: "10px 14px" }}
          />
        </div>

        {/* ERROR */}
        {error && (
          <div
            className="mt-3 mb-1 px-3 py-2 rounded-3 text-center"
            style={{
              background: "#fef2f2",
              color: "#dc2626",
              fontSize: "0.875rem",
              border: "1px solid #fecaca",
            }}
          >
            {error}
          </div>
        )}

        {/* LOGIN BUTTON */}
        <button
          className="btn w-100 fw-semibold mt-3 mb-4"
          onClick={handleLogin}
          style={{
            background: "linear-gradient(135deg, #198754, #157347)",
            color: "#fff",
            borderRadius: "10px",
            padding: "11px",
            border: "none",
          }}
        >
          Log In
        </button>

        {/* SIGN UP LINK */}
        <p className="text-center text-muted mb-0" style={{ fontSize: "0.875rem" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#198754", textDecoration: "none", fontWeight: 600 }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
