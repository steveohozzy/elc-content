export default function Footer() {
  return (
    <footer className="mt-20 border-t border-black/10 bg-white">

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-4">

        {/* BRAND (matches your header) */}
        <div>
          <div className="flex items-center gap-3">

            {/* SMALL LOGO MARK */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-black/5 text-sm font-black uppercase tracking-widest text-black">
              S
            </div>

            {/* TEXT LOGO */}
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black uppercase tracking-[0.2em] text-black">
                Summit
              </span>
              <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.45em] text-gray-500">
                Snow Supply
              </span>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            Premium snowboarding gear built for performance, style, and the mountain.
          </p>
        </div>

        {/* SHOP */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
            Shop
          </h3>

          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            <li className="hover:text-black transition">
              <a href="/collections/all">All Products</a>
            </li>
            <li className="hover:text-black transition">
              <a href="/collections/new">New Arrivals</a>
            </li>
            <li className="hover:text-black transition">
              <a href="/collections/sale">Sale</a>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
            Support
          </h3>

          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            <li className="hover:text-black transition">
              <a href="/cart">Cart</a>
            </li>
            <li className="hover:text-black transition">
              <a href="/checkout">Checkout</a>
            </li>
            <li className="hover:text-black transition">
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* TRUST */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
            Trust
          </h3>

          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            <li>Secure Shopify Checkout</li>
            <li>Fast Shipping</li>
            <li>Easy Returns</li>
            <li>Premium Support</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-black/10 bg-black/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-4 text-xs text-gray-500 md:flex-row">

          <p> © {new Date().getFullYear()} Summit Snow Supply</p>

          <div className="flex gap-6">
            <a className="hover:text-black transition" href="/privacy">
              Privacy
            </a>
            <a className="hover:text-black transition" href="/terms">
              Terms
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
}