import { useState, useEffect } from 'react';
import type { ApiResponse, UseDataConfig } from '../types';

export function useData<T>({ apiKey, endpoint, id, baseUrl }: UseDataConfig) {
  const [result, setResult] = useState<ApiResponse<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchData = async () => {
    setLoading(true);
    try {
      const API_URL = baseUrl;
      if (!API_URL) {
        throw new Error('baseUrl is required');
      }

      const finalEndpoint = id ? `${endpoint}/${id}` : endpoint;
      const url = `${API_URL}${finalEndpoint}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      const rawResult = await response.json();

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      setResult(rawResult);
      setError(undefined);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiKey, endpoint, id, baseUrl]);

  return {
    items: result?.data?.data || [],
    metadata: result?.data?.metadata,
    error,
    loading,
    refetch: fetchData
  };
}
