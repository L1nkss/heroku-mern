import React, { useMemo, memo } from "react";
import { IClientReview } from "../../utils/adapters/reviews";
import Review from "./component/review";

interface IReviewListProps {
  reviews: IClientReview[] | undefined;
}

const ReviewList: React.FC<IReviewListProps> = ({ reviews = [] }: IReviewListProps) => {
  const createReview = useMemo(() => {
    return reviews.map((review: IClientReview) => {
      return <Review key={review.id} review={review} />;
    });
  }, [reviews]);
  return (
    <div className="review-list">
      {createReview}
    </div>
  );
};

export default memo(ReviewList);
