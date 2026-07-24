/*
import Sidebar from "../../components/Freelancer/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { projects, payments, jobs, users, messages } from "../../data/dummyData";
function MyProjects() {

    const navigate = useNavigate();
    const freelancerId = 6;
    const myProjects = projects.filter(
    project => project.freelancer_id === freelancerId);
    // const { projectId } = useParams();
    // const project = projects.find(p => p.project_id == projectId);
    // const job = jobs.find(j => j.job_id == project.job_id);
    // const projectMessages =messages.filter( m => m.project_id == projectId);
    

    return (

        <div className="container-fluid p-4">

            <div className="row">

                <div className="col-md-2">
                    <Sidebar />
                </div>

                <div className="col-md-10">

                   <div className="card shadow-sm border-0 p-4 mb-4">
                           <h2>
                                My Projects
                           </h2>
                           <p className="text-muted mb-0">    
                            Manage active projects, submit work and track payments.</p>
                    </div>
                    <div>
                        {
                          myProjects.map((project) => {
                               const job = jobs.find(job => job.job_id === project.job_id);
                               const payment = payments.find(payment => payment.project_id === project.project_id );

                               return (<div className="card shadow-sm border-0 mb-3" key={project.project_id}>
                                         <div className="card-body">
                                                 <h4>
                                                      {job?.title}
                                                 </h4>
                                                  <p>
                                                      <strong>Project Amount:</strong>
                                                      ₹{project.agreed_amount}
                                                  </p>
                                                  <p>
                                                      <strong>Status:</strong>
                                                      {" "}
                                                      {project.status}
                                                  </p>
                                                  <p>
                                                      <strong>Payment:</strong>
                                                      {" "}
                                                      {payment?.status}
                                                  </p>
                                                  <div className="d-flex gap-3">
                                                    <button className="btn btn-primary" onClick={() => navigate(`/chat/${project.project_id}`)}>💬 Chat</button>
                                                    <button className="btn btn-primary" onClick={() => navigate(`/submitWork/${project.project_id}`)}>Submit Work</button>
                                                  </div>
                                          </div> 
                                        </div> );}) 
                        }
                    </div>
                </div>

            </div>

        </div>

    );
}

export default MyProjects;
*/

// import Sidebar from "../../components/Freelancer/Sidebar";
// import { useNavigate } from "react-router-dom";
// import { projects, payments, jobs } from "../../data/dummyData";

// function MyProjects() {
//   const navigate = useNavigate();
//   const freelancerId = 6;

//   // All projects of logged in freelancer
//   const myProjects = projects.filter(
//     (project) => project.freelancer_id === freelancerId,
//   );

//   // Active Projects
//   const activeProjects = myProjects.filter(
//     (project) => project.status !== "COMPLETED",
//   );

//   // Completed Projects
//   const completedProjects = myProjects.filter(
//     (project) => project.status === "COMPLETED",
//   );

//   return (
//     <div className="container-fluid p-4">
//       <div className="row">
//         <div className="col-md-2">
//           <Sidebar />
//         </div>

//         <div className="col-md-10">
//           {/* Page Header */}
//           <div className="card shadow-sm border-0 p-4 mb-4">
//             <h2>My Projects</h2>
//             <p className="text-muted mb-0">
//               Manage active projects, submit work and track payments.
//             </p>
//           </div>

//           {/* ================= Active Projects ================= */}

//           <h4 className="fw-bold mb-3">🟢 Active Projects</h4>

//           {activeProjects.length > 0 ? (
//             activeProjects.map((project) => {
//               const job = jobs.find((job) => job.job_id === project.job_id);

//               const payment = payments.find(
//                 (payment) => payment.project_id === project.project_id,
//               );

//               return (
//                 <div className="card shadow-sm border-0 mb-3"
//                   key={project.project_id}>
//                   <div className="card-body">
//                     <h4>{job?.title}</h4>

//                     <p>
//                       <strong>Project Amount:</strong> ₹{project.agreed_amount}
//                     </p>

//                     <p>
//                       <strong>Status:</strong> {project.status}
//                     </p>

//                     <p>
//                       <strong>Payment:</strong> {payment?.status}
//                     </p>

//                     <div className="d-flex gap-3">
//                       <button
//                         className="btn btn-primary"
//                         onClick={() => navigate(`/chat/${project.project_id}`)}
//                       >
//                         💬 Chat
//                       </button>

//                       <button
//                         className="btn btn-primary"
//                         onClick={() =>
//                           navigate(`/submitWork/${project.project_id}`)
//                         }
//                       >
//                         Submit Work
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div className="alert alert-light border">
//               No Active Projects Found.
//             </div>
//           )}

//           {/* ================= Completed Projects ================= */}

//           <hr className="my-5" />

//           <h4 className="fw-bold mb-3">📁 Previous Completed Projects</h4>

//           {completedProjects.length > 0 ? (
//             completedProjects.map((project) => {
//               const job = jobs.find((job) => job.job_id === project.job_id);

//               const payment = payments.find(
//                 (payment) => payment.project_id === project.project_id,
//               );

//               return (
//                 <div
//                   className="card shadow-sm border-0 mb-3"
//                   key={project.project_id}
//                 >
//                   <div className="card-body">
//                     <h4>{job?.title}</h4>

//                     <p>
//                       <strong>Project Amount:</strong> ₹{project.agreed_amount}
//                     </p>

//                     <p>
//                       <strong>Status:</strong> {project.status}
//                     </p>

//                     <p>
//                       <strong>Payment:</strong> {payment?.status}
//                     </p>

//                     <div className="d-flex gap-3">
//                       <button className="btn btn-primary" disabled>
//                         💬 Chat
//                       </button>

//                       <button className="btn btn-primary" disabled>
//                         Submit Work
//                       </button>
//                     </div>

//                     <div className="alert alert-success mt-3 mb-0">
//                       ✓ This project has been completed successfully.
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div className="alert alert-light border">
//               No Completed Projects Yet.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MyProjects;






import Sidebar from "../../components/Freelancer/Sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyProjects } from "../../api/projectApi";

function MyProjects() {
  const navigate = useNavigate();

   const user = JSON.parse(localStorage.getItem("user"));
  const freelancerId = user.id;  

  const [myProjects, setMyProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await getMyProjects(freelancerId);

      console.log(response.data);

      setMyProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const activeProjects = myProjects.filter(
    (project) => project.status !== "COMPLETED",
  );

  const completedProjects = myProjects.filter(
    (project) => project.status === "COMPLETED",
  );

  return (
    <div className="container-fluid p-4">
      <div className="row">
        {/* Sidebar */}

        <div className="col-md-2">
          <Sidebar />
        </div>

        {/* Main Content */}

        <div className="col-md-10">
          {/* Header */}

          <div className="card shadow-sm border-0 p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="fw-bold mb-1">My Projects</h2>

                <p className="text-muted mb-0">
                  Manage your active projects, chat with clients and submit
                  work.
                </p>
              </div>

              <span className="badge bg-success fs-6 px-3 py-2">
                {activeProjects.length} Active
              </span>
            </div>
          </div>

          {/* Active Projects */}

          <h4 className="fw-bold mb-3">🟢 Active Projects</h4>

          {activeProjects.length > 0 ? (
            activeProjects.map((project) => {
            
              // const payment = payments.find(
              //   (payment) => payment.projectId === project.projectId,
              // );

              return (
                <div
                  className="card shadow-sm border-0 mb-4"
                  key={project.projectId}
                >
                  <div className="card-body">
                    {/* Title */}

                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h4 className="fw-bold mb-1">{project.jobTitle}</h4>

                        <p className="text-muted mb-0">
                          {" "}
                          {project.jobDescription}
                        </p>
                      </div>

                      <span
                        className={`badge px-3 py-2 ${
                          project.status === "IN_PROGRESS"
                            ? "bg-primary"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {project.status.replace("_", " ")}
                      </span>
                    </div>

                    <hr />

                    {/* Four Column Layout */}

                    <div className="row">
                      {/* Amount */}

                      <div className="col-lg-2">
                        <div className="border rounded p-3 h-100 text-center">
                          <small className="text-muted">💰 Amount</small>

                          <h5 className="fw-bold mt-2">
                            ₹{project.agreedAmount}
                          </h5>
                        </div>
                      </div>

                      {/* Deadline */}

                      <div className="col-lg-3">
                        <div className="border rounded p-3 h-100 text-center">
                          {/* <small className="text-muted">📅 Deadline</small>
                          <h6 className="mt-2">{job?.deadline}</h6>
                          <small className="text-danger">2 Days Left</small> */}
                          <small className="text-muted">👤 Client</small>

                          <h6 className="mt-2">{project.companyName}</h6>
                        </div>
                      </div>

                      {/* Payment */}

                      <div className="col-lg-2">
                        <div className="border rounded p-3 h-100 text-center">
                          <small className="text-muted">💳 Payment</small>

                          <h6 className="mt-2">{"PENDING"}</h6>
                        </div>
                      </div>

                      {/* Actions */}

                      <div className="col-lg-5">
                        <div className="border rounded p-3 h-100">
                          <small className="text-muted">⚡ Actions</small>

                          <div className="d-flex flex-wrap gap-2 mt-3">
                            <button
                              className="btn btn-outline-success btn-sm"
                              onClick={() =>
                                navigate(`/freelancer/project/${project.projectId}`)
                              }
                            >
                              👁 View Details
                            </button>

                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() =>
                                navigate(`/chat/${project.projectId}`)
                              }
                            >
                              💬 Chat
                            </button>

                            <button
                              className="btn btn-success btn-sm"
                              onClick={() =>
                                navigate(`/submitWork/${project.projectId}`)
                              }
                            >
                              📤 Submit Work
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="alert alert-light border">
              No Active Projects Found.
            </div>
          )}

          {/* ================= Completed Projects starts here ================= */}
          <hr className="my-5" />

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold">📁 Previous Completed Projects</h4>

            <span className="badge bg-secondary fs-6 px-3 py-2">
              {completedProjects.length} Completed
            </span>
          </div>

          {completedProjects.length > 0 ? (
            completedProjects.map((project) => {
             

              const payment = payments.find(
                (payment) => payment.project_id === project.project_id,
              );

              return (
                <div
                  className="card shadow-sm border-0 mb-4"
                  key={project.projectId}
                >
                  <div className="card-body">
                    {/* Title */}

                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h4 className="fw-bold mb-1">{project.jobTitle}</h4>

                        <p className="text-muted mb-0">{project.jobDescription}</p>
                      </div>

                      <span className="badge bg-success px-3 py-2">
                        COMPLETED
                      </span>
                    </div>

                    <hr />

                    {/* Information Grid */}

                    <div className="row">
                      {/* Amount */}

                      <div className="col-lg-2">
                        <div className="border rounded p-3 h-100 text-center">
                          <small className="text-muted">💰 Amount</small>

                          <h5 className="fw-bold mt-2">
                            ₹{project.agreedAmount}
                          </h5>
                        </div>
                      </div>

                      {/* Deadline */}

                      <div className="col-lg-3">
                        <div className="border rounded p-3 h-100 text-center">
                          {/* <small className="text-muted">📅 Deadline</small>
                          <h6 className="mt-2">{job?.deadline}</h6>
                          <small className="text-success">Finished</small> */}
                          <small className="text-muted">👤 Client</small>

                          <h6 className="mt-2">{project.clientName}</h6>
                        </div>
                      </div>

                      {/* Payment */}

                      <div className="col-lg-2">
                        <div className="border rounded p-3 h-100 text-center">
                          <small className="text-muted">💳 Payment</small>

                          <h6 className="mt-2">{"PENDING"}</h6>
                        </div>
                      </div>

                      {/* Actions */}

                      <div className="col-lg-5">
                        <div className="border rounded p-3 h-100">
                          <small className="text-muted">⚡ Actions</small>

                          <div className="d-flex flex-wrap gap-2 mt-3">
                            <button
                              className="btn btn-outline-success btn-sm"
                              onClick={() =>
                                navigate(`/freelancer/project/${project.projectId}`)
                              }
                            >
                              👁 View Details
                            </button>

                            <button
                              className="btn btn-outline-primary btn-sm flex-fill"
                              disabled
                            >
                              💬 Chat
                            </button>

                            <button
                              className="btn btn-success btn-sm flex-fill"
                              disabled
                            >
                              📤 Submit Work
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Success Banner */}

                    <div className="alert alert-success mt-4 mb-0">
                      <strong>✓ Project Completed Successfully</strong>
                      <br />
                      This project has been completed successfully. Chat and
                      work submission are disabled for completed projects.
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="alert alert-light border">
              No Completed Projects Yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProjects;
