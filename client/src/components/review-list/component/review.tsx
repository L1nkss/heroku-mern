import React from "react";
import moment from "moment";
import ShowMoreText from "react-show-more-text";
import { IClientReview } from "../../../utils/adapters/reviews";

interface IReviewProps {
  review: IClientReview
}

const Review: React.FC<IReviewProps> = ({ review }: IReviewProps) => {
  return (
    <article className="review-list__item review" key={review.id}>
      <header>
        <h3>{review.author}</h3>
        <p>{moment(review.create).format("MMMM D, YYYY")}</p>
      </header>
      <ShowMoreText lines={3} more="Show more" less="Show less">
        {review.content}
      </ShowMoreText>
    </article>
  );
};

export default Review;
