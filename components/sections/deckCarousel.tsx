"use client";

import { useState, useRef } from "react";
import Image from "next/image";

type Panel = {
  title?: string;
  link?: string;
  image?: { url?: string };
  backgroundImage?: { url?: string };
};

type ValidPanel = {
  title: string;
  link: string;
  image: { url: string };
  backgroundImage: { url: string };
};

type Props = {
  data: {
    panelsCollection?: {
      items: Panel[];
    };
  };
};

export default function DeckCarousel({ data }: Props) {
  const draggedRef = useRef(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const panels: ValidPanel[] = (data.panelsCollection?.items ?? []).filter(
    (p): p is ValidPanel =>
      !!p?.title &&
      !!p?.link &&
      !!p?.image?.url &&
      !!p?.backgroundImage?.url
  );

  const total = panels.length;

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const getOffset = (cardIndex: number) => {
    return (cardIndex - currentIndex + total) % total;
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <div className="relative h-[520px]">

        {panels.map((panel, i) => {
          const offset = getOffset(i);

          let classes = "";
          let zIndex = 0;

          if (offset === 0) {
  classes = `
    -translate-x-2
    translate-y-0
    scale-100
    rotate-0
    opacity-100
  `;
  zIndex = 100;
}
else if (offset === 1) {
  classes = `
    translate-x-[26px]
    md:translate-x-[380px]
    translate-y-[0px]
    scale-[0.82]
    rotate-[-8deg]
    opacity-100
  `;
  zIndex = 90;
}
else if (offset === 2) {
  classes = `
    translate-x-[38px]
    md:translate-x-[388px]
    translate-y-[8px]
    scale-[0.79]
    rotate-[-3deg]
    opacity-100
  `;
  zIndex = 80;
}
else if (offset === 3) {
  classes = `
    translate-x-[46px]
    md:translate-x-[396px]
    translate-y-[16px]
    scale-[0.76]
    rotate-[4deg]
    opacity-100
  `;
  zIndex = 70;
}
else {
  classes = `
    translate-x-[56px]
    md:translate-x-[420px]
    translate-y-[20px]
    scale-[0.72]
    opacity-0
    pointer-events-none
  `;
  zIndex = 0;
}

          return (
            <div
              key={i}
              className={`
                absolute
                left-[40px]
                top-[20px]
                w-[78vw]
                max-w-[340px]
                md:w-[440px]
                transition-all
                duration-700
                ease-[cubic-bezier(.22,1,.36,1)]
                ${classes}
              `}
              style={{ zIndex }}
              onClick={() => {
                if (offset > 0 && offset <= 3) {
                  setCurrentIndex(i);
                }
              }}
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-2xl">

                <div className="relative">

                  <Image
                    src={panel.backgroundImage.url}
                    alt=""
                    width={1200}
                    height={1200}
                    className="w-full h-auto block"
                    draggable={false}
                  />

                  <Image
                    src={panel.image.url}
                    alt={panel.title}
                    width={800}
                    height={800}
                    draggable={false}
                    className={`
                      absolute
                      bottom-0
                      right-1/2
                      w-[75%]
                      h-auto
                      transition-all
                      duration-700
                      ${
                        offset === 0
                          ? "translate-x-1/2"
                          : "translate-x-[65%]"
                      }
                    `}
                  />
                </div>

                <div className="p-6 text-center">
                  <h3
                    className={`
                      text-[#1f2b91]
                      transition-all
                      duration-300
                      ${
                        offset === 0
                          ? "font-bold text-2xl"
                          : "font-medium text-xl"
                      }
                    `}
                  >
                    {panel.title}
                  </h3>

                  <div className="pt-5">
                    <a
                      href={panel.link}
                      onClick={(e) => e.stopPropagation()}
                      className="
                        inline-flex
                        items-center
                        rounded-full
                        bg-black
                        text-white
                        px-6
                        py-3
                        font-bold
                        hover:scale-105
                        transition-transform
                      "
                    >
                      ★ Shop 🛒 ★
                    </a>
                  </div>
                </div>

              </div>
            </div>
          );
        })}

        <button
          onClick={prev}
          className="
            absolute
            left-0
            top-1/2
            -translate-y-1/2
            z-[200]
            bg-white
            shadow-lg
            rounded-full
            w-12
            h-12
          "
        >
          ←
        </button>

        <button
          onClick={next}
          className="
            absolute
            right-0
            top-1/2
            -translate-y-1/2
            z-[200]
            bg-white
            shadow-lg
            rounded-full
            w-12
            h-12
          "
        >
          →
        </button>

      </div>
    </div>
  );
}