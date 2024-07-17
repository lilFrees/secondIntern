import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";

function StarRating({ rating }: { rating: number }) {
  const stars: any[] = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<IoIosStar key={i} className="text-yellow-400" />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<IoIosStarHalf key={i} className="text-yellow-400" />);
    } else {
      stars.push(<IoIosStarOutline key={i} className="text-yellow-400" />);
    }
  }

  return <div className="flex">{stars}</div>;
}

export default StarRating;
