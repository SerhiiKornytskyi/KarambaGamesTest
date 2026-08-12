import {UserLoginRequest} from '../../types/types';
import { useState } from 'react';
import {useHistory} from 'react-router-dom';
import useLogin from '../../hooks/useLogin';
import { useAuth } from '../../hooks/useAuth';

export default function LoginRegister() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { logIn, error, data } = useLogin();
  const { saveLoginUserData } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userData: UserLoginRequest = {
      user: {
        email,
        password,
      },
    };

    try {
      const user = await logIn(userData);
      saveLoginUserData(user);
      setEmail('');
      setPassword('');
      history.push('/'); // Navigate to the home page after successful login
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Log In </h1>

              <form onSubmit={handleSubmit}>
                <fieldset className="form-group">
                  <input 
                    className="form-control form-control-lg" 
                    type="text" placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg" type="password" placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </fieldset>
                {/* Error output for login */}
                <fieldset className="form-group">
                  {!!error && <span className="text-danger">{error.message}</span>}
                </fieldset>
                <button type="submit" className="btn btn-lg btn-primary pull-xs-right" >
                  Log In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
