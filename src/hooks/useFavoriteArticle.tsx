import { useCallback, useState } from 'react';
import { useAuth } from './useAuth';
import { apiConstants } from '../constants/constants';
import { SingleArticleResponse, Article } from '../types/types';

const useFavoriteArticle = (slug?: string, initiallyFavorited = false) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [article, setArticle] = useState<Article | null>(
    slug ? {
      slug,
      title: '',
      description: '',
      body: '',
      tagList: [],
      createdAt: '',
      updatedAt: '',
      favorited: initiallyFavorited,
      favoritesCount: 0,
      author: {
        username: '',
        bio: '',
        image: '',
        following: false,
      },
    } : null
  );

  const toggleFavorite = useCallback(async () => {
    if (!slug || !user?.token) {
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiConstants.apiPath}/articles/${slug}/favorite`, {
        method: article?.favorited ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const result = await response.json() as SingleArticleResponse;
      setArticle(result.article);
      return result.article;
    } catch (err) {
      const nextError = new Error('Error: ' + (err as Error).message);
      setError(nextError);
      return null;
    } finally {
      setLoading(false);
    }
  }, [slug, user?.token, article?.favorited]);

  return { article, toggleFavorite, loading, error };
};

export default useFavoriteArticle;
