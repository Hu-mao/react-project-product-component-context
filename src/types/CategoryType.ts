export type CategoryType = {
    id: number;
    name: string;
    slug: string;
    url: string | null;
    isActive: boolean;
    parentId: number | null;
    products?: number[];
};