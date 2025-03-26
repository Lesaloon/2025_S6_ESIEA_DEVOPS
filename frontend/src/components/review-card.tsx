import { Star, ThumbsUp, Flag } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Button } from "./ui/button";
import { User } from "@/models/User";
import { useEffect, useState } from "react";
import UserService from "@/api/services/UserService";

interface ReviewCardProps {
  userId: number;
  rating: number;
  createdAt: string;
  comment: string;
}

export function ReviewCard({
  userId,
  rating,
  createdAt,
  comment,
}: ReviewCardProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    UserService.getUserById(userId).then(setUser);
  }
  , [userId]);

  return (
    <div className="border-b py-6">
      <div className="flex gap-4">
        <div>
          <h3 className="font-semibold">{user?.firstName} {user?.lastName}</h3>
          <p className="text-sm text-gray-500">
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
            {formatDate(createdAt)}
          </span>
        </div>

        <p className="mt-4 text-gray-700">{comment}</p>
      </div>
    </div>
  );
}