import Navbar from "../components/Navbar";

function About() {
  return (



    <div style={{ backgroundColor: "#f8fafc" }}>
          <Navbar />
      {/* HERO BANNER */}
      <section
        style={{
          background: "linear-gradient(135deg, #dff6e4 0%, #ffffff 50%, #eef7ff 100%)",
          padding: "64px 24px",
          textAlign: "center",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <span
          className="badge rounded-pill px-3 py-2 mb-3"
          style={{ backgroundColor: "#e8f5e9", color: "#198754", fontSize: "0.85rem" }}
        >
          Who We Are
        </span>
        <h1
          className="fw-bold mb-3"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#1f2937", lineHeight: "1.2" }}
        >
          About <span style={{ color: "#198754" }}>WorkBridge</span>
        </h1>
        <p
          className="text-muted mx-auto"
          style={{ maxWidth: "600px", fontSize: "1.1rem", lineHeight: "1.7" }}
        >
          A platform designed to connect clients with skilled freelancers from around
          the world — making collaboration easy, efficient, and accessible for everyone.
        </p>
      </section>

      {/* MISSION CARDS */}
      <section className="container py-5">
        <div className="row g-4 justify-content-center">

          <div className="col-md-5">
            <div
              className="p-4 rounded-4 bg-white h-100"
              style={{ border: "1px solid #e5e7eb", transition: "0.3s ease" }}
            >
              <div
                className="mb-3 d-inline-flex align-items-center justify-content-center"
                style={{ width: "56px", height: "56px", borderRadius: "14px", background: "#e8f5e9", fontSize: "1.5rem" }}
              >
                🎯
              </div>
              <h4 className="fw-bold mb-2" style={{ color: "#1f2937" }}>Our Mission</h4>
              <p className="text-muted" style={{ lineHeight: "1.7" }}>
                To make work collaboration simple, secure, and fast — bridging the gap between
                talent and opportunity across the globe.
              </p>
            </div>
          </div>

          <div className="col-md-5">
            <div
              className="p-4 rounded-4 bg-white h-100"
              style={{ border: "1px solid #e5e7eb", transition: "0.3s ease" }}
            >
              <div
                className="mb-3 d-inline-flex align-items-center justify-content-center"
                style={{ width: "56px", height: "56px", borderRadius: "14px", background: "#eef4ff", fontSize: "1.5rem" }}
              >
                🌍
              </div>
              <h4 className="fw-bold mb-2" style={{ color: "#1f2937" }}>Our Vision</h4>
              <p className="text-muted" style={{ lineHeight: "1.7" }}>
                Whether you are a business looking for talent or a freelancer seeking
                opportunities, WorkBridge helps you achieve your goals seamlessly.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* STATS BANNER */}
      <section className="container pb-5">
        <div
          className="rounded-4 p-4 p-md-5 text-white shadow-lg"
          style={{ background: "linear-gradient(135deg, #198754, #157347, #0d6efd)" }}
        >
          <div className="text-center mb-4">
            <h2 className="fw-bold">Why WorkBridge</h2>
            <p className="mb-0" style={{ opacity: 0.9 }}>
              Built with freelancers and clients at the heart of everything we do
            </p>
          </div>
          <div className="row text-center g-4 mt-2">
            {[
              { num: "✅ Easy to Use", label: "Post jobs in minutes" },
              { num: "🔒 Secure Platform", label: "Safe & transparent" },
              { num: "🚀 Fast Hiring", label: "Find talent quickly" },
            ].map(({ num, label }) => (
              <div className="col-md-4" key={label}>
                <div className="bg-white bg-opacity-10 rounded-4 py-4">
                  <h2 className="fw-bold">{num}</h2>
                  <p className="mb-0">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default About;
