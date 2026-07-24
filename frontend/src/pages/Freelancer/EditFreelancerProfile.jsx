import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/Freelancer/Sidebar";
import { freelancerProfiles } from "../../data/dummyData";

// TODO: Replace with logged-in user's freelancer ID once auth is wired
const FREELANCER_ID = JSON.parse(localStorage.getItem("user"))?.id; 

function EditFreelancerProfile() {
  const navigate = useNavigate();

  const profile = freelancerProfiles.find((p) => p.freelancer_id === FREELANCER_ID);

  const [formData, setFormData] = useState({
    profession: profile?.title || "",
    skills: profile?.skills || "",
    experience: profile?.experience || "",
    portfolioLink: profile?.portfolio || "",
    bio: profile?.bio || "",
    hourlyRate: profile?.hourlyRate || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // PATCH /freelancers/{id}
      await axios.patch(`http://localhost:8080/freelancers/${FREELANCER_ID}`, {
        profession: formData.profession,
        skills: formData.skills,
        experience: parseFloat(formData.experience),
        portfolioLink: formData.portfolioLink,
        bio: formData.bio,
        hourlyRate: parseFloat(formData.hourlyRate),
      });

      setSuccess("Profile updated successfully!");
      setTimeout(() => navigate("/profile"), 1200);
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to update profile. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
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

            {/* SUCCESS / ERROR ALERTS */}
            {success && (
              <div className="alert alert-success py-2 mb-3" style={{ borderRadius: "10px" }}>
                ✅ {success}
              </div>
            )}
            {error && (
              <div className="alert alert-danger py-2 mb-3" style={{ borderRadius: "10px" }}>
                ⚠️ {error}
              </div>
            )}

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
                disabled={loading}
                style={{
                  background: loading ? "#9ca3af" : "linear-gradient(135deg, #198754, #157347)",
                  color: "#fff",
                  borderRadius: "10px",
                  padding: "10px 24px",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>

              <button
                className="btn btn-outline-secondary fw-semibold px-4"
                onClick={() => navigate("/profile")}
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
