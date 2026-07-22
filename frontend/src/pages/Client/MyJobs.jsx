import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Client/Sidebar";
import { bids } from "../../data/dummyData";

// MyJobs.jsx
// Shows all jobs posted by the logged-in client in a table.
// jobs prop comes from App.jsx (shared state — includes newly posted jobs too)
// bids is imported from dummyData to show bid count per job

const CLIENT_ID = 2;

function MyJobs({ jobs }) {
  const navigate = useNavigate();

  // Only show jobs that belong to this client
  const myJobs = jobs.filter(j => j.client_id === CLIENT_ID);

  // Count how many bids a job has received
  const getBidCount = (jobId) => bids.filter(b => b.job_id === jobId).length;

  // Badge color based on job status
  const statusBadge = (status) => {
    if (status === "OPEN")        return "bg-success";
    if (status === "IN_PROGRESS") return "bg-warning text-dark";
    if (status === "CLOSED")      return "bg-secondary";
    return "bg-light text-dark";
  };

  
  return (
    <>
      <style>{`
        body { background: #f8fafc !important; }
        .sidebar { width: 220px; min-height: 100vh; position: sticky; top: 0; }
        .nav-btn:hover { background: #f1f5f9 !important; }
        .logo-green { color: #1D9E75; }
        .text-green { color: #1D9E75 !important; }
        .bg-green-light { background-color: #E1F5EE !important; }
        .job-row:hover { background: #f8fafc; }
        .view-bids-btn:hover { background: linear-gradient(135deg, #198754, #157347) !important; }
      `}</style>

      <div className="d-flex">

        {/* ── SIDEBAR COMPONENT ─────────────────────────────────────────── */}
        <Sidebar activePage="my-jobs" />

        {/* ── MAIN CONTENT ────────────────────────────────────── */}
        <main className="flex-grow-1 p-4">

          {/* Header row — title on left, Post Job button on right */}
          <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
              <h1 className="fw-bold mb-1" style={{ fontSize: "22px" }}>My Jobs</h1>
              <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
                {myJobs.length} job{myJobs.length !== 1 ? "s" : ""} posted
              </p>
            </div>
            <button
              className="btn text-white fw-semibold rounded-3 px-3 py-2"
              style={{ background: "linear-gradient(135deg, #198754, #157347)", fontSize: "13px" }}
              onClick={() => navigate("/post-job")}
            >
              ➕ Post New Job
            </button>
          </div>

          {/* ── EMPTY STATE ───────────────────────────────────────
              Show this when the client has no jobs yet */}
          {myJobs.length === 0 ? (
            <div className="bg-white border rounded-3 p-5 text-center">
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>📋</div>
              <h5 className="fw-semibold mb-2">No jobs posted yet</h5>
              <p className="text-muted mb-3" style={{ fontSize: "14px" }}>
                Post your first job and start receiving proposals from freelancers.
              </p>
              <button
                className="btn text-white fw-semibold rounded-3 px-4"
                style={{ background: "linear-gradient(135deg, #198754, #157347)", fontSize: "13px" }}
                onClick={() => navigate("/post-job")}
              >
                Post a Job
              </button>
            </div>

          ) : (

            /* ── JOBS TABLE ─────────────────────────────────────
               Bootstrap table with hover effect.
               Each row shows job info + a View Bids button. */
            <div className="bg-white border rounded-3 overflow-hidden">
              <table className="table table-hover mb-0">
                <thead style={{ background: "#f8fafc" }}>
                  <tr>
                    <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>#</th>
                    <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>JOB TITLE</th>
                    <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>BUDGET</th>
                    <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>DEADLINE</th>
                    <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>STATUS</th>
                    <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>BIDS</th>
                    <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {myJobs.map((job, index) => (
                    <tr key={job.job_id} className="job-row align-middle">

                      {/* Row number */}
                      <td className="px-4 py-3 text-muted" style={{ fontSize: "13px" }}>
                        {index + 1}
                      </td>

                      {/* Title + description preview */}
                      <td className="px-4 py-3" style={{ maxWidth: "260px" }}>
                        <div className="fw-semibold" style={{ fontSize: "14px" }}>{job.title}</div>
                        <div className="text-muted text-truncate" style={{ fontSize: "12px", maxWidth: "240px" }}>
                          {job.description}
                        </div>
                      </td>

                      {/* Budget */}
                      <td className="px-4 py-3 fw-semibold" style={{ fontSize: "14px" }}>
                        ₹{job.budget.toLocaleString()}
                      </td>

                      {/* Deadline */}
                      <td className="px-4 py-3 text-muted" style={{ fontSize: "13px" }}>
                        {job.deadline}
                      </td>

                      {/* Status badge — color changes based on status */}
                      <td className="px-4 py-3">
                        <span className={`badge rounded-pill px-3 py-1 ${statusBadge(job.status)}`} style={{ fontSize: "11px" }}>
                          {job.status}
                        </span>
                      </td>

                      {/* Bid count — how many freelancers applied */}
                      <td className="px-4 py-3 text-center">
                        <span
                          className="badge rounded-circle d-inline-flex align-items-center justify-content-center fw-bold"
                          style={{
                            width: "28px", height: "28px",
                            background: getBidCount(job.job_id) > 0 ? "#E1F5EE" : "#f1f5f9",
                            color: getBidCount(job.job_id) > 0 ? "#1D9E75" : "#64748b",
                            fontSize: "12px"
                          }}
                        >
                          {getBidCount(job.job_id)}
                        </span>
                      </td>

                      {/* View Bids button — navigates to /bids/:jobId */}
                      <td className="px-4 py-3">
                        <button
                          className="view-bids-btn btn text-white rounded-3 px-3 py-1"
                          style={{ background: "linear-gradient(135deg, #198754, #157347)", fontSize: "12px", fontWeight: "600" }}
                          onClick={() => navigate(`/bids/${job.job_id}`)}
                        >
                          View Bids
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </main>
      </div>
    </>
  );
}

export default MyJobs;