// import Sidebar from "../../components/Freelancer/Sidebar";
// import { bids, jobs } from "../../data/dummyData";
// import { useNavigate } from "react-router-dom";

// function MyBids() {
//     const navigate = useNavigate();
//    const freelancerId = 6; // take it from session later (token)
//    const myBids = bids.filter(bid => bid.freelancer_id === freelancerId);
//     return (

//         <div className="container-fluid p-4">

//             <div className="row">

//                 <div className="col-md-2">
//                     <Sidebar />
//                 </div>
//                  {/* Main Content  */}
//                 <div className="col-md-10">

//                     <div className="card shadow-sm border-0 p-4 mb-4">

//                        <h2> My Bids</h2>
//                         <p className="text-muted mb-0">
//                             Track all your submitted proposals and client responses.
//                         </p>

//                     </div>
//                     <div>
//                     {
//                         myBids.map((bid) => {
//                                    const job = jobs.find(job => job.job_id === bid.job_id);
//                                         return (
//                                              <div className="card shadow-sm border-0 mb-3"  key={bid.bid_id} >
//                                                     <div className="card-body">

//                                                           <h4>
//                                                                {job?.title}
//                                                           </h4>

//                                                           <p>
//                                                               <strong>Bid Amount:</strong>
//                                                               ₹{bid.amount}
//                                                           </p>

//                                                           <p>
//                                                               <strong>Duration:</strong>
//                                                               {bid.duration_days} Days
//                                                           </p>

//                                                            <div className="d-flex justify-content-between align-items-center mt-3">

//                                                                                 <div>
//                                                                                      <strong>Status : </strong>

//                                                                                       {
//                                                                                           bid.status === "PENDING" &&
//                                                                                           <span className="badge bg-warning ms-2">
//                                                                                               Pending
//                                                                                           </span>
//                                                                                       }

//                                                                                       {
//                                                                                           bid.status === "REJECTED" &&
//                                                                                           <span className="badge bg-danger ms-2">
//                                                                                               Rejected
//                                                                                           </span>
//                                                                                       }

//                                                                                       {
//                                                                                           bid.status === "ACCEPTED" &&
//                                                                                           <span className="badge bg-success ms-2">
//                                                                                               Accepted
//                                                                                           </span>
//                                                                                       }
//                                                                                 </div>

//                                                                                 <div>
//                                                                                     {/* Pending */}
//                                                                                     {
//                                                                                         bid.status === "PENDING" && (
//                                                                                             <button className="btn btn-outline-primary" onClick={() =>navigate(`/submitBid/${job.job_id}`)}>View Job
//                                                                                             </button>        
//                                                                                         )
//                                                                                     }
//                                                                                     {/* Rejected */}
//                                                                                     {
//                                                                                         bid.status === "REJECTED" && (
//                                                                                             <>
//                                                                                             {/* <button className="btn btn-outline-primary me-2"  onClick={() => navigate(`/submitBid/${job.job_id}`)}>View Job</button> */}
//                                                                                                 <button className="btn btn-outline-danger  me-2" onClick={() =>navigate(`/submitBid/${job.job_id}`)}>Submit Bid Again</button>
//                                                                                             </>
//                                                                                         )
//                                                                                     }
//                                                                                     {/* Accepted */}
//                                                                                     {   bid.status === "ACCEPTED" && (
//                                                                                             <button className="btn btn-outline-success  me-2" onClick={() => navigate("/myProjects")}>
//                                                                                                 Go To Project
//                                                                                             </button>
//                                                                                         )
//                                                                                     }
//                                                                                 </div>
//                                                                     </div>
//                                                      </div>
//                                                 </div>
//                                                 );
//                                              })
//                     }
//                     </div>    

//                 </div>

//             </div>

//         </div>

//     );
// }

// export default MyBids;

import Sidebar from "../../components/Freelancer/Sidebar";
import { bids, jobs } from "../../data/dummyData";
import { useNavigate } from "react-router-dom";

function MyBids() {
  const navigate = useNavigate();

  const freelancerId = 6;

  const myBids = bids.filter((bid) => bid.freelancer_id === freelancerId);

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
                <h2 className="fw-bold mb-1">My Bids</h2>

                <p className="text-muted mb-0">
                  Track all your submitted proposals and client responses.
                </p>
              </div>

              <span className="badge bg-primary fs-6 px-3 py-2">
                {myBids.length} Total Bids
              </span>
            </div>
          </div>

          {/* Bid Cards */}

          {myBids.length > 0 ? (
            myBids.map((bid) => {
              const job = jobs.find((job) => job.job_id === bid.job_id);

              return (
                <div className="card shadow-sm border-0 mb-4" key={bid.bid_id}>
                  <div className="card-body">
                    {/* Title */}

                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h4 className="fw-bold mb-1">{job?.title}</h4>

                        <p className="text-muted mb-0">{job?.description}</p>
                      </div>

                      <span
                        className={`badge px-3 py-2

                        ${
                          bid.status === "PENDING"
                            ? "bg-warning text-dark"
                            : bid.status === "ACCEPTED"
                              ? "bg-success"
                              : "bg-danger"
                        }`}
                      >
                        {bid.status}
                      </span>
                    </div>

                    <hr />

                    {/* Information Grid */}

                    <div className="row">
                      {/* Bid Amount */}

                      <div className="col-lg-2">
                        <div className="border rounded p-3 h-100 text-center">
                          <small className="text-muted">💰 Bid Amount</small>

                          <h5 className="mt-2">₹{bid.amount}</h5>
                        </div>
                      </div>

                      {/* Duration */}

                      <div className="col-lg-2">
                        <div className="border rounded p-3 h-100 text-center">
                          <small className="text-muted">⏳ Duration</small>

                          <h5 className="mt-2">{bid.duration_days} Days</h5>
                        </div>
                      </div>

                      {/* Job Budget */}

                      <div className="col-lg-2">
                        <div className="border rounded p-3 h-100 text-center">
                          <small className="text-muted">💼 Job Budget</small>

                          <h5 className="mt-2">₹{job?.budget}</h5>
                        </div>
                      </div>

                      {/* Actions */}

                      <div className="col-lg-6">
                        <div className="border rounded p-3 h-100">
                          <small className="text-muted">⚡ Actions</small>

                          <div className="d-flex gap-2 flex-wrap mt-3">
                            {/* Pending Bid */}

                            {bid.status === "PENDING" && (
                              <>
                                <button
                                  className="btn btn-outline-success"
                                  onClick={() => navigate(`/job/${job.job_id}`)}
                                >
                                  👁 View Job
                                </button>

                                <button
                                  className="btn btn-outline-primary"
                                  onClick={() =>
                                    navigate(`/editBid/${bid.bid_id}`)
                                  }
                                >
                                  ✏ Edit Bid
                                </button>

                                <button
                                  className="btn btn-outline-danger"
                                  onClick={() =>
                                    alert(
                                      "Withdraw Bid API will be connected later.",
                                    )
                                  }
                                >
                                  🗑 Withdraw
                                </button>
                              </>
                            )}

                            {/* Accepted Bid */}

                            {bid.status === "ACCEPTED" && (
                              <>
                                <button
                                  className="btn btn-success"
                                  onClick={() => navigate("/myProjects")}
                                >
                                  🚀 Go To Project
                                </button>

                                <button
                                  className="btn btn-outline-secondary"
                                  onClick={() => navigate(`/job/${job.job_id}`)}
                                >
                                  👁 View Job
                                </button>
                              </>
                            )}

                            {/* Rejected Bid */}

                            {bid.status === "REJECTED" && (
                              <>
                                <button
                                  className="btn btn-outline-success"
                                  onClick={() => navigate(`/job/${job.job_id}`)}
                                >
                                  👁 View Job
                                </button>

                                <button
                                  className="btn btn-outline-danger"
                                  onClick={() =>
                                    navigate(`/submitBid/${job.job_id}`)
                                  }
                                >
                                  🔄 Submit Again
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="alert alert-light border text-center p-5">
              <h4 className="mb-2">No Bids Submitted Yet</h4>

              <p className="text-muted mb-3">
                Browse available jobs and submit your first proposal.
              </p>

              <button
                className="btn btn-success"
                onClick={() => navigate("/browseJobs")}
              >
                Browse Jobs
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBids;
                          