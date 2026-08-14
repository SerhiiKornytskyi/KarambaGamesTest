import { useState, useEffect, useCallback } from 'react';
import { apiConstants } from '../constants/constants';
import { ArticlesResponse, UseGetArticleData} from '../types/types';
import { useAuth } from "../hooks/useAuth";



const UseGetArticles = (isGlobalFeed = true ) : UseGetArticleData  => {
      const [data, setData] = useState(null as ArticlesResponse | null);
      const [error, setError] = useState(null as Error | null);
      const [loading, setLoading] = useState(false);

      const {user} = useAuth();

      const getArticlesFeed = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            // If there's no authenticated user, always use global feed
            const personalFeedPredicate = (!user || !user.token) ? "" : (isGlobalFeed ? "" : "/feed");

            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
            };
            
            if (user && user.token) {
                headers.Authorization = `Token ${user.token}`;
            }

            const response = await fetch(`${apiConstants.apiPath}/articles${personalFeedPredicate}`, {
                method: 'GET',
                headers,
            });

            if (!response.ok) {
                throw new Error(`Request failed: ${response.status}`);
            }
            
            const result = await response.json();
            setData(result as ArticlesResponse);

        } catch (err) {
            const error = new Error('Error: ' + (err as Error).message);
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
      }, [isGlobalFeed, user?.token]);

      // Automatically fetch on mount and whenever the feed selection or auth token changes
      useEffect(() => {
        getArticlesFeed();
      }, [getArticlesFeed]);

      
      return {getArticlesFeed, data, error, loading};
}

export default UseGetArticles;