import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Client/Sidebar";
import { projects, users, jobs } from "../../data/dummyData";

// ProjectPage.jsx
// Shows details of a specific project — freelancer, amount, deadline, submitted work.
// Client can approve the submitted work from here.
// projectId comes from the URL — e.g. /project/1

function ProjectPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  // Find the project by URL param
  const project = projects.find(p => p.project_id === parseInt(projectId));

  // Get the related job (for the title)
  const job = project ? jobs.find(j => j.job_id === project.job_id) : null;

  // Get freelancer details from users array
  const freelancer = project ? users.find(u => u.user_id === project.freelancer_id) : null;

  // Status badge styling
  const statusStyle = (status) => {
    if (status === "COMPLETED")   return { bg: "#E1F5EE", color: "#1D9E75" };
    if (status === "SUBMITTED")   return { bg: "#fef9c3", color: "#ca8a04" };
    if (status === "IN_PROGRESS") return { bg: "#dbeafe", color: "#2563eb" };
    if (status === "CANCELLED")   return { bg: "#fee2e2", color: "#dc2626" };
    return { bg: "#f1f5f9", color: "#64748b" };
  };

  // Safety check — project not found
  if (!project || !job || !freelancer) {
    return (
      <div className="p-5 text-center text-muted">
        <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</div>
        <h5 className="fw-semibold mb-2">Project not found</h5>
        <button
          className="btn btn-link text-decoration-none text-green p-0"
          onClick={() => navigate("/my-jobs")}
        >
          ← Back to My Jobs
        </button>
      </div>
    );
  }

  const badge = statusStyle(project.status);

  return (
    <>
      <style>{`
        body { background: #f8fafc !important; }
        .sidebar { width: 220px; min-height: 100vh; position: sticky; top: 0; }
        .nav-btn:hover { background: #f1f5f9 !important; }
        .logo-green { color: #1D9E75; }
        .text-green { color: #1D9E75 !important; }
        .bg-green-light { background-color: #E1F5EE !important; }
        .approve-btn:hover { background: linear-gradient(135deg, #198754, #157347) !important; }
      `}</style>

      <div className="d-flex">

        {/* ── SIDEBAR COMPONENT ─────────────────────────────────────────── */}
        <Sidebar activePage="my-projects" />

        {/* ── MAIN CONTENT ────────────────────────────────────── */}
        <main className="flex-grow-1 p-4" style={{ maxWidth: "800px" }}>

          {/* Back + heading */}
          <div className="mb-4">
            <button
              className="btn btn-link text-muted p-0 mb-3 text-decoration-none d-flex align-items-center gap-1"
              style={{ fontSize: "13px" }}
              onClick={() => navigate("/my-jobs")}
            >
              ← Back to My Jobs
            </button>

            {/* Title + status badge side by side */}
            <div className="d-flex align-items-center gap-3 flex-wrap">
              <h1 className="fw-bold mb-0" style={{ fontSize: "22px" }}>{job.title}</h1>
              <span
                className="badge rounded-pill px-3 py-1 fw-semibold"
                style={{ background: badge.bg, color: badge.color, fontSize: "12px" }}
              >
                {project.status}
              </span>
            </div>
          </div>

          {/* ── PROJECT DETAILS CARD ──────────────────────────── */}
          <div className="bg-white border rounded-3 p-4 mb-3">
            <h2 className="fw-semibold mb-3" style={{ fontSize: "15px" }}>Project Details</h2>

            {/* 3-column info row using Bootstrap grid */}
            <div className="row g-3 mb-3">

              {/* Freelancer */}
              <div className="col-md-4">
                <div className="p-3 rounded-3" style={{ background: "#f8fafc" }}>
                  <div className="text-muted mb-1" style={{ fontSize: "11px", fontWeight: "600" }}>
                    FREELANCER
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
                      style={{ width: "28px", height: "28px", background: "linear-gradient(135deg, #198754, #157347)", fontSize: "11px" }}
                    >
                      {freelancer.name.charAt(0)}
                    </div>
                    <span className="fw-semibold" style={{ fontSize: "14px" }}>{freelancer.name}</span>
                  </div>
                </div>
              </div>

              {/* Agreed amount */}
              <div className="col-md-4">
                <div className="p-3 rounded-3" style={{ background: "#f8fafc" }}>
                  <div className="text-muted mb-1" style={{ fontSize: "11px", fontWeight: "600" }}>
                    AGREED AMOUNT
                  </div>
                  <div className="fw-bold text-green" style={{ fontSize: "18px" }}>
                    ₹{project.agreed_amount.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Project ID */}
              <div className="col-md-4">
                <div className="p-3 rounded-3" style={{ background: "#f8fafc" }}>
                  <div className="text-muted mb-1" style={{ fontSize: "11px", fontWeight: "600" }}>
                    PROJECT ID
                  </div>
                  <div className="fw-semibold" style={{ fontSize: "14px" }}>
                    #PRJ-{String(project.project_id).padStart(3, "0")}
                  </div>
                </div>
              </div>
            </div>

            {/* Job description */}
            <div>
              <div className="text-muted mb-1 fw-semibold" style={{ fontSize: "11px" }}>
                JOB DESCRIPTION
              </div>
              <p className="mb-0" style={{ fontSize: "13px", lineHeight: "1.6", color: "#475569" }}>
                {job.description}
              </p>
            </div>
          </div>

          {/* ── SUBMITTED WORK CARD ───────────────────────────────
              Only show this section if the freelancer has submitted work */}
          {project.submitted_work ? (
            <div className="bg-white border rounded-3 p-4 mb-3">
              <h2 className="fw-semibold mb-3" style={{ fontSize: "15px" }}>Submitted Work</h2>

              {/* Work link box */}
              <div
                className="rounded-3 p-3 d-flex align-items-center gap-3"
                style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
              >
                <span style={{ fontSize: "22px" }}>📎</span>
                <div>
                  <div className="text-muted mb-1" style={{ fontSize: "11px", fontWeight: "600" }}>
                    DELIVERABLE LINK
                  </div>
                  {/* Opens submitted work in a new tab */}
                  <a
                    href={`https://${project.submitted_work}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green fw-semibold"
                    style={{ fontSize: "13px" }}
                  >
                    {project.submitted_work}
                  </a>
                </div>
              </div>

              {/* Approve button — only show if project is SUBMITTED (not already COMPLETED) */}
              {project.status === "SUBMITTED" && (
                <div className="mt-3">
                  <button
                    className="approve-btn btn text-white fw-semibold rounded-3 px-4 py-2 w-100"
                    style={{ background: "linear-gradient(135deg, #198754, #157347)", fontSize: "14px" }}
                    onClick={() => {
                      // In real app: PATCH /api/projects/1/approve
                      // For now just navigate to payment page
                      alert("Work approved! Payment can now be released.");
                      navigate("/payment");
                    }}
                  >
                    ✓ Approve Work & Release Payment
                  </button>
                  <p className="text-muted text-center mt-2 mb-0" style={{ fontSize: "11px" }}>
                    Approving will mark the project as completed and allow you to release payment.
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* ── WAITING STATE ─────────────────────────────────── 
               Show this when freelancer hasn't submitted yet */
            <div className="bg-white border rounded-3 p-4 mb-3">
              <h2 className="fw-semibold mb-3" style={{ fontSize: "15px" }}>Submitted Work</h2>
              <div className="text-center py-3">
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>⏳</div>
                <div className="fw-semibold mb-1" style={{ fontSize: "14px" }}>Waiting for submission</div>
                <div className="text-muted" style={{ fontSize: "12px" }}>
                  The freelancer hasn't submitted their work yet.
                </div>
              </div>
            </div>
          )}

          {/* ── COMPLETED STATE BANNER ───────────────────────────
              Show a green success banner if project is already done */}
          {project.status === "COMPLETED" && (
            <div
              className="rounded-3 p-4 d-flex align-items-center gap-3"
              style={{ background: "#E1F5EE", border: "1px solid #9FE1CB" }}
            >
              <span style={{ fontSize: "28px" }}>✅</span>
              <div>
                <div className="fw-semibold text-green" style={{ fontSize: "14px" }}>
                  Project Completed
                </div>
                <div className="text-muted" style={{ fontSize: "12px", marginTop: "2px" }}>
                  This project has been completed and payment has been released.
                </div>
              </div>
              <button
                className="btn text-white fw-semibold rounded-3 px-3 py-2 ms-auto"
                style={{ background: "linear-gradient(135deg, #198754, #157347)", fontSize: "12px" }}
                onClick={() => navigate("/payment")}
              >
                View Payment
              </button>
            </div>
          )}

        </main>
      </div>
    </>
  );
}

export default ProjectPage;