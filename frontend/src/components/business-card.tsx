import { Star } from "lucide-react";
import { Link } from "react-router-dom";

interface BusinessCardProps {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  address: string;
}

export function BusinessCard({
  id,
  name,
  category,
  rating,
  reviewCount,
  address,
}: BusinessCardProps) {
  return (
    <Link to={`/business/${id}`} className="group">
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        <div className="p-4">
          <h3 className="font-semibold text-lg">{name}</h3>
          <div className="flex items-center gap-1 text-yellow-500 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? "fill-current" : "fill-none"}`}
              />
            ))}
            <span className="text-gray-600 text-sm ml-2">
              ({reviewCount} avis)
            </span>
          </div>
          <p className="text-gray-600 text-sm mt-1">{category}</p>
          <p className="text-gray-500 text-sm mt-2">{address}</p>
        </div>
      </div>
    </Link>
  );
}