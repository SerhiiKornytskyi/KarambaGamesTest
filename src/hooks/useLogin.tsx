import { useState } from 'react';
import {UserLoginRequest, UserLoginResponse} from '../types/types';
import { apiConstants } from '../constants/constants';

const useLogin = () => {
  const [data, setData] = useState(null as UserLoginResponse | null);
  const [error, setError] = useState(null as Error | null);
  const [loading, setLoading] = useState(false);

  const logIn = async (userData: UserLoginRequest) => {
    const { email, password } = userData.user;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiConstants.apiPath}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email,
            password,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Login failed: ${response.status}`);
      }

      const result = await response.json();

      // Assuming the API returns a UserLoginResponse object
      setData(result);
      return result;
    } catch (err) {
      const loginError = new Error('Error: ' + (err as Error).message);
      setError(loginError);
      throw loginError;
    } finally {
      setLoading(false);
    }
  };

  return {
    logIn,
    data,
    error,
    loading,
  };
};

export default useLogin;