import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function ClientProfileSetup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    companyWebsite: "",
    industry: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCompleteProfile = async () => {
    const commonData = JSON.parse(
      sessionStorage.getItem("registerData")
    );

    if (!commonData) {
      alert("Registration data not found.");
      navigate("/register");
      return;
    }

    const finalData = {
      ...commonData,

      companyName: formData.companyName,
      companyWebsite: formData.companyWebsite,
      industry: formData.industry,
      location: formData.location,

      // Freelancer fields
      profession: "",
      skills: "",
      experience: 0,
      portfolioLink: "",
      bio: "",
      hourlyRate: 0,
    };

    try {
      await registerUser(finalData);

      sessionStorage.removeItem("registerData");

      alert("Registration Successful!");

      navigate("/login");
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message || "Registration Failed");
      } else {
        alert("Unable to connect to server.");
      }
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
          maxWidth: "480px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        }}
      >
        {/* HEADER */}
        <div className="text-center mb-4">
          <div
            className="mx-auto mb-3 d-flex align-items-center justify-content-center"
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "#e8f5e9",
              fontSize: "1.6rem",
            }}
          >
            💼
          </div>

          <span
            className="badge rounded-pill px-3 py-2 mb-3"
            style={{
              backgroundColor: "#e8f5e9",
              color: "#198754",
              fontSize: "0.8rem",
            }}
          >
            Client Profile
          </span>

          <h4 className="fw-bold mb-1" style={{ color: "#1f2937" }}>
            Set up your <span style={{ color: "#198754" }}>Client Profile</span>
          </h4>

          <p
            className="text-muted"
            style={{ fontSize: "0.9rem" }}
          >
            Tell us about your company so freelancers know who they're working with.
          </p>
        </div>

        {/* Company Name */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            Company Name
          </label>

          <input
            type="text"
            name="companyName"
            className="form-control"
            placeholder="ABC Technologies"
            value={formData.companyName}
            onChange={handleChange}
          />
        </div>

        {/* Website */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            Company Website
          </label>

          <input
            type="text"
            name="companyWebsite"
            className="form-control"
            placeholder="https://company.com"
            value={formData.companyWebsite}
            onChange={handleChange}
          />
        </div>

        {/* Location + Industry */}
        <div className="row mb-4">
          <div className="col">
            <label className="form-label fw-semibold">
              Location
            </label>

            <input
              type="text"
              name="location"
              className="form-control"
              placeholder="Pune"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <label className="form-label fw-semibold">
              Industry
            </label>

            <input
              type="text"
              name="industry"
              className="form-control"
              placeholder="IT"
              value={formData.industry}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Button */}
        <button
          className="btn w-100 fw-semibold"
          onClick={handleCompleteProfile}
          style={{
            background: "linear-gradient(135deg,#198754,#157347)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "11px",
          }}
        >
          Complete Registration
        </button>
      </div>
    </div>
  );
}

export default ClientProfileSetup;