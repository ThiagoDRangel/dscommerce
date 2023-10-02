import { Link } from 'react-router-dom';
import './styles.css'
import CartIcon from '../CartIcon';
import adminIcon from '../../assets/admin.svg';
import * as authService from '../../services/auth-service';
import { useContext } from 'react';
import { ContextToken } from '../../utils/context-token';
import LoggedUser from '../LoggedUser';

function HeaderClient() {

  const { contextTokenPayload } = useContext(ContextToken);

  return (
    <header className="dsc-header-client">
      <nav className="dsc-container">
        <Link to="/">
          <h1>DEV Commerce</h1>
        </Link>
        <div className="dsc-navbar-right">
          <div className="dsc-menu-items-container">
          {
            contextTokenPayload &&
            authService.hasAnyRoles(['ROLE_ADMIN']) &&
            <Link to="/admin">
              <div className="dsc-menu-item">
                <img src={adminIcon} alt="Admin" />
              </div>
            </Link>
          }
            <div className="dsc-menu-item">
              <CartIcon />
            </div>
          </div>
          <LoggedUser />
        </div>
      </nav>
    </header>
  )
}

export default HeaderClient;
