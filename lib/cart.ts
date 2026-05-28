import { shopifyFetch } from "./shopify";
import { CREATE_CART, ADD_TO_CART } from "./queries";

const CART_KEY = "shopify_cart_id";

export function getStoredCartId() {
  if (typeof window === "undefined") return null;

  return localStorage.getItem(CART_KEY);
}

export function storeCartId(cartId: string) {
  if (typeof window === "undefined") return;

  localStorage.setItem(CART_KEY, cartId);
}

// Get or create cart
export async function getCartId() {
  if (typeof window === "undefined") return null;

  let cartId = localStorage.getItem(CART_KEY);

  if (!cartId) {
    const res = await shopifyFetch(CREATE_CART);
    cartId = res.data.cartCreate.cart.id;
  }

  return cartId;
}

// Add item
export async function addToCart(variantId: string, quantity = 1) {
  const cartId = await getCartId();

  const res = await shopifyFetch(ADD_TO_CART, {
    cartId,
    variantId,
    quantity,
  });

  const cart = res.data.cartLinesAdd.cart;

  return cart.checkoutUrl;
}

