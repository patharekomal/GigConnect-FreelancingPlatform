import { useNavigate } from "react-router-dom";

function ClientProfileSetup() {
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
      <div
        className="bg-white rounded-4 p-4 p-md-5"
        style={{ width: "100%", maxWidth: "480px", border: "1px solid #e5e7eb", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
      >
        {/* HEADER */}
        <div className="text-center mb-4">
          <div
            className="mx-auto mb-3 d-flex align-items-center justify-content-center"
            style={{ width: "56px", height: "56px", borderRadius: "14px", background: "#e8f5e9", fontSize: "1.6rem" }}
          >
            💼
          </div>
          <span
            className="badge rounded-pill px-3 py-2 mb-3"
            style={{ backgroundColor: "#e8f5e9", color: "#198754", fontSize: "0.8rem" }}
          >
            Client Profile
          </span>
          <h4 className="fw-bold mb-1" style={{ color: "#1f2937" }}>
            Set up your <span style={{ color: "#198754" }}>Client Profile</span>
          </h4>
          <p className="text-muted" style={{ fontSize: "0.9rem" }}>
            Tell us about your company so freelancers know who they're working with.
          </p>
        </div>

        {/* COMPANY NAME */}
        <div className="mb-3">
          <label className="form-label fw-semibold" style={{ fontSize: "0.85rem", color: "#374151" }}>
            Company Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. ABC Technologies"
            style={{ borderRadius: "10px", border: "1px solid #d1d5db", padding: "10px 14px" }}
          />
        </div>

        {/* COMPANY WEBSITE */}
        <div className="mb-3">
          <label className="form-label fw-semibold" style={{ fontSize: "0.85rem", color: "#374151" }}>
            Company Website
          </label>
          <input
            type="url"
            className="form-control"
            placeholder="e.g. https://yourcompany.com"
            style={{ borderRadius: "10px", border: "1px solid #d1d5db", padding: "10px 14px" }}
          />
        </div>

        {/* LOCATION + INDUSTRY — side by side */}
        <div className="d-flex gap-2 mb-4">
          <div className="flex-fill">
            <label className="form-label fw-semibold" style={{ fontSize: "0.85rem", color: "#374151" }}>
              Location
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Mumbai, India"
              style={{ borderRadius: "10px", border: "1px solid #d1d5db", padding: "10px 14px" }}
            />
          </div>
          <div className="flex-fill">
            <label className="form-label fw-semibold" style={{ fontSize: "0.85rem", color: "#374151" }}>
              Industry
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. FinTech"
              style={{ borderRadius: "10px", border: "1px solid #d1d5db", padding: "10px 14px" }}
            />
          </div>
        </div>

        {/* SUBMIT */}
        <button
          className="btn w-100 fw-semibold mb-3"
          onClick={() => navigate("/client")}
          style={{
            background: "linear-gradient(135deg, #198754, #157347)",
            color: "#fff",
            borderRadius: "10px",
            padding: "11px",
            border: "none",
          }}
        >
          Complete Profile →
        </button>

        {/* SKIP */}
        <p className="text-center text-muted mb-0" style={{ fontSize: "0.875rem" }}>
          <span
            style={{ color: "#198754", textDecoration: "none", fontWeight: 600, cursor: "pointer" }}
            onClick={() => navigate("/client")}
          >
            Skip for now
          </span>
        </p>
      </div>
    </div>
  );
}

export default ClientProfileSetup;
