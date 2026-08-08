import Sidebar from "../../components/Freelancer/Sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllJobs } from "../../api/jobApi";
import { askAI } from "../../services/chatbotService";
import ReactMarkdown from "react-markdown";
function BrowseJobs() {

    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [recommendationLoading, setRecommendationLoading] = useState(false);
    const [recommendation, setRecommendation] = useState("");

    useEffect(() => {
      loadJobs();
    }, []); //load jobs only once when page open 
    
    const recommendJobs = async () => {
      try {
        setRecommendationLoading(true);

        const user = JSON.parse(localStorage.getItem("user"));

        const response = await askAI({
          message: "Recommend jobs",
          user_id: user.id,
        });

        setRecommendation(response.reply);
      } catch (error) {
        console.log(error);
        setRecommendation("Unable to fetch AI recommendations.");
      } finally {
        setRecommendationLoading(false);
      }
    };

    const loadJobs = async () => {
      try {
        const response = await getAllJobs(); //waits until Spring Boot replies.

        //console.log(response.data);

       setJobs(response.data.content || response.data);
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
            <button
              className="btn btn-success"
              onClick={recommendJobs}
              disabled={recommendationLoading}
            >
              {recommendationLoading
                ? "⏳ Finding..."
                : "✨ Recommend Jobs For Me"}
            </button>
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h5>🤖 AI Recommendation</h5>

                <ReactMarkdown
                  components={{
                    h3: ({ children }) => (
                      <h5 className="fw-bold text-success mt-3 mb-2">
                        {children}
                      </h5>
                    ),

                    p: ({ children }) => <p className="mb-1">{children}</p>,

                    ul: ({ children }) => <ul className="mb-3">{children}</ul>,

                    hr: () => <hr className="my-3" />,
                  }}
                >
                  {recommendation}
                </ReactMarkdown>
                
              </div>
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

                          {/* <div className="mb-3">
                            <span className="badge bg-light text-dark me-2">
                              Spring Boot
                            </span>

                            <span className="badge bg-light text-dark me-2">
                              REST API
                            </span>

                            <span className="badge bg-light text-dark">
                              MySQL
                            </span>
                          </div> */}

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