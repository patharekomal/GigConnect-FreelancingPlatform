import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../components/Client/Sidebar";
import { bids, users, freelancerProfiles } from "../../data/dummyData";

function ViewBids({ jobs }) {
  const navigate = useNavigate();
  const { jobId } = useParams();

  const [selectedProfile, setSelectedProfile] = useState(null);

  const job = jobs.find((j) => j.job_id === parseInt(jobId));
  const jobBids = bids.filter((b) => b.job_id === parseInt(jobId));

  const getFreelancer = (id) =>
    users.find((u) => u.user_id === id);

  const getFreelancerProfile = (id) =>
    freelancerProfiles.find((p) => p.freelancer_id === id);

  const statusBadge = (status) => {
    if (status === "ACCEPTED") return "bg-success";
    if (status === "REJECTED") return "bg-danger";
    return "bg-warning text-dark";
  };

  if (!job) {
    return (
      <div className="p-5 text-center">
        Job not found.
      </div>
    );
  }

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

        .bid-row:hover{
          background:#f8fafc;
        }

        .select-btn:hover{
          background:linear-gradient(135deg,#198754,#157347)!important;
        }

        .freelancer-link{
          cursor:pointer;
          color:#1D9E75;
        }

        .freelancer-link:hover{
          text-decoration:underline;
        }

        .modal-overlay{
          position:fixed;
          inset:0;
          background:rgba(0,0,0,.45);
          display:flex;
          justify-content:center;
          align-items:center;
          z-index:999;
        }

        .modal-content{
          background:white;
          width:90%;
          max-width:520px;
          border-radius:14px;
          padding:30px;
        }

        .skill-badge{
          display:inline-block;
          margin:4px;
          padding:6px 12px;
          background:#E1F5EE;
          color:#1D9E75;
          border-radius:20px;
          font-size:12px;
        }

        .rating-star{
          color:#fbbf24;
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

            <button
              className="btn btn-link text-muted p-0 mb-3 text-decoration-none"
              onClick={() => navigate("/my-jobs")}
            >
              ← Back to My Jobs
            </button>

            <h2
              className="fw-bold mb-2"
              style={{ fontSize: "24px" }}
            >
              {job.title}
            </h2>

            <div className="d-flex gap-4 flex-wrap mb-4">

              <span className="text-muted">
                Budget :
                <strong className="text-dark ms-1">
                  ₹{job.budget?.toLocaleString?.() ?? job.budget}
                </strong>
              </span>

              <span className="text-muted">
                Deadline :
                <strong className="text-dark ms-1">
                  {job.deadline}
                </strong>
              </span>

              <span className="text-muted">
                {jobBids.length} Bid
                {jobBids.length !== 1 ? "s" : ""}
              </span>

            </div>

            {jobBids.length === 0 ? (

              <div className="bg-white rounded-3 border p-5 text-center">

                <div
                  style={{
                    fontSize: "45px",
                  }}
                >
                  📭
                </div>

                <h5 className="fw-bold mt-3">
                  No bids received yet
                </h5>

                <p className="text-muted">
                  Freelancers haven't applied yet.
                </p>

              </div>

            ) : (

              <div
                className="bg-white rounded-3 border"
                style={{
                  overflowX: "auto",
                }}
              >

                <table
                  className="table table-hover mb-0"
                  style={{
                    minWidth: "1100px",
                  }}
                >

                  <thead style={{ background: "#f8fafc" }}>

                    <tr>

                      <th className="px-4 py-3">#</th>

                      <th className="px-4 py-3">
                        FREELANCER
                      </th>

                      <th className="px-4 py-3">
                        BID
                      </th>

                      <th className="px-4 py-3">
                        DURATION
                      </th>

                      <th className="px-4 py-3">
                        PROPOSAL
                      </th>

                      <th className="px-4 py-3">
                        STATUS
                      </th>

                      <th className="px-4 py-3">
                        ACTION
                      </th>

                    </tr>

                  </thead>

                  <tbody>
                                      {jobBids.map((bid, index) => {
                    const freelancer = getFreelancer(bid.freelancer_id);

                    return (
                      <tr
                        key={bid.bid_id}
                        className="bid-row align-middle"
                      >
                        {/* Row Number */}
                        <td className="px-4 py-3">
                          {index + 1}
                        </td>

                        {/* Freelancer */}
                        <td className="px-4 py-3">
                          <div
                            className="d-flex align-items-center gap-2"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              setSelectedProfile(
                                bid.freelancer_id
                              )
                            }
                          >
                            <div
                              className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                              style={{
                                width: "34px",
                                height: "34px",
                                background:
                                  "linear-gradient(135deg,#198754,#157347)",
                              }}
                            >
                              {freelancer?.name?.charAt(0)}
                            </div>

                            <div
                              className="fw-semibold freelancer-link"
                            >
                              {freelancer?.name}
                            </div>
                          </div>
                        </td>

                        {/* Bid */}
                        <td className="px-4 py-3 fw-semibold">
                          ₹
                          {bid.amount
                            ?.toLocaleString?.() ??
                            bid.amount}
                        </td>

                        {/* Duration */}
                        <td className="px-4 py-3 text-muted">
                          {bid.duration_days} days
                        </td>

                        {/* Proposal */}
                        <td
                          className="px-4 py-3"
                          style={{
                            width: "35%",
                          }}
                        >
                          <div
                            className="text-muted"
                            style={{
                              fontSize: "12px",
                            }}
                          >
                            {bid.proposal}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          <span
                            className={`badge rounded-pill px-3 py-1 ${statusBadge(
                              bid.status
                            )}`}
                          >
                            {bid.status}
                          </span>
                        </td>

                        {/* Action */}
                        <td className="px-4 py-3">

                          {bid.status === "PENDING" ? (

                            <button
                              className="btn text-white select-btn"
                              style={{
                                background:
                                  "linear-gradient(135deg,#198754,#157347)",
                                fontSize: "12px",
                                fontWeight: "600",
                              }}
                              onClick={() => {
                                alert(
                                  `${freelancer?.name} selected!`
                                );

                                navigate("/project/1");
                              }}
                            >
                              ✓ Select
                            </button>

                          ) : (

                            <span className="text-muted">

                              {bid.status === "ACCEPTED"
                                ? "✓ Hired"
                                : "✗ Rejected"}

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

          </div>
        </main>
      </div>

      {/* ================= PROFILE MODAL ================= */}

      {selectedProfile && (
        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedProfile(null)
          }
        >
          <div
            className="modal-content"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            {(() => {
              const profile =
                getFreelancerProfile(
                  selectedProfile
                );

              const freelancer =
                getFreelancer(
                  selectedProfile
                );

              return (
                <>
                  <div className="d-flex justify-content-between mb-4">

                    <div className="d-flex gap-3">

                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                        style={{
                          width: "60px",
                          height: "60px",
                          fontSize: "22px",
                          background:
                            "linear-gradient(135deg,#198754,#157347)",
                        }}
                      >
                        {freelancer?.name?.charAt(0)}
                      </div>

                      <div>

                        <h4 className="mb-1">
                          {freelancer?.name}
                        </h4>

                        <p className="text-muted mb-1">
                          {profile?.title}
                        </p>

                        <span className="rating-star">
                          ★★★★★
                        </span>

                        <span className="ms-2 fw-semibold">
                          {profile?.rating}
                        </span>

                      </div>

                    </div>

                    <button
                      className="btn-close"
                      onClick={() =>
                        setSelectedProfile(
                          null
                        )
                      }
                    />

                  </div>

                  <p
                    className="text-muted"
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    {profile?.bio}
                  </p>

                  <h6 className="fw-bold mt-4">
                    Skills
                  </h6>

                  <div className="mb-4">

                    {profile?.skills?.map(
                      (skill, index) => (
                        <span
                          key={index}
                          className="skill-badge"
                        >
                          {skill}
                        </span>
                      )
                    )}

                  </div>

                  <div className="d-flex justify-content-between mb-2">

                    <span>
                      Hourly Rate
                    </span>

                    <strong className="text-success">
                      ₹
                      {profile?.hourlyRate}
                      /hr
                    </strong>

                  </div>

                  <div className="d-flex justify-content-between mb-4">

                    <span>
                      Portfolio
                    </span>

                    <a
                      href={profile?.portfolio}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View →
                    </a>

                  </div>

                  <button
                    className="btn w-100 text-white fw-semibold"
                    style={{
                      background:
                        "linear-gradient(135deg,#198754,#157347)",
                    }}
                  >
                    Contact Freelancer
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