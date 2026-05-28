"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getStoredCartId } from "@/lib/cart";
import { getCartAction } from "@/app/actions/cart";

export default function CartIcon({
  onClick,
}: {
  onClick?: () => void;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function loadCart() {
      const cartId = getStoredCartId();
      if (!cartId) return;

      const cart = await getCartAction(cartId);
      setCount(cart?.totalQuantity ?? 0);
    }

    loadCart();
  }, []);

  return (
    <Link
      href="/cart"
      onClick={onClick}
      className="relative flex h-10 w-10 items-center justify-center"
    >
      {/* ICON */}
      <span className="text-xl leading-none">🛒</span>

      {/* BADGE */}
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[11px] text-white">
          {count}
        </span>
      )}
    </Link>
  );
}