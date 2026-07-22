import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Register() {
  const [selectedRole, setSelectedRole] = useState("Client");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (selectedRole === "Freelancer") {
      navigate("/freelancer-profile-setup");
} else {
      navigate("/client-profile-setup");
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
        style={{ width: "100%", maxWidth: "460px", border: "1px solid #e5e7eb", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
      >
        {/* HEADER */}
        <div className="text-center mb-4">
          <span
            className="badge rounded-pill px-3 py-2 mb-3"
            style={{ backgroundColor: "#e8f5e9", color: "#198754", fontSize: "0.8rem" }}
          >
            Get Started Free
          </span>
          <h4 className="fw-bold mb-1" style={{ color: "#1f2937" }}>
            Join <span style={{ color: "#198754" }}>GigConnect</span>
          </h4>
          <p className="text-muted" style={{ fontSize: "0.9rem" }}>
            Create your account in seconds
          </p>
        </div>

        {/* ROLE SELECTOR */}
        <div
          className="d-flex gap-2 mb-4 p-1 rounded-3"
          style={{ background: "#f3f4f6", border: "1px solid #e5e7eb" }}
        >
          {["Freelancer", "Client"].map((role) => (
            <label
              key={role}
              className="flex-fill text-center py-2 rounded-3 fw-semibold"
              onClick={() => setSelectedRole(role)}
              style={{
                cursor: "pointer",
                fontSize: "0.9rem",
                color: selectedRole === role ? "#fff" : "#374151",
                background: selectedRole === role
                  ? "linear-gradient(135deg, #198754, #157347)"
                  : "#fff",
                border: selectedRole === role ? "1px solid #157347" : "1px solid #e5e7eb",
                transition: "all 0.2s ease",
              }}
            >
              <input type="radio" name="role" value={role} className="d-none" readOnly checked={selectedRole === role} />
              {role === "Freelancer" ? "🚀 " : "💼 "}{role}
            </label>
          ))}
        </div>

        {/* FIRST NAME + LAST NAME — side by side */}
        <div className="d-flex gap-2 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="firstName"
            style={{ borderRadius: "10px", border: "1px solid #d1d5db", padding: "10px 14px" }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="lastName"
            style={{ borderRadius: "10px", border: "1px solid #d1d5db", padding: "10px 14px" }}
          />
        </div>

        {/* EMAIL */}
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email address"
          style={{ borderRadius: "10px", border: "1px solid #d1d5db", padding: "10px 14px" }}
        />

        {/* PHONE NUMBER */}
        <input
          type="tel"
          className="form-control mb-3"
          placeholder="Phone number"
          style={{ borderRadius: "10px", border: "1px solid #d1d5db", padding: "10px 14px" }}
        />

        {/* PASSWORD */}
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          style={{ borderRadius: "10px", border: "1px solid #d1d5db", padding: "10px 14px" }}
        />

        {/* CONFIRM PASSWORD */}
        <input
          type="password"
          className="form-control mb-4"
          placeholder="Confirm Password"
          style={{ borderRadius: "10px", border: "1px solid #d1d5db", padding: "10px 14px" }}
        />

        {/* SUBMIT */}
        <button
          className="btn w-100 fw-semibold mb-3"
          onClick={handleRegister}
          style={{
            background: "linear-gradient(135deg, #198754, #157347)",
            color: "#fff",
            borderRadius: "10px",
            padding: "11px",
            border: "none",
          }}
        >
          Create Account
        </button>

        {/* LOGIN LINK */}
        <p className="text-center text-muted mb-0" style={{ fontSize: "0.875rem" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#198754", textDecoration: "none", fontWeight: 600 }}>
            Log in
          </Link>
        </p>
      </div>
      
    </div>
  );
}

export default Register;
