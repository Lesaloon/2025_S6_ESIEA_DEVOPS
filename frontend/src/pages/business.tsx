import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Star,
  MapPin,
  Phone,
  Globe,
  Clock
} from "lucide-react";
import { ReviewCard } from "@/components/review-card";
import { businessService, reviewService } from "@/api";
import { Business } from "@/models/Business";
import { Review } from "@/models/Review";

export function BusinessPage() {
  const { id } = useParams();
  const [business, setBusiness] = useState<Business | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusinessData = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        
        const businessId = parseInt(id, 10);
        
        const businessData = await businessService.getBusinessById(businessId);
        setBusiness(businessData);
        
        try {
          const reviewsResponse = await reviewService.getReviewsByBusiness(businessId);
          console.log("Avis récupérés:", reviewsResponse);
          
          if (Array.isArray(reviewsResponse)) {
            setReviews(reviewsResponse);
          } else if (reviewsResponse && typeof reviewsResponse === 'object') {
            if (Array.isArray(reviewsResponse.data)) {
              setReviews(reviewsResponse.data);
            } else if (Array.isArray(reviewsResponse.reviews)) {
              setReviews(reviewsResponse.reviews);
            } else {
              console.warn('Format de réponse des avis inattendu:', reviewsResponse);
              setReviews([]);
            }
          } else {
            setReviews([]);
          }
        } catch (reviewErr) {
          console.error("Erreur lors de la récupération des avis:", reviewErr);
          setReviews([]);
        }
        
        setError(null);
      } catch (err) {
        console.error("Erreur lors de la récupération des données:", err);
        setError("Impossible de charger les informations de ce commerce. Veuillez réessayer plus tard.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinessData();
  }, [id]);

  const averageRating =
  reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;
const roundedRating = Math.round(averageRating);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg max-w-lg text-center">
          <h2 className="text-xl font-bold mb-2">Erreur</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-600 px-6 py-4 rounded-lg max-w-lg text-center">
          <h2 className="text-xl font-bold mb-2">Commerce introuvable</h2>
          <p>Le commerce que vous recherchez n'existe pas ou a été supprimé.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-2" id="selenium-business-name">
                    {business.name}
                  </h1>
                  <div className="flex items-center gap-2 text-yellow-500 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < roundedRating ? "fill-current" : "fill-none"
                        }`}
                      />
                    ))}
                    <span className="text-gray-600">
                      {roundedRating} ({reviews.length} avis)
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">{business.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {business.features && business.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold mb-6">
                Avis ({(Array.isArray(reviews) ? reviews.length : 0)})
              </h2>
              {!Array.isArray(reviews) || reviews.length === 0 ? (
                <p className="text-center text-gray-500 py-4">Aucun avis pour le moment.</p>
              ) : (
                <div className="space-y-8">
                  {reviews.map((review) => (
                    <ReviewCard 
                      key={review.id} 
                      {...review} 
                      businessName={business.name}
                      date={review.createdAt}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-80">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium">Adresse</h3>
                    <p className="text-gray-600">{business.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium">Téléphone</h3>
                    <p className="text-gray-600">{business.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium">Site web</h3>
                    <a
                      href={business.website}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {business.website}
                    </a>
                  </div>
                </div>

                {business.hours && (
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium">Horaires</h3>
                      <div className="space-y-2 mt-2">
                        {business.hours.map((schedule) => (
                          <div key={schedule.day}>
                            <p className="text-sm font-medium">{schedule.day}</p>
                            <p className="text-sm text-gray-600">
                              {schedule.hours}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}