import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Client/Sidebar";
import { fetchProjectById, approveProject } from "../../services/projectService";
import { fetchClientById } from "../../services/clientService";
import { createOrder, verifyPayment, markPaymentFailed } from "../../services/paymentService";
import { submitReview, fetchReviewByProject } from "../../services/reviewService";
import { toast } from "react-toastify";

import { useState, useEffect } from "react";

function ProjectPage() {

  const navigate = useNavigate();
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [client, setClient] = useState(null);

  const [showReviewModal, setShowReviewModal] = useState(false);

  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");

  const [reviewExists, setReviewExists] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const clientId = user.id;

  useEffect(() => {
    loadClient();
    loadProject();
  }, [projectId]);

  const loadClient = async () => {
  try {
    const data = await fetchClientById(clientId);
    setClient(data);
  } catch (error) {
    console.error(error);
  }
};

  const loadProject = async () => {

      try {

          const data = await fetchProjectById(projectId);

          console.log(data);

          setProject(data);
          try {

              await fetchReviewByProject(projectId);

              setReviewExists(true);

          } catch {

              setReviewExists(false);

          }

      } catch(error){

          console.error(error);

      }
  };

  

  const statusStyle = (status) => {

    if (status === "COMPLETED")
      return {
        bg: "#E1F5EE",
        color: "#1D9E75",
      };

    if (status === "SUBMITTED")
      return {
        bg: "#FEF3C7",
        color: "#B45309",
      };

    if (status === "IN_PROGRESS")
      return {
        bg: "#DBEAFE",
        color: "#2563EB",
      };

    if (status === "CANCELLED")
      return {
        bg: "#FEE2E2",
        color: "#DC2626",
      };

    return {
      bg: "#F1F5F9",
      color: "#64748B",
    };
  };

  if (!project) {

    return (

      <div className="p-5 text-center">

        <div
          style={{
            fontSize: "42px",
          }}
        >
          🔍
        </div>

        <h4 className="mt-3">
          Project not found
        </h4>

        <button
          className="btn btn-link text-decoration-none"
          onClick={() => navigate("/my-projects")}
        >
          ← Back to My Projects
        </button>

      </div>

    );
  }

  const badge = statusStyle(project.status);

  const handleApprove = async () => {

    let paymentCompleted = false;

    try {

        // 1. Create Razorpay Order
        const order = await createOrder(project.projectId);

        console.log(order);

        const options = {

            key: "rzp_test_TIvp6aF23c5Uyn",
            amount: order.amount,
            currency: order.currency,
            name: "GigConnect",
            description: project.projectTitle,
            order_id: order.orderId,

            // Payment Success
            handler: async function (response) {

                try {

                    await verifyPayment({

                        razorpayOrderId: response.razorpay_order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature

                    });

                    paymentCompleted = true;

                    toast.success("Payment completed successfully.");

                    loadProject();

                } catch (err) {

                    console.error(err);

                    toast.error("Payment verification failed. Please contact support.");

                }

            },

            // User closes popup
            modal: {

                ondismiss: async function () {
                  if (paymentCompleted) {
                      return;
                  }

                  try {

                      await markPaymentFailed({
                          razorpayOrderId: order.orderId
                      });

                  } catch (err) {

                      console.error(err);

                  }

                 toast.info("Payment cancelled.");

              }

            },

            theme: {
                color: "#198754"
            }

        };

        // Create Razorpay instance ONLY ONCE
        const razorpay = new window.Razorpay(options);

        // Payment Failed
        razorpay.on("payment.failed", async function (response) {

          console.error("Payment Failed:", response.error);

          try {

              await markPaymentFailed({
                  razorpayOrderId: response.error.metadata.order_id
              });

              await loadProject();

          } catch (err) {

              console.error("Unable to update payment status", err);

          }

          let message = "Payment could not be completed. Please try again.";

          switch (response.error.reason) {

              case "insufficient_funds":
                  message = "Payment failed due to insufficient balance.";
                  break;

              case "international_transaction_not_allowed":
                  message = "This card is not supported. Please use another payment method.";
                  break;

              case "payment_cancelled":
                  message = "Payment was cancelled.";
                  break;

              case "bank_error":
                  message = "The bank is currently unavailable. Please try again later.";
                  break;

              default:
                  message = "Payment could not be completed. Please try again.";

          }

         toast.success(message);

        });

    razorpay.open();

    } catch (error) {

        console.error(error);

        const message =
            error.response?.data?.message ||
            "Unable to initiate payment. Please try again.";

        toast.error(message);
    }

  };

  const handleSubmitReview = async () => {

    try {

        await submitReview({

            projectId,

            rating,

            comment

        });

        alert("Review submitted successfully.");

        setShowReviewModal(false);

        setReviewExists(true);

    } catch (error) {

        console.error(error);

        alert(
            error.response?.data?.message ||
            "Unable to submit review."
        );

    }

};

  return (

    <>

      <style>{`

        body{
          background:#f8fafc !important;
          margin:0;
        }

        .nav-btn:hover{
          background:#f1f5f9!important;
        }

        .text-green{
          color:#1D9E75!important;
        }

        .approve-btn:hover{
          background:linear-gradient(135deg,#198754,#157347)!important;
        }

      `}</style>

      <div>

        <Sidebar
         activePage="my-projects"
         client={client}
          />

        <main
          style={{
            marginLeft: "260px",
            width: "calc(100% - 260px)",
            minHeight: "100vh",
            padding: "35px",
            background: "#f8fafc",
            overflowX: "hidden",
            boxSizing: "border-box",
          }}
        >

          <div
            style={{
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >

            <div className="mb-4">

              <button
                className="btn btn-link text-muted p-0 mb-3 text-decoration-none"
                onClick={() => navigate("/my-projects")}
              >
                ← Back to My Projects
              </button>

              <div className="d-flex align-items-center gap-3 flex-wrap">

                <h2
                  className="fw-bold mb-0"
                  style={{
                    fontSize: "24px",
                  }}
                >
                  {project.projectTitle}
                </h2>

                <span
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    background: badge.bg,
                    color: badge.color,
                  }}
                >
                  {project.status}
                </span>

              </div>

            </div>

            <div className="bg-white border rounded-3 p-4 mb-4">

              <h5 className="fw-bold mb-4">
                Project Details
              </h5>

              <div
                className="row g-3 mb-3"
                style={{
                  marginLeft: 0,
                  marginRight: 0,
                }}
              >
                                {/* Freelancer */}
                <div className="col-md-4">
                  <div
                    className="p-3 rounded-3 h-100"
                    style={{ background: "#f8fafc" }}
                  >
                    <div
                      className="text-muted mb-2"
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                      }}
                    >
                      FREELANCER
                    </div>

                    <div className="d-flex align-items-center gap-2">

                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                        style={{
                          width: "34px",
                          height: "34px",
                          background:
                            "linear-gradient(135deg,#198754,#157347)",
                        }}
                      >
                        {project.freelancerName?.charAt(0)}
                      </div>

                      <span className="fw-semibold">
                        {project.freelancerName}
                      </span>

                    </div>

                  </div>
                </div>

                {/* Amount */}
                <div className="col-md-4">
                  <div
                    className="p-3 rounded-3 h-100"
                    style={{ background: "#f8fafc" }}
                  >
                    <div
                      className="text-muted mb-2"
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                      }}
                    >
                      AGREED AMOUNT
                    </div>

                    <div
                      className="fw-bold text-green"
                      style={{ fontSize: "20px" }}
                    >
                      ₹
                      {project.agreedAmount
                        ?.toLocaleString?.() ??
                        project.agreedAmount}
                    </div>

                  </div>
                </div>

                {/* Project ID */}
                <div className="col-md-4">
                  <div
                    className="p-3 rounded-3 h-100"
                    style={{ background: "#f8fafc" }}
                  >
                    <div
                      className="text-muted mb-2"
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                      }}
                    >
                      PROJECT ID
                    </div>

                    <div className="fw-semibold">
                      #PRJ-
                      {String(
                        project.projectId
                      ).padStart(3, "0")}
                    </div>

                  </div>
                </div>

              </div>

              <div>

                <div
                  className="text-muted fw-semibold mb-2"
                  style={{
                    fontSize: "11px",
                  }}
                >
                  JOB DESCRIPTION
                </div>

                <p
                  className="mb-0"
                  style={{
                    color: "#475569",
                    lineHeight: "1.7",
                  }}
                >
                  {project.description}
                </p>

              </div>

            </div>

            {/* Submitted Work */}
            {project.submittedWork ? (

              <div className="bg-white border rounded-3 p-4 mb-4">

                <h5 className="fw-bold mb-3">
                  Submitted Work
                </h5>

                <div
                  className="rounded-3 p-3 d-flex align-items-center gap-3"
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                  }}
                >

                  <span style={{ fontSize: "24px" }}>
                    📎
                  </span>

                  <div>

                    <div
                      className="text-muted mb-1"
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                      }}
                    >
                      DELIVERABLE
                    </div>

                    <a
                      href={`https://${project.submittedWork}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green fw-semibold"
                    >
                      {project.submittedWork}
                    </a>

                  </div>

                </div>

                <div className="d-flex gap-3 mt-4">

                  <button
                    className="btn text-white"
                    style={{
                      background: "linear-gradient(135deg,#198754,#157347)",
                      minWidth: "180px",
                    }}
                    onClick={() => navigate(`/clientChat/${project.projectId}`)}
                  >
                    💬 Chat with Freelancer
                  </button>

                  {project.status === "SUBMITTED" && (
                    <button
                      className="btn approve-btn text-white flex-grow-1"
                      style={{
                        background: "linear-gradient(135deg,#198754,#157347)",
                      }}
                      onClick={handleApprove}
                    >
                      ✓ Approve Work & Release Payment
                    </button>
                  )}

                </div>

                      {project.status === "SUBMITTED" && (
                        <p
                          className="text-center text-muted mt-2 mb-0"
                          style={{ fontSize: "12px" }}
                        >
                          Approving marks this project as completed.
                        </p>
                      )}

              </div>

            ) : (

              <div className="bg-white border rounded-3 p-4 mb-4">

                <h5 className="fw-bold mb-3">
                  Submitted Work
                </h5>

                <div className="text-center py-4">

  <div
    style={{
      fontSize: "40px",
    }}
  >
    ⏳
  </div>

  <h6 className="mt-3">
    Waiting for Submission
  </h6>

  <p className="text-muted">
    The freelancer has not submitted the work yet.
  </p>

  <button
    className="btn text-white mt-3"
    style={{
      background: "linear-gradient(135deg,#198754,#157347)",
      minWidth: "200px",
    }}
    onClick={() => navigate(`/clientChat/${project.projectId}`)}
  >
    💬 Chat with Freelancer
  </button>

</div>

              </div>

            )}

            {project.status === "COMPLETED" && (

              <div
                className="rounded-3 p-4 d-flex align-items-center gap-3"
                style={{
                  background: "#E1F5EE",
                  border: "1px solid #9FE1CB",
                }}
              >

                <span
                  style={{
                    fontSize: "28px",
                  }}
                >
                  ✅
                </span>

                <div>

                  <div className="fw-bold text-green">
                    Project Completed
                  </div>

                  <div
                    className="text-muted"
                    style={{
                      fontSize: "13px",
                    }}
                  >
                    Payment has been released.
                  </div>

                </div>

                <button
                  className="btn text-white ms-auto"
                  style={{
                    background:
                      "linear-gradient(135deg,#198754,#157347)",
                  }}
                  onClick={() =>
                    navigate("/payment")
                  }
                >
                  View Payment
                </button>

                {!reviewExists && (

                  <button
                      className="btn btn-warning ms-2"
                      onClick={() => setShowReviewModal(true)}
                  >
                      ⭐ Leave Review
                  </button>

                )}

              </div>

            )}

          </div>

        </main>

      </div>

      {showReviewModal && (

        <div
            className="modal d-block"
            style={{ background: "rgba(0,0,0,0.5)" }}
        >

        <div className="modal-dialog">

        <div className="modal-content">

        <div className="modal-header">

        <h5>Leave Review</h5>

        <button
        className="btn-close"
        onClick={() => setShowReviewModal(false)}
        ></button>

        </div>

        <div className="modal-body">

        <label className="form-label">

        Rating

        </label>

        <select
        className="form-select mb-3"
        value={rating}
        onChange={(e)=>setRating(Number(e.target.value))}
        >

        <option value={5}>⭐⭐⭐⭐⭐</option>
        <option value={4}>⭐⭐⭐⭐</option>
        <option value={3}>⭐⭐⭐</option>
        <option value={2}>⭐⭐</option>
        <option value={1}>⭐</option>

        </select>

        <label className="form-label">

        Comment

        </label>

        <textarea
        className="form-control"
        rows="4"
        value={comment}
        onChange={(e)=>setComment(e.target.value)}
        />

        </div>

        <div className="modal-footer">

        <button
        className="btn btn-secondary"
        onClick={() => setShowReviewModal(false)}
        >

        Cancel

        </button>

        <button
        className="btn btn-success"
        onClick={handleSubmitReview}
        >

        Submit Review

        </button>

        </div>

        </div>

        </div>

        </div>

        )}

    </>

  );
}

export default ProjectPage;