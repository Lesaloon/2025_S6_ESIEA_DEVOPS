import { Business } from "@/models/Business";
import { Category } from "@/models/Category";
import { Review } from "@/models/Review";
import { User } from "@/models/User";
import { createContext, useContext } from "react";

const businesses: Business[] = [
{
    id: "1",
    name: "Le Petit Bistrot",
    category: "Restaurant",
    rating: 4.5,
    reviewCount: 128,
    address: "15 rue de la Paix, Paris",
    description: "A cozy bistro offering traditional French cuisine.",
    phone: "01 23 45 67 89",
    website: "http://lepetitbistrot.fr",
    hours: [
        { day: "Monday", hours: "10:00 - 22:00" },
        { day: "Tuesday", hours: "10:00 - 22:00" },
    ],
    features: ["Free Wi-Fi", "Outdoor Seating", "Pet Friendly"]
},
{
    id: "2",
    name: "Café des Artistes",
    category: "Café",
    rating: 4.8,
    reviewCount: 86,
    address: "42 avenue des Arts, Lyon",
    description: "A charming café with an artistic ambiance.",
    phone: "04 56 78 90 12",
    website: "http://cafedesartistes.fr",
    hours: [
        { day: "Monday", hours: "08:00 - 20:00" },
        { day: "Tuesday", hours: "08:00 - 20:00" },
    ],
    features: ["Live Music", "Art Exhibits", "Organic Coffee"]
},
{
    id: "3",
    name: "La Boulangerie Moderne",
    category: "Boulangerie",
    rating: 4.6,
    reviewCount: 234,
    address: "8 rue du Commerce, Marseille",
    description: "A modern bakery with a variety of fresh breads and pastries.",
    phone: "03 21 43 65 87",
    website: "http://laboulangeriemoderne.fr",
    hours: [
        { day: "Monday", hours: "07:00 - 19:00" },
        { day: "Tuesday", hours: "07:00 - 19:00" },
    ],
    features: ["Gluten-Free Options", "Vegan Pastries", "Custom Cakes"]
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
        author: "Jean Dupont",
        helpfulCount: 12
    },
    {
        id: "2",
        businessName: "Café des Artistes",
        rating: 5,
        date: "2024-01-20",
        content: "Superbe café, ambiance chaleureuse et service impeccable.",
        author: "Marie Curie",
        helpfulCount: 8
    }
];

const users: User[] = [
    {
        id: "1",
        email: "john.doe@mail.com",
        password: "password123",
        firstName: "John",
        lastName: "Doe",
        role: "user",
        businesses: [businesses[0]],
        reviews: [reviews[0]]
    },
    {
        id: "2",
        email: "jane.smith@mail.com",
        password: "password456",
        firstName: "Jane",
        lastName: "Smith",
        role: "user",
        businesses: [businesses[1]],
        reviews: [reviews[1]]
    },
    {
        id: "3",
        email: "admin.admin@mail.com",
        password: "password789",
        firstName: "Admin",
        lastName: "User",
        role: "admin",
        businesses: [],
        reviews: []
    }
];



const MockDataContext = createContext<{
    businesses: Business[];
    categories: Category[];
    reviews: Review[];
    users: User[];
}>({
    businesses,
    categories,
    reviews,
    users
});

export const useMockData = () => useContext(MockDataContext);

import { ReactNode } from "react";

export const MockDataProvider = ({ children }: { children: ReactNode }) => {
  return (
    <MockDataContext.Provider value={{ businesses, categories, reviews, users }}>
      {children}
    </MockDataContext.Provider>
  );
};
