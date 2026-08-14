import { useEffect, useState, useCallback } from 'react';
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../hooks/useAuth";

export const useCheckTokenValid = (token?: string | null) => {
  const { removeLoginUserData } = useAuth();
  const [isExpired, setIsExpired] = useState(false);

  const checkToken = useCallback(() => {
    if (!token) {
      setIsExpired(true);
      return true;
    }

    try {
      const decoded = jwtDecode<{ exp?: number }>(token);
      const expired = typeof decoded.exp !== 'number' || decoded.exp * 1000 < Date.now();
      setIsExpired(expired);

      if (expired) {
        removeLoginUserData();
      }

      return expired;
    } catch (e) {
      setIsExpired(true);
      removeLoginUserData();
      return true;
    }
  }, [token, removeLoginUserData]);

  useEffect(() => {
    checkToken();
    const interval = setInterval(checkToken, 30000);

    return () => clearInterval(interval);
  }, [checkToken]);

  return { isExpired, checkToken };
};