import {
  Route,
  Redirect,
  RouteProps,
} from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

const PrivateRoute = ({children, ...rest}: RouteProps) => {
    const {user} = useAuth();

    return (
        <Route {...rest}>
            {user ? children : <Redirect to="/login" />}
        </Route>
    );
}

export default PrivateRoute;
