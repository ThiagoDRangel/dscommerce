import { OrderDTO, OrderItemDTO } from "../models/order";
import { CART_KEY } from "../utils/system";

export function save(cart: OrderDTO) {
  const stringKey = JSON.stringify(cart);
  localStorage.setItem(CART_KEY, stringKey);
}

export function get() : OrderDTO {
  const recoverKey = localStorage.getItem(CART_KEY) || '{"items":[]}';
  const parseKey = JSON.parse(recoverKey) as OrderDTO;

  const cart = new OrderDTO();
  parseKey.items.forEach(x => {
    cart.items.push(new OrderItemDTO(x.productId, x.quantity, x.name, x.price, x.imgUrl))
  });

  return cart;
}

export function clear() {
  localStorage.setItem(CART_KEY, '{"items":[]}');
}
