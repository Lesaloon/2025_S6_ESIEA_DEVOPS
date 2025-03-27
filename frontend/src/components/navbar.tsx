import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const termFromUrl = params.get("term");
    
    if (termFromUrl) {
      setSearchTerm(termFromUrl);
    } else if (location.pathname !== "/search") {
      setSearchTerm("");
    }
  }, [location.pathname, location.search]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?term=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate(`/search?term=`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold" id="selenium-nav-logo">
            Yelp-EA
          </Link>
          <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 flex-1 min-w-[300px]">
            <Search className="w-5 h-5 text-gray-500" />
            <Input
              id="selenium-nav-input"
              type="search"
              placeholder="Rechercher un commerce..."
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {searchTerm && (
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setSearchTerm("")}
                aria-label="Effacer la recherche"
              >
                ×
              </button>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/profile" className="text-gray-700 hover:text-primary">
                Mon Profil
              </Link>
              <Button variant="outline" onClick={logout}>
                Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-primary">
                Connexion
              </Link>
              <Link to="/register" className="text-gray-700 hover:text-primary">
                Inscription
              </Link>
            </>
          )}
          <Button variant="ghost" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}