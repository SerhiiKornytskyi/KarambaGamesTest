import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
    
    const { user, removeLoginUserData } = useAuth();

    const handleSignout = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        removeLoginUserData();
    };

    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <NavLink className="navbar-brand" to="/">
                    conduit
                </NavLink>
                <ul className="nav navbar-nav pull-xs-right">
                    <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" exact to="/">
                        Home
                    </NavLink>
                    </li>
                    {user ? (
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/editor">
                                    <i className="ion-compose" />New Article
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/settings">
                                    <i className="ion-gear-a" />Settings
                                </NavLink>
                            </li>
                        </>
                        ) : (null)
                    } 
                    <li className="nav-item">
                        {user ? (
                            <a href="#" className="nav-link" onClick={handleSignout}>
                                Sign out
                            </a>
                        ) : (
                            <NavLink className="nav-link" activeClassName="active" to="/login">
                                Sign in
                            </NavLink>
                        )}
                    </li>
                </ul>
            </div>
      </nav>
    )
}

export default Header