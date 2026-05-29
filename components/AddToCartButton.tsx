"use client";

import { useState } from "react";

import {
  createCartAction,
  addToCartAction,
} from "@/app/actions/cart";

import {
  getStoredCartId,
  storeCartId,
} from "@/lib/cart";

export default function AddToCartButton({
  variantId,
}: {
  variantId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);

      let cartId = getStoredCartId();

      if (!cartId) {
        const cart = await createCartAction();

        const newCartId = cart.id; // 👈 explicitly typed string
        storeCartId(newCartId);

        cartId = newCartId;
      }

      if (!cartId) throw new Error("Cart ID missing");

      await addToCartAction(cartId, variantId);

      // ✅ just UI feedback now
      setAdded(true);

      setTimeout(() => setAdded(false), 1200);

      // OPTIONAL: trigger global cart update event
      window.dispatchEvent(new Event("cart:updated"));

    } catch (error) {
      console.error(error);
      alert("Failed to add item to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="
        group relative w-full overflow-hidden rounded-xl
        bg-black px-6 py-4 font-semibold text-white
        transition-all duration-300
        hover:shadow-lg hover:scale-[1.02]
        active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      <span className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-r from-white/10 via-white/5 to-white/10" />

      <span className="relative flex items-center justify-center gap-2">
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Adding...
          </>
        ) : added ? (
          "Added ✓"
        ) : (
          <>
            Add to cart
            <span className="text-white/70 group-hover:text-white transition">
              →
            </span>
          </>
        )}
      </span>
    </button>
  );
}