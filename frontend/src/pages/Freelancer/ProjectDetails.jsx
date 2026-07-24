import Sidebar from "../../components/Freelancer/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjectById } from "../../api/projectApi";

function ProjectDetails() {

    const navigate = useNavigate();
    const { projectId } = useParams();

    const [project, setProject] = useState(null);

    useEffect(() => { loadProject();}, []);

    const loadProject = async () => {
        try {
            const response = await getProjectById(projectId);
            console.log(response.data);
            setProject(response.data);
            }
        catch (error)
         {
            console.log(error);
         }
    };

    if (!project) {

        return (
            <div className="text-center mt-5">
                <h4>Loading Project...</h4>
            </div>
        );

    }

    return (
      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>

          <div className="col-md-10">
            {/* Header */}

            <div className="card shadow-sm border-0 p-4 mb-4">
              <button
                className="btn btn-link text-start p-0 mb-3"
                onClick={() => navigate("/myProjects")}
              >
                ← Back to My Projects
              </button>

              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h2 className="fw-bold">{project.jobTitle}</h2>

                  <p className="text-muted mb-0">{project.shortDescription}</p>
                </div>

                <span
                  className={`badge fs-6 ${
                    project.status === "IN_PROGRESS"
                      ? "bg-primary"
                      : project.status === "SUBMITTED"
                        ? "bg-warning"
                        : "bg-success"
                  }`}
                >
                  {project.status}
                </span>
              </div>
            </div>
            {/* ================= Project Information ================= */}

            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body">
                <h4 className="mb-4">📋 Project Information</h4>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <strong>👤 Client</strong>
                    <p className="text-muted mb-0">{project.clientName}</p>
                  </div>

                  <div className="col-md-4 mb-3">
                    <strong>💰 Agreed Amount</strong>
                    <p className="text-success fw-bold mb-0">
                      ₹{project.agreedAmount}
                    </p>
                  </div>

                  <div className="col-md-4 mb-3">
                    <strong>📅 Deadline</strong>
                    <p className="text-muted mb-0">{project.deadline}</p>
                  </div>

                  <div className="col-md-4 mb-3">
                    <strong>🚀 Started On</strong>
                    <p className="text-muted mb-0">{project.createdDate}</p>
                  </div>

                  {/* <div className="col-md-4 mb-3">
                    <strong>🆔 Project ID</strong>
                    <p className="text-muted mb-0">#{project.projectId}</p>
                  </div> */}

                  <div className="col-md-4 mb-3">
                    <strong>📌 Status</strong>
                    <p className="mb-0">{project.status}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= Job Description ================= */}

            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body">
                <h4 className="mb-3">📝 Job Description</h4>

                <p className="text-muted mb-0" style={{ lineHeight: "1.8" }}>
                  {project.description}
                </p>
              </div>
            </div>

            {/* ================= Submission Status ================= */}

            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body">
                <h4 className="mb-3">📤 Submission Status</h4>

                {project.submittedWork ? (
                  <>
                    <div className="alert alert-success">
                      <h6 className="mb-2">✅ Work Submitted Successfully</h6>

                      <p className="mb-2">
                        <strong>Repository / File :</strong>
                      </p>

                      <a
                        href={project.submittedWork}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {project.submittedWork}
                      </a>
                    </div>
                  </>
                ) : (
                  <div className="alert alert-warning mb-0">
                    No work submitted yet.
                  </div>
                )}
              </div>
            </div>

            {/* ================= Actions ================= */}

            <div className="card shadow-sm border-0">
              <div className="card-body">
                <div className="d-flex flex-wrap gap-3 justify-content-end">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate(`/chat/${project.projectId}`)}
                  >
                    💬 Chat
                  </button>

                  <button
                    className="btn btn-success"
                    disabled={project.status !== "IN_PROGRESS"}
                    onClick={() => navigate(`/submitWork/${project.projectId}`)}
                  >
                    📤 Submit Work
                  </button>
                </div>
              </div>
            </div>

            {project.status === "COMPLETED" && (
              <div className="alert alert-success mt-4">
                <h5 className="mb-1">🎉 Project Completed</h5>
                Payment has been released by the client.
              </div>
            )}
          </div>
        </div>
      </div>
    );
}
export default ProjectDetails;