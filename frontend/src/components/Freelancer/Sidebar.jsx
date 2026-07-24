import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
   const user = JSON.parse(localStorage.getItem("user"));

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
          onClick={() => navigate("/freelancer")}
        >
          Home
        </button>

        <button
          className="btn btn-light text-start"
          onClick={() => navigate("/browseJobs")}
        >
          Browse Jobs
        </button>

        <button
          className="btn btn-light text-start"
          onClick={() => navigate("/freelancer/myBids")}
        >
          My Bids
        </button>

        <button
          className="btn btn-light text-start"
          onClick={() => navigate("/myProjects")}
        >
          My Projects
        </button>

        <button
          className="btn btn-light text-start"
          onClick={() => navigate("/reviews")}
        >
          Reviews
        </button>

        <button
          className="btn btn-light text-start"
          onClick={() => navigate("/profile")}
        >
          Profile
        </button>
      </div>

      {/* Push everything below to bottom */}
      <div className="mt-auto"></div>

      {/* User Card */}
      <div className="card border-0 shadow-sm p-3">
        <h4 className="mb-1">👤 {user.firstName}</h4>

        <small className="text-muted d-block mb-2">{user.email}</small>

        <span className="text-success mb-3">● Online</span>

        <button
          className="btn btn-outline-danger w-100 mt-3"
          onClick={() => navigate("/")}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
