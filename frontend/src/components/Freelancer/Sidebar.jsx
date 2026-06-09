import { useNavigate } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();

    return (

        <div className="bg-white vh-100 shadow-sm p-3">
            {/* <h3 className="mb-4" bg-success>
                GigConnect
            </h3> */}
            <div>
                <h4 className="text-success fw-bold mb-0">GigConnect</h4>
                <small className="text-muted">
                  {/* Bridging the gap between clients and freelancers */}
                </small>
            </div>
            <div className="d-grid gap-2">

                <button className="btn btn-light text-start"  onClick={() => navigate("/freelancer")}>
                       {/* <i className="bi bi-house-door me-2"></i> */}
                            {/* 🏠 Home */}
                            Home
                </button>

                <button className="btn btn-light text-start"  onClick={() => navigate("/browseJobs")}>
                    {/* <i className="bi bi-search me-2"></i> */}
                        {/* 🔍 Browse Jobs */}
                            Browse Jobs
                </button>

                <button className="btn btn-light text-start" onClick={() => navigate("/myBids")}>
                    {/* <i className="bi bi-send me-2"></i> */}
                        {/* 📨 My Bids */}
                            My Bids
                </button>

                <button className="btn btn-light text-start" onClick={() => navigate("/myProjects")}>
                    {/* <i className="bi bi-folder me-2"></i> */}
                        {/* 📁 My Projects */}
                         My Projects
                </button>

                <button className="btn btn-light text-start" onClick={() => navigate("/reviews")}>
                    {/* <i className="bi bi-star me-2"></i> */}
                        {/* ⭐ Reviews */}
                         Reviews
                </button>

               <button className="btn btn-light text-start " onClick={() => navigate("/profile")}>
                   {/* <i className="bi bi-person me-2"></i> */}
                        {/* 👤 Profile */}
                         Profile
               </button>
               <button className="btn btn-light text-start" onClick={() => navigate("/profile")}>
                   {/* <i className="bi bi-person me-2"></i> */}
                        
               </button>
               <button className="btn btn-light text-start" onClick={() => navigate("/profile")}>
                   {/* <i className="bi bi-person me-2"></i> */}
                       
               </button>

            </div>

            {/* <div className="card mt-5 border-0 shadow-sm p-3 bg-success text-white">

                <h5> Pro Tip</h5>

                <p className="mb-0">
                    Write Proposal effectively to attract
                    more clients and increase your chances
                    of getting hired.
                </p> 

            </div> */}
            <div >


            </div>

            <div className="card mt-5 border-0 shadow-sm p-3">

                <h5>👤Jane Smith</h5>

                <small className="text-muted">
                    Frontend Developer
                </small>

                <p className="text-success mt-2">
                    ● Online
                </p>
                <button className="btn btn-light text-start" onClick={() => navigate("/")}>
                Logout
                </button>
            </div>
            


        </div>

    );
}

export default Sidebar;