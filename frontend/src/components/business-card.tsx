import { Star } from "lucide-react";
import { Link } from "react-router-dom";

interface BusinessCardProps {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  images: string[]; // Changed to array
  address: string;
}

export function BusinessCard({
  id,
  name,
  category,
  rating,
  reviewCount,
  images,
  address,
}: BusinessCardProps) {
  return (
    <Link to={`/business/${id}`} className="group">
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={images[0]} // Use the first image
            alt={name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
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