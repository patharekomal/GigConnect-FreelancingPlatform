
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: "📋",
      title: "Post a Job",
      desc: "Clients post their project requirements and details.",
      bg: "#e8f5e9",
    },
    {
      number: "02",
      icon: "🤝",
      title: "Hire Freelancers",
      desc: "Choose from a wide range of skilled, verified freelancers.",
      bg: "#eef4ff",
    },
    {
      number: "03",
      icon: "💬",
      title: "Collaborate",
      desc: "Work together efficiently and communicate easily in real time.",
      bg: "#fff8e1",
    },
    {
      number: "04",
      icon: "🏆",
      title: "Get Results",
      desc: "Receive high-quality work and complete your projects on time.",
      bg: "#fce4ec",
    },
  ];

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
          Simple Process
        </span>
        <h1
          className="fw-bold mb-3"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#1f2937", lineHeight: "1.2" }}
        >
          How It <span style={{ color: "#198754" }}>Works</span>
        </h1>
        <p
          className="text-muted mx-auto"
          style={{ maxWidth: "520px", fontSize: "1.1rem", lineHeight: "1.7" }}
        >
          Getting started on GigConnect is quick and easy — just four simple steps
          between you and your next great project.
        </p>
      </section>

      {/* STEPS */}
      <section className="container py-5">
        <div className="row g-4">
          {steps.map(({ number, icon, title, desc, bg }) => (
            <div className="col-md-6" key={number}>
              <div
                className="p-4 rounded-4 bg-white h-100"
                style={{ border: "1px solid #e5e7eb", transition: "0.3s ease" }}
              >
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ width: "56px", height: "56px", borderRadius: "14px", background: bg, fontSize: "1.4rem", flexShrink: 0 }}
                  >
                    {icon}
                  </div>
                  <span
                    className="fw-bold"
                    style={{ fontSize: "2rem", color: "#e5e7eb", lineHeight: 1, fontFamily: "monospace" }}
                  >
                    {number}
                  </span>
                </div>
                <h4 className="fw-bold mb-2" style={{ color: "#1f2937" }}>{title}</h4>
                <p className="text-muted mb-0" style={{ lineHeight: "1.7" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="container pb-5">
        <div
          className="rounded-4 p-4 p-md-5 text-white text-center shadow-lg"
          style={{ background: "linear-gradient(135deg, #198754, #157347, #0d6efd)" }}
        >
          <h2 className="fw-bold mb-2">Ready to get started?</h2>
          <p className="mb-4" style={{ opacity: 0.9 }}>
            Join millions of clients and freelancers already using GigConnect.
          </p>
          <button
            className="btn btn-light fw-semibold px-4 py-2"
            style={{ borderRadius: "30px", color: "#198754" }}
          >
            Create Free Account
          </button>
        </div>
      </section>
          <Footer />
    </div>
  );
}

export default HowItWorks;
