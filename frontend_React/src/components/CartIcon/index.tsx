import cartIcon from '../../assets/cart.svg';
import './styles.css';

function CartIcon() {
  return (
    <>
      <img src={cartIcon} alt="Carrinho de compras" />
      <div className="dsc-cart-count">2</div>
    </>
  );
}

export default CartIcon;
