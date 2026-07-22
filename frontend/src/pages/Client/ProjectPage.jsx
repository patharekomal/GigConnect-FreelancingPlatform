import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Client/Sidebar";
import { projects, users, jobs } from "../../data/dummyData";

function ProjectPage() {

  const navigate = useNavigate();
  const { projectId } = useParams();

  const project = projects.find(
    (p) => p.project_id === parseInt(projectId)
  );

  const job = project
    ? jobs.find((j) => j.job_id === project.job_id)
    : null;

  const freelancer = project
    ? users.find((u) => u.user_id === project.freelancer_id)
    : null;

  const statusStyle = (status) => {

    if (status === "COMPLETED")
      return {
        bg: "#E1F5EE",
        color: "#1D9E75",
      };

    if (status === "SUBMITTED")
      return {
        bg: "#FEF3C7",
        color: "#B45309",
      };

    if (status === "IN_PROGRESS")
      return {
        bg: "#DBEAFE",
        color: "#2563EB",
      };

    if (status === "CANCELLED")
      return {
        bg: "#FEE2E2",
        color: "#DC2626",
      };

    return {
      bg: "#F1F5F9",
      color: "#64748B",
    };
  };

  if (!project || !job || !freelancer) {

    return (

      <div className="p-5 text-center">

        <div
          style={{
            fontSize: "42px",
          }}
        >
          🔍
        </div>

        <h4 className="mt-3">
          Project not found
        </h4>

        <button
          className="btn btn-link text-decoration-none"
          onClick={() => navigate("/my-projects")}
        >
          ← Back to My Projects
        </button>

      </div>

    );
  }

  const badge = statusStyle(project.status);

  return (

    <>

      <style>{`

        body{
          background:#f8fafc !important;
          margin:0;
        }

        .nav-btn:hover{
          background:#f1f5f9!important;
        }

        .text-green{
          color:#1D9E75!important;
        }

        .approve-btn:hover{
          background:linear-gradient(135deg,#198754,#157347)!important;
        }

      `}</style>

      <div>

        <Sidebar activePage="my-projects" />

        <main
          style={{
            marginLeft: "260px",
            width: "calc(100% - 260px)",
            minHeight: "100vh",
            padding: "35px",
            background: "#f8fafc",
            overflowX: "hidden",
            boxSizing: "border-box",
          }}
        >

          <div
            style={{
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >

            <div className="mb-4">

              <button
                className="btn btn-link text-muted p-0 mb-3 text-decoration-none"
                onClick={() => navigate("/my-projects")}
              >
                ← Back to My Projects
              </button>

              <div className="d-flex align-items-center gap-3 flex-wrap">

                <h2
                  className="fw-bold mb-0"
                  style={{
                    fontSize: "24px",
                  }}
                >
                  {job.title}
                </h2>

                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    background: badge.bg,
                    color: badge.color,
                  }}
                >
                  {project.status}
                </span>

              </div>

            </div>

            <div className="bg-white border rounded-3 p-4 mb-4">

              <h5 className="fw-bold mb-4">
                Project Details
              </h5>

              <div
                className="row g-3 mb-3"
                style={{
                  marginLeft: 0,
                  marginRight: 0,
                }}
              >
                                {/* Freelancer */}
                <div className="col-md-4">
                  <div
                    className="p-3 rounded-3 h-100"
                    style={{ background: "#f8fafc" }}
                  >
                    <div
                      className="text-muted mb-2"
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                      }}
                    >
                      FREELANCER
                    </div>

                    <div className="d-flex align-items-center gap-2">

                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                        style={{
                          width: "34px",
                          height: "34px",
                          background:
                            "linear-gradient(135deg,#198754,#157347)",
                        }}
                      >
                        {freelancer.name.charAt(0)}
                      </div>

                      <span className="fw-semibold">
                        {freelancer.name}
                      </span>

                    </div>

                  </div>
                </div>

                {/* Amount */}
                <div className="col-md-4">
                  <div
                    className="p-3 rounded-3 h-100"
                    style={{ background: "#f8fafc" }}
                  >
                    <div
                      className="text-muted mb-2"
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                      }}
                    >
                      AGREED AMOUNT
                    </div>

                    <div
                      className="fw-bold text-green"
                      style={{ fontSize: "20px" }}
                    >
                      ₹
                      {project.agreed_amount
                        ?.toLocaleString?.() ??
                        project.agreed_amount}
                    </div>

                  </div>
                </div>

                {/* Project ID */}
                <div className="col-md-4">
                  <div
                    className="p-3 rounded-3 h-100"
                    style={{ background: "#f8fafc" }}
                  >
                    <div
                      className="text-muted mb-2"
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                      }}
                    >
                      PROJECT ID
                    </div>

                    <div className="fw-semibold">
                      #PRJ-
                      {String(
                        project.project_id
                      ).padStart(3, "0")}
                    </div>

                  </div>
                </div>

              </div>

              <div>

                <div
                  className="text-muted fw-semibold mb-2"
                  style={{
                    fontSize: "11px",
                  }}
                >
                  JOB DESCRIPTION
                </div>

                <p
                  className="mb-0"
                  style={{
                    color: "#475569",
                    lineHeight: "1.7",
                  }}
                >
                  {job.description}
                </p>

              </div>

            </div>

            {/* Submitted Work */}

            {project.submitted_work ? (

              <div className="bg-white border rounded-3 p-4 mb-4">

                <h5 className="fw-bold mb-3">
                  Submitted Work
                </h5>

                <div
                  className="rounded-3 p-3 d-flex align-items-center gap-3"
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                  }}
                >

                  <span style={{ fontSize: "24px" }}>
                    📎
                  </span>

                  <div>

                    <div
                      className="text-muted mb-1"
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                      }}
                    >
                      DELIVERABLE
                    </div>

                    <a
                      href={`https://${project.submitted_work}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green fw-semibold"
                    >
                      {project.submitted_work}
                    </a>

                  </div>

                </div>

                {project.status === "SUBMITTED" && (

                  <>

                    <button
                      className="btn approve-btn text-white w-100 mt-4"
                      style={{
                        background:
                          "linear-gradient(135deg,#198754,#157347)",
                      }}
                      onClick={() => {

                        alert(
                          "Work approved! Payment can now be released."
                        );

                        navigate("/payment");

                      }}
                    >
                      ✓ Approve Work & Release Payment
                    </button>

                    <p
                      className="text-center text-muted mt-2 mb-0"
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      Approving marks this project
                      as completed.
                    </p>

                  </>

                )}

              </div>

            ) : (

              <div className="bg-white border rounded-3 p-4 mb-4">

                <h5 className="fw-bold mb-3">
                  Submitted Work
                </h5>

                <div className="text-center py-4">

                  <div
                    style={{
                      fontSize: "40px",
                    }}
                  >
                    ⏳
                  </div>

                  <h6 className="mt-3">
                    Waiting for Submission
                  </h6>

                  <p className="text-muted mb-0">
                    The freelancer has not
                    submitted the work yet.
                  </p>

                </div>

              </div>

            )}

            {project.status === "COMPLETED" && (

              <div
                className="rounded-3 p-4 d-flex align-items-center gap-3"
                style={{
                  background: "#E1F5EE",
                  border: "1px solid #9FE1CB",
                }}
              >

                <span
                  style={{
                    fontSize: "28px",
                  }}
                >
                  ✅
                </span>

                <div>

                  <div className="fw-bold text-green">
                    Project Completed
                  </div>

                  <div
                    className="text-muted"
                    style={{
                      fontSize: "13px",
                    }}
                  >
                    Payment has been released.
                  </div>

                </div>

                <button
                  className="btn text-white ms-auto"
                  style={{
                    background:
                      "linear-gradient(135deg,#198754,#157347)",
                  }}
                  onClick={() =>
                    navigate("/payment")
                  }
                >
                  View Payment
                </button>

              </div>

            )}

          </div>

        </main>

      </div>

    </>

  );
}

export default ProjectPage;