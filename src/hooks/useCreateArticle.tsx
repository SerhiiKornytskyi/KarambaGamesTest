import { useState, useCallback } from 'react';
import { apiConstants } from '../constants/constants';
import { ArticlesResponse, CreateArticleRequestData } from '../types/types';
import { useAuth } from "../hooks/useAuth";

const UseCreateArticle = (articleFormData: CreateArticleRequestData, slug?: string)  => {
      const [data, setData] = useState(null as ArticlesResponse | null);
      const [error, setError] = useState(null as Error | null);
      const [loading, setLoading] = useState(false);

      const {user} = useAuth();

      const createArticle = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            if (!user || !user.token) return;

            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
                'Authorization': `Token ${user.token}`
            };

            const requestUrl = slug
              ? `${apiConstants.apiPath}/articles/${slug}`
              : `${apiConstants.apiPath}/articles`;

            const response = await fetch(requestUrl, {
                method: slug ? 'PUT' : 'POST',
                headers,
                body: JSON.stringify({
                    article: { ...articleFormData }
                }),
            });

            if (!response.ok) {
                throw new Error(`Request failed: ${response.status}`);
            }

            const result = await response.json();
            setData(result as ArticlesResponse);
            return result;
        } catch (err) {
            const error = new Error('Error: ' + (err as Error).message);
            setError(error);
            return null;
        } finally {
            setLoading(false);
        }
      }, [user?.token, articleFormData, slug]);

      return {createArticle, data, error, loading};
}

export default UseCreateArticle;