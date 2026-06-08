import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../components/Client/Sidebar";
import { projects, users, jobs, messages, freelancerProfiles } from "../../data/dummyData";



const CLIENT_ID = 2;

function MyProjects() {
  const navigate = useNavigate();
  const [expandedProject, setExpandedProject] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  // Filter only this client's projects
  const myProjects = projects.filter(p => p.client_id === CLIENT_ID);

  // Get freelancer name by ID
  const getFreelancer = (id) => users.find(u => u.user_id === id);

  // Get job title by ID
  const getJob = (id) => jobs.find(j => j.job_id === id);

  // Get project messages
  const getProjectMessages = (projectId) => 
    messages.filter(m => m.project_id === projectId);

  // Get freelancer profile
  const getFreelancerProfile = (id) => 
    freelancerProfiles.find(p => p.freelancer_id === id);

  // Badge style based on project status
  const statusStyle = (status) => {
    if (status === "COMPLETED")   return { bg: "#E1F5EE", color: "#1D9E75" };
    if (status === "SUBMITTED")   return { bg: "#fef9c3", color: "#ca8a04" };
    if (status === "IN_PROGRESS") return { bg: "#dbeafe", color: "#2563eb" };
    if (status === "CANCELLED")   return { bg: "#fee2e2", color: "#dc2626" };
    return { bg: "#f1f5f9", color: "#64748b" };
  };

  const handleSendMessage = (projectId) => {
    if (newMessage.trim()) {
      console.log("Message sent:", newMessage);
      setNewMessage("");
    }
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
        .project-row:hover { background: #f8fafc; }
        .view-btn:hover { background: linear-gradient(135deg, #198754, #157347) !important; }
        .chat-container { max-height: 400px; overflow-y: auto; background: #f8fafc; border-radius: 8px; }
        .message { padding: 8px 12px; margin: 4px 0; border-radius: 6px; font-size: 13px; }
        .message.sent { background: #E1F5EE; color: #0f172a; margin-left: 20px; }
        .message.received { background: #e5e7eb; color: #0f172a; margin-right: 20px; }
      `}</style>

      <div className="d-flex">

        {/* ── SIDEBAR COMPONENT ─────────────────────────────────────────── */}
        <Sidebar activePage="my-projects" />
        <main className="flex-grow-1 p-4">

          <div className="mb-4">
            <h1 className="fw-bold mb-1" style={{ fontSize: "22px" }}>My Projects</h1>
            <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
              {myProjects.length} project{myProjects.length !== 1 ? "s" : ""} in total
            </p>
          </div>

          {/* ── EMPTY STATE ────────────────────────────────────── */}
          {myProjects.length === 0 ? (
            <div className="bg-white border rounded-3 p-5 text-center">
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>🗂️</div>
              <h5 className="fw-semibold mb-2">No projects yet</h5>
              <p className="text-muted mb-3" style={{ fontSize: "14px" }}>
                Projects are created when you accept a freelancer's bid.
              </p>
              <button
                className="btn text-white fw-semibold rounded-3 px-4"
                style={{ background: "linear-gradient(135deg, #198754, #157347)", fontSize: "13px" }}
                onClick={() => navigate("/my-jobs")}
              >
                View My Jobs
              </button>
            </div>

          ) : (

            /* ── PROJECTS TABLE ──────────────────────────────────
               Each row is one project. Click "View" to go to ProjectPage. */
            <div className="bg-white border rounded-3 overflow-hidden">
              {myProjects.map((project, index) => {
                const freelancer = getFreelancer(project.freelancer_id);
                const job = getJob(project.job_id);
                const badge = statusStyle(project.status);
                const projectMessages = getProjectMessages(project.project_id);
                const isExpanded = expandedProject === project.project_id;

                return (
                  <div key={project.project_id}>
                    <table className="table table-hover mb-0">
                      {index === 0 && (
                        <thead style={{ background: "#f8fafc" }}>
                          <tr>
                            <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>#</th>
                            <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>JOB TITLE</th>
                            <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>FREELANCER</th>
                            <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>AMOUNT</th>
                            <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>STATUS</th>
                            <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>ACTION</th>
                          </tr>
                        </thead>
                      )}
                      <tbody>
                        <tr className="project-row align-middle">

                          <td className="px-4 py-3 text-muted" style={{ fontSize: "13px" }}>
                            {index + 1}
                          </td>

                          {/* Job title */}
                          <td className="px-4 py-3">
                            <div className="fw-semibold" style={{ fontSize: "14px" }}>
                              {job?.title || "—"}
                            </div>
                            <div className="text-muted" style={{ fontSize: "11px" }}>
                              #PRJ-{String(project.project_id).padStart(3, "0")}
                            </div>
                          </td>

                          {/* Freelancer avatar + name */}
                          <td className="px-4 py-3">
                            <div className="d-flex align-items-center gap-2">
                              <div
                                className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
                                style={{ width: "28px", height: "28px", background: "linear-gradient(135deg, #198754, #157347)", fontSize: "11px" }}
                              >
                                {freelancer?.name.charAt(0)}
                              </div>
                              <span style={{ fontSize: "13px" }}>{freelancer?.name}</span>
                            </div>
                          </td>

                          {/* Agreed amount */}
                          <td className="px-4 py-3 fw-semibold" style={{ fontSize: "14px" }}>
                            ₹{project.agreed_amount.toLocaleString()}
                          </td>

                          {/* Status badge */}
                          <td className="px-4 py-3">
                            <span
                              className="badge rounded-pill px-3 py-1 fw-semibold"
                              style={{ background: badge.bg, color: badge.color, fontSize: "11px" }}
                            >
                              {project.status}
                            </span>
                          </td>

                          {/* View button + Chat toggle */}
                          <td className="px-4 py-3">
                            <div className="d-flex gap-2 align-items-center">
                              <button
                                className="view-btn btn text-white rounded-3 px-2 py-1"
                                style={{ background: "linear-gradient(135deg, #198754, #157347)", fontSize: "12px", fontWeight: "600" }}
                                onClick={() => navigate(`/project/${project.project_id}`)}
                              >
                                View
                              </button>
                              <button
                                className="btn btn-sm rounded-3"
                                style={{ background: "#E1F5EE", color: "#1D9E75", fontSize: "12px" }}
                                onClick={() => setExpandedProject(isExpanded ? null : project.project_id)}
                              >
                                {isExpanded ? "✕" : "💬"}
                              </button>
                            </div>
                          </td>

                        </tr>
                      </tbody>
                    </table>

                    {/* ── CHAT SECTION (expandable) ────────────────────── */}
                    {isExpanded && (
                      <div className="px-4 py-4 border-top" style={{ background: "#ffffff" }}>
                        <h5 className="fw-semibold mb-3" style={{ fontSize: "14px" }}>
                          Chat with {freelancer?.name}
                        </h5>

                        {/* Messages container */}
                        <div className="chat-container p-3 mb-3">
                          {projectMessages.length === 0 ? (
                            <div className="text-center text-muted" style={{ fontSize: "12px", padding: "20px 0" }}>
                              No messages yet. Start a conversation!
                            </div>
                          ) : (
                            projectMessages.map((msg) => (
                              <div
                                key={msg.message_id}
                                className={`message ${msg.sender_id === 2 ? "sent" : "received"}`}
                              >
                                <strong style={{ fontSize: "11px" }}>{msg.sender_name}</strong>
                                <div style={{ marginTop: "4px" }}>{msg.message}</div>
                                <div style={{ fontSize: "10px", marginTop: "4px", opacity: 0.7 }}>
                                  {msg.time}
                                </div>
                              </div>
                            ))
                          )}
                        </div>

                        {/* Message input */}
                        <div className="d-flex gap-2">
                          <input
                            type="text"
                            className="form-control rounded-3"
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleSendMessage(project.project_id);
                              }
                            }}
                            style={{ fontSize: "13px" }}
                          />
                          <button
                            className="btn text-white rounded-3 px-4"
                            style={{ background: "linear-gradient(135deg, #198754, #157347)", fontSize: "13px" }}
                            onClick={() => handleSendMessage(project.project_id)}
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

        </main>
      </div>
    </>
  );
}

export default MyProjects;