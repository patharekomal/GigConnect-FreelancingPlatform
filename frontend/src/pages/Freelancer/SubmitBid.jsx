import Sidebar from "../../components/Freelancer/Sidebar";
import { useNavigate,useParams } from "react-router-dom";
import { useEffect,useState } from "react";

import { getJobById } from "../../api/jobApi";
import { submitBid } from "../../api/bidApi";

function SubmitBid() {


const navigate = useNavigate();
const { jobId } = useParams();  //take  jobid from previous page 

const [selectedJob, setSelectedJob] = useState(null);//react will wait until the job is fetched from backend

       useEffect(() => {loadJob();}, []);

const loadJob = async () => {
     try {
           const response = await getJobById(jobId);
           console.log(response.data);
           setSelectedJob(response.data);
         } catch (error)
           {
            console.log(error);
           }
    };


const [amount, setAmount] = useState("");
const [duration, setDuration] = useState("");
const [proposal, setProposal] = useState("");

const handleSubmit = async () => {

  try {
    
      if (!amount || !duration || !proposal) {
        alert("Please fill all fields.");
        return;
      }
   // const freelancerId = localStorage.getItem("userId"); 
    const freelancerId = 3; // Hardcoded for now, replace with actual logged-in freelancer ID
    const bidData = {
      jobId: Number(jobId),
      amount: Number(amount),
      duration: Number(duration),
      proposal: proposal,
    };

    const response = await submitBid(freelancerId, bidData);

    alert("Bid Submitted Successfully");
    console.log(response.data);

    navigate("/freelancer/my-bids"); // Change route if needed
  } catch (error) {
    console.error(error);
    alert("Failed to submit bid");
  }
};
if (!selectedJob) {
  return <h2>Loading...</h2>;
}
  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-md-2">
          <Sidebar />
        </div>
        {/* Main Content */}
        <div className="col-md-10">
          <div className="card shadow-sm border-0 p-4 mb-4">
            <h2> Submit Bid</h2>
            <p className="text-muted mb-4">
              Your proposal should explain why you're the best fit for this
              project. Include your relevant skills, experience, estimated
              delivery time, and portfolio links if available.
            </p>
          </div>

          <div className="row">
            <div className="col-md-5">
              <div className="card shadow-sm border-0 p-4">
                <h3 className="fw-bold">{selectedJob.title}</h3>

                <p className="text-muted mb-4">REST API Development</p>

                <hr />

                <div className="row g-3">
                  <div className="col-6">
                    <small className="text-muted">💰 Budget</small>

                    <h5 className="fw-bold text-success">
                      ₹{selectedJob.budget}
                    </h5>
                  </div>

                  <div className="col-6">
                    <small className="text-muted">📅 Deadline</small>

                    <h6>{selectedJob.deadline}</h6>
                  </div>

                  <div className="col-6">
                    <small className="text-muted">🟢 Status</small>

                    <br />

                    <span className="badge bg-success">
                      {selectedJob.status}
                    </span>
                  </div>

                  <div className="col-6">
                    <small className="text-muted">🏢 Company</small>

                    <h6>ABC Technologies</h6>
                  </div>
                </div>

                <hr />

                <h6 className="fw-bold">🛠 Skills Required</h6>

                <div className="mb-4">
                  <span className="badge bg-light text-dark me-2">
                    Spring Boot
                  </span>

                  <span className="badge bg-light text-dark me-2">
                    REST API
                  </span>

                  <span className="badge bg-light text-dark me-2">MySQL</span>

                  <span className="badge bg-light text-dark">JWT</span>
                </div>

                <h6 className="fw-bold">📄 Job Description</h6>

                <p className="text-muted mb-0">{selectedJob.description}</p>
              </div>
            </div>

            <div className="col-md-7">
              <div className="card shadow-sm border-0 p-4">
                <h4 className="mb-4">
                  {/* 📝 Submit Your Proposal */}
                  Submit Your Proposal
                </h4>
                <div className="mb-3">
                  <label className="form-label">Bid Amount (₹)</label>

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter your bid amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Delivery Time (Days)</label>

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter delivery days"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Proposal</label>
                  <textarea
                    rows="5"
                    className="form-control"
                    placeholder="Write your proposal(eg:Skills ,Year of Experience ,Project links if any "
                    value={proposal}
                    onChange={(e) => setProposal(e.target.value)}
                  />
                </div>

                <button className="btn btn-success w-100"
                  onClick={handleSubmit}>
                  Submit Bid
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitBid;