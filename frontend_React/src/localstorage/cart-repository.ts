import { OrderDTO } from "../models/order";
import { CART_KEY } from "../utils/system";

export function save(cart: OrderDTO) {
  const stringKey = JSON.stringify(cart);
  localStorage.setItem(CART_KEY, stringKey);
}

export function get() : OrderDTO {
  const recoverKey = localStorage.getItem(CART_KEY) || '{"items":[]}';
  return JSON.parse(recoverKey);
}