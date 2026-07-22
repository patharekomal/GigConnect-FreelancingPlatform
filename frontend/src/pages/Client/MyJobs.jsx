import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Client/Sidebar";
import { bids } from "../../data/dummyData";

const CLIENT_ID = 2;

function MyJobs({ jobs }) {
  const navigate = useNavigate();

  const myJobs = jobs.filter((j) => j.client_id === CLIENT_ID);

  const getBidCount = (jobId) =>
    bids.filter((b) => b.job_id === jobId).length;

  const statusBadge = (status) => {
    if (status === "OPEN") return "bg-success";
    if (status === "IN_PROGRESS") return "bg-warning text-dark";
    if (status === "CLOSED") return "bg-secondary";
    return "bg-light text-dark";
  };

  
  return (
    <>
      <style>{`
        body{
          background:#f8fafc !important;
          margin:0;
        }

        .nav-btn:hover{
          background:#f1f5f9 !important;
        }

        .logo-green{
          color:#1D9E75;
        }

        .text-green{
          color:#1D9E75 !important;
        }

        .bg-green-light{
          background:#E1F5EE !important;
        }

        .job-row:hover{
          background:#f8fafc;
        }

        .view-bids-btn:hover{
          background:linear-gradient(135deg,#198754,#157347)!important;
        }
      `}</style>

      <div>

        <Sidebar activePage="my-jobs" />

        <main
          style={{
            marginLeft: "260px",
            minHeight: "100vh",
            padding: "35px",
            background: "#f8fafc",
          }}
        >
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
            }}
          >

            {/* Header */}
            <div className="d-flex justify-content-between align-items-start mb-4">
              <div>
                <h1
                  className="fw-bold mb-1"
                  style={{ fontSize: "22px" }}
                >
                  My Jobs
                </h1>

                <p
                  className="text-muted mb-0"
                  style={{ fontSize: "14px" }}
                >
                  {myJobs.length} job
                  {myJobs.length !== 1 ? "s" : ""} posted
                </p>
              </div>

              <button
                className="btn text-white fw-semibold rounded-3 px-3 py-2"
                style={{
                  background:
                    "linear-gradient(135deg,#198754,#157347)",
                  fontSize: "13px",
                }}
                onClick={() => navigate("/post-job")}
              >
                ➕ Post New Job
              </button>
            </div>

            {myJobs.length === 0 ? (
              <div className="bg-white border rounded-3 p-5 text-center">
                <div
                  style={{
                    fontSize: "40px",
                    marginBottom: "12px",
                  }}
                >
                  📋
                </div>

                <h5 className="fw-semibold mb-2">
                  No jobs posted yet
                </h5>

                <p
                  className="text-muted mb-3"
                  style={{ fontSize: "14px" }}
                >
                  Post your first job and start receiving
                  proposals from freelancers.
                </p>

                <button
                  className="btn text-white fw-semibold rounded-3 px-4"
                  style={{
                    background:
                      "linear-gradient(135deg,#198754,#157347)",
                    fontSize: "13px",
                  }}
                  onClick={() => navigate("/post-job")}
                >
                  Post a Job
                </button>
              </div>
            ) : (
              <div
                className="bg-white border rounded-3"
                style={{
                  overflowX: "auto",
                }}
              >
                <table
                  className="table table-hover mb-0"
                  style={{
                    minWidth: "1000px",
                  }}
                >
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

                      {/* Row Number */}
                      <td
                        className="px-4 py-3 text-muted"
                        style={{ fontSize: "13px" }}
                      >
                        {index + 1}
                      </td>

                      {/* Job Title + Description */}
                      <td
                        className="px-4 py-3"
                        style={{ width: "35%" }}
                      >
                        <div
                          className="fw-semibold"
                          style={{ fontSize: "14px" }}
                        >
                          {job.title}
                        </div>

                        <div
                          className="text-muted"
                          style={{ fontSize: "12px" }}
                        >
                          {job.description}
                        </div>
                      </td>

                      {/* Budget */}
                      <td
                        className="px-4 py-3 fw-semibold"
                        style={{ fontSize: "14px" }}
                      >
                        ₹{job.budget?.toLocaleString?.() ?? job.budget}
                      </td>

                      {/* Deadline */}
                      <td
                        className="px-4 py-3 text-muted"
                        style={{ fontSize: "13px" }}
                      >
                        {job.deadline}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <span
                          className={`badge rounded-pill px-3 py-1 ${statusBadge(
                            job.status
                          )}`}
                          style={{ fontSize: "11px" }}
                        >
                          {job.status}
                        </span>
                      </td>

                      {/* Bid Count */}
                      <td className="px-4 py-3 text-center">
                        <span
                          className="badge rounded-circle d-inline-flex align-items-center justify-content-center fw-bold"
                          style={{
                            width: "28px",
                            height: "28px",
                            background:
                              getBidCount(job.job_id) > 0
                                ? "#E1F5EE"
                                : "#f1f5f9",
                            color:
                              getBidCount(job.job_id) > 0
                                ? "#1D9E75"
                                : "#64748b",
                            fontSize: "12px",
                          }}
                        >
                          {getBidCount(job.job_id)}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-4 py-3">
                        <button
                          className="view-bids-btn btn text-white rounded-3 px-3 py-1"
                          style={{
                            background:
                              "linear-gradient(135deg,#198754,#157347)",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                          onClick={() =>
                            navigate(`/bids/${job.job_id}`)
                          }
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

          </div>
        </main>
      </div>
    </>
  );
}

export default MyJobs;