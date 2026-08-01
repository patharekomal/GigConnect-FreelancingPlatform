import { useEffect, useState } from "react";
import Sidebar from "../../components/Freelancer/Sidebar";
import { fetchReviewsByFreelancer } from "../../services/reviewService";

function Reviews() {
  const user = JSON.parse(localStorage.getItem("user"));
  const freelancerId = user.id;

  const [myReviews, setMyReviews] = useState([]);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const data = await getReviewsByFreelancer(freelancerId);

      console.log(data);

      setMyReviews(data);
    } catch (error) {
      console.error(error);
    }
  };

  const avgRating =
    myReviews.length > 0
      ? (
          myReviews.reduce((sum, review) => sum + review.rating, 0) /
          myReviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <>
      <style>{`
        body{
          background:#f8fafc !important;
        }

        .rating-card{
          border:none;
          border-radius:16px;
          box-shadow:0 8px 20px rgba(0,0,0,0.06);
        }

        .review-card{
          border:none;
          border-radius:16px;
          box-shadow:0 6px 16px rgba(0,0,0,0.05);
          transition:.2s;
        }

        .review-card:hover{
          transform:translateY(-2px);
        }

        .star{
          color:#FFC107;
          font-size:20px;
        }

        .review-date{
          font-size:13px;
          color:#64748b;
        }

      `}</style>

      <div>
        <Sidebar activePage="reviews" />

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
              maxWidth: "950px",
              margin: "0 auto",
            }}
          >
            {/* Heading */}

            <div className="rating-card bg-white p-4 mb-4">

              <h2 className="fw-bold mb-3">
                Reviews & Ratings
              </h2>

              <div
                className="d-flex align-items-center justify-content-between flex-wrap"
              >
                <div>
                  <h1
                    className="fw-bold text-success mb-0"
                    style={{
                      fontSize: "42px",
                    }}
                  >
                    {avgRating}
                  </h1>

                  <div className="text-muted">
                    Average Rating
                  </div>
                </div>

                <div className="text-end">

                  <h4 className="mb-1">
                    {myReviews.length}
                  </h4>

                  <div className="text-muted">
                    Total Reviews
                  </div>

                </div>
              </div>
            </div>

            {/* Reviews */}

            {myReviews.length > 0 ? (

              myReviews.map((review) => (

                <div
                  className="review-card bg-white p-4 mb-3"
                  key={review.reviewId}
                >

                  <div className="d-flex justify-content-between">

                    <div>

                      <h5 className="fw-bold">
                        {review.projectTitle}
                      </h5>

                      <div className="mb-2">

                        {"⭐".repeat(review.rating)}

                      </div>

                    </div>

                    <div className="review-date">

                      {new Date(
                        review.reviewDate
                      ).toLocaleDateString()}

                    </div>

                  </div>

                  <p
                    className="mb-0"
                    style={{
                      color: "#475569",
                    }}
                  >
                    {review.comment}
                  </p>

                </div>

              ))

            ) : (

              <div
                className="bg-white rounded-4 p-5 text-center"
              >

                <div
                  style={{
                    fontSize: "60px",
                  }}
                >
                  ⭐
                </div>

                <h4 className="mt-3">

                  No Reviews Yet

                </h4>

                <p className="text-muted">

                  Complete projects successfully to receive reviews from your clients.

                </p>

              </div>

            )}

          </div>
        </main>
      </div>
    </>
  );
}

export default Reviews;