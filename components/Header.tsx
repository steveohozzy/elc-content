import Link from "next/link";
import Image from "next/image";

export default function Header({

}) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-green-800/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4">

          {/* DESKTOP */}
          <div className="hidden h-20 items-center justify-between md:flex">

            {/* LEFT */}
            <div className="flex items-center gap-14">

              {/* LOGO */}
              <Link
                href="/"
              >
                <div className="
                  relative flex h-11
                ">
                  <Image
                    src="https://www.elc.co.uk/medias/site-logo.svg?context=bWFzdGVyfGltYWdlc3wzNDcwN3xpbWFnZS9zdmcreG1sfGFXMWhaMlZ6TDJnNFppOW9ZV0l2T1RFNE56WTNNVGsyTlRjeU5pNXpkbWN8MDMyOGQ4OTBmM2VlYzg2Yzc1Nzc4YzQyNTAxNmI1OWUyNGY3YzE1OTQzZjkxYTFlYjA3NGQ0ZmJiZDM2MjcyZQ"
                    alt="ELC"
                    width={400}
                    height={200}
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}