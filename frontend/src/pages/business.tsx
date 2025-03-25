import { useParams } from "react-router-dom";
import {
  Star,
  MapPin,
  Phone,
  Globe,
  Clock,
  Share2,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewCard } from "@/components/review-card";
import { useMockData } from "@/contexts/MockDataContext";

export function BusinessPage() {
  const { id } = useParams();
  const { businesses, reviews } = useMockData();
  const business = businesses.find(b => b.id === id);

  if (!business) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{business.name}</h1>
                  <div className="flex items-center gap-2 text-yellow-500 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < business.rating ? "fill-current" : "fill-none"
                        }`}
                      />
                    ))}
                    <span className="text-gray-600">
                      {business.rating} ({business.reviewCount} avis)
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">{business.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Partager
                  </Button>
                  <Button variant="outline">
                    <Heart className="w-4 h-4 mr-2" />
                    Sauvegarder
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {business.features.map((feature) => (
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

            {/* Avis */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold mb-6">
                Avis ({business.reviewCount})
              </h2>
              <div className="space-y-8">
                {reviews
                  .filter(review => review.businessName === business.name)
                  .map((review, index) => (
                    <ReviewCard key={index} {...review} />
                ))}
              </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}