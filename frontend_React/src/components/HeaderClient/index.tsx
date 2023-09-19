import cartIcon from '../../assets/cart.svg'
import { Link } from 'react-router-dom';
import './styles.css'

function HeaderClient() {

  return (
    <header className="dsc-header-client">
      <nav className="dsc-container">
        <Link to="/">
          <h1>DSCommerce</h1>
        </Link>
        <div className="dsc-navbar-right">
          <div className="dsc-menu-item">
            <Link to="/cart">
              <img src={cartIcon} alt="Shop cart" />
            </Link>
          </div>
        </div>
        <Link to="/login">
          Login
        </Link>
      </nav>
    </header>
  )
}

export default HeaderClient;
