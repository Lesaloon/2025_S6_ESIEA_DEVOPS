import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Star, SlidersHorizontal } from "lucide-react";
import { BusinessCard } from "@/components/business-card";
import { Button } from "@/components/ui/button";
import { Business } from "@/models/Business";
import { businessService } from "@/api";

// Définir les options de filtrage adaptées à nos données réelles
const filtersData = [
  {
    key: "cuisine",
    name: "Catégorie",
    options: [
      "Restaurant",
      "Café",
      "Boulangerie",
      "Épicerie",
      "Coiffeur",
      "Boutique"
    ]
  },
  {
    key: "features",
    name: "Caractéristiques",
    options: [
      "Livraison",
      "Terrasse",
      "Parking",
      "Wi-Fi",
      "Climatisation",
      "Accessible PMR"
    ]
  }
];

export function SearchPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [results, setResults] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const [filters, setFilters] = useState({
    rating: 0,
    price: [] as string[],
    cuisine: [] as string[],
    features: [] as string[]
  });

  // Fetch businesses
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setIsLoading(true);
        const data = await businessService.getAllBusinesses();
        setBusinesses(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error("Erreur lors de la récupération des commerces:", err);
        setError("Impossible de charger les commerces. Veuillez réessayer plus tard.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  // Filter businesses when filters or search query changes
  useEffect(() => {
    if (businesses.length === 0) return;

    const params = new URLSearchParams(location.search);
    const term = params.get("term")?.toLowerCase() || "";
    const categoryParam = params.get("category")?.toLowerCase() || "";

    console.log("Filtrage avec:", { 
      term, 
      categoryParam, 
      filters,
      businessesCount: businesses.length
    });

    const filteredResults = businesses.filter((business: Business) => {
      // Vérifications préalables pour éviter les erreurs
      if (!business) return false;
      
      // Match by search term
      const matchesTerm =
        term === "" ||
        business.name?.toLowerCase().includes(term) ||
        business.description?.toLowerCase().includes(term) ||
        business.category?.toLowerCase().includes(term);

      // Match by category (if provided in URL)
      const matchesCategory =
        categoryParam === "" || 
        business.category?.toLowerCase() === categoryParam.toLowerCase();

      // Match by rating filter
      const matchesRating = 
        filters.rating === 0 || 
        (business.rating && business.rating >= filters.rating);

      // Match by features - check if business has at least one selected feature
      const matchesFeatures =
        filters.features.length === 0 ||
        (business.features && 
          filters.features.some(feature => 
            business.features.some(bf => 
              bf.toLowerCase().includes(feature.toLowerCase())
            )
          )
        );

      // Match by cuisine/category
      const matchesCuisine =
        filters.cuisine.length === 0 || 
        (business.category && 
          filters.cuisine.some(cuisine => 
            business.category.toLowerCase().includes(cuisine.toLowerCase())
          )
        );

      const shouldInclude = 
        matchesTerm &&
        matchesCategory &&
        matchesRating &&
        matchesFeatures &&
        matchesCuisine;

      // Pour débogage
      if (term || categoryParam || filters.rating > 0 || filters.features.length > 0 || filters.cuisine.length > 0) {
        console.log(`Business ${business.name} ${shouldInclude ? 'MATCH' : 'NO MATCH'}:`, {
          matchesTerm,
          matchesCategory,
          matchesRating,
          matchesFeatures,
          matchesCuisine
        });
      }

      return shouldInclude;
    });

    console.log(`Filtrage terminé: ${filteredResults.length} résultats sur ${businesses.length} commerces`);
    setResults(filteredResults);
  }, [filters, location.search, businesses]);

  // Amélioration du handler de filtre pour mieux gérer les types
  const handleFilterChange = (filterType: keyof typeof filters, value: any) => {
    console.log(`Changement de filtre: ${filterType}`, value);
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-80">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-700">Filtres</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setFilters({ rating: 0, price: [], cuisine: [], features: [] })
                  }
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Réinitialiser
                </Button>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4 text-gray-600">Note minimale</h3>
                  <div className="flex flex-wrap gap-2">
                    {[0, 1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleFilterChange('rating', rating)}
                        className={`flex items-center gap-1 p-2 rounded transition-colors duration-200 border ${
                          filters.rating === rating
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {rating === 0 ? (
                          <span className="text-sm">Tous</span>
                        ) : (
                          <>
                            <Star className="w-5 h-5" />
                            <span className="text-sm">{rating}+</span>
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                {filtersData.map((filter) => (
                  <div key={filter.key}>
                    <h3 className="font-medium mb-4 text-gray-600">{filter.name}</h3>
                    <div className="space-y-2">
                      {filter.options.map((option) => {
                        const filterKey = filter.key as keyof typeof filters;
                        const currentFilters = filters[filterKey] as string[];
                        const isChecked = currentFilters.includes(option);
                        
                        return (
                          <label key={option} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              className="rounded accent-blue-500"
                              checked={isChecked}
                              onChange={(e) => {
                                handleFilterChange(
                                  filterKey,
                                  e.target.checked
                                    ? [...currentFilters, option]
                                    : currentFilters.filter((item) => item !== option)
                                );
                              }}
                            />
                            <span className="text-sm text-gray-700">{option}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800" id="selenium-results-heading">
                Résultats pour "{new URLSearchParams(location.search).get("term") || 
                new URLSearchParams(location.search).get("category") || 
                "tous les commerces"}"
              </h1>
              
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mt-4">
                  {error}
                </div>
              ) : (
                <>
                  <p className="text-gray-500 mt-2">{results.length} résultat(s) trouvé(s)</p>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6" id="selenium-results">
                    {results.length > 0 ? (
                      results.map((business) => (
                        <BusinessCard key={business.id} {...business} />
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-10">
                        <p className="text-gray-500">Aucun résultat ne correspond à votre recherche.</p>
                        <p className="text-gray-500 mt-1">Essayez de modifier vos filtres ou votre recherche.</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}