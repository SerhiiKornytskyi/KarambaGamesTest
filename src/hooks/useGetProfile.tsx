import { useState, useEffect, useCallback } from 'react';
import { apiConstants } from '../constants/constants';
import { Profile, ProfileResponse } from '../types/types';
import { useAuth } from './useAuth';

const useGetProfile = (username?: string) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const getProfile = useCallback(async () => {
    if (!username) {
      setProfile(null);
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

      const response = await fetch(`${apiConstants.apiPath}/profiles/${username}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const result = await response.json() as ProfileResponse;
      setProfile(result.profile);
    } catch (err) {
      setError(new Error('Error: ' + (err as Error).message));
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, [username, user?.token]);

  useEffect(() => {
    void getProfile();
  }, [getProfile]);

  return { profile, loading, error, getProfile };
};

export default useGetProfile;
