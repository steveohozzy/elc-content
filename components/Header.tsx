import Link from "next/link";
import CartIcon from "./CartIcon";
import SearchPreview from "./SearchPreview";
import MobileMenu from "./MobileMenu";

type Collection = {
  node: {
    id: string;
    title: string;
    handle: string;
  };
};

export default function Header({
  collections,
}: {
  collections: Collection[];
}) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4">

          {/* DESKTOP */}
          <div className="hidden h-20 items-center justify-between md:flex">

            {/* LEFT */}
            <div className="flex items-center gap-14">

              {/* LOGO */}
              <Link
                href="/"
                className="group flex items-center gap-4"
              >
                <div className="
                  relative flex h-11 w-11 items-center
                  justify-center overflow-hidden
                  rounded-2xl border border-white/10
                  bg-white/5 backdrop-blur-xl
                  transition duration-300
                  group-hover:scale-105
                  group-hover:border-white/20
                ">
                  <div className="
                    absolute inset-0
                    translate-x-[-100%]
                    bg-gradient-to-r
                    from-transparent
                    via-white/20
                    to-transparent
                    transition-transform duration-1000
                    group-hover:translate-x-[200%]
                  " />

                  <span className="
                    relative text-lg font-black
                    uppercase tracking-widest text-white
                  ">
                    S
                  </span>
                </div>

                <div className="flex flex-col leading-none">
                  <span className="
                    text-2xl font-black uppercase
                    tracking-[0.2em] text-white
                  ">
                    Summit
                  </span>

                  <span className="
                    mt-1 text-[10px]
                    font-medium uppercase
                    tracking-[0.45em]
                    text-gray-200
                  ">
                    Snow Supply
                  </span>
                </div>
              </Link>

              {/* NAV */}
              <nav className="flex items-center gap-8">
                {collections.map(({ node }) => (
                  <Link
                    key={node.id}
                    href={`/collections/${node.handle}`}
                    className="
                      group relative text-sm font-semibold
                      uppercase tracking-[0.15em]
                      text-gray-300 transition
                      hover:text-white
                    "
                  >
                    {node.title}

                    <span className="
                      absolute -bottom-2 left-0
                      h-px w-0 bg-white
                      transition-all duration-300
                      group-hover:w-full
                    " />
                  </Link>
                ))}
              </nav>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-5">

              <div className="hidden lg:block">
                <SearchPreview />
              </div>

              <div className="
                rounded-full border border-white/10
                bg-white/5 p-3 text-white
                backdrop-blur-xl transition
                hover:scale-105 hover:border-white/20
              ">
                <CartIcon />
              </div>
            </div>
          </div>

          {/* MOBILE */}
          <div className="flex h-20 items-center justify-between md:hidden">

            <MobileMenu collections={collections} />

            {/* MOBILE LOGO */}
            <Link href="/" className="flex items-center gap-3">
              <div className="
                flex h-10 w-10 items-center
                justify-center rounded-xl
                border border-white/10
                bg-white/5 text-sm
                font-black uppercase
                tracking-widest text-white
                backdrop-blur-xl
              ">
                S
              </div>

              <span className="
                text-xl font-black uppercase
                tracking-[0.2em] text-white
              ">
                Summit
              </span>
            </Link>

            {/* CART */}
            <div className="
              rounded-full border border-white/10
              bg-white/5 p-3 text-white
              backdrop-blur-xl
            ">
              <CartIcon />
            </div>
          </div>

        </div>
      </header>
    </>
  );
}