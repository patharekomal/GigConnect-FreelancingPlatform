import Sidebar from "../../components/Freelancer/Sidebar";
import { useNavigate } from "react-router-dom";

function FreelancerDashboard() {

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
            {/* First Part 1 row 2 column  */}
            <div className="card shadow-sm border-0 p-4 mb-4">
                  <div className="row align-items-center">
                        <div className="col-md-7">
                          <h1>Welcome Back, Jane !!!</h1>
                          <p className="text-muted">
                              Find exciting freelance opportunities,
                              submit competitive bids and manage
                              your projects efficiently.
                           </p>
                           <button className="btn btn-success"  onClick={() => navigate("/browseJobs")}>Browse Jobs</button>
                        </div>
                        {/* column alignment for image */}
                        <div className="col-md-5 text-center">
                            <img src="./src/assets/freelancerDashboard.png" className="img-fluid" alt="freelancer"/>
                        </div>
                   </div>
                </div>
            {/* Second Part */}
            <div className="row g-3 mb-4">

                <div className="col-md-3">
                   <div className="card shadow-sm border-0 p-3">
                     <h6>Jobs Available</h6>
                       <h2>24</h2>
                         <small className="text-muted">New opportunities</small>
                    </div>
                </div>

                 <div className="col-md-3">
                     <div className="card shadow-sm border-0 p-3">
                        <h6>My Bids</h6>
                         <h2>12</h2>
                         <small className="text-muted">New opportunities</small>
                    </div>
                 </div>

                 <div className="col-md-3">
                   <div className="card shadow-sm border-0 p-3">
                     <h6>Active Projects</h6>
                       <h2>24</h2>
                         <small className="text-muted">New opportunities</small>
                    </div>
                 </div>

                 <div className="col-md-3">
                    <div className="card shadow-sm border-0 p-3">
                     <h6>Rating</h6>
                       <h2>24</h2>
                         <small className="text-muted">New opportunities</small>
                    </div>
                 </div>

               </div>
            {/* Third Part */}
            <div className="card shadow-sm border-0 p-4">

                <h3 className="mb-4">
                  Quick Actions
                </h3>

                <div className="row g-3">

                 <div className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body">
                              <h5>🔍 Browse Jobs</h5>
                               <p className="text-muted">
                                   Explore jobs matching your skills.
                               </p>
                                <button className="btn btn-outline-success"  onClick={() => navigate("/browseJobs")}>
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
                                   Explore jobs matching your skills.
                               </p>
                                <button className="btn btn-outline-success" onClick={() => navigate("/myBids")}>
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
                                   Explore jobs matching your skills.
                               </p>
                                <button className="btn btn-outline-success" onClick={() => navigate("/myProjects")}>
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