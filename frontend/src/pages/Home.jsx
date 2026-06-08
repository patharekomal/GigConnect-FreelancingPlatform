import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#f8fafc" }}>

      <Navbar />
      {/* HERO */}
      <section
        className="position-relative overflow-hidden py-5"
        style={{
          background: "linear-gradient(135deg, #dff6e4 0%, #ffffff 50%, #eef7ff 100%)",
          minHeight: "85vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-60px",
            right: "-60px",
            width: "220px",
            height: "220px",
            background: "rgba(25, 135, 84, 0.12)",
            borderRadius: "50%",
            filter: "blur(10px)",
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "260px",
            height: "260px",
            background: "rgba(13, 110, 253, 0.10)",
            borderRadius: "50%",
            filter: "blur(10px)",
          }}
        ></div>

        <div className="container text-center position-relative">
          <span
            className="badge rounded-pill px-3 py-2 mb-3"
            style={{
              backgroundColor: "#e8f5e9",
              color: "#198754",
              fontSize: "0.9rem",
            }}
          >
            Welcome to WorkBridge
          </span>

          <h1
            className="fw-bold mb-3"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              color: "#1f2937",
              lineHeight: "1.2",
            }}
          >
            How work should <span style={{ color: "#198754" }}>work</span>
          </h1>

          <p
            className="text-muted mx-auto mb-4"
            style={{
              maxWidth: "700px",
              fontSize: "1.15rem",
            }}
          >
            WorkBridge connects ambitious clients with skilled freelancers,
            making collaboration simple, secure, and fast.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button
              className="btn btn-success px-4 py-2 fw-semibold shadow"
              onClick={() => navigate("/register")}
              style={{ borderRadius: "30px" }}
            >
              Get Started
            </button>

            <button
              className="btn btn-outline-dark px-4 py-2 fw-semibold"
              style={{ borderRadius: "30px" }}
            >
              Learn More
            </button>
          </div>

          <div className="row justify-content-center mt-5 g-4">
            <div className="col-6 col-md-3">
              <div className="bg-white shadow-sm rounded-4 p-3">
                <h5 className="fw-bold mb-1 text-success">Top Talent</h5>
                <small className="text-muted">Verified freelancers worldwide</small>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="bg-white shadow-sm rounded-4 p-3">
                <h5 className="fw-bold mb-1 text-primary">Secure Deals</h5>
                <small className="text-muted">Safe payments and trust</small>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="bg-white shadow-sm rounded-4 p-3">
                <h5 className="fw-bold mb-1 text-warning">Fast Hiring</h5>
                <small className="text-muted">Post projects and hire quickly</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CARDS */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Built for everyone</h2>
          <p className="text-muted">
            Whether you are hiring talent or looking for work, WorkBridge helps you move forward.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div
              className="p-4 rounded-4 shadow-sm bg-white h-100 border-0"
              style={{
                transition: "0.3s ease",
              }}
            >
              <div
                className="mb-3 d-inline-flex align-items-center justify-content-center"
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "16px",
                  background: "#e8f5e9",
                  fontSize: "1.5rem",
                }}
              >
                💼
              </div>

              <h4 className="fw-bold">For Clients</h4>
              <p className="text-muted">
                Discover expert freelancers and get your projects delivered with confidence.
              </p>

              <ul className="text-muted ps-3">
                <li className="mb-2">Access to millions of skilled freelancers</li>
                <li className="mb-2">Secure payment protection for every project</li>
                <li>Reliable 24/7 support whenever you need help</li>
              </ul>
            </div>
          </div>

          <div className="col-md-6">
            <div
              className="p-4 rounded-4 shadow-sm bg-white h-100 border-0"
              style={{
                transition: "0.3s ease",
              }}
            >
              <div
                className="mb-3 d-inline-flex align-items-center justify-content-center"
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "16px",
                  background: "#eef4ff",
                  fontSize: "1.5rem",
                }}
              >
                🚀
              </div>

              <h4 className="fw-bold">For Freelancers</h4>
              <p className="text-muted">
                Build your profile, show your skills, and connect with clients from around the world.
              </p>

              <ul className="text-muted ps-3">
                <li className="mb-2">Find projects that match your passion</li>
                <li className="mb-2">Get paid safely and on time</li>
                <li>Work from anywhere with complete flexibility</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container pb-5">
        <div
          className="rounded-4 p-4 p-md-5 text-white shadow-lg"
          style={{
            background: "linear-gradient(135deg, #198754, #157347, #0d6efd)",
          }}
        >
          <div className="text-center mb-4">
            <h2 className="fw-bold">Work smarter. Connect faster.</h2>
            <p className="mb-0" style={{ opacity: 0.9 }}>
              A growing marketplace where ideas meet opportunity
            </p>
          </div>

          <div className="row text-center g-4 mt-2">
            <div className="col-md-4">
              <div className="bg-white bg-opacity-10 rounded-4 py-4">
                <h2 className="fw-bold">✅ Easy to Use</h2>
                <p className="mb-0">Post jobs in minutes</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="bg-white bg-opacity-10 rounded-4 py-4">
                <h2 className="fw-bold">🔒 Secure Platform</h2>
                <p className="mb-0">Safe & transparent</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="bg-white bg-opacity-10 rounded-4 py-4">
                <h2 className="fw-bold">🚀 Fast Hiring</h2>
                <p className="mb-0">Find talent quickly</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
