import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BusinessCard } from "@/components/business-card";
import { businessService } from "@/api";
import { Business } from "@/models/Business";

type Category = {
  name: string;
  count: number;
};

export function HomePage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setIsLoading(true);
        const response = await businessService.getAllBusinesses();
        
        // Vérification si response est un tableau ou un objet contenant un tableau
        let businessesData: Business[] = [];
        
        if (Array.isArray(response)) {
          businessesData = response;
        } else if (response && typeof response === 'object') {
          // Si la réponse est un objet, on cherche une propriété qui pourrait contenir le tableau de business
          const possibleArrayProperties = ['data', 'businesses', 'results', 'items'];
          
          for (const prop of possibleArrayProperties) {
            if (Array.isArray(response[prop])) {
              businessesData = response[prop];
              break;
            }
          }
        }
        
        console.log("Businesses récupérés:", businessesData);
        setBusinesses(businessesData);
        
        // Dériver les catégories des données business
        if (businessesData.length > 0) {
          const categoryMap = new Map<string, number>();
          
          businessesData.forEach(business => {
            if (business && business.category) {
              const category = business.category;
              categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
            }
          });
          
          const derivedCategories: Category[] = Array.from(categoryMap).map(([name, count]) => ({
            name,
            count
          }));
          
          setCategories(derivedCategories);
        }
        
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

  const handleSearch = () => {
    navigate(`/search?term=${searchTerm}`);
  };

  const handleKeyPress = (e: { key: string; }) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
              id="selenium-home-search"
              type="search"
              placeholder="Rechercher un commerce..."
              className="flex-1 border-0 focus-visible:ring-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
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

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">Commerces populaires</h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {error}
          </div>
        ) : businesses.length === 0 ? (
          <p className="text-center text-gray-500">Aucun commerce disponible pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="selenium-businesses">
            {businesses.map((business) => (
              <BusinessCard key={business.id} {...business} />
            ))}
          </div>
        )}
      </div>

      {categories.length > 0 && (
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold mb-8">Explorer par catégorie</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" id="selenium-categories">
            {categories.map((category) => (
              <div
                key={category.name}
                className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/search?category=${encodeURIComponent(category.name)}`)}
              >
                <h3 className="font-semibold">{category.name}</h3>
                <p className="text-gray-500 text-sm">{category.count} commerces</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}