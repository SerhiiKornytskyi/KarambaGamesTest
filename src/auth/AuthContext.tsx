import { createContext, useContext, useState, ReactNode} from 'react';
import { User, AuthContextValue } from '../types/types';

// create context with default value of null
export const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};


export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const saveLoginUserData = (user: User) => {
    console.log(' ++ Saving user data and token to localStorage');
    localStorage.setItem('token', user.token);
    setUser(user);
  };

  const removeLoginUserData = () => {
    console.log(' -- Removing user data and token from localStorage');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, saveLoginUserData, removeLoginUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

