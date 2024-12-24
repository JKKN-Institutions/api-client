export interface ApiResponse<T = any> {
  status: number;
  headers?: Record<string, string>;
  data: {
    data: T[];
    metadata: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface UseDataConfig {
  apiKey: string;
  endpoint: string;
  id?: string;
  baseUrl?: string;
}
