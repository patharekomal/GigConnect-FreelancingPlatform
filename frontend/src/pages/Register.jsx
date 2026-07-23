import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


function Register() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("CLIENT");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = () => {
  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  // Store common registration data
  const commonData = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    password: formData.password,
    role: selectedRole,
  };

  sessionStorage.setItem(
    "registerData",
    JSON.stringify(commonData)
  );

  // Navigate to next page
  if (selectedRole === "CLIENT") {
    navigate("/client-profile-setup");
  } else {
    navigate("/freelancer-profile-setup");
  }
};

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #dff6e4 0%, #ffffff 50%, #eef7ff 100%)",
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
          maxWidth: "460px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        }}
      >
        {/* HEADER */}
        <div className="text-center mb-4">
          <span
            className="badge rounded-pill px-3 py-2 mb-3"
            style={{
              backgroundColor: "#e8f5e9",
              color: "#198754",
              fontSize: "0.8rem",
            }}
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
          style={{
            background: "#f3f4f6",
            border: "1px solid #e5e7eb",
          }}
        >
          {["CLIENT", "FREELANCER"].map((role) => (
            <label
              key={role}
              className="flex-fill text-center py-2 rounded-3 fw-semibold"
              onClick={() => setSelectedRole(role)}
              style={{
                cursor: "pointer",
                fontSize: "0.9rem",
                color: selectedRole === role ? "#fff" : "#374151",
                background:
                  selectedRole === role
                    ? "linear-gradient(135deg, #198754, #157347)"
                    : "#fff",
                border:
                  selectedRole === role
                    ? "1px solid #157347"
                    : "1px solid #e5e7eb",
                transition: "all 0.2s ease",
              }}
            >
              <input
                type="radio"
                className="d-none"
                checked={selectedRole === role}
                readOnly
              />

              {role === "FREELANCER"
                ? "🚀 Freelancer"
                : "💼 Client"}
            </label>
          ))}
        </div>

        {/* FIRST + LAST NAME */}
        <div className="d-flex gap-2 mb-3">
          <input
            type="text"
            name="firstName"
            className="form-control"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            style={{
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              padding: "10px 14px",
            }}
          />

          <input
            type="text"
            name="lastName"
            className="form-control"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            style={{
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              padding: "10px 14px",
            }}
          />
        </div>

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          className="form-control mb-3"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          style={{
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            padding: "10px 14px",
          }}
        />

        {/* PHONE */}
        <input
          type="tel"
          name="phone"
          className="form-control mb-3"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          style={{
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            padding: "10px 14px",
          }}
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          className="form-control mb-3"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={{
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            padding: "10px 14px",
          }}
        />

        {/* CONFIRM PASSWORD */}
        <input
          type="password"
          name="confirmPassword"
          className="form-control mb-4"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          style={{
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            padding: "10px 14px",
          }}
        />

        {/* REGISTER BUTTON */}
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
        <p
          className="text-center text-muted mb-0"
          style={{ fontSize: "0.875rem" }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#198754",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;