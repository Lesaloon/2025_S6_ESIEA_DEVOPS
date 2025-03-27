import { useAuth } from "@/contexts/AuthContext";
import { ReviewCard } from "@/components/review-card";
import { BusinessCard } from "@/components/business-card";
import { useNotification } from "@/contexts/NotificationContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { businessService, reviewService } from "@/api";
import { Business } from "@/models/Business";
import { Review } from "@/models/Review";

export function ProfilePage() {
  const { user } = useAuth();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      addNotification("Vous devez être connecté pour voir cette page.", "error");
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all businesses first
        const allBusinesses = await businessService.getAllBusinesses();
        
        // For now, we'll assume a user can view all businesses
        // In a real app, you'd want to filter based on ownership
        setBusinesses(allBusinesses);
        
        // Fetch reviews by user ID
        if (user.id) {
          const userReviews = await reviewService.getReviewsByUser(user.id);
          setReviews(userReviews);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        addNotification("Erreur lors du chargement des données.", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user, addNotification, navigate]);

  if (!user) return null;
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <p>Chargement des données...</p>
      </div>
    );
  }

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
        {businesses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businesses.map(business => (
              <BusinessCard key={business.id} {...business} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Vous n'avez pas encore de commerces.</p>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Mes avis</h2>
        {reviews.length > 0 ? (
          <div className="space-y-8 mb-8">
            {reviews.map(review => (
              <div key={review.id} className="relative p-6 rounded-lg shadow-sm border hover:shadow-lg transition-shadow">
                <ReviewCard {...review} />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button 
                    className="text-blue-500 hover:underline"
                    onClick={() => navigate(`/review/edit/${review.id}`)}
                  >
                    Modifier
                  </button>
                  <button 
                    className="text-red-500 hover:underline"
                    onClick={async () => {
                      try {
                        await reviewService.deleteReview(review.id);
                        setReviews(reviews.filter(r => r.id !== review.id));
                        addNotification("Avis supprimé avec succès", "success");
                      } catch (error) {
                        addNotification("Erreur lors de la suppression de l'avis", "error");
                      }
                    }}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Vous n'avez pas encore publié d'avis.</p>
        )}
      </div>
    </div>
  );
}