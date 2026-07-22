import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column bg-white shadow-sm p-3"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "260px",
        height: "100vh",
        borderRight: "1px solid #e9ecef",
        overflowY: "auto",
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <div className="mb-4">
        <h2 className="text-success fw-bold mb-0">GigConnect</h2>
      </div>

      {/* Navigation */}

      <div className="d-grid gap-2">

        <button
          className="btn btn-light text-start"
          onClick={() => navigate("/client")}
        >
          Home
        </button>

        <button
          className="btn btn-light text-start"
          onClick={() => navigate("/post-job")}
        >
          Post Job
        </button>

        <button
          className="btn btn-light text-start"
          onClick={() => navigate("/my-jobs")}
        >
          My Jobs
        </button>

        <button
          className="btn btn-light text-start"
          onClick={() => navigate("/my-projects")}
        >
          My Projects
        </button>

        <button
          className="btn btn-light text-start"
          onClick={() => navigate("/payment")}
        >
          Payments
        </button>

        <button
          className="btn btn-light text-start"
          onClick={() => navigate("/client-profile")}
        >
          Profile
        </button>

      </div>

      {/* Push Bottom */}

      <div className="mt-auto"></div>

      {/* User Card */}

      <div className="card border-0 shadow-sm p-3">

        <h4 className="mb-1">🏢 XYZ Solutions</h4>

        <small className="text-muted d-block mb-2">
          Client
        </small>

        <span className="text-success mb-3">
          ● Active
        </span>

        <button
          className="btn btn-outline-danger w-100"
          onClick={() => navigate("/")}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;