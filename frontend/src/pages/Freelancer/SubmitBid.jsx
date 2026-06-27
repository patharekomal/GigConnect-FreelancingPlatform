import Sidebar from "../../components/Freelancer/Sidebar";
import { useNavigate,useParams } from "react-router-dom";
import { jobs } from "../../data/dummyData";
import { useState } from "react";
function SubmitBid() {


const navigate = useNavigate();
const { jobId } = useParams();  //take  jobid from previous page 
const selectedJob = jobs.find((job) => job.job_id == jobId);

const [amount, setAmount] = useState("");
const [duration, setDuration] = useState("");
const [proposal, setProposal] = useState("");

if (!selectedJob) {
    return <h2> Sorry !!! Job Not Found</h2>;
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
                 <p className="text-muted mb-0">
                     Send your proposal and convince the client
                     why you are the right freelancer.
                 </p>
            </div>
           
            <div className="row">
                <div className="col-md-5">
                        <div className="card shadow-sm border-0 p-4">
                           <h4> {selectedJob.title}</h4>
                             <hr />
                           <p>
                               <strong>Budget:</strong>
                                ₹{selectedJob.budget}
                           </p>
                            <p>
                                 <strong>Deadline:</strong>
                                  {selectedJob.deadline}
                             </p>

                            <p>
                                 {selectedJob.description}
                             </p>
                        </div>
                </div>

                <div className="col-md-7">
                    <div className="card shadow-sm border-0 p-4">

                         <h4 className="mb-4">
                             {/* 📝 Submit Your Proposal */}
                             Submit Your Proposal
                         </h4>
                         <div className="mb-3">
                           <label className="form-label">
                               Bid Amount (₹)
                           </label>

                            <input type="number" className="form-control" placeholder="Enter your bid amount"
                                value={amount} onChange={(e) => setAmount(e.target.value)}/>

                         </div>
                         <div className="mb-3">

                              <label className="form-label">
                                  Delivery Time (Days)
                              </label>

                              <input type="number" className="form-control" placeholder="Enter delivery days"
                                  value={duration} onChange={(e) => setDuration(e.target.value)}/>

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


                         <button className="btn btn-success w-100" onClick={() => { console.log(amount); console.log(duration);console.log(proposal);window.alert("Submitted Bid Successfully")}}>Submit Bid</button>
                    </div>
                </div>

            </div>

        </div>

      </div>
    </div>
  );
}

export default SubmitBid;