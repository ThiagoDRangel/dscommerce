import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/auth-service';
import { ContextToken } from '../../utils/context-token';
import { useContext } from 'react';

function LoggedUser() {

  const { contextTokenPayload, setContextTokenPayload } = useContext(ContextToken) ;
  const navigate = useNavigate();
  function handleLogoutCLick() {
    authService.logout();
    setContextTokenPayload(undefined);
    navigate('/catalog');
  }

  return (
    contextTokenPayload && authService.isAuthenticated()
      ? (
          <div className="dsc-logged-user">
            <p>{contextTokenPayload.user_name}</p>
            <span onClick={handleLogoutCLick}>Sair</span>
          </div>
        )
      : (
          <Link to="/login">
            Entrar
          </Link>
      )
  );
}

export default LoggedUser;
