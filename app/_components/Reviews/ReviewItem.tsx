import { IProduct } from "@/app/_interfaces/IProduct";
import StarRating from "../UI/StarRating";

function ReviewItem({ review }: { review: IProduct["reviews"][number] }) {
  const date = new Date(review.date);
  return (
    <div className="flex flex-col gap-2">
      <div className="font-semibold">{review.reviewerName}</div>
      <div className="flex gap-3 text-sm">
        <StarRating rating={review.rating} />
        {date.toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        })}
      </div>
      <div className="font-light">{review.comment}</div>
    </div>
  );
}

export default ReviewItem;
