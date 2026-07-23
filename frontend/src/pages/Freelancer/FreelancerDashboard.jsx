import Sidebar from "../../components/Freelancer/Sidebar";
import { useEffect, useState } from "react";
import { getDashboard } from "../../api/freelancerApi";
import { useNavigate } from "react-router-dom";

function FreelancerDashboard() {

    const navigate = useNavigate();
     const freelancerId = 1; // Temporary

     const [dashboard, setDashboard] = useState(null);

     useEffect(() => {
       loadDashboard();
     }, []);

     const loadDashboard = async () => {
       try {
         const response = await getDashboard(freelancerId);

         console.log(response.data);

         setDashboard(response.data);
       } catch (error) {
         console.log(error);
       }
     };

     if (!dashboard) {
       return <h2>Loading...</h2>;
     }
    return (
      <div className="container-fluid p-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-2">
            <Sidebar />
          </div>

          {/* Main Content */}

          <div className="col-md-10">
            {/* First Part 1 row 2 column  */}
            <div className="card shadow-sm border-0 p-4 mb-4">
              <div className="row align-items-center">
                <div className="col-md-7">
                  <h1>Welcome Back, Jane !!!</h1>
                  <p className="text-muted">
                    Find exciting freelance opportunities, submit competitive
                    bids and manage your projects efficiently.
                  </p>
                  <button
                    className="btn btn-success"
                    onClick={() => navigate("/browseJobs")}
                  >
                    Browse Jobs
                  </button>
                </div>
                {/* column alignment for image */}
                <div className="col-md-5 text-center">
                  <img
                    src="./src/assets/freelancerDashboard.png"
                    className="img-fluid"
                    alt="freelancer"
                  />
                </div>
              </div>
            </div>
            {/* Second Part */}
            <div className="row g-3 mb-4">
              <div className="col-md-3">
                <div className="card shadow-sm border-0 p-3">
                  <h5>Total Bids</h5>

                  <h2 className="fw-bold">{dashboard.totalBids}</h2>

                  <small className="text-muted">All submitted proposals</small>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card shadow-sm border-0 p-3">
                  <h5>Pending Bids</h5>

                  <h2 className="fw-bold text-warning">
                    {dashboard.pendingBids}
                  </h2>

                  <small className="text-muted">
                    Waiting for client response
                  </small>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card shadow-sm border-0 p-3">
                  <h5>Active Projects</h5>

                  <h2 className="fw-bold text-primary">
                    {dashboard.activeProjects}
                  </h2>

                  <small className="text-muted">Currently working</small>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card shadow-sm border-0 p-3">
                  <h5>Rating</h5>

                  <h2 className="fw-bold text-success">
                    ⭐ {dashboard.rating}
                  </h2>

                  <small className="text-muted">Client satisfaction</small>
                </div>
              </div>
            </div>
            {/* Third Part */}
            <div className="card shadow-sm border-0 p-4 mb-4">
              <h4 className="fw-bold mb-4">Project Overview</h4>

              <div className="row">
                <div className="col-md-4">
                  <h5>Submitted Projects</h5>

                  <h3>{dashboard.submittedProjects}</h3>
                </div>

                <div className="col-md-4">
                  <h5>Completed Projects</h5>

                  <h3 className="text-success">
                    {dashboard.completedProjects}
                  </h3>
                </div>

                <div className="col-md-4">
                  <h5>Success Rate</h5>

                  <h3>
                    {dashboard.totalBids > 0
                      ? Math.round(
                          (dashboard.completedProjects / dashboard.totalBids) *
                            100,
                        )
                      : 0}
                    %
                  </h3>
                </div>
              </div>
            </div>

            {/* Fourth Part */}
            <div className="card shadow-sm border-0 p-4">
              <h4 className="fw-bold mb-4">Quick Actions</h4>

              <div className="row g-3">
                <div className="col-md-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <h5>🔍 Browse Jobs</h5>
                      <p className="text-muted">
                        Find new freelance opportunities matching your skills.
                      </p>
                      <button
                        className="btn btn-outline-success"
                        onClick={() => navigate("/browseJobs")}
                      >
                        Open
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <h5>🔍 My Bids</h5>
                      <p className="text-muted">
                        Track your proposals and client responses.
                      </p>
                      <button
                        className="btn btn-outline-success"
                        onClick={() => navigate("/myBids")}
                      >
                        Open
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <h5>🔍 Active Jobs</h5>
                      <p className="text-muted">
                        Manage ongoing work and submit deliverables.
                      </p>
                      <button
                        className="btn btn-outline-success"
                        onClick={() => navigate("/myProjects")}
                      >
                        Open
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default FreelancerDashboard;