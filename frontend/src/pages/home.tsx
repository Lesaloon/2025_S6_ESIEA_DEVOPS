import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BusinessCard } from "@/components/business-card";
import { useMockData } from "@/contexts/MockDataContext";

export function HomePage() {
  const { businesses, categories } = useMockData();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search?term=${searchTerm}&location=${location}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">
            Découvrez les meilleurs commerces locaux
          </h1>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Trouvez les meilleures adresses près de chez vous grâce aux avis de notre communauté
          </p>
          <div className="max-w-2xl mx-auto flex gap-4 bg-white rounded-full shadow-lg p-2">
            <Input
              type="search"
              placeholder="Rechercher un commerce..."
              className="flex-1 border-0 focus-visible:ring-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Où ? (ville, quartier...)"
              className="flex-1 border-0 focus-visible:ring-0"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button
              className="bg-primary text-white rounded-full px-8 py-2 hover:bg-primary/90"
              onClick={handleSearch}
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Popular Businesses */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">Commerces populaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businesses.map((business) => (
            <BusinessCard key={business.id} {...business} images={business.images} />
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">Explorer par catégorie</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow cursor-pointer"
            >
              <h3 className="font-semibold">{category.name}</h3>
              <p className="text-gray-500 text-sm">{category.count} commerces</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}