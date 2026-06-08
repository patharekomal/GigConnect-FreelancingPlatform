import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../components/Client/Sidebar";
import { bids, users, freelancerProfiles } from "../../data/dummyData";

// ViewBids.jsx
// Shows all bids received for a specific job.
// jobId comes from the URL — e.g. /bids/1
// jobs prop from App.jsx to get the job title and budget
// bids and users are from dummyData

function ViewBids({ jobs }) {
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState(null);

  // ── Get jobId from the URL (/bids/1 → jobId = "1") ────────
  // useParams reads the :jobId part of the route
  const { jobId } = useParams();

  // Find the job this page is about
  const job = jobs.find(j => j.job_id === parseInt(jobId));

  // Get all bids for this job only
  const jobBids = bids.filter(b => b.job_id === parseInt(jobId));

  // Get freelancer name by their user_id
  const getFreelancer = (freelancerId) =>
    users.find(u => u.user_id === freelancerId);

  // Get freelancer profile
  const getFreelancerProfile = (freelancerId) =>
    freelancerProfiles.find(p => p.freelancer_id === freelancerId);

  // Badge color based on bid status
  const statusBadge = (status) => {
    if (status === "ACCEPTED") return "bg-success";
    if (status === "REJECTED") return "bg-danger";
    return "bg-warning text-dark";   // PENDING
  };

  // If job not found — safety check
  if (!job) {
    return (
      <div className="p-4 text-center text-muted">
        Job not found. <span className="text-decoration-underline" style={{ cursor: "pointer" }} onClick={() => navigate("/my-jobs")}>Go back</span>
      </div>
    );
  }

  return (
    <>
      <style>{`
        body { background: #f8fafc !important; }
        .sidebar { width: 220px; min-height: 100vh; position: sticky; top: 0; }
        .nav-btn:hover { background: #f1f5f9 !important; }
        .logo-green { color: #1D9E75; }
        .text-green { color: #1D9E75 !important; }
        .bg-green-light { background-color: #E1F5EE !important; }
        .bid-row:hover { background: #f8fafc; }
        .select-btn:hover { background: linear-gradient(135deg, #198754, #157347) !important; }
        .freelancer-link { cursor: pointer; color: #1D9E75; text-decoration: none; }
        .freelancer-link:hover { text-decoration: underline; }
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-content { background: white; border-radius: 12px; padding: 32px; max-width: 500px; width: 90%; }
        .skill-badge { display: inline-block; background: #E1F5EE; color: #1D9E75; padding: 6px 12px; border-radius: 20px; font-size: 12px; margin: 4px; }
        .rating-star { color: #fbbf24; }
      `}</style>

      <div className="d-flex">

        {/* ── SIDEBAR COMPONENT ─────────────────────────────────────────── */}
        <Sidebar activePage="my-jobs" />

        {/* ── MAIN CONTENT ────────────────────────────────────── */}
        <main className="flex-grow-1 p-4">

          {/* Back button + page heading */}
          <div className="mb-4">
            <button
              className="btn btn-link text-muted p-0 mb-3 text-decoration-none d-flex align-items-center gap-1"
              style={{ fontSize: "13px" }}
              onClick={() => navigate("/my-jobs")}
            >
              ← Back to My Jobs
            </button>
            <h1 className="fw-bold mb-1" style={{ fontSize: "22px" }}>{job.title}</h1>
            <div className="d-flex align-items-center gap-3 flex-wrap">
              <span className="text-muted" style={{ fontSize: "14px" }}>
                Budget: <strong className="text-dark">₹{job.budget.toLocaleString()}</strong>
              </span>
              <span className="text-muted" style={{ fontSize: "14px" }}>
                Deadline: <strong className="text-dark">{job.deadline}</strong>
              </span>
              <span className="text-muted" style={{ fontSize: "14px" }}>
                {jobBids.length} bid{jobBids.length !== 1 ? "s" : ""} received
              </span>
            </div>
          </div>

          {/* ── NO BIDS STATE ──────────────────────────────────── */}
          {jobBids.length === 0 ? (
            <div className="bg-white border rounded-3 p-5 text-center">
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>📭</div>
              <h5 className="fw-semibold mb-2">No bids yet</h5>
              <p className="text-muted" style={{ fontSize: "14px" }}>
                Freelancers haven't applied to this job yet. Check back soon.
              </p>
            </div>

          ) : (

            /* ── BIDS TABLE ───────────────────────────────────────
               Each row = one freelancer's bid
               Columns: freelancer name, bid amount, duration, proposal preview, status, action */
            <div className="bg-white border rounded-3 overflow-hidden">
              <table className="table table-hover mb-0">
                <thead style={{ background: "#f8fafc" }}>
                  <tr>
                    <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>#</th>
                    <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>FREELANCER</th>
                    <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>BID AMOUNT</th>
                    <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>DURATION</th>
                    <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>PROPOSAL</th>
                    <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>STATUS</th>
                    <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {jobBids.map((bid, index) => {
                    const freelancer = getFreelancer(bid.freelancer_id);
                    return (
                      <tr key={bid.bid_id} className="bid-row align-middle">

                        {/* Row number */}
                        <td className="px-4 py-3 text-muted" style={{ fontSize: "13px" }}>
                          {index + 1}
                        </td>

                        {/* Freelancer name — avatar initial + name (CLICKABLE) */}
                        <td className="px-4 py-3">
                          <div 
                            className="d-flex align-items-center gap-2"
                            onClick={() => setSelectedProfile(bid.freelancer_id)}
                            style={{ cursor: "pointer" }}
                          >
                            <div
                              className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
                              style={{ width: "32px", height: "32px", background: "linear-gradient(135deg, #198754, #157347)", fontSize: "12px" }}
                            >
                              {freelancer?.name.charAt(0)}
                            </div>
                            <div className="fw-semibold freelancer-link" style={{ fontSize: "14px" }}>
                              {freelancer?.name}
                            </div>
                          </div>
                        </td>

                        {/* Bid amount */}
                        <td className="px-4 py-3 fw-semibold" style={{ fontSize: "14px" }}>
                          ₹{bid.amount.toLocaleString()}
                        </td>

                        {/* Duration in days */}
                        <td className="px-4 py-3 text-muted" style={{ fontSize: "13px" }}>
                          {bid.duration_days} days
                        </td>

                        {/* Proposal — truncated to one line, full text on hover via title */}
                        <td className="px-4 py-3" style={{ maxWidth: "220px" }}>
                          <div
                            className="text-muted text-truncate"
                            style={{ fontSize: "12px", maxWidth: "200px" }}
                            title={bid.proposal}   // shows full text on hover
                          >
                            {bid.proposal}
                          </div>
                        </td>

                        {/* Status badge */}
                        <td className="px-4 py-3">
                          <span
                            className={`badge rounded-pill px-3 py-1 ${statusBadge(bid.status)}`}
                            style={{ fontSize: "11px" }}
                          >
                            {bid.status}
                          </span>
                        </td>

                        {/* Select button — only show if bid is still PENDING */}
                        <td className="px-4 py-3">
                          {bid.status === "PENDING" ? (
                            <button
                              className="select-btn btn text-white rounded-3 px-3 py-1"
                              style={{ background: "linear-gradient(135deg, #198754, #157347)", fontSize: "12px", fontWeight: "600" }}
                              onClick={() => {
                                alert(`${freelancer?.name} selected! Project will be created. (dummy)`);
                                navigate("/project/1");
                              }}
                            >
                              ✓ Select
                            </button>
                          ) : (
                            // If already accepted or rejected — show disabled label
                            <span className="text-muted" style={{ fontSize: "12px" }}>
                              {bid.status === "ACCEPTED" ? "✓ Hired" : "✗ Rejected"}
                            </span>
                          )}
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </main>
      </div>      <div className="d-flex">

        {/* ── SIDEBAR COMPONENT ─────────────────────────────────────────── */}
        <Sidebar activePage="my-jobs" />

        {/* ── MAIN CONTENT ────────────────────────────────────── */}
        <main className="flex-grow-1 p-4">

          {/* Back button + page heading */}
          <div className="mb-4">
            <button
              className="btn btn-link text-muted p-0 mb-3 text-decoration-none d-flex align-items-center gap-1"
              style={{ fontSize: "13px" }}
              onClick={() => navigate("/my-jobs")}
            >
              ← Back to My Jobs
            </button>
            <h1 className="fw-bold mb-1" style={{ fontSize: "22px" }}>{job.title}</h1>
            <div className="d-flex align-items-center gap-3 flex-wrap">
              <span className="text-muted" style={{ fontSize: "14px" }}>
                Budget: <strong className="text-dark">₹{job.budget.toLocaleString()}</strong>
              </span>
              <span className="text-muted" style={{ fontSize: "14px" }}>
                Deadline: <strong className="text-dark">{job.deadline}</strong>
              </span>
              <span className="text-muted" style={{ fontSize: "14px" }}>
                {jobBids.length} bid{jobBids.length !== 1 ? "s" : ""} received
              </span>
            </div>
          </div>

          {/* ── NO BIDS STATE ──────────────────────────────────── */}
          {jobBids.length === 0 ? (
            <div className="bg-white border rounded-3 p-5 text-center">
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>📭</div>
              <h5 className="fw-semibold mb-2">No bids yet</h5>
              <p className="text-muted" style={{ fontSize: "14px" }}>
                Freelancers haven't applied to this job yet. Check back soon.
              </p>
            </div>

          ) : (

            /* ── BIDS TABLE ───────────────────────────────────────
               Each row = one freelancer's bid
               Columns: freelancer name, bid amount, duration, proposal preview, status, action */
            <div className="bg-white border rounded-3 overflow-hidden">
              <table className="table table-hover mb-0">
                <thead style={{ background: "#f8fafc" }}>
                  <tr>
                    <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>#</th>
                    <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>FREELANCER</th>
                    <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>BID AMOUNT</th>
                    <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>DURATION</th>
                    <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>PROPOSAL</th>
                    <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>STATUS</th>
                    <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {jobBids.map((bid, index) => {
                    const freelancer = getFreelancer(bid.freelancer_id);
                    return (
                      <tr key={bid.bid_id} className="bid-row align-middle">

                        {/* Row number */}
                        <td className="px-4 py-3 text-muted" style={{ fontSize: "13px" }}>
                          {index + 1}
                        </td>

                        {/* Freelancer name — avatar initial + name */}
                        <td className="px-4 py-3">
                          <div className="d-flex align-items-center gap-2">
                            <div
                              className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
                              style={{ width: "32px", height: "32px", background: "linear-gradient(135deg, #198754, #157347)", fontSize: "12px" }}
                            >
                              {freelancer?.name.charAt(0)}
                            </div>
                            <div className="fw-semibold" style={{ fontSize: "14px" }}>
                              {freelancer?.name}
                            </div>
                          </div>
                        </td>

                        {/* Bid amount */}
                        <td className="px-4 py-3 fw-semibold" style={{ fontSize: "14px" }}>
                          ₹{bid.amount.toLocaleString()}
                        </td>

                        {/* Duration in days */}
                        <td className="px-4 py-3 text-muted" style={{ fontSize: "13px" }}>
                          {bid.duration_days} days
                        </td>

                        {/* Proposal — truncated to one line, full text on hover via title */}
                        <td className="px-4 py-3" style={{ maxWidth: "220px" }}>
                          <div
                            className="text-muted text-truncate"
                            style={{ fontSize: "12px", maxWidth: "200px" }}
                            title={bid.proposal}   // shows full text on hover
                          >
                            {bid.proposal}
                          </div>
                        </td>

                        {/* Status badge */}
                        <td className="px-4 py-3">
                          <span
                            className={`badge rounded-pill px-3 py-1 ${statusBadge(bid.status)}`}
                            style={{ fontSize: "11px" }}
                          >
                            {bid.status}
                          </span>
                        </td>

                        {/* Select button — only show if bid is still PENDING */}
                        <td className="px-4 py-3">
                          {bid.status === "PENDING" ? (
                            <button
                              className="select-btn btn text-white rounded-3 px-3 py-1"
                              style={{ background: "linear-gradient(135deg, #198754, #157347)", fontSize: "12px", fontWeight: "600" }}
                              onClick={() => {
                                alert(`${freelancer?.name} selected! Project will be created. (dummy)`);
                                navigate("/project/1");
                              }}
                            >
                              ✓ Select
                            </button>
                          ) : (
                            // If already accepted or rejected — show disabled label
                            <span className="text-muted" style={{ fontSize: "12px" }}>
                              {bid.status === "ACCEPTED" ? "✓ Hired" : "✗ Rejected"}
                            </span>
                          )}
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </main>
      </div>

      {/* ── FREELANCER PROFILE MODAL ──────────────────────────── */}
      {selectedProfile && (
        <div className="modal-overlay" onClick={() => setSelectedProfile(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const profile = getFreelancerProfile(selectedProfile);
              const freelancer = users.find(u => u.user_id === selectedProfile);
              return (
                <>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
                        style={{ width: "50px", height: "50px", background: "linear-gradient(135deg, #198754, #157347)", fontSize: "20px" }}
                      >
                        {freelancer?.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="fw-bold mb-1" style={{ fontSize: "18px" }}>{freelancer?.name}</h4>
                        <p className="text-muted mb-0" style={{ fontSize: "14px" }}>{profile?.title}</p>
                      </div>
                    </div>
                    <button
                      className="btn-close"
                      onClick={() => setSelectedProfile(null)}
                    ></button>
                  </div>

                  {/* Rating */}
                  <div className="mb-3">
                    <span className="rating-star">★★★★★</span>
                    <span className="ms-2 fw-semibold" style={{ fontSize: "14px" }}>
                      {profile?.rating} ({profile?.experience} years experience)
                    </span>
                  </div>

                  {/* Bio */}
                  <div className="mb-3">
                    <p style={{ fontSize: "13px", color: "#475569" }}>
                      {profile?.bio}
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="mb-3">
                    <h6 className="fw-semibold mb-2" style={{ fontSize: "13px" }}>Skills</h6>
                    <div>
                      {profile?.skills?.map((skill, idx) => (
                        <span key={idx} className="skill-badge">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Rate & Portfolio */}
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span style={{ fontSize: "13px", fontWeight: "600" }}>Hourly Rate</span>
                      <span style={{ fontSize: "14px", fontWeight: "bold", color: "#1D9E75" }}>₹{profile?.hourlyRate}/hr</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span style={{ fontSize: "13px", fontWeight: "600" }}>Portfolio</span>
                      <a href={profile?.portfolio} target="_blank" rel="noopener noreferrer" style={{ fontSize: "13px", color: "#1D9E75" }}>
                        View →
                      </a>
                    </div>
                  </div>

                  {/* Contact Button */}
                  <button
                    className="btn w-100 text-white rounded-3 fw-semibold"
                    style={{ background: "linear-gradient(135deg, #198754, #157347)", fontSize: "14px" }}
                  >
                    Contact Freelancer (dummy)
                  </button>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </>
  );
}

export default ViewBids;