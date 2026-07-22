import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Client/Sidebar";
import { payments } from "../../data/dummyData";

const CLIENT_ID = 2;

function Payment() {
  const navigate = useNavigate();

  const myPayments = payments.filter(
    (p) => p.client_id === CLIENT_ID
  );

  return (
    <>
      <style>{`
        body{
          background:#f8fafc !important;
          margin:0;
        }

        .nav-btn:hover{
          background:#f1f5f9 !important;
        }

        .payment-row:hover{
          background:#f8fafc;
        }
      `}</style>

      <div>

        {/* Sidebar */}
        <Sidebar activePage="payment" />

        {/* Main Content */}
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
              maxWidth: "1400px",
              margin: "0 auto",
            }}
          >

            {/* Heading */}
            <div className="mb-4">
              <h2
                className="fw-bold mb-2"
                style={{ fontSize: "24px" }}
              >
                Payments
              </h2>

              <p className="text-muted mb-0">
                Manage your project payments
              </p>
            </div>

            {/* Empty State */}
            {myPayments.length === 0 ? (

              <div className="bg-white border rounded-3 p-5 text-center">

                <div
                  style={{
                    fontSize: "45px",
                  }}
                >
                  💳
                </div>

                <h5 className="fw-bold mt-3">
                  No Payments Yet
                </h5>

                <p className="text-muted">
                  Payment records will appear here.
                </p>

              </div>

            ) : (

              <div
                className="bg-white rounded-3 border"
                style={{
                  overflowX: "auto",
                }}
              >

                <table
                  className="table table-hover mb-0"
                  style={{
                    minWidth: "900px",
                  }}
                >

                  <thead
                    style={{
                      background: "#f8fafc",
                    }}
                  >
                    <tr>

                      <th className="px-4 py-3">
                        PROJECT ID
                      </th>

                      <th className="px-4 py-3">
                        AMOUNT
                      </th>

                      <th className="px-4 py-3">
                        STATUS
                      </th>

                      <th className="px-4 py-3">
                        DATE
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {myPayments.map((payment) => (

                      <tr
                        key={payment.payment_id}
                        className="payment-row align-middle"
                      >

                        <td className="px-4 py-3 fw-semibold">
                          #PRJ-
                          {String(
                            payment.project_id
                          ).padStart(3, "0")}
                        </td>

                        <td className="px-4 py-3 fw-semibold">
                          ₹
                          {payment.amount
                            ?.toLocaleString?.() ??
                            payment.amount}
                        </td>

                        <td className="px-4 py-3">

                          <span
                            className="badge rounded-pill px-3 py-2"
                            style={{
                              background: "#DBEAFE",
                              color: "#2563EB",
                              fontSize: "12px",
                            }}
                          >
                            {payment.status}
                          </span>

                        </td>

                        <td
                          className="px-4 py-3 text-muted"
                          style={{
                            fontSize: "13px",
                          }}
                        >
                          {payment.created_at}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>
        </main>

      </div>

    </>
  );
}

export default Payment;