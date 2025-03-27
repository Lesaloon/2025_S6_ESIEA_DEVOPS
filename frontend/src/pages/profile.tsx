import { useAuth } from "@/contexts/AuthContext";
import { ReviewCard } from "@/components/review-card";
import { BusinessCard } from "@/components/business-card";
import { useNotification } from "@/contexts/NotificationContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ProfilePage() {
  const { user } = useAuth();
  const { businesses, reviews } = [];
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      addNotification("Vous devez être connecté pour voir cette page.", "error");
      navigate("/login");
    }
  }, [user]);

  if (!user) return null;
  

  const userBusinesses = businesses.filter(business => user.businesses.includes(business));
  const userReviews = reviews.filter(review => user.reviews.includes(review));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">{`${user.firstName} ${user.lastName}`}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Mes commerces</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userBusinesses.map(business => (
            <BusinessCard key={business.id} {...business} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Mes avis</h2>
        <div className="space-y-8 mb-8 p-6 rounded-lg shadow-sm border hover:shadow-lg transition-shadow">
          {userReviews.map(review => (
            <div key={review.id} className="relative">
              <ReviewCard {...review} />
              <div className="absolute top-2 right-2 flex space-x-2">
          <button className="text-blue-500 hover:underline">Modifier</button>
          <button className="text-red-500 hover:underline">Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 