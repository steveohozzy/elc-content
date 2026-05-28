"use server";

import { shopifyFetch } from "@/lib/shopify";
import {
  CREATE_CART,
  ADD_TO_CART,
  GET_CART,
} from "@/lib/queries";

export async function createCartAction() {
  const res = await shopifyFetch(CREATE_CART);

  return res.data.cartCreate.cart;
}

export async function addToCartAction(
  cartId: string,
  variantId: string
) {
  const res = await shopifyFetch(ADD_TO_CART, {
    cartId,
    variantId,
    quantity: 1,
  });

  return res.data.cartLinesAdd.cart;
}

export async function getCartAction(cartId: string) {
  const res = await shopifyFetch(GET_CART, {
    cartId,
  });

  return res.data.cart;
}