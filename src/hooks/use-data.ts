// hooks/use-data.ts
import { useState, useEffect, useCallback } from 'react';
import type { ApiResponse, UseDataConfig } from '../types';

export function useData<T>({ apiKey, endpoint, id, baseUrl }: UseDataConfig) {
  const [data, setData] = useState<T[]>([]);
  const [metadata, setMetadata] = useState<ApiResponse['metadata'] | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (!baseUrl) {
        throw new Error('baseUrl is required');
      }

      const finalEndpoint = id ? `${endpoint}/${id}` : endpoint;
      const url = `${baseUrl}${finalEndpoint}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `API Error: ${response.status}`);
      }

      // Handle both single item and list responses
      if (id) {
        setData([result]); // Single item wrapped in array
        setMetadata(null);
      } else {
        setData(result.data);
        setMetadata(result.metadata);
      }

      setError(undefined);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setData([]);
      setMetadata(null);
    } finally {
      setLoading(false);
    }
  }, [apiKey, endpoint, id, baseUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    items: data,
    metadata,
    error,
    loading,
    refetch: fetchData
  };
}
