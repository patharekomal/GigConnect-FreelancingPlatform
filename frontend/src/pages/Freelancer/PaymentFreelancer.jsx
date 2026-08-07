import Sidebar from "../../components/Freelancer/Sidebar";
import { useEffect, useState } from "react";
import { getFreelancerPayments } from "../../services/paymentService";

function PaymentFreelancer() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      const response = await getFreelancerPayments();
      setPayments(Array.isArray(response) ? response : []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const totalReceived = payments
    .filter((payment) => payment.status === "SUCCESS")
    .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);

  const successfulPayments = payments.filter(
    (payment) => payment.status === "SUCCESS"
  ).length;

  const pendingPayments = payments.filter(
    (payment) => payment.status === "PENDING" || payment.status === "PROCESSING"
  ).length;

  const formatDate = (dateValue) => {
    if (!dateValue) return "—";
    return new Date(dateValue).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-md-2">
          <Sidebar />
        </div>

        <div className="col-md-10">
          <div className="card shadow-sm border-0 p-4 mb-4">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h2 className="fw-bold mb-2">Payment History</h2>
                <p className="text-muted mb-0">
                  Review your earned payments, transaction status, and recent project settlements.
                </p>
              </div>
              <div className="col-md-4 text-md-end">
                <span className="badge bg-success-subtle text-success px-3 py-2">
                  {payments.length} transactions
                </span>
              </div>
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="card shadow-sm border-0 p-3 h-100">
                <h6 className="text-muted mb-2">Total Received</h6>
                <h2 className="fw-bold text-success">₹{totalReceived.toLocaleString("en-IN")}</h2>
                <small className="text-muted">From successful payments</small>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm border-0 p-3 h-100">
                <h6 className="text-muted mb-2">Successful Payments</h6>
                <h2 className="fw-bold text-primary">{successfulPayments}</h2>
                <small className="text-muted">Completed and settled</small>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm border-0 p-3 h-100">
                <h6 className="text-muted mb-2">Pending</h6>
                <h2 className="fw-bold text-warning">{pendingPayments}</h2>
                <small className="text-muted">Awaiting update</small>
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-0 p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold mb-0">Recent Payments</h4>
              <span className="text-muted small">Updated automatically</span>
            </div>

            {loading ? (
              <div className="text-center py-4 text-muted">Loading payments...</div>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Project</th>
                      <th>Client</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Payment Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center text-muted py-4">
                          No payments received yet.
                        </td>
                      </tr>
                    ) : (
                      payments.map((payment) => (
                        <tr key={payment.paymentId}>
                          <td className="fw-semibold">{payment.projectTitle}</td>
                          <td>{payment.clientName}</td>
                          <td>₹{Number(payment.amount || 0).toLocaleString("en-IN")}</td>
                          <td>
                            <span
                              className={`badge ${
                                payment.status === "SUCCESS"
                                  ? "bg-success"
                                  : payment.status === "FAILED"
                                  ? "bg-danger"
                                  : "bg-warning text-dark"
                              }`}
                            >
                              {payment.status}
                            </span>
                          </td>
                          <td className="text-muted">{formatDate(payment.paymentDate)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentFreelancer;