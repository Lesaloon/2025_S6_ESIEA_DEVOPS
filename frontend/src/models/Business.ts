export type Business = {
    id: string;
    name: string;
    category: string;
    rating: number;
    reviewCount: number;
    address: string;
    description: string;
    phone: string;
    website: string;
    hours: { day: string; hours: string }[];
    features: string[];
};
