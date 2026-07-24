import Sidebar from "../../components/Freelancer/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getBidById, updateBid } from "../../api/bidApi";
import { getJobById } from "../../api/jobApi";

function EditBid() {
  const navigate = useNavigate();
  const { bidId } = useParams();

  const [bid, setBid] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [proposal, setProposal] = useState("");

  useEffect(() => {
    loadBid();
  }, []);

  const loadBid = async () => {
    try {
      const response = await getBidById(bidId);

      console.log(response.data);

      setBid(response.data);

      setAmount(response.data.amount);
      setDuration(response.data.duration);
      setProposal(response.data.proposal);

      loadJob(response.data.jobId);
    } catch (error) {
      console.log(error);
    }
  };

  const loadJob = async (jobId) => {
    try {
      const response = await getJobById(jobId);

      setSelectedJob(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    if (!amount || !duration || !proposal) {
      alert("Please fill all fields.");

      return;
    }

    const bidData = {
        
      amount: Number(amount),

      duration: Number(duration),

      proposal: proposal,
    };

    try {
      await updateBid(bidId, bidData);

      alert("Bid Updated Successfully");

      navigate("/freelancer/myBids");
    } catch (error) {
      console.log(error);

      alert("Failed to update bid");
    }
  };

  if (!selectedJob || !bid) {
    return <h2>Loading...</h2>;
  }

  const editable = bid.status === "PENDING" || bid.status === "REJECTED";

  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-md-2">
          <Sidebar />
        </div>

        <div className="col-md-10">
          <button
            className="btn btn-outline-secondary mb-3"
            onClick={() => navigate("/freelancer/myBids")}
          >
            ← Back to My Bids
          </button>

          {!editable && (
            <div className="alert alert-warning">
              This bid has already been accepted. Editing is not allowed.
            </div>
          )}

          <div className="card shadow-sm border-0 p-4 mb-4">
            <h2>Edit Bid</h2>

            <p className="text-muted">
              Update your proposal before the client reviews it.
            </p>
          </div>

          <div className="row">
            {/* Job Details */}

            <div className="col-md-5">
              <div className="card shadow-sm border-0 p-4">
                <h3 className="fw-bold">{selectedJob.title}</h3>

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
                </div>

                <hr />

                <h6 className="fw-bold">📄 Job Description</h6>

                <p className="text-muted">{selectedJob.description}</p>
              </div>
            </div>

            {/* Edit Form */}

            <div className="col-md-7">
              <div className="card shadow-sm border-0 p-4">
                <h4 className="mb-4">Update Your Proposal</h4>

                <div className="mb-3">
                  <label className="form-label">Bid Amount (₹)</label>

                  <input
                    type="number"
                    className="form-control"
                    value={amount}
                    disabled={!editable}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Delivery Time (Days)</label>

                  <input
                    type="number"
                    className="form-control"
                    value={duration}
                    disabled={!editable}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Proposal</label>

                  <textarea
                    rows="6"
                    className="form-control"
                    value={proposal}
                    disabled={!editable}
                    onChange={(e) => setProposal(e.target.value)}
                  />
                </div>

                <button
                  className="btn btn-primary w-100"
                  disabled={!editable}
                  onClick={handleUpdate}
                >
                  Update Bid
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBid;