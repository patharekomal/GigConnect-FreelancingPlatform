import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Client/Sidebar";
import { jobs, projects, payments } from "../../data/dummyData";

const CLIENT_ID = 2;
const CLIENT_NAME = "XYZ Solutions";

function ClientDashboard() {
  const navigate = useNavigate();

  // ── Stats from dummy data ──────────────────────────────────
  const myJobs = jobs.filter((j) => j.client_id === CLIENT_ID);

  const myProjects = projects.filter(
    (p) => p.client_id === CLIENT_ID
  );

  const activeProjects = myProjects.filter(
    (p) => p.status === "IN_PROGRESS"
  ).length;

  const myProjectIds = myProjects.map(
    (p) => p.project_id
  );

  const releasedTotal = payments
    .filter(
      (p) =>
        myProjectIds.includes(p.project_id) &&
        p.status === "RELEASED"
    )
    .reduce((sum, p) => sum + p.amount, 0);

  const stats = [
    {
      label: "Jobs Posted",
      value: myJobs.length,
    },
    {
      label: "Active Projects",
      value: activeProjects,
    },
    {
      label: "Amount Released",
      value: `₹${releasedTotal.toLocaleString()}`,
    },
  ];

  const actions = [
    {
      label: "Post a Job",
      icon: "➕",
      desc: "Find the right freelancer",
      path: "/post-job",
    },
    {
      label: "My Jobs",
      icon: "📁",
      desc: "Track your posted jobs",
      path: "/my-jobs",
    },
    {
      label: "Payments",
      icon: "💳",
      desc: "Release or track payments",
      path: "/payment",
    },
    {
      label: "View Bids",
      icon: "📬",
      desc: "Review freelancer proposals",
      path: "/my-jobs",
    },
  ];

  const activity = [
    {
      text: "New bid received on React Developer job",
      time: "2 min ago",
    },
    {
      text: "Spring Boot project is in progress",
      time: "1 hr ago",
    },
    {
      text: "Payment of ₹38,000 released",
      time: "Yesterday",
    },
  ];

  return (
    <>
      <style>{`
        body{
          background:#f8fafc !important;
        }

        .nav-btn{
          transition:background .15s;
        }

        .nav-btn:hover{
          background:#f1f5f9 !important;
        }

        .action-card{
          transition:border-color .15s,box-shadow .15s;
          cursor:pointer;
        }

        .action-card:hover{
          border-color:#198754 !important;
          box-shadow:0 0 0 3px #E1F5EE;
        }

        .text-green{
          color:#1D9E75 !important;
        }

        .bg-green-light{
          background:#E1F5EE !important;
        }

        .banner-btn:hover{
          background:linear-gradient(135deg,#198754,#157347)!important;
        }
      `}</style>

      <Sidebar />

      <main
        style={{
          marginLeft: "260px",
          width: "calc(100% - 260px)",
          minHeight: "100vh",
          padding: "35px",
        }}
      >
        {/* Header */}

        <div className="mb-5 text-center">
          <h1
            className="fw-bold mb-2"
            style={{ fontSize: "34px" }}
          >
            Welcome back, {CLIENT_NAME}
          </h1>

          <p
            className="text-muted"
            style={{ fontSize: "15px" }}
          >
            Manage jobs, review bids and track payments
          </p>
        </div>

        {/* Stats */}

        <div className="row g-3 mb-4">
          {stats.map((s, i) => (
            <div className="col" key={i}>
              <div className="bg-white border rounded-3 p-3 h-100">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span
                    className="text-muted fw-medium"
                    style={{ fontSize: "12px" }}
                  >
                    {s.label}
                  </span>
                </div>

                <div
                  className="fw-bold mb-2"
                  style={{ fontSize: "26px" }}
                >
                  {s.value}
                </div>

                <span
                  className="badge bg-green-light text-green rounded-pill px-2"
                  style={{ fontSize: "11px" }}
                >
                  Active
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}

        <div className="row g-3 mb-4">

          <div className="col-md-8">

            <div className="bg-white border rounded-3 p-4 h-100">

              <h2
                className="fw-semibold mb-3"
                style={{ fontSize: "15px" }}
              >
                Quick Actions
              </h2>

              <div className="row g-3">

                {actions.map((a, i) => (

                  <div className="col-6" key={i}>

                    <div
                      className="action-card border rounded-3 p-3"
                      onClick={() => navigate(a.path)}
                    >

                      <div
                        style={{
                          fontSize: "20px",
                          marginBottom: "8px",
                        }}
                      >
                        {a.icon}
                      </div>

                      <div
                        className="fw-semibold"
                        style={{ fontSize: "13px" }}
                      >
                        {a.label}
                      </div>

                      <div
                        className="text-muted mt-1"
                        style={{ fontSize: "11px" }}
                      >
                        {a.desc}
                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* Activity */}

          <div className="col-md-4">

            <div className="bg-white border rounded-3 p-4 h-100">

              <h2
                className="fw-semibold mb-3"
                style={{ fontSize: "15px" }}
              >
                Recent Activity
              </h2>

              <div className="d-flex flex-column gap-3">

                {activity.map((a, i) => (

                  <div
                    key={i}
                    className="d-flex gap-2 align-items-start"
                  >

                    <div
                      className="rounded-circle flex-shrink-0 mt-1"
                      style={{
                        width: "8px",
                        height: "8px",
                        background: "#1D9E75",
                      }}
                    />

                    <div>

                      <div
                        style={{
                          fontSize: "12px",
                          lineHeight: "1.5",
                        }}
                      >
                        {a.text}
                      </div>

                      <div
                        className="text-muted mt-1"
                        style={{ fontSize: "11px" }}
                      >
                        {a.time}
                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

        {/* Banner */}

        <div
          className="rounded-3 p-4 d-flex align-items-center justify-content-between flex-wrap gap-3"
          style={{
            background: "#0f172a",
          }}
        >

          <div>

            <div
              className="text-white fw-semibold"
              style={{ fontSize: "15px" }}
            >
              Ready to hire?
            </div>

            <div
              style={{
                color: "#94a3b8",
                fontSize: "12px",
                marginTop: "3px",
              }}
            >
              Post a job and get proposals from skilled freelancers.
            </div>

          </div>

          <button
            className="banner-btn btn text-white fw-semibold px-4 py-2 rounded-3 border-0"
            style={{
              background:
                "linear-gradient(135deg,#198754,#157347)",
              fontSize: "13px",
            }}
            onClick={() => navigate("/post-job")}
          >
            Post a Job →
          </button>

        </div>

      </main>
    </>
  );
}

export default ClientDashboard;