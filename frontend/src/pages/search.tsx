import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Star, SlidersHorizontal } from "lucide-react";
import { BusinessCard } from "@/components/business-card";
import { Button } from "@/components/ui/button";
import { useMockData } from "@/contexts/MockDataContext";
import { Business } from "@/models/Business";

const filtersData = [
  { key: "price", name: "Prix", options: ["€", "€€", "€€€", "€€€€"] },
  {
    key: "cuisine",
    name: "Cuisine",
    options: [
      "Française",
      "Italienne",
      "Japonaise",
      "Chinoise",
      "Végétarienne"
    ]
  },
  {
    key: "features",
    name: "Caractéristiques",
    options: [
      "Terrasse",
      "Livraison",
      "À emporter",
      "Sans gluten",
      "Végétalien"
    ]
  }
];

export function SearchPage() {
  const { businesses } = useMockData();
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState({
    rating: 0,
    price: [],
    cuisine: [],
    features: []
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const term = params.get("term")?.toLowerCase() || "";
    const loc = params.get("location")?.toLowerCase() || "";

    const fetchResults = () => {
      const filteredResults = businesses.filter((business: Business) => {
        const matchesTerm =
          term === "" ||
          business.name.toLowerCase().includes(term) ||
          business.category.toLowerCase().includes(term);
        const matchesLocation =
          loc === "" || business.address.toLowerCase().includes(loc);
        const matchesRating = business.rating >= filters.rating;
        const matchesPrice =
          filters.price.length === 0 || filters.price.includes(business.price);
        const matchesCuisine =
          filters.cuisine.length === 0 || filters.cuisine.includes(business.category);
        const matchesFeatures =
          filters.features.length === 0 ||
          filters.features.every((feature) => business.features.includes(feature));

        return (
          matchesTerm &&
          matchesLocation &&
          matchesRating &&
          matchesPrice &&
          matchesCuisine &&
          matchesFeatures
        );
      });
      setResults(filteredResults);
    };

    fetchResults();
  }, [filters, location.search, businesses]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
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
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleFilterChange('rating', rating)}
                        className={`flex items-center gap-1 p-2 rounded transition-colors duration-200 border ${
                          filters.rating === rating
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        <Star className="w-5 h-5" />
                        <span className="text-sm">{rating}+</span>
                      </button>
                    ))}
                  </div>
                </div>
                {/* Autres filtres */}
                {filtersData.map((filter) => (
                  <div key={filter.key}>
                    <h3 className="font-medium mb-4 text-gray-600">{filter.name}</h3>
                    <div className="space-y-2">
                      {filter.options.map((option) => (
                        <label key={option} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="rounded accent-blue-500"
                            checked={filters[filter.key].includes(option)}
                            onChange={(e) =>
                              handleFilterChange(
                                filter.key,
                                e.target.checked
                                  ? [...filters[filter.key], option]
                                  : filters[filter.key].filter((item) => item !== option)
                              )
                            }
                          />
                          <span className="text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                Résultats pour "{new URLSearchParams(location.search).get("term") || "tous les commerces"}"
              </h1>
              <p className="text-gray-500 mt-2">{results.length} résultat(s) trouvé(s)</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {results.map((business) => (
                <BusinessCard key={business.id} {...business} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}