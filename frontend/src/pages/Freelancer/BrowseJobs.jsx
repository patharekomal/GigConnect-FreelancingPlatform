import Sidebar from "../../components/Freelancer/Sidebar";
import { useNavigate } from "react-router-dom";
import { jobs } from "../../data/dummyData.js";

function BrowseJobs() {

    const navigate = useNavigate();

    return (
    <div className="container-fluid p-4">
        <div className="row">
                {/* Sidebar */}
            <div className="col-md-2">
              <Sidebar/>
            </div>

        {/* Main Content */}

        <div className="col-md-10">
            {/* First Part */}
                <div className="card border-0 shadow-sm p-4 mb-4">
                  <h2>💼 Browse Jobs</h2>
                       <p className="text-muted mb-0">
                           Discover projects that match your skills
                           and submit competitive proposals.
                       </p>
                </div>
                {/* Second part */}
                <div className="card border-0 shadow-sm p-3 mb-4">
                      <input type="text" className="form-control" placeholder="Search jobs..." />
                </div>
                {/* THird part */}
                
                    <div className="row">
                        {
                           jobs.map((job) => (
                              <div className="col-md-6 mb-4" key={job.job_id}>
                                    <div className="card border-0 shadow-sm h-100">
                                            <div className="card-body">
                                             <h4>{job.title}</h4>
                                              <p className="text-muted">
                                                  {job.description}
                                              </p>
                                              <p>
                                                  <strong>Budget:</strong>
                                                  ₹{job.budget}
                                              </p>
                                              <p>
                                                  <strong>Deadline:</strong>
                                                  {job.deadline}
                                              </p>
                                              <p>
                                                  <strong>Status:</strong>
                                                  {job.status}
                                              </p>
                                              <button className="btn btn-success" onClick={() => navigate(`/submitBid/${job.job_id}`)}>
                                                  View Details
                                              </button>
                                            </div>
                                     </div>
                               </div>
                               ))
                         }

                     </div>
            
        </div>

    </div>


            
</div>
    );
}

export default BrowseJobs;