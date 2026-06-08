import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

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
      <Navbar />
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
          <div
            className="mx-auto mb-3 d-flex align-items-center justify-content-center"
            style={{ width: "56px", height: "56px", borderRadius: "14px", background: "#e8f5e9", fontSize: "1.6rem" }}
          >
            🔒
          </div>
          <span
            className="badge rounded-pill px-3 py-2 mb-3"
            style={{ backgroundColor: "#e8f5e9", color: "#198754", fontSize: "0.8rem" }}
          >
            Set New Password
          </span>
          <h4 className="fw-bold mb-1" style={{ color: "#1f2937" }}>
            Reset your <span style={{ color: "#198754" }}>password</span>
          </h4>
          <p className="text-muted" style={{ fontSize: "0.9rem" }}>
            Choose a new password for your account.
          </p>
        </div>

        {/* NEW PASSWORD */}
        <div className="mb-3">
          <label className="form-label fw-semibold" style={{ fontSize: "0.85rem", color: "#374151" }}>
            New Password
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ borderRadius: "10px", border: "1px solid #d1d5db", padding: "10px 14px" }}
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="mb-4">
          <label className="form-label fw-semibold" style={{ fontSize: "0.85rem", color: "#374151" }}>
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="••••••••"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            style={{ borderRadius: "10px", border: "1px solid #d1d5db", padding: "10px 14px" }}
          />
        </div>

        {/* SUBMIT — redirects to login regardless */}
        <button
          className="btn w-100 fw-semibold mb-3"
          onClick={() => navigate("/login")}
          style={{
            background: "linear-gradient(135deg, #198754, #157347)",
            color: "#fff",
            borderRadius: "10px",
            padding: "11px",
            border: "none",
          }}
        >
          Update Password
        </button>

        <p className="text-center text-muted mb-0" style={{ fontSize: "0.875rem" }}>
          <Link to="/login" style={{ color: "#198754", textDecoration: "none", fontWeight: 600 }}>
            ← Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
