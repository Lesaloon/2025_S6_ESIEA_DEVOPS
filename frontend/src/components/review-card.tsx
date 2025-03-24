import { Star, ThumbsUp, Flag } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Button } from "./ui/button";

interface ReviewCardProps {
  author: string; // Changed to string
  rating: number;
  date: string;
  content: string;
  helpfulCount: number;
  images?: string[];
}

export function ReviewCard({
  author,
  rating,
  date,
  content,
  helpfulCount,
  images,
}: ReviewCardProps) {
  return (
    <div className="border-b py-6">
      <div className="flex gap-4">
        <img
          src={`https://api.adorable.io/avatars/50/${author}.png`}
          alt={author}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="font-semibold">{author}</h3>
          <p className="text-sm text-gray-500">
            {/* Assuming reviewCount is not available in the new type */}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-1 text-yellow-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < rating ? "fill-current" : "fill-none"}`}
            />
          ))}
          <span className="text-gray-500 text-sm ml-2">
            {formatDate(date)}
          </span>
        </div>

        <p className="mt-4 text-gray-700">{content}</p>

        {images && images.length > 0 && (
          <div className="mt-4 flex gap-2 overflow-x-auto">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Photo ${index + 1}`}
                className="w-32 h-32 object-cover rounded-lg"
              />
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center gap-4">
          <Button variant="outline" size="sm">
            <ThumbsUp className="w-4 h-4 mr-2" />
            Utile ({helpfulCount})
          </Button>
          <Button variant="ghost" size="sm">
            <Flag className="w-4 h-4 mr-2" />
            Signaler
          </Button>
        </div>
      </div>
    </div>
  );
}