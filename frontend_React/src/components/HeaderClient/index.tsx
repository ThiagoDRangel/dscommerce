import cartIcon from '../../assets/cart.svg'
import '../../styles/cart.css'

function HeaderClient() {

  return (
    <header className="dsc-header-client">
      <nav className="dsc-container">
        <h1>DSCommerce</h1>
        <div className="dsc-navbar-right">
          <div className="dsc-menu-item">
            <img src={cartIcon} alt="Shop cart" />
          </div>
        </div>
        <a href="#">Login</a>
      </nav>
    </header>
  )
}

export default HeaderClient;
