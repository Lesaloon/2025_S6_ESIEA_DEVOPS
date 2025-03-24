export type Review = {
    id: string;
    businessName: string;
    rating: number;
    date: string;
    content: string;
    images?: string[];
    author: string;
    helpfulCount: number;
};
