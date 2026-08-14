import { useState, useEffect, useCallback } from 'react';
import { apiConstants } from '../constants/constants';
import { Article } from '../types/types';
import { useAuth } from "./useAuth";

const UseGetSingleArticle = (slug?: string) => {
      const [article, setArticle] = useState(null as Article | null);
      const [error, setError] = useState(null as Error | null);
      const [loading, setLoading] = useState(false);

      const {user} = useAuth();

      const getArticle = useCallback(async () => {
        if (!slug) {
          setArticle(null);
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

            const response = await fetch(`${apiConstants.apiPath}/articles/${slug}`, {
                method: 'GET',
                headers,
            });

            if (!response.ok) {
                throw new Error(`Request failed: ${response.status}`);
            }
            
            const result = await response.json();
            setArticle(result.article as Article);

        } catch (err) {
            setError(new Error('Error: ' + (err as Error).message));
            setArticle(null);
        } finally {
            setLoading(false);
        }
      }, [slug, user?.token]);

      useEffect(() => {
        getArticle();
      }, [getArticle]);

      return { getArticle, article, error, loading };
}

export default UseGetSingleArticle;