import Sidebar from "../../components/Freelancer/Sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../../api/freelancerApi";

function Profile() {

   const navigate = useNavigate();
   const [profile, setProfile] = useState(null);

   const user = JSON.parse(localStorage.getItem("user"));

   const freelancerId = user.id;

   useEffect(() => {
     loadProfile();
   }, []);

   const loadProfile = async () => {
     try {
       const response = await getProfile(freelancerId);

       console.log(response.data);

       setProfile(response.data);
     } catch (error) {
       console.log(error);
     }
   };

   if (!profile) {
     return <h2>Loading...</h2>;
   }

    return (
      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>

          <div className="col-md-10">
            <div className="card shadow-sm border-0 p-4">
              {/* <h2>
                            👤 Jane Smith
                        </h2>

                        <h3 className="text-muted">
                            {profile.title}
                        </h3>

                        <h4 className="text-warning">
                            ⭐ {profile.rating}
                        </h4> */}
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-circle bg-success text-white fw-boldd-flex justify-content-center align-items-center me-3"
                    style={{
                      width: "70px",
                      height: "70px",
                      fontSize: "28px",
                    }}
                  >
                    {profile.firstName?.charAt(0)}
                  </div>

                  <div>
                    <h2 className="mb-1">
                      {profile.firstName} {profile.lastName}
                    </h2>

                    <h5 className="text-muted">{profile.profession}</h5>

                    <span className="badge bg-success">🟢 Available</span>
                  </div>
                </div>

                <div className="text-end">
                  <h4 className="text-warning mb-1">⭐ {profile.rating}</h4>

                  <button
                    className="btn btn-outline-success"
                    onClick={() => navigate("/freelancer/edit-profile")}
                  >
                    ✏ Edit Profile
                  </button>
                </div>
              </div>
              <hr />

              <div className="row mt-4">
                <div className="col-md-3">
                  <div className="card border-0 bg-light p-3">
                    <small className="text-muted">💼 EXPERIENCE</small>

                    <h4>{profile.experience} Years</h4>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card border-0 bg-light p-3">
                    <small className="text-muted">💰 HOURLY RATE</small>

                    <h4>₹{profile.hourlyRate}/hr</h4>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card border-0 bg-light p-3">
                    <small className="text-muted">🌍 STATUS</small>

                    <h4>Available</h4>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card border-0 bg-light p-3">
                    <small className="text-muted">⭐ RATING</small>

                    <h4>{profile.rating}/5</h4>
                  </div>
                </div>
              </div>

              <h4 className="mt-4">🚀 Skills</h4>
              <span className="badge rounded-pill bg-success-subtle text-success border px-3 py-2">
                {profile.skills}
              </span>

              <hr />

              <h4 className="mt-4">🔗 Portfolio</h4>
              <a href={profile.portfolio} target="_blank" rel="noreferrer">
                {profile.portfolio}
              </a>

              <hr />

              <h4 className="mt-4">📝 About Me</h4>
              <div className="bg-light p-3 rounded">{profile.bio}</div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Profile;