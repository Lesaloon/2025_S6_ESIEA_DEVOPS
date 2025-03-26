export type Review = {
    id: number;
    rating: number;
    comment: string;
    businessId: number;
    userId: number;
    businessName?: string;
    author?: string;
    date?: string;
    helpfulCount?: number;
    createdAt?: string;
    updatedAt?: string;
};
