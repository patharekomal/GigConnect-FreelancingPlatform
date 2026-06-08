
import Navbar from "../components/Navbar";

function Contact() {
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
          Get In Touch
        </span>
        <h1
          className="fw-bold mb-3"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#1f2937", lineHeight: "1.2" }}
        >
          Contact <span style={{ color: "#198754" }}>Us</span>
        </h1>
        <p
          className="text-muted mx-auto"
          style={{ maxWidth: "500px", fontSize: "1.1rem", lineHeight: "1.7" }}
        >
          Have questions or need help? We're here to assist you with anything related to WorkBridge.
        </p>
      </section>

      {/* CONTACT CARDS */}
      <section className="container py-5">
        <div className="row g-4 justify-content-center">

          <div className="col-md-4">
            <div
              className="p-4 rounded-4 bg-white text-center h-100"
              style={{ border: "1px solid #e5e7eb" }}
            >
              <div
                className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{ width: "56px", height: "56px", borderRadius: "14px", background: "#e8f5e9", fontSize: "1.4rem" }}
              >
                📧
              </div>
              <h5 className="fw-bold mb-1" style={{ color: "#1f2937" }}>Email Us</h5>
              <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>support@workbridge.com</p>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="p-4 rounded-4 bg-white text-center h-100"
              style={{ border: "1px solid #e5e7eb" }}
            >
              <div
                className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{ width: "56px", height: "56px", borderRadius: "14px", background: "#eef4ff", fontSize: "1.4rem" }}
              >
                📞
              </div>
              <h5 className="fw-bold mb-1" style={{ color: "#1f2937" }}>Call Us</h5>
              <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>+91 9876543210</p>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="p-4 rounded-4 bg-white text-center h-100"
              style={{ border: "1px solid #e5e7eb" }}
            >
              <div
                className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{ width: "56px", height: "56px", borderRadius: "14px", background: "#fff8e1", fontSize: "1.4rem" }}
              >
                🕐
              </div>
              <h5 className="fw-bold mb-1" style={{ color: "#1f2937" }}>Support Hours</h5>
              <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>Mon – Sat, 9am – 6pm IST</p>
            </div>
          </div>

        </div>
      </section>

      {/* BOTTOM BANNER */}
      <section className="container pb-5">
        <div
          className="rounded-4 p-4 p-md-5 text-white text-center shadow-lg"
          style={{ background: "linear-gradient(135deg, #198754, #157347, #0d6efd)" }}
        >
          <h2 className="fw-bold mb-2">We're always here for you</h2>
          <p className="mb-0" style={{ opacity: 0.9 }}>
            Reach out anytime — our team is ready to help you get the most out of WorkBridge.
          </p>
        </div>
      </section>

    </div>
  );
}

export default Contact;
