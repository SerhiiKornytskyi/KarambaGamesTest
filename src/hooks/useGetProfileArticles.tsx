import { useState, useEffect, useCallback } from 'react';
import { apiConstants } from '../constants/constants';
import { Article, ArticlesResponse } from '../types/types';
import { useAuth } from './useAuth';

const useGetProfileArticles = (username?: string) => {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const getProfileArticles = useCallback(async () => {
    if (!username) {
      setArticles([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (user && user.token) {
        headers.Authorization = `Token ${user.token}`;
      }

      const response = await fetch(`${apiConstants.apiPath}/articles?author=${encodeURIComponent(username)}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const result = await response.json() as ArticlesResponse;
      setArticles(result.articles ?? []);
    } catch (err) {
      setError(new Error('Error: ' + (err as Error).message));
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [username, user?.token]);

  useEffect(() => {
    void getProfileArticles();
  }, [getProfileArticles]);

  return { articles, loading, error, getProfileArticles };
};

export default useGetProfileArticles;
