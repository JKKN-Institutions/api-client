import type { UseDataConfig } from '../types';
export declare function useData<T>({ apiKey, endpoint, id, baseUrl }: UseDataConfig): {
    items: T[];
    metadata: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    } | null;
    error: string | undefined;
    loading: boolean;
    refetch: () => Promise<void>;
};
