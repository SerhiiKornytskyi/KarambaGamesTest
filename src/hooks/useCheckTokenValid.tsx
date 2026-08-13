import { useEffect, useState, useCallback } from 'react';
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../hooks/useAuth";

export const useCheckTokenValid = (token?: string | null) => {
  console.log('useCheckTokenValid called with token:', token);

  

  const { removeLoginUserData, saveLoginUserData } = useAuth();
  const [isExpired, setIsExpired] = useState(false);

  const checkToken = useCallback(() => {
    
    if (!token) {
      setIsExpired(true);
      return true;
    }

    try {
      const decoded = jwtDecode<{ exp?: number }>(token);
      const expired = typeof decoded.exp !== 'number' || decoded.exp * 1000 < Date.now();
      console.log('Token expired:', decoded, expired, sessionStorage);
      setIsExpired(expired);
      
      expired && removeLoginUserData();
      
      return expired;
    } catch (e) {
      setIsExpired(true);
      removeLoginUserData();
      return true;
    }
    }, [token, removeLoginUserData]);

    // Check on mount AND before every 5 minutes
    useEffect(() => {
      checkToken(); // Check immediately
      const interval = setInterval(checkToken, 3000);
      return () => clearInterval(interval);
    }, [checkToken]);

    return { isExpired, checkToken };
};