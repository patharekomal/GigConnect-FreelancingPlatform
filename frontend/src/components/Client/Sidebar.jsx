import { useNavigate } from "react-router-dom";

const CLIENT_NAME = "XYZ Solutions";

function Sidebar({ activePage }) {
  const navigate = useNavigate();

  // const navItems = [
  //   { label: "Home", icon: "📊", path: "/", id: "dashboard" },
  //   { label: "Post Job", icon: "➕", path: "/post-job", id: "post-job" },
  //   { label: "My Jobs", icon: "📁", path: "/my-jobs", id: "my-jobs" },
  //   { label: "My Projects", icon: "🗂️", path: "/my-projects", id: "my-projects" },
  //   { label: "Payments", icon: "💳", path: "/payment", id: "payment" },
  // ];

  const navItems = [
    { label: "Home",  path: "/", id: "dashboard" },
    { label: "Post Job",  path: "/post-job", id: "post-job" },
    { label: "My Jobs", path: "/my-jobs", id: "my-jobs" },
    { label: "My Projects",  path: "/my-projects", id: "my-projects" },
    { label: "Payments",  path: "/payment", id: "payment" },
  ];

  return (
    <aside className="sidebar bg-white border-end p-3 d-flex flex-column gap-1" style={{ width: "220px", minHeight: "100vh", position: "sticky", top: 0 }}>
      {/* Logo */}
      {/* <div className="fw-bold mb-4 px-2" style={{ fontSize: "18px" }}>
        Work<span style={{ color: "#1D9E75" }}>Bridge</span>
      </div> */}
      <div>
        <h4 className="text-success fw-bold mb-0">GigConnect</h4>
      </div>


      {/* Nav */}
      <nav className="d-flex flex-column gap-1">
        {navItems.map(item => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`nav-btn btn text-start px-3 py-2 rounded-3 border-0 d-flex align-items-center gap-2 ${
              activePage === item.id
                ? "bg-green-light text-green fw-semibold"
                : "bg-transparent text-dark"
            }`}
            style={{ 
              fontSize: "14px",
              backgroundColor: activePage === item.id ? "#E1F5EE" : "transparent",
              color: activePage === item.id ? "#1D9E75" : "inherit"
            }}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </nav>

      {/* Spacer */}
      <div className="flex-grow-1" />

      {/* User badge */}
      <div className="rounded-3 p-3 d-flex align-items-center gap-2" style={{ background: "#f8fafc" }}>
        {/* Green circle avatar with first letter */}
        <div
          className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
          style={{ width: "34px", height: "34px", background: "linear-gradient(135deg, #198754, #157347)", fontSize: "14px" }}
        >
          {CLIENT_NAME.charAt(0)}
        </div>
        <div>
          <div className="fw-semibold" style={{ fontSize: "13px" }}>{CLIENT_NAME}</div>
          <div style={{ fontSize: "11px", color: "#1D9E75" }}>Client</div>
          <button className="btn btn-light text-start" onClick={() => navigate("/")}>
                Logout
                </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
