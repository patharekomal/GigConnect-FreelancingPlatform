import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Client/Sidebar";
import { payments } from "../../data/dummyData";

const CLIENT_ID = 2;

function Payment() {
  const navigate = useNavigate();

  // Get payments for this client
  const myPayments = payments.filter(p => p.client_id === CLIENT_ID);

  return (
    <>
      <style>{`
        body { background: #f8fafc !important; }
        .sidebar { width: 220px; min-height: 100vh; position: sticky; top: 0; }
      `}</style>

      <div className="d-flex">
        
        {/* ── SIDEBAR COMPONENT ─────────────────────────────────────────── */}
        <Sidebar activePage="payment" />

        {/* ── MAIN CONTENT ────────────────────────────────────── */}
        <main className="flex-grow-1 p-4">
          <div className="mb-4">
            <h1 className="fw-bold mb-1" style={{ fontSize: "22px" }}>Payments</h1>
            <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
              Manage your project payments
            </p>
          </div>

          {myPayments.length === 0 ? (
            <div className="bg-white border rounded-3 p-5 text-center">
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>💳</div>
              <h5 className="fw-semibold mb-2">No payments yet</h5>
              <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
                Payment records will appear here
              </p>
            </div>
          ) : (
            <div className="bg-white border rounded-3 overflow-hidden">
              <table className="table table-striped mb-0">
                <thead style={{ background: "#f8fafc" }}>
                  <tr>
                    <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>PROJECT ID</th>
                    <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>AMOUNT</th>
                    <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>STATUS</th>
                    <th className="px-4 py-3 text-muted fw-semibold border-0" style={{ fontSize: "12px" }}>DATE</th>
                  </tr>
                </thead>
                <tbody>
                  {myPayments.map(payment => (
                    <tr key={payment.payment_id}>
                      <td className="px-4 py-3" style={{ fontSize: "14px" }}>{payment.project_id}</td>
                      <td className="px-4 py-3 fw-semibold" style={{ fontSize: "14px" }}>₹{payment.amount.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className="badge bg-info" style={{ fontSize: "11px" }}>{payment.status}</span>
                      </td>
                      <td className="px-4 py-3 text-muted" style={{ fontSize: "13px" }}>{payment.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default Payment;
