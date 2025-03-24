import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Star, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';

const userReviews = [
  {
    id: '1',
    businessName: 'Le Petit Bistrot',
    rating: 4,
    date: '2024-02-15',
    content: 'Une excellente expérience ! La cuisine est délicieuse.',
    images: ['https://images.unsplash.com/photo-1504674900247-0877df9cc836'],
  },
  {
    id: '2',
    businessName: 'Café des Artistes',
    rating: 5,
    date: '2024-01-20',
    content: 'Superbe café, ambiance chaleureuse et service impeccable.',
  },
];

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-gray-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
                <div className="mt-4 space-x-4">
                  <Button variant="outline" onClick={() => navigate('/settings')}>
                    Modifier le profil
                  </Button>
                  <Button variant="outline" onClick={logout}>
                    Déconnexion
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-bold mb-6">Mes avis</h2>
            <div className="space-y-8">
              {userReviews.map((review) => (
                <div key={review.id} className="border-b pb-6 last:border-0">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{review.businessName}</h3>
                      <div className="flex items-center gap-1 text-yellow-500 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'fill-current' : 'fill-none'
                            }`}
                          />
                        ))}
                        <span className="text-gray-500 text-sm ml-2">
                          {new Date(review.date).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{review.content}</p>

                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto">
                      {review.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Photo ${index + 1}`}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}