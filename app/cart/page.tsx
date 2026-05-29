"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { getStoredCartId } from "@/lib/cart";
import { getCartAction, removeCartItemAction } from "@/app/actions/cart";

type Cart = {
  checkoutUrl: string;
  totalQuantity: number;
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        merchandise: {
          product: {
            title: string;
            handle: string;
          };
          image: {
            url: string;
          };
          price: {
            amount: string;
            currencyCode: string;
          };
        };
      };
    }[];
  };
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
};

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);

  const [cartId, setCartId] = useState<string | null>(null);

  useEffect(() => {
  let cancelled = false;

  const run = async () => {
    const id = getStoredCartId();

    if (!id) {
      setLoading(false);
      return;
    }

    const cartData = await getCartAction(id);

    if (cancelled) return;

    setCart(cartData);
    setLoading(false);
  };

  run();

  return () => {
    cancelled = true;
  };
}, []);

  // fetch cart when cartId is available
  useEffect(() => {
  let cancelled = false;

  const run = async () => {
    const id = getStoredCartId();
    setCartId(id);

    if (!id) {
      if (!cancelled) setLoading(false);
      return;
    }

    const cartData = await getCartAction(id);

    if (cancelled) return;

    setCart(cartData);
    setLoading(false);
  };

  run();

  return () => {
    cancelled = true;
  };
}, []);

  const removeItem = async (lineId: string) => {
    if (!cartId) return;

    setRemoving(lineId);

    const updated = await removeCartItemAction(cartId, lineId);

    setCart(updated);

    setRemoving(null);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20">
        <p className="text-gray-600">Loading cart...</p>
      </div>
    );
  }

  if (!cart || cart.totalQuantity === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-gray-600">
          Add some products to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-8 text-4xl font-bold">Your Cart</h1>

      <div className="grid gap-6">
        {cart.lines.edges.map(({ node }) => (
          <div
            key={node.id}
            className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <Link
              href={`/products/${node.merchandise.product.handle}`}
              className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100"
            >
              <Image
                src={node.merchandise.image?.url}
                width={150}
                height={150}
                alt={node.merchandise.product.title}
                className="h-full w-full object-cover"
              />
            </Link>

            <div className="flex flex-1 flex-col justify-between">
              <div>
                <Link
                  href={`/products/${node.merchandise.product.handle}`}
                  className="text-lg font-semibold"
                >
                  {node.merchandise.product.title}
                </Link>

                <p className="mt-1 text-sm text-gray-600">
                  Quantity: {node.quantity}
                </p>
              </div>

              <p className="text-base font-bold">
                {node.merchandise.price.currencyCode}{" "}
                {node.merchandise.price.amount}
              </p>
            </div>

            <button
              disabled={removing === node.id}
              onClick={() => removeItem(node.id)}
              className="text-xs text-gray-500 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {removing === node.id ? "Removing..." : "Remove"}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Subtotal</h2>

          <p className="text-xl font-bold">
            {cart.cost.subtotalAmount.currencyCode}{" "}
            {cart.cost.subtotalAmount.amount}
          </p>
        </div>

        <Link
          href="/checkout"
          className="mt-6 block w-full rounded-xl bg-black px-6 py-4 text-center font-semibold text-white"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}