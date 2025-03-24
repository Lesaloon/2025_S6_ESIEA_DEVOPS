import { createContext, useContext } from "react";

// Define types for the data
type Business = {
    id: string;
    name: string;
    category: string;
    rating: number;
    reviewCount: number;
    images: string[]; // Changed to array
    address: string;
    description: string;
    phone: string;
    website: string;
    hours: { day: string; hours: string }[];
    features: string[]; // Added property
};

type Category = {
    name: string;
    count: number;
};

type Review = {
    id: string;
    businessName: string;
    rating: number;
    date: string;
    content: string;
    images?: string[];
    author: string; // Added property
    helpfulCount: number; // Added property
};

const businesses: Business[] = [
{
    id: "1",
    name: "Le Petit Bistrot",
    category: "Restaurant",
    rating: 4.5,
    reviewCount: 128,
    images: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
        "https://images.unsplash.com/photo-1533777324565-a040eb52fac1"
    ],
    address: "15 rue de la Paix, Paris",
    description: "A cozy bistro offering traditional French cuisine.",
    phone: "01 23 45 67 89",
    website: "http://lepetitbistrot.fr",
    hours: [
        { day: "Monday", hours: "10:00 - 22:00" },
        { day: "Tuesday", hours: "10:00 - 22:00" },
        // ...other days
    ],
    features: ["Free Wi-Fi", "Outdoor Seating", "Pet Friendly"] // Added property
},
{
    id: "2",
    name: "Café des Artistes",
    category: "Café",
    rating: 4.8,
    reviewCount: 86,
    images: [
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24",
        "https://images.unsplash.com/photo-1543332164-6e8c1e6f7c8b",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
    ],
    address: "42 avenue des Arts, Lyon",
    description: "A charming café with an artistic ambiance.",
    phone: "04 56 78 90 12",
    website: "http://cafedesartistes.fr",
    hours: [
        { day: "Monday", hours: "08:00 - 20:00" },
        { day: "Tuesday", hours: "08:00 - 20:00" },
        // ...other days
    ],
    features: ["Live Music", "Art Exhibits", "Organic Coffee"] // Added property
},
{
    id: "3",
    name: "La Boulangerie Moderne",
    category: "Boulangerie",
    rating: 4.6,
    reviewCount: 234,
    images: [
        "https://images.unsplash.com/photo-1509440159596-0249088772ff",
        "https://images.unsplash.com/photo-1533777324565-a040eb52fac1",
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
    ],
    address: "8 rue du Commerce, Marseille",
    description: "A modern bakery with a variety of fresh breads and pastries.",
    phone: "03 21 43 65 87",
    website: "http://laboulangeriemoderne.fr",
    hours: [
        { day: "Monday", hours: "07:00 - 19:00" },
        { day: "Tuesday", hours: "07:00 - 19:00" },
        // ...other days
    ],
    features: ["Gluten-Free Options", "Vegan Pastries", "Custom Cakes"] // Added property
}
];

const categories: Category[] = [
    { name: "Restaurants", count: 1250 },
    { name: "Cafés", count: 850 },
    { name: "Boulangeries", count: 420 },
    { name: "Coiffeurs", count: 380 },
    { name: "Bars", count: 650 },
    { name: "Boutiques", count: 920 }
];

const reviews: Review[] = [
    {
        id: "1",
        businessName: "Le Petit Bistrot",
        rating: 4,
        date: "2024-02-15",
        content: "Une excellente expérience ! La cuisine est délicieuse.",
        images: ["https://images.unsplash.com/photo-1504674900247-0877df9cc836"],
        author: "Jean Dupont", // Added property
        helpfulCount: 12 // Added property
    },
    {
        id: "2",
        businessName: "Café des Artistes",
        rating: 5,
        date: "2024-01-20",
        content: "Superbe café, ambiance chaleureuse et service impeccable.",
        author: "Marie Curie", // Added property
        helpfulCount: 8 // Added property
    }
];


const MockDataContext = createContext<{
    businesses: Business[];
    categories: Category[];
    reviews: Review[];
}>({
    businesses,
    categories,
    reviews
});

export const useMockData = () => useContext(MockDataContext);

import { ReactNode } from "react";

export const MockDataProvider = ({ children }: { children: ReactNode }) => {
  return (
    <MockDataContext.Provider value={{ businesses, categories, reviews }}>
      {children}
    </MockDataContext.Provider>
  );
};
