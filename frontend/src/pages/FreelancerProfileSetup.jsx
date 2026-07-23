import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function FreelancerProfileSetup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    profession: "",
    skills: "",
    experience: "",
    portfolioLink: "",
    bio: "",
    hourlyRate: "",
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

      // Client fields
      companyName: "",
      companyWebsite: "",
      industry: "",
      location: "",

      // Freelancer fields
      profession: formData.profession,
      skills: formData.skills,
      experience: Number(formData.experience),
      portfolioLink: formData.portfolioLink,
      bio: formData.bio,
      hourlyRate: Number(formData.hourlyRate),
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
            🚀
          </div>

          <span
            className="badge rounded-pill px-3 py-2 mb-3"
            style={{
              backgroundColor: "#e8f5e9",
              color: "#198754",
              fontSize: "0.8rem",
            }}
          >
            Freelancer Profile
          </span>

          <h4 className="fw-bold mb-1" style={{ color: "#1f2937" }}>
            Set up your{" "}
            <span style={{ color: "#198754" }}>
              Freelancer Profile
            </span>
          </h4>

          <p
            className="text-muted"
            style={{ fontSize: "0.9rem" }}
          >
            Help clients find you by showcasing your skills and experience.
          </p>
        </div>

        {/* Profession */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            Profession
          </label>

          <input
            type="text"
            name="profession"
            className="form-control"
            placeholder="Full Stack Developer"
            value={formData.profession}
            onChange={handleChange}
          />
        </div>

        {/* Skills */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            Skills
          </label>

          <input
            type="text"
            name="skills"
            className="form-control"
            placeholder="Java, Spring Boot, React"
            value={formData.skills}
            onChange={handleChange}
          />

          <small className="text-muted">
            Separate skills with commas
          </small>
        </div>

        {/* Experience + Hourly Rate */}
        <div className="row mb-3">
          <div className="col">
            <label className="form-label fw-semibold">
              Experience
            </label>

            <input
              type="number"
              name="experience"
              className="form-control"
              placeholder="2"
              value={formData.experience}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <label className="form-label fw-semibold">
              Hourly Rate
            </label>

            <input
              type="number"
              name="hourlyRate"
              className="form-control"
              placeholder="500"
              value={formData.hourlyRate}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Portfolio */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            Portfolio Link
          </label>

          <input
            type="text"
            name="portfolioLink"
            className="form-control"
            placeholder="https://github.com/username"
            value={formData.portfolioLink}
            onChange={handleChange}
          />
        </div>

        {/* Bio */}
        <div className="mb-4">
          <label className="form-label fw-semibold">
            Bio
          </label>

          <textarea
            rows="4"
            name="bio"
            className="form-control"
            placeholder="Tell clients about yourself..."
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
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

export default FreelancerProfileSetup;