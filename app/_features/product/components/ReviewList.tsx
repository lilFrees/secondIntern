import { IProduct } from "@/app/_features/product/interfaces/IProduct";
import ReviewItem from "./ReviewItem";

function ReviewList({ reviewList }: { reviewList: IProduct["reviews"] }) {
  return (
    <div className="flex flex-col gap-5">
      {reviewList.map((rev, i) => (
        <ReviewItem review={rev} key={i} />
      ))}
    </div>
  );
}

export default ReviewList;
