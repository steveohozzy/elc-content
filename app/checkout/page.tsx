"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getStoredCartId } from "@/lib/cart";
import { getCartAction } from "@/app/actions/cart";

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

export default function CheckoutPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const cartId = getStoredCartId();

      if (!cartId) {
        setLoading(false);
        return;
      }

      const data = await getCartAction(cartId);
      setCart(data);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20">
        <p className="text-gray-500">Preparing secure checkout…</p>
      </div>
    );
  }

  if (!cart) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">No cart found</h1>
        <Link href="/" className="mt-4 inline-block text-sm underline">
          Return to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 grid gap-10 md:grid-cols-3">

      {/* LEFT */}
      <div className="md:col-span-2 space-y-8">

        {/* TITLE */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Review your order
          </h1>
          <p className="mt-2 text-gray-600">
            Double-check everything before heading to secure Shopify checkout.
          </p>
        </div>

        {/* WHAT HAPPENS NEXT */}
        <div className="rounded-2xl border bg-white p-6">

          <h2 className="text-sm font-semibold text-gray-900">
            What happens next
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Your payment and shipping will be handled securely by Shopify.
          </p>

          <div className="mt-6 space-y-5">

            {/* 1 */}
            <div className="flex gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white text-[10px] font-bold">
                1
              </div>
              <div>
                <p className="text-sm font-medium">Review your order</p>
                <p className="text-xs text-gray-500">
                  Confirm items, quantities, and totals
                </p>
              </div>
            </div>

            {/* 2 */}
            <div className="flex gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-gray-600 text-[10px] font-bold">
                2
              </div>
              <div>
                <p className="text-sm font-medium">Secure Shopify checkout</p>
                <p className="text-xs text-gray-500">
                  Enter shipping & payment details on Shopify
                </p>
              </div>
            </div>

            {/* 3 */}
            <div className="flex gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-gray-600 text-[10px] font-bold">
                3
              </div>
              <div>
                <p className="text-sm font-medium">Order confirmation</p>
                <p className="text-xs text-gray-500">
                  Receive email confirmation and tracking details
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* SECURITY */}
        <div className="rounded-2xl bg-black text-white p-6">
          <p className="text-sm font-semibold">
            🔒 Secure checkout powered by Shopify
          </p>
          <p className="mt-1 text-xs text-white/70">
            All payments are encrypted and processed securely.
          </p>
        </div>

      </div>

      {/* RIGHT */}
      <div className="md:col-span-1">

        <div className="sticky top-24 rounded-2xl border bg-white p-6 shadow-sm">

          <h2 className="text-lg font-bold">Order Summary</h2>

          {/* ITEMS */}
          <div className="mt-4 space-y-3">
            {cart.lines.edges.map(({ node }) => (
              <div key={node.id} className="flex items-center gap-3">

                <div className="h-12 w-12 overflow-hidden rounded-md bg-gray-100">
                  <Image
                    src={node.merchandise.image?.url}
                    width={80}
                    height={80}
                    alt={node.merchandise.product.title}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium line-clamp-1">
                    {node.merchandise.product.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    Qty {node.quantity}
                  </p>
                </div>

                <p className="text-sm font-semibold">
                  {node.merchandise.price.currencyCode}{" "}
                  {node.merchandise.price.amount}
                </p>

              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="mt-6 border-t pt-4 flex justify-between">
            <span className="font-semibold">Subtotal</span>
            <span className="font-bold">
              {cart.cost.subtotalAmount.currencyCode}{" "}
              {cart.cost.subtotalAmount.amount}
            </span>
          </div>

          {/* CTA */}
          <Link
            href={cart.checkoutUrl}
            className="
              mt-6 block w-full rounded-xl bg-black
              py-4 text-center font-semibold text-white
              transition hover:scale-[1.02]
            "
          >
            Continue to Secure Checkout
          </Link>

          <Link
            href="/cart"
            className="
              mt-4 inline-flex items-center justify-center
              rounded-xl border border-black/10 bg-white
              px-5 py-3 text-sm font-semibold text-black
              transition
              hover:bg-black hover:text-white
              hover:scale-[1.02]
              active:scale-[0.98]
              block w-full
            "
          >
            ← Back to cart
          </Link>

          <p className="mt-3 text-center text-xs text-gray-500">
            You’ll complete payment securely on Shopify
          </p>

        </div>

      </div>

    </div>
  );
}