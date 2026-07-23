import Sidebar from "../../components/Freelancer/Sidebar";
import { useEffect, useState } from "react";
import { getFreelancerReviews } from "../../api/reviewApi";
function Reviews() {

  const freelancerId = 1; // Temporary

  const [myReviews, setMyReviews] = useState([]);
  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const response = await getFreelancerReviews(freelancerId);

      console.log(response.data);

      setMyReviews(response.data);
    } catch (error) {
      console.log(error);
    }
  };

   const avgRating =
     myReviews.length > 0
       ? (
           myReviews.reduce((sum, review) => sum + review.rating, 0) /
           myReviews.length
         ).toFixed(1)
       : 0;

    return (
      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>

          <div className="col-md-10">
            <div className="card shadow-sm border-0 p-4 mb-4">
              <h2>Reviews & Ratings</h2>

              <h4 className="text-success">Average Rating : {avgRating}</h4>
            </div>

            {myReviews.length > 0 ? (
              myReviews.map((review) => (
                <div
                  className="card shadow-sm border-0 mb-3"
                  key={review.reviewId}
                >
                  <div className="card-body">
                    <h5>{review.clientName}</h5>

                    <h5>{"⭐".repeat(review.rating)}</h5>

                    <p>{review.comment}</p>

                    <small className="text-muted">{review.reviewDate}</small>
                  </div>
                </div>
              ))
            ) : (
              <div className="alert alert-light border text-center">
                <h5>No Reviews Yet</h5>

                <p className="mb-0">
                  Complete projects successfully to receive reviews.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}

export default Reviews;