import Sidebar from "../../components/Freelancer/Sidebar";
import { freelancerProfiles } from "../../data/dummyData";

function Profile() {

    const profile =
        freelancerProfiles.find(
            p => p.freelancer_id === 6
        );

    return (

        <div className="container-fluid p-4">

            <div className="row">

                <div className="col-md-2">
                    <Sidebar />
                </div>

                <div className="col-md-10">

                    <div className="card shadow-sm border-0 p-4">

                        <h2>
                            👤 Jane Smith
                        </h2>

                        <h3 className="text-muted">
                            {profile.title}
                        </h3>

                        <h4 className="text-warning">
                            ⭐ {profile.rating}
                        </h4>

                        <hr />
                        <h3>Skills</h3>
                        <div className="d-flex flex-wrap gap-3 mb-3">
                        {
                            profile.skills.map(skill => (
                                <span key={skill} className="badge bg-brand-100 text-brand px-7"  >{skill}</span>))
                        }
                        </div>
                        <hr />
                        <p>
                            <strong>Experience:</strong>
                            {" "}
                            {profile.experience} Years
                        </p>

                        <p>
                            <strong>
                                Hourly Rate:
                            </strong>
                            {" "}
                            ₹{profile.hourlyRate}/hr
                        </p>

                        <p>
                            <strong>
                                Portfolio:
                            </strong>
                            {" "}
                            {profile.portfolio}
                        </p>

                        <hr />

                        <h3>About Me</h3>

                        <p>
                            {profile.bio}
                        </p>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Profile;