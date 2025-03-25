import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSearch = () => {
    navigate(`/search?term=${searchTerm}`);
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold">
          Yelp-EA
          </Link>
          <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 flex-1 min-w-[300px]">
            <Search className="w-5 h-5 text-gray-500" />
            <Input
              type="search"
              placeholder="Rechercher un commerce..."
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/search" className="text-gray-700 hover:text-primary">
            Rechercher
          </Link>
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