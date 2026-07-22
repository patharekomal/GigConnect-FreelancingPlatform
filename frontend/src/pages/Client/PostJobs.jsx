import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Client/Sidebar";

const CLIENT_ID = 2;

function PostJob({ addJob }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
  });

  const [errors, setErrors] = useState({});

  // Handles all input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {};

    if (!form.title.trim())
      newErrors.title = "Job title is required";

    if (!form.description.trim())
      newErrors.description = "Description is required";

    if (!form.budget)
      newErrors.budget = "Budget is required";

    if (!form.deadline)
      newErrors.deadline = "Deadline is required";

    return newErrors;
  };

  // Submit Job
  const handleSubmit = () => {
    const foundErrors = validate();

    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }

    const newJob = {
      job_id: Date.now(),
      client_id: CLIENT_ID,
      title: form.title.trim(),
      description: form.description.trim(),
      budget: parseFloat(form.budget),
      deadline: form.deadline,
      status: "OPEN",
    };

    addJob(newJob);

    navigate("/my-jobs");
  };

  return (
    <>
      <style>{`
        body{
          background:#f8fafc !important;
        }

        .nav-btn:hover{
          background:#f1f5f9 !important;
        }

        .logo-green{
          color:#1D9E75;
        }

        .text-green{
          color:#1D9E75 !important;
        }

        .bg-green-light{
          background:#E1F5EE !important;
        }

        .submit-btn:hover{
          background:linear-gradient(135deg,#198754,#157347)!important;
        }

        .form-control:focus{
          border-color:#198754 !important;
          box-shadow:0 0 0 3px #E1F5EE !important;
        }

        .form-label{
          font-size:13px;
          font-weight:600;
        }
      `}</style>

      <Sidebar activePage="post-job" />

      <main
        style={{
          marginLeft: "260px",
          width: "calc(100% - 260px)",
          minHeight: "100vh",
          padding: "35px",
          background: "#f8fafc",
        }}
      >
        <div
          style={{
            maxWidth: "850px",
            margin: "0 auto",
          }}
        >
          {/* Page Heading */}

          <div className="mb-4">
            <h1
              className="fw-bold mb-1"
              style={{ fontSize: "22px" }}
            >
              Post a Job
            </h1>

            <p
              className="text-muted mb-0"
              style={{ fontSize: "14px" }}
            >
              Fill in the details below to find the right freelancer
            </p>
          </div>

          {/* Form Card */}

          <div className="bg-white border rounded-3 p-4">

            {/* Job Title */}

            <div className="mb-3">

              <label className="form-label">
                Job Title
              </label>

              <input
                type="text"
                name="title"
                className={`form-control rounded-3 ${
                  errors.title ? "is-invalid" : ""
                }`}
                placeholder="e.g. React Developer Needed"
                value={form.title}
                onChange={handleChange}
              />

              {errors.title && (
                <div className="invalid-feedback">
                  {errors.title}
                </div>
              )}

            </div>

            {/* Description */}

            <div className="mb-3">

              <label className="form-label">
                Job Description
              </label>

              <textarea
                name="description"
                rows={5}
                className={`form-control rounded-3 ${
                  errors.description ? "is-invalid" : ""
                }`}
                placeholder="Describe what you need, required skills, expected deliverables..."
                value={form.description}
                onChange={handleChange}
              />

              {errors.description && (
                <div className="invalid-feedback">
                  {errors.description}
                </div>
              )}

            </div>

            {/* Budget + Deadline */}

            <div className="row g-3 mb-3">

              <div className="col-md-6">

                <label className="form-label">
                  Budget (₹)
                </label>

                <input
                  type="number"
                  name="budget"
                  min="0"
                  className={`form-control rounded-3 ${
                    errors.budget ? "is-invalid" : ""
                  }`}
                  placeholder="e.g. 15000"
                  value={form.budget}
                  onChange={handleChange}
                />

                {errors.budget && (
                  <div className="invalid-feedback">
                    {errors.budget}
                  </div>
                )}

              </div>

              <div className="col-md-6">

                <label className="form-label">
                  Deadline
                </label>

                <input
                  type="date"
                  name="deadline"
                  className={`form-control rounded-3 ${
                    errors.deadline ? "is-invalid" : ""
                  }`}
                  value={form.deadline}
                  onChange={handleChange}
                />

                {errors.deadline && (
                  <div className="invalid-feedback">
                    {errors.deadline}
                  </div>
                )}

              </div>

            </div>

            <hr className="my-4" />

            <div className="d-flex gap-2">

              <button
                className="btn btn-outline-secondary rounded-3 px-4"
                onClick={() => navigate("/client-dashboard")}
              >
                Cancel
              </button>

              <button
                className="submit-btn btn text-white fw-semibold rounded-3 px-4"
                style={{
                  background:
                    "linear-gradient(135deg,#198754,#157347)",
                }}
                onClick={handleSubmit}
              >
                Post Job →
              </button>

            </div>

          </div>
                    {/* Tips Card */}

          <div
            className="rounded-3 p-3 mt-4 d-flex gap-3 align-items-start"
            style={{
              background: "#E1F5EE",
              border: "1px solid #9FE1CB",
            }}
          >
            <span style={{ fontSize: "20px" }}>
              💡
            </span>

            <div>

              <div
                className="fw-semibold text-green"
                style={{ fontSize: "13px" }}
              >
                Tips for a great job post
              </div>

              <div
                className="text-muted mt-1"
                style={{
                  fontSize: "12px",
                  lineHeight: "1.6",
                }}
              >
                Be specific about what you need.
                Include required skills,
                expected timeline and clear
                deliverables. Jobs with detailed
                descriptions receive higher quality
                proposals.
              </div>

            </div>

          </div>

        </div>

      </main>

    </>
  );
}

export default PostJob;