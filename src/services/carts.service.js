import { cartsDao } from "../dao/index.js";

export class CartsService {
  static getCarts() {
    return cartsDao.getCarts();
  }

  static getCartById(cartId) {
    return cartsDao.getCartById(cartId);
  }

  static createCart() {
    return cartsDao.createCart();
  }

  static addProductToCart(cartId, productId, quantity) {
    return cartsDao.addProductToCart(cartId, productId, quantity);
  }

  static updateProductsInCart(cartId, newProducts) {
    return cartsDao.updateProductsInCart(cartId, newProducts);
  }

  static updateProductQuantityInCart(cartId, productId, newQuantity) {
    return cartsDao.updateProductQuantityInCart(cartId, productId, newQuantity);
  }

  static deleteAllProductsInCart(cartId, newCart) {
    return cartsDao.deleteAllProductsInCart(cartId, newCart);
  }

  static deleteProductInCart(cartId, productId) {
    return cartsDao.deleteProductInCart(cartId, productId);
  }

  static deleteCart(cartId) {
    return cartsDao.deleteCart(cartId);
  }
}
