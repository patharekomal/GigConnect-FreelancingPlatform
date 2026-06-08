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
                               📁 My Projects
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
                                                     📁 {job?.title}
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