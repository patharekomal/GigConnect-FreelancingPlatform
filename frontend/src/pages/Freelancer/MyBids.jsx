import Sidebar from "../../components/Freelancer/Sidebar";
import { bids, jobs } from "../../data/dummyData";
import { useNavigate } from "react-router-dom";

function MyBids() {
    const navigate = useNavigate();
   const freelancerId = 6; // take it from session later (token)
   const myBids = bids.filter(bid => bid.freelancer_id === freelancerId);
    return (

        <div className="container-fluid p-4">

            <div className="row">

                <div className="col-md-2">
                    <Sidebar />
                </div>
                 {/* Main Content  */}
                <div className="col-md-10">

                    <div className="card shadow-sm border-0 p-4 mb-4">

                       <h2> My Bids</h2>
                        <p className="text-muted mb-0">
                            Track all your submitted proposals and client responses.
                        </p>

                    </div>
                    <div>
                    {
                        myBids.map((bid) => {
                                   const job = jobs.find(job => job.job_id === bid.job_id);
                                        return (
                                             <div className="card shadow-sm border-0 mb-3"  key={bid.bid_id} >
                                                    <div className="card-body">

                                                          <h4>
                                                               {job?.title}
                                                          </h4>

                                                          <p>
                                                              <strong>Bid Amount:</strong>
                                                              ₹{bid.amount}
                                                          </p>

                                                          <p>
                                                              <strong>Duration:</strong>
                                                              {bid.duration_days} Days
                                                          </p>

                                                           <div className="d-flex justify-content-between align-items-center mt-3">

                                                                                <div>
                                                                                     <strong>Status : </strong>

                                                                                      {
                                                                                          bid.status === "PENDING" &&
                                                                                          <span className="badge bg-warning ms-2">
                                                                                              Pending
                                                                                          </span>
                                                                                      }

                                                                                      {
                                                                                          bid.status === "REJECTED" &&
                                                                                          <span className="badge bg-danger ms-2">
                                                                                              Rejected
                                                                                          </span>
                                                                                      }

                                                                                      {
                                                                                          bid.status === "ACCEPTED" &&
                                                                                          <span className="badge bg-success ms-2">
                                                                                              Accepted
                                                                                          </span>
                                                                                      }
                                                                                </div>

                                                                                <div>
                                                                                    {/* Pending */}
                                                                                    {
                                                                                        bid.status === "PENDING" && (
                                                                                            <button className="btn btn-outline-primary" onClick={() =>navigate(`/submitBid/${job.job_id}`)}>View Job
                                                                                            </button>        
                                                                                        )
                                                                                    }
                                                                                    {/* Rejected */}
                                                                                    {
                                                                                        bid.status === "REJECTED" && (
                                                                                            <>
                                                                                            {/* <button className="btn btn-outline-primary me-2"  onClick={() => navigate(`/submitBid/${job.job_id}`)}>View Job</button> */}
                                                                                                <button className="btn btn-outline-danger  me-2" onClick={() =>navigate(`/submitBid/${job.job_id}`)}>Submit Bid Again</button>
                                                                                            </>
                                                                                        )
                                                                                    }
                                                                                    {/* Accepted */}
                                                                                    {   bid.status === "ACCEPTED" && (
                                                                                            <button className="btn btn-outline-success  me-2" onClick={() => navigate("/myProjects")}>
                                                                                                Go To Project
                                                                                            </button>
                                                                                        )
                                                                                    }
                                                                                </div>
                                                                    </div>
                                                     </div>
                                                </div>
                                                );
                                             })
                    }
                    </div>    

                </div>

            </div>

        </div>

    );
}

export default MyBids;