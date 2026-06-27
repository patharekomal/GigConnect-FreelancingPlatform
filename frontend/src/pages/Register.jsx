import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
function Register() {
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
        style={{ width: "100%", maxWidth: "420px", border: "1px solid #e5e7eb", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
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
              style={{
                cursor: "pointer",
                fontSize: "0.9rem",
                color: "#374151",
                background: "#fff",
                border: "1px solid #e5e7eb",
              }}
            >
              <input type="radio" name="role" value={role} className="d-none" />
              {role === "Freelancer" ? "🚀 " : "💼 "}{role}
            </label>
          ))}
        </div>

        {/* FIELDS */}
        {[
          { placeholder: "Full Name", type: "text" },
          { placeholder: "Email address", type: "email" },
          { placeholder: "Password", type: "password" },
          { placeholder: "Confirm Password", type: "password" },
        ].map(({ placeholder, type }) => (
          <input
            key={placeholder}
            type={type}
            className="form-control mb-3"
            placeholder={placeholder}
            style={{ borderRadius: "10px", border: "1px solid #d1d5db", padding: "10px 14px" }}
          />
        ))}

        {/* SUBMIT */}
        <button
          className="btn w-100 fw-semibold mb-3"
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
