import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/Client/Sidebar";
import { fetchClientById } from "../../services/clientService";
import api from "../../api/api";


// TODO: Replace with logged-in user's client ID once auth is wired
//const CLIENT_ID = JSON.parse(localStorage.getItem("user"))?.id;

function EditClientProfile() {
const navigate = useNavigate();

const user = JSON.parse(localStorage.getItem("user"));
const CLIENT_ID = JSON.parse(localStorage.getItem("user"))?.id;

if (!user) {
  navigate("/login");
  return null;
}

const clientId = user.id;

  const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  phone: "",
  companyName: "",
  companyWebsite: "",
  industry: "",
  location: "",
});

  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
 
  useEffect(() => {
  loadClient();
}, [clientId]);

const loadClient = async () => {
  try {
    const data = await fetchClientById(clientId);

    setClient(data);

    setFormData({
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      phone: data.phone || "",
      companyName: data.companyName || "",
      companyWebsite: data.companyWebsite || "",
      industry: data.industry || "",
      location: data.location || "",
    });

  } catch (error) {
    console.log(error);
  }
};


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");
  setLoading(true);

  try {
   await api.patch(
  `/client/${CLIENT_ID}`,
  formData
);

    setSuccess("Profile Updated Successfully!");

    // Refresh the latest data from backend
    await loadClient();

    setTimeout(() => {
      navigate("/client-profile");
    }, 1200);

  } catch (err) {
  console.log("Full Error:", err);
  console.log("Response:", err.response);
  console.log("Status:", err.response?.status);
  console.log("Data:", err.response?.data);

  const msg =
    err.response?.data?.error ||
    err.response?.data?.message ||
    "Failed to update profile. Please try again.";

  setError(msg);
}
};

  return (
    <>
      <style>{`
        body { background:#f8fafc; }
        .edit-card { border:none; border-radius:18px; box-shadow:0 10px 25px rgba(0,0,0,.08); }
        .page-header { background:linear-gradient(135deg,#198754,#157347); color:white; border-radius:18px; padding:30px; margin-bottom:25px; }
        .form-control { border-radius:10px; }
        .btn-success { border-radius:10px; }
        .btn-secondary { border-radius:10px; }
      `}</style>

      <div className="d-flex">
        <Sidebar client={client} />

        <div
          className="container-fluid"
          style={{ marginLeft: "260px", width: "calc(100% - 260px)", padding: "35px" }}
        >
          <div className="page-header">
            <h2>Edit Client Profile</h2>
            <p className="mb-0">Update your personal and company information.</p>
          </div>

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

          <div className="card edit-card">
            <div className="card-body p-4">

              <form onSubmit={handleSubmit}>
                <div className="row">

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      minLength={2}
                      maxLength={30}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      minLength={2}
                      maxLength={30}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      pattern="[6-9]{1}[0-9]{9}"
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Company Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      maxLength={100}
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <label className="form-label fw-semibold">Company Website</label>
                    <input
                      type="url"
                      className="form-control"
                      name="companyWebsite"
                      value={formData.companyWebsite}
                      onChange={handleChange}
                      maxLength={255}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Industry</label>
                    <input
                      type="text"
                      className="form-control"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      maxLength={100}
                    />
                  </div>

                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-semibold">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      maxLength={100}
                    />
                  </div>

                </div>

                <div className="d-flex justify-content-end gap-3">
                  <button
                    type="button"
                    className="btn btn-secondary px-4"
                    onClick={() => navigate("/client-profile")}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-success px-4"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>

              </form>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default EditClientProfile;
