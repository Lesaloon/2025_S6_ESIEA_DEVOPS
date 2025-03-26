import ReviewService from "@/api/services/ReviewService";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Review } from "@/models/Review";

interface BusinessCardProps {
  id: number;
  name: string;
  category: string;
  rating: number;
  address: string;
}

export function BusinessCard({
  id,
  name,
  category,
  address,
}: BusinessCardProps) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    ReviewService.getReviewsByBusiness(id).then(setReviews);
  }, [id]);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;
  const roundedRating = Math.round(averageRating);

  return (
    <Link to={`/business/${id}`} className="group">
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        <div className="p-4">
          <h3 className="font-semibold text-lg">{name}</h3>
          <div className="flex items-center gap-1 text-yellow-500 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < roundedRating ? "fill-current" : "fill-none"}`}
              />
            ))}
            <span className="text-gray-600 text-sm ml-2">
              ({reviews.length !== null ? reviews.length : "Chargement<..."} avis)
            </span>
          </div>
          <p className="text-gray-600 text-sm mt-1">{category}</p>
          <p className="text-gray-500 text-sm mt-2">{address}</p>
        </div>
      </div>
    </Link>
  );
}