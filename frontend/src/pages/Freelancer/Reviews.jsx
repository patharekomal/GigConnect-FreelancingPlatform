import Sidebar from "../../components/Freelancer/Sidebar";
import { reviews } from "../../data/dummyData";

function Reviews() {

    const freelancerId = 6;

    const myReviews = reviews.filter(
        review => review.reviewee_id === freelancerId
    );

    const avgRating =
        (
            myReviews.reduce(
                (sum, review) => sum + review.rating,
                0
            ) / myReviews.length
        ).toFixed(1);

    return (

        <div className="container-fluid p-4">

            <div className="row">

                <div className="col-md-2">
                    <Sidebar />
                </div>

                <div className="col-md-10">

                    <div className="card shadow-sm border-0 p-4 mb-4">

                        <h2>Reviews & Ratings</h2>

                        <h4 className="text-success">
                            Average Rating : {avgRating}
                        </h4>

                    </div>

                    {
                        myReviews.map(review => (

                            <div
                                className="card shadow-sm border-0 mb-3"
                                key={review.review_id}>
                                <div className="card-body">
                                    <h5>
                                        {"⭐".repeat(review.rating)}
                                    </h5>
                                    <p>
                                        {review.comment}
                                    </p>

                                </div>

                            </div>

                        ))
                    }

                </div>

            </div>

        </div>

    );
}

export default Reviews;