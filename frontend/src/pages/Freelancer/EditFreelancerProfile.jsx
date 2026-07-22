import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Freelancer/Sidebar";
import { freelancerProfiles } from "../../data/dummyData";

function EditFreelancerProfile() {
  const navigate = useNavigate();

  // Pre-fill with existing profile data
  const profile = freelancerProfiles.find((p) => p.freelancer_id === 6);

  const [formData, setFormData] = useState({
    profession: profile?.title || "",
    skills: profile?.skills || "",
    experience: profile?.experience || "",
    portfolioLink: profile?.portfolio || "",
    bio: profile?.bio || "",
    hourlyRate: profile?.hourlyRate || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // In phase 1 — just navigate back
    // Later: call PUT /api/freelancer/profile/{userId} with formData
    navigate("/profile");
  };

  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-md-2">
          <Sidebar />
        </div>

        <div className="col-md-10">
          <div className="card shadow-sm border-0 p-4">

            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 className="fw-bold mb-1" style={{ color: "#1f2937" }}>
                  ✏ Edit Profile
                </h4>
                <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
                  Update your freelancer profile details
                </p>
              </div>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => navigate("/profile")}
              >
                ← Back to Profile
              </button>
            </div>

            <hr />

            {/* PROFESSION */}
            <div className="mb-3">
              <label className="form-label fw-semibold" style={{ fontSize: "0.85rem", color: "#374151" }}>
                Profession <small className="text-muted fw-normal">(max 100 characters)</small>
              </label>
              <input
                type="text"
                name="profession"
                className="form-control"
                placeholder="e.g. Full Stack Developer"
                maxLength={100}
                value={formData.profession}
                onChange={handleChange}
                style={{ borderRadius: "10px", border: "1px solid #d1d5db", padding: "10px 14px" }}
              />
            </div>

            {/* SKILLS */}
            <div className="mb-3">
              <label className="form-label fw-semibold" style={{ fontSize: "0.85rem", color: "#374151" }}>
                Skills <small className="text-muted fw-normal">(max 200 characters, comma separated)</small>
              </label>
              <input
                type="text"
                name="skills"
                className="form-control"
                placeholder="e.g. Java, React, MySQL"
                maxLength={200}
                value={formData.skills}
                onChange={handleChange}
                style={{ borderRadius: "10px", border: "1px solid #d1d5db", padding: "10px 14px" }}
              />
            </div>

            {/* EXPERIENCE + HOURLY RATE — side by side */}
            <div className="d-flex gap-3 mb-3">
              <div className="flex-fill">
                <label className="form-label fw-semibold" style={{ fontSize: "0.85rem", color: "#374151" }}>
                  Experience (years) <small className="text-muted fw-normal">(min 0)</small>
                </label>
                <input
                  type="number"
                  name="experience"
                  className="form-control"
                  placeholder="e.g. 2"
                  min="0"
                  step="0.5"
                  value={formData.experience}
                  onChange={handleChange}
                  style={{ borderRadius: "10px", border: "1px solid #d1d5db", padding: "10px 14px" }}
                />
              </div>

              <div className="flex-fill">
                <label className="form-label fw-semibold" style={{ fontSize: "0.85rem", color: "#374151" }}>
                  Hourly Rate (₹) <small className="text-muted fw-normal">(greater than 0)</small>
                </label>
                <input
                  type="number"
                  name="hourlyRate"
                  className="form-control"
                  placeholder="e.g. 500"
                  min="0.01"
                  step="0.01"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  style={{ borderRadius: "10px", border: "1px solid #d1d5db", padding: "10px 14px" }}
                />
              </div>
            </div>

            {/* PORTFOLIO LINK */}
            <div className="mb-3">
              <label className="form-label fw-semibold" style={{ fontSize: "0.85rem", color: "#374151" }}>
                Portfolio Link <small className="text-muted fw-normal">(GitHub / LinkedIn)</small>
              </label>
              <input
                type="url"
                name="portfolioLink"
                className="form-control"
                placeholder="e.g. https://github.com/yourprofile"
                value={formData.portfolioLink}
                onChange={handleChange}
                style={{ borderRadius: "10px", border: "1px solid #d1d5db", padding: "10px 14px" }}
              />
            </div>

            {/* BIO */}
            <div className="mb-4">
              <label className="form-label fw-semibold" style={{ fontSize: "0.85rem", color: "#374151" }}>
                Bio <small className="text-muted fw-normal">(max 500 characters)</small>
              </label>
              <textarea
                name="bio"
                className="form-control"
                placeholder="Tell clients about yourself..."
                rows={4}
                maxLength={500}
                value={formData.bio}
                onChange={handleChange}
                style={{ borderRadius: "10px", border: "1px solid #d1d5db", padding: "10px 14px", resize: "none" }}
              />
              <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                {formData.bio.length}/500 characters
              </small>
            </div>

            {/* ACTIONS */}
            <div className="d-flex gap-3">
              <button
                className="btn fw-semibold px-4"
                onClick={handleSave}
                style={{
                  background: "linear-gradient(135deg, #198754, #157347)",
                  color: "#fff",
                  borderRadius: "10px",
                  padding: "10px 24px",
                  border: "none",
                }}
              >
                Save Changes
              </button>

              <button
                className="btn btn-outline-secondary fw-semibold px-4"
                onClick={() => navigate("/freelancer/profile")}
                style={{ borderRadius: "10px" }}
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default EditFreelancerProfile;
