import { useCallback, useState } from 'react';
import { useAuth } from './useAuth';
import { apiConstants } from '../constants/constants';
import { ProfileResponse, Profile } from '../types/types';

const useFollowAuthor = (username?: string, initiallyFollowing = false) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [profile, setProfile] = useState<Profile | null>(
    username ? { username, bio: '', image: '', following: initiallyFollowing } : null
  );

  const toggleFollow = useCallback(async () => {
    if (!username || !user?.token) {
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiConstants.apiPath}/profiles/${username}/follow`, {
        method: profile?.following ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const result = await response.json() as ProfileResponse;
      setProfile(result.profile);
      return result.profile;
    } catch (err) {
      const nextError = new Error('Error: ' + (err as Error).message);
      setError(nextError);
      return null;
    } finally {
      setLoading(false);
    }
  }, [username, user?.token, profile?.following]);

  return { profile, toggleFollow, loading, error };
};

export default useFollowAuthor;
