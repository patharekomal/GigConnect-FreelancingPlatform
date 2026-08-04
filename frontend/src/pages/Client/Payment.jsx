import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Client/Sidebar";
import { getPaymentsByClient } from "../../services/paymentService";
import { getMyPayments } from "../../services/paymentService";

function Payment() {
  const navigate = useNavigate();

  const [payments, setPayments] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/login");
    return null;
  }

  const clientId = user.id;

  const loadPayments = async () => {
    try {
        const data = await getMyPayments();
        setPayments(data);
    } catch (error) {
        console.log(error);
        console.log(error.response);
        console.log(error.response?.data);
        console.log(error.response?.status);

        alert("Unable to load payments.");
    }
  };

  useEffect(() => {

    loadPayments();

  }, []);



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
            {payments.length === 0 ? (

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
                        SR. NO.
                      </th>

                      <th className="px-4 py-3">
                        PROJECT TITLE
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

                    {payments.map((payment, index) => (

                      <tr
                        key={payment.paymentId}
                        className="payment-row align-middle"
                      >

                        {/* <td className="px-4 py-3 fw-semibold">
                          #PRJ-
                          {String(
                            payment.projectId
                          ).padStart(3, "0")}
                        </td> */}

                        <td className="px-4 py-3 fw-semibold">
                          {index + 1}
                        </td>

                        <td className="px-4 py-3 fw-semibold">
                          {payment.projectTitle}
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
                                background:
                                  payment.status === "SUCCESS"
                                    ? "#DCFCE7"
                                    : payment.status === "FAILED"
                                    ? "#FEE2E2"
                                    : "#FEF3C7",

                                color:
                                  payment.status === "SUCCESS"
                                    ? "#15803D"
                                    : payment.status === "FAILED"
                                    ? "#DC2626"
                                    : "#D97706",

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
                          {payment.paymentDate? new Date(payment.paymentDate).toLocaleString() : "-"}
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