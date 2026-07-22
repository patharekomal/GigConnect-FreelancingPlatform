import Sidebar from "../../components/Client/Sidebar";
import { useNavigate } from "react-router-dom";

function ClientProfile() {

    const navigate = useNavigate();

    const client = {
        firstName: "John", 
        lastName: "Doe",
        email: "john@gmail.com",
        phone: "9876543210",
        companyName: "XYZ Solutions",
        companyWebsite: "https://www.xyz.com",
        location: "Mumbai",
        industry: "Software Development"
    };

    return (
        <>
            <style>{`

            body{
                background:#f8fafc;
            }

            .profile-banner{
                background:linear-gradient(135deg,#198754,#157347);
                border-radius:18px;
                color:white;
                padding:40px;
                box-shadow:0 10px 25px rgba(0,0,0,.12);
            }

            .profile-avatar{
                width:90px;
                height:90px;
                border-radius:50%;
                background:white;
                color:#198754;
                font-size:40px;
                display:flex;
                align-items:center;
                justify-content:center;
                font-weight:bold;
            }

            .info-card{
                border:none;
                border-radius:15px;
                box-shadow:0 5px 20px rgba(0,0,0,.06);
                transition:.3s;
            }

            .info-card:hover{
                transform:translateY(-4px);
            }

            .field-box{
                background:#f8fafc;
                border-radius:12px;
                padding:18px;
                height:100%;
                border:1px solid #edf2f7;
            }

            .field-title{
                color:#6c757d;
                font-size:13px;
                margin-bottom:8px;
            }

            .field-value{
                font-weight:600;
                font-size:18px;
            }

            `}</style>

            <div className="d-flex">

                <Sidebar />

                <div
                    className="container-fluid"
                    style={{
                        marginLeft:"260px",
                        width:"calc(100% - 260px)",
                        padding:"35px"
                    }}
                >

                    {/* Banner */}

                    <div className="profile-banner mb-4">

                        <div className="row align-items-center">

                            <div className="col-md-2 text-center">

                                <div className="profile-avatar mx-auto">
                                    {client.companyName.charAt(0)}
                                </div>

                            </div>

                            <div className="col-md-7">

                                <h2 className="fw-bold mb-2">
                                    {client.companyName}
                                </h2>

                                <h5 className="mb-3">
                                    {client.industry}
                                </h5>

                                <div className="d-flex flex-wrap gap-4">

                                    <span>
                                        📍 {client.location}
                                    </span>

                                    <span>
                                        🌐 {client.companyWebsite}
                                    </span>

                                    <span>
                                        ✉ {client.email}
                                    </span>

                                </div>

                            </div>

                            <div className="col-md-3 text-end">

                                <button
                                    className="btn btn-light btn-lg px-4"
                                    onClick={() => navigate("/edit-client-profile")}
                                >
                                    Edit Profile
                                </button>

                            </div>

                        </div>

                    </div>

                    {/* Cards */}

                    <div className="row">

                        {/* Personal */}

                        <div className="col-lg-6 mb-4">

                            <div className="card info-card">

                                <div className="card-body">

                                    <h4 className="text-success mb-4">
                                        👤 Personal Information
                                    </h4>

                                    <div className="row g-3">

                                        <div className="col-md-6">

                                            <div className="field-box">

                                                <div className="field-title">
                                                    First Name
                                                </div>

                                                <div className="field-value">
                                                    {client.firstName}
                                                </div>

                                            </div>

                                        </div>

                                        <div className="col-md-6">

                                            <div className="field-box">

                                                <div className="field-title">
                                                    Last Name
                                                </div>

                                                <div className="field-value">
                                                    {client.lastName}
                                                </div>

                                            </div>

                                        </div>

                                        <div className="col-12">

                                            <div className="field-box">

                                                <div className="field-title">
                                                    Email
                                                </div>

                                                <div className="field-value">
                                                    {client.email}
                                                </div>

                                            </div>

                                        </div>

                                        <div className="col-12">

                                            <div className="field-box">

                                                <div className="field-title">
                                                    Phone Number
                                                </div>

                                                <div className="field-value">
                                                    {client.phone}
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Company */}

                        <div className="col-lg-6 mb-4">

                            <div className="card info-card">

                                <div className="card-body">

                                    <h4 className="text-success mb-4">
                                        🏢 Company Information
                                    </h4>

                                    <div className="row g-3">

                                        <div className="col-12">

                                            <div className="field-box">

                                                <div className="field-title">
                                                    Company Name
                                                </div>

                                                <div className="field-value">
                                                    {client.companyName}
                                                </div>

                                            </div>

                                        </div>

                                        <div className="col-12">

                                            <div className="field-box">

                                                <div className="field-title">
                                                    Website
                                                </div>

                                                <div className="field-value">
                                                    {client.companyWebsite}
                                                </div>

                                            </div>

                                        </div>

                                        <div className="col-md-6">

                                            <div className="field-box">

                                                <div className="field-title">
                                                    Industry
                                                </div>

                                                <div className="field-value">
                                                    {client.industry}
                                                </div>

                                            </div>

                                        </div>

                                        <div className="col-md-6">

                                            <div className="field-box">

                                                <div className="field-title">
                                                    Location
                                                </div>

                                                <div className="field-value">
                                                    {client.location}
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>
    );
}

export default ClientProfile;