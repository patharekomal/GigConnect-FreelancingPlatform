import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../components/Client/Sidebar";
import {
  projects,
  users,
  jobs,
  messages,
  freelancerProfiles,
} from "../../data/dummyData";

const CLIENT_ID = 2;

function MyProjects() {
  const navigate = useNavigate();

  const [expandedProject, setExpandedProject] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const myProjects = projects.filter(
    (p) => p.client_id === CLIENT_ID
  );

  const getFreelancer = (id) =>
    users.find((u) => u.user_id === id);

  const getJob = (id) =>
    jobs.find((j) => j.job_id === id);

  const getProjectMessages = (projectId) =>
    messages.filter(
      (m) => m.project_id === projectId
    );

  const getFreelancerProfile = (id) =>
    freelancerProfiles.find(
      (p) => p.freelancer_id === id
    );

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

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log(newMessage);
      setNewMessage("");
    }
  };

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

        .project-row:hover{
          background:#f8fafc;
        }

        .view-btn:hover{
          background:linear-gradient(135deg,#198754,#157347)!important;
        }

        .chat-container{
          max-height:350px;
          overflow-y:auto;
          background:#f8fafc;
          border-radius:10px;
        }

        .message{
          padding:10px 14px;
          border-radius:8px;
          margin-bottom:10px;
          font-size:13px;
        }

        .message.sent{
          background:#E1F5EE;
          margin-left:30px;
        }

        .message.received{
          background:#e5e7eb;
          margin-right:30px;
        }
      `}</style>

      <div>

        <Sidebar activePage="my-projects" />

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

            <div className="mb-4">

              <h2
                className="fw-bold mb-2"
                style={{
                  fontSize: "24px",
                }}
              >
                My Projects
              </h2>

              <p className="text-muted">
                {myProjects.length} Project
                {myProjects.length !== 1
                  ? "s"
                  : ""}
              </p>

            </div>

            {myProjects.length === 0 ? (

              <div className="bg-white border rounded-3 p-5 text-center">

                <div
                  style={{
                    fontSize: "45px",
                  }}
                >
                  🗂️
                </div>

                <h5 className="fw-bold mt-3">
                  No Projects Yet
                </h5>

                <p className="text-muted">
                  Projects will appear here after
                  accepting bids.
                </p>

                <button
                  className="btn text-white"
                  style={{
                    background:
                      "linear-gradient(135deg,#198754,#157347)",
                  }}
                  onClick={() =>
                    navigate("/my-jobs")
                  }
                >
                  View My Jobs
                </button>

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

                  <thead
                    style={{
                      background: "#f8fafc",
                    }}
                  >
                    <tr>

                      <th className="px-4 py-3">
                        #
                      </th>

                      <th className="px-4 py-3">
                        JOB TITLE
                      </th>

                      <th className="px-4 py-3">
                        FREELANCER
                      </th>

                      <th className="px-4 py-3">
                        AMOUNT
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
                                      {myProjects.map((project, index) => {
                    const freelancer = getFreelancer(
                      project.freelancer_id
                    );

                    const job = getJob(
                      project.job_id
                    );

                    const badge = statusStyle(
                      project.status
                    );

                    const projectMessages =
                      getProjectMessages(
                        project.project_id
                      );

                    const isExpanded =
                      expandedProject ===
                      project.project_id;

                    return (
                      <>
                        <tr
                          key={project.project_id}
                          className="project-row align-middle"
                        >
                          {/* Row Number */}
                          <td className="px-4 py-3">
                            {index + 1}
                          </td>

                          {/* Job Title */}
                          <td
                            className="px-4 py-3"
                            style={{ width: "35%" }}
                          >
                            <div
                              className="fw-semibold"
                              style={{
                                fontSize: "14px",
                              }}
                            >
                              {job?.title || "N/A"}
                            </div>

                            <div
                              className="text-muted"
                              style={{
                                fontSize: "12px",
                              }}
                            >
                              #PRJ-
                              {String(
                                project.project_id
                              ).padStart(3, "0")}
                            </div>
                          </td>

                          {/* Freelancer */}
                          <td className="px-4 py-3">
                            <div className="d-flex align-items-center gap-2">

                              <div
                                className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                                style={{
                                  width: "32px",
                                  height: "32px",
                                  background:
                                    "linear-gradient(135deg,#198754,#157347)",
                                }}
                              >
                                {freelancer?.name?.charAt(
                                  0
                                )}
                              </div>

                              <span>
                                {freelancer?.name}
                              </span>

                            </div>
                          </td>

                          {/* Amount */}
                          <td className="px-4 py-3 fw-semibold">
                            ₹
                            {project.agreed_amount
                              ?.toLocaleString?.() ??
                              project.agreed_amount}
                          </td>

                          {/* Status */}
                          <td className="px-4 py-3">

                            <span
                              className="badge rounded-pill px-3 py-2"
                              style={{
                                background:
                                  badge.bg,
                                color:
                                  badge.color,
                              }}
                            >
                              {project.status}
                            </span>

                          </td>

                          {/* Action */}
                          <td className="px-4 py-3">

                            <div className="d-flex gap-2">

                              <button
                                className="btn text-white view-btn"
                                style={{
                                  background:
                                    "linear-gradient(135deg,#198754,#157347)",
                                  fontSize:
                                    "12px",
                                }}
                                onClick={() =>
                                  navigate(
                                    `/project/${project.project_id}`
                                  )
                                }
                              >
                                View
                              </button>

                              <button
                                className="btn"
                                style={{
                                  background:
                                    "#E1F5EE",
                                  color:
                                    "#1D9E75",
                                  fontSize:
                                    "12px",
                                }}
                                onClick={() =>
                                  setExpandedProject(
                                    isExpanded
                                      ? null
                                      : project.project_id
                                  )
                                }
                              >
                                {isExpanded
                                  ? "✕"
                                  : "💬"}
                              </button>

                            </div>

                          </td>
                        </tr>

                        {isExpanded && (
                          <tr>

                            <td
                              colSpan="6"
                              className="p-4"
                              style={{
                                background:
                                  "#fff",
                              }}
                            >
                              <h6 className="fw-bold mb-3">
                                Chat with{" "}
                                {freelancer?.name}
                              </h6>

                              <div className="chat-container p-3 mb-3">

                                {projectMessages.length ===
                                0 ? (

                                  <div className="text-center text-muted py-4">
                                    No messages
                                    yet.
                                  </div>

                                ) : (

                                  projectMessages.map(
                                    (msg) => (
                                      <div
                                        key={
                                          msg.message_id
                                        }
                                        className={`message ${
                                          msg.sender_id ===
                                          CLIENT_ID
                                            ? "sent"
                                            : "received"
                                        }`}
                                      >
                                        <strong>
                                          {
                                            msg.sender_name
                                          }
                                        </strong>

                                        <div className="mt-1">
                                          {
                                            msg.message
                                          }
                                        </div>

                                        <div
                                          className="mt-1"
                                          style={{
                                            fontSize:
                                              "11px",
                                            opacity:
                                              ".7",
                                          }}
                                        >
                                          {
                                            msg.time
                                          }
                                        </div>
                                      </div>
                                    )
                                  )

                                )}

                              </div>

                              <div className="d-flex gap-2">

                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Type your message..."
                                  value={
                                    newMessage
                                  }
                                  onChange={(
                                    e
                                  ) =>
                                    setNewMessage(
                                      e.target
                                        .value
                                    )
                                  }
                                  onKeyDown={(
                                    e
                                  ) => {
                                    if (
                                      e.key ===
                                      "Enter"
                                    ) {
                                      handleSendMessage();
                                    }
                                  }}
                                />

                                <button
                                  className="btn text-white"
                                  style={{
                                    background:
                                      "linear-gradient(135deg,#198754,#157347)",
                                  }}
                                  onClick={
                                    handleSendMessage
                                  }
                                >
                                  Send
                                </button>

                              </div>

                            </td>

                          </tr>
                        )}
                      </>
                    );
                  })}
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

export default MyProjects;