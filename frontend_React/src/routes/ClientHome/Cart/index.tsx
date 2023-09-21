import { useState } from 'react';
import * as cartService from '../../../services/cart-service';
import './styles.css';
import { OrderDTO } from '../../../models/order';

function Cart() {
  const [cart, setCart] = useState<OrderDTO>(cartService.getCart());

  return (
    <main>
      <section id="cart-container-section" className="dsc=container">
        {cart.items.length === 0 ? (
          <div>
            <h2>Seu carrinho está vazio</h2>
          </div>
        ) : (
          <div className="dsc-card dsc-mb20">
            {cart.items.map(({ price, productId, name, imgUrl, quantity }) => (
              <div key={productId} className="dsc-cart-item-container dsc-line-bot">
                <div className="dsc-cart-item-left">
                  <img src={imgUrl} alt={name} />
                  <div className="dsc-cart-item-description">
                    <h3>{name}</h3>
                    <div className="dsc-cart-item-quantity-container">
                      <div className="dsc-cart-item-quantity-btn">-</div>
                      <p>{quantity}</p>
                      <div className="dsc-cart-item-quanitty-btn">+</div>
                    </div>
                  </div>
                </div>
                <div className="dsc-cart-item-right">
                  R$ {(price * quantity).toFixed(2)}
                </div>
              </div>
            ))}
            <div className="dsc-cart-total-container">
              <h3>R$ 15000,00</h3>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Cart;
