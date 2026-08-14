import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Logout() {
  const history = useHistory();
  const { removeLoginUserData } = useAuth();

  useEffect(() => {
    removeLoginUserData();
    history.replace('/');
  }, [history, removeLoginUserData]);

  return null;
}
