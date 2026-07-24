import Sidebar from "../../components/Freelancer/Sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllJobs } from "../../api/jobApi";

function BrowseJobs() {

    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
      loadJobs();
    }, []); //load jobs only once when page open 

    const loadJobs = async () => {
      try {
        const response = await getAllJobs(); //waits until Spring Boot replies.

        console.log(response.data);

        setJobs(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    return (
      <div className="container-fluid p-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-2">
            <Sidebar />
          </div>

          {/* Main Content */}

          {/* <div className="col-md-10"> */}

          <div style={{ marginLeft: "280px" }}>
            {/* First Part */}
            <div className="card border-0 shadow-sm p-4 mb-4">
              <h2> Browse Jobs</h2>
              {/* 💼 */}
              <p className="text-muted mb-0">
                Discover projects that match your skills and submit competitive
                proposals.
              </p>
            </div>
            {/* Second part */}
            <div className="card border-0 shadow-sm p-3 mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search jobs..."
              />
            </div>
            {/* THird part */}

            <div className="row">
              {
                <div className="row">
                  {jobs.map((job) => (
                    <div className="col-12 mb-4" key={job.id}>
                      <div
                        className="card border-0 shadow-sm h-100"
                        style={{
                          borderRadius: "16px",
                          transition: "0.2s",
                        }}
                      >
                        <div className="card-body">
                          {/* Title + Status */}
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <h4 className="fw-bold mb-1">{job.title}</h4>

                              <p className="text-muted mb-0">
                                {job.description}
                              </p>
                            </div>

                            <span
                              className={`badge ${
                                job.status === "OPEN"
                                  ? "bg-success"
                                  : "bg-secondary"
                              }`}
                            >
                              {job.status}
                            </span>
                          </div>

                          <hr />

                          {/* Skills */}

                          <div className="mb-3">
                            <span className="badge bg-light text-dark me-2">
                              Spring Boot
                            </span>

                            <span className="badge bg-light text-dark me-2">
                              REST API
                            </span>

                            <span className="badge bg-light text-dark">
                              MySQL
                            </span>
                          </div>

                          {/* Information Row */}

                          <div className="row text-center">
                            <div className="col-2">
                              <small className="text-muted">💰 Budget</small>

                              <h5 className="fw-bold text-success">
                                ₹{job.budget}
                              </h5>
                            </div>

                            <div className="col-2">
                              <small className="text-muted">📅 Deadline</small>

                              <h6 className="fw-semibold">{job.deadline}</h6>
                            </div>

                            <div className="col-2">
                              <small className="text-muted">👤 Client</small>

                              <h6 className="fw-semibold">{job.companyName}</h6>
                            </div>
                          </div>

                          <hr />

                          {/* Footer */}

                          <div className="d-flex justify-content-md">
                            <button
                              className="btn btn-outline-success px-4"
                              onClick={() => navigate(`/submitBid/${job.id}`)}
                            >
                              Submit Bid
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              }
            </div>
            <button
              className="btn btn-outline-secondary mb-3"
              onClick={() => navigate(-1)}
            >
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    );
}

export default BrowseJobs;