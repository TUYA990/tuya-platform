import { useCallback, useState } from 'react';
import { ApiClient } from './types';

export function useApi(apiClient: ApiClient) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async (method: string, url: string, data?: any) => {
      setLoading(true);
      setError(null);

      try {
        const response = await (apiClient.http as any)[method](url, data);
        return response.data;
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || err.message;
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiClient]
  );

  return { request, loading, error };
}
