import './styles.css'
import homeIcon from '../../assets/home.svg';
import boxIcon from '../../assets/box.svg';
import LoggedUser from '../LoggedUser';
import { NavLink } from 'react-router-dom';

function HeaderAdmin() {

  return (
    <header className="dsc-header-admin">
      <nav className="dsc-container">
        <h1>DEV Commerce Admin</h1>
        <div className="dsc-navbar-right">
          <div className="dsc-menu-items-container">
            <NavLink
              to="/admin/home"
              className={({isActive}) => isActive ? 'dsc-menu-item-active' : ''}  
            >
              <div className="dsc-menu-item">
                <img src={homeIcon} alt="Início" />
                <p>Início</p>
              </div>
            </NavLink>
            <NavLink
              to="/admin/products"
              className={({isActive}) => isActive ? 'dsc-menu-item-active' : ''}
            >
              <div className="dsc-menu-item">
                <img src={boxIcon} alt="Cadastro de produtos" />
                <p>Produtos</p>
              </div>
            </NavLink>
          </div>
          <LoggedUser />
        </div>
      </nav>
    </header>
  )
}

export default HeaderAdmin;
