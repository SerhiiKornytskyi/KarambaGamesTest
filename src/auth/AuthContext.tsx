import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, AuthContextValue } from '../types/types';

// create context with default value of null
export const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};


export const AuthProvider = ({ children }: AuthProviderProps) => {
  
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = sessionStorage.getItem('user');
      return raw ? (JSON.parse(raw) as User) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    // keep token in sync
    if (user && user.token) {
      sessionStorage.setItem('token', user.token);
    }
  }, [user]);

  const saveLoginUserData = (user: User) => {
    console.log(' ++ Saving user data and token to sessionStorage', user);
    // TODO: As for this project's purpose I think it's enough to use sessionstorage as user data storage
    try {
      sessionStorage.setItem('token', user.token);
      sessionStorage.setItem('user', JSON.stringify(user));
    } catch (e) {
      console.warn('Failed to persist user to sessionStorage', e);
    }
    setUser(user);
  };

  const removeLoginUserData = () => {
    console.log(' -- Removing user data and token from sessionStorage');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, saveLoginUserData, removeLoginUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

