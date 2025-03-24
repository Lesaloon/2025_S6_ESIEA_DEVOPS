import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Sliders as Slider, Star, SlidersHorizontal } from "lucide-react";
import { BusinessCard } from "@/components/business-card";
import { Button } from "@/components/ui/button";
import { useMockData } from "@/contexts/MockDataContext";

const filtersData = [
  { name: "Prix", options: ["€", "€€", "€€€", "€€€€"] },
  {
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
      // Simulate fetching data with filters
      const filteredResults = businesses.filter((business) => {
        const matchesTerm = term === "" || business.name.toLowerCase().includes(term) || business.category.toLowerCase().includes(term);
        const matchesLocation = loc === "" || business.address.toLowerCase().includes(loc);
        const matchesRating = business.rating >= filters.rating;
        const matchesPrice = filters.price.length === 0 || filters.price.includes(business.price);
        const matchesCuisine = filters.cuisine.length === 0 || filters.cuisine.includes(business.category);
        const matchesFeatures = filters.features.length === 0 || filters.features.every((feature) => business.features.includes(feature));

        return matchesTerm && matchesLocation && matchesRating && matchesPrice && matchesCuisine && matchesFeatures;
      });
      setResults(filteredResults);
    };

    fetchResults();
  }, [filters, location.search]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filtres */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Filtres</h2>
              <Button variant="ghost" size="sm" onClick={() => setFilters({ rating: 0, price: [], cuisine: [], features: [] })}>
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Réinitialiser
              </Button>
            </div>

            <div className="space-y-6">
              {/* Note minimale */}
              <div>
                <h3 className="font-medium mb-4">Note minimale</h3>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      className="flex items-center gap-1 p-2 rounded hover:bg-gray-100"
                      onClick={() => handleFilterChange('rating', rating)}
                    >
                      <Star
                        className="w-5 h-5 text-yellow-500 fill-current"
                      />
                      <span className="text-sm">{rating}+</span>
                    </button>
                  ))}
                </div>
              </div>

              {filtersData.map((filter) => (
                <div key={filter.name}>
                  <h3 className="font-medium mb-4">{filter.name}</h3>
                  <div className="space-y-2">
                    {filter.options.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="rounded"
                          onChange={(e) => handleFilterChange(filter.name.toLowerCase(), e.target.checked ? [...filters[filter.name.toLowerCase()], option] : filters[filter.name.toLowerCase()].filter((item) => item !== option))}
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Résultats */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              Résultats pour "{new URLSearchParams(location.search).get("term") || "tous les commerces"}"
            </h1>
            <select className="border rounded-md px-3 py-2">
              <option>Les plus pertinents</option>
              <option>Note la plus élevée</option>
              <option>Les plus commentés</option>
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {results.map((business) => (
              <BusinessCard key={business.id} {...business} images={business.images} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}