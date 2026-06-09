"use client";

import { useEffect, useRef, useState } from "react";
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

export default function StackedCarousel({ data }: Props) {
  const stackRef = useRef<HTMLDivElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const draggedRef = useRef(false);

  const panels: ValidPanel[] = (data.panelsCollection?.items ?? []).filter(
    (p): p is ValidPanel =>
      !!p?.image?.url &&
      !!p?.backgroundImage?.url &&
      !!p?.title &&
      !!p?.link
  );

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const cards = Array.from(
      stack.querySelectorAll<HTMLDivElement>(".carousel-card")
    );

    const slides = Array.from(
      stack.querySelectorAll<HTMLDivElement>(".card-inner")
    );

    let isDragging = false;
    let startX = 0;
    let dragOffset = 0;

    const setHeights = () => {
      let max = 0;

      slides.forEach((s) => (s.style.height = "auto"));

      slides.forEach((s) => {
        max = Math.max(max, s.getBoundingClientRect().height);
      });

      slides.forEach((s) => (s.style.height = `${max}px`));
      stack.style.height = `${max}px`;
    };

    const update = (index = currentIndex) => {
    const len = cards.length;

    const stackWidth = stack.clientWidth;
    const cardWidth = cards[0]?.offsetWidth || 0;

    const available = stackWidth - cardWidth;

    const step = len > 1 ? available / (len - 1) : 0;

    cards.forEach((card, i) => {
      const offset = (i - index + len) % len;
      const isTop = offset === 0;
      card.dataset.top = String(isTop);

      const x = offset * step + (isTop ? dragOffset : 0);

      card.style.transform = `
        translateX(${x}px)
        scale(${1 - offset * 0.04})
      `;

      card.style.zIndex = String(len - offset);

      card.classList.toggle("top", isTop);
    });
  };

    const next = () => {
      dragOffset = 0;
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    };

    const prev = () => {
      dragOffset = 0;
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    };

    const onDown = (e: PointerEvent) => {
      isDragging = true;
      draggedRef.current = false;
      startX = e.clientX;
    };

    const onMove = (e: PointerEvent) => {
      if (!isDragging) return;

      const delta = e.clientX - startX;

      if (Math.abs(delta) > 5) {
        draggedRef.current = true;
      }

      dragOffset = Math.max(-60, Math.min(60, delta));
      update();
    };

    const onUp = (e: PointerEvent) => {
      if (!isDragging) return;

      isDragging = false;

      const delta = e.clientX - startX;

      if (delta > 15) {
        prev();
      } else if (delta < -15) {
        next();
      } else {
        dragOffset = 0;
        update();
      }
    };

    stack.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    const resize = () => {

      setTimeout(() => {
        setHeights();
        update();
      }, 120);
    };

    window.addEventListener("resize", resize);

    setTimeout(() => {
      setHeights();
      update();
    }, 120);

   return () => {
    stack.removeEventListener("pointerdown", onDown);
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("resize", resize);
  };
  }, [currentIndex, panels.length]);

  const cardWidth =
    panels.length <= 3
      ? 45
      : panels.length === 4
      ? 42
      : panels.length === 5
      ? 40
      : 38;

  return (
    <div className="relative mx-auto w-full max-w-7xl pb-8 overflow-hidden">
      <div className="flex justify-center px-5">
        <div
          ref={stackRef}
          className="relative w-full overflow-visible cursor-grab active:cursor-grabbing touch-pan-y"
        >
          {panels.map((panel, i) => (
            <div
              key={i}
              className="
                carousel-card
                select-none
                absolute
                left-0
                transition-transform
                duration-500
                ease-out
                select-none
                cursor-pointer
              "
              style={{ width: `${cardWidth}%` }}
              onClick={() => {
                if (draggedRef.current) {
                  draggedRef.current = false;
                  return;
                }

                setCurrentIndex(i);
              }}
            >
              <div className="card-inner w-full">
                <div
                  className="
                    relative
                    bg-white
                    rounded-lg
                    overflow-hidden
                    p-[10px]
                    flex
                    flex-col
                    shadow-xl
                  "
                >
                  {/* MEDIA */}
                  <div className="relative w-full">
                    <Image
                      src={panel.backgroundImage.url}
                      className={`w-full block transition-all duration-500 ${
                        currentIndex === i ? "blur-0" : "blur-[2px]"
                      }`}
                      alt=""
                      width={600}
                      height={600}
                      sizes="(max-width: 768px) 50vw, 25vw"
                      draggable={false}
                    />

                    <Image
                      src={panel.image.url}
                      className={`
                        absolute
                        bottom-0
                        right-1/2
                        h-auto
                        w-full
                        max-w-[80%]
                        transition-transform
                        duration-500
                        ease-out
                        will-change-transform
                        delay-250
                        ${
                          currentIndex === i
                            ? "translate-x-1/2"
                            : "translate-x-[65%]"
                        }
                      `}
                      alt={panel.title}
                      width={400}
                      height={400}
                      sizes="(max-width: 768px) 50vw, 25vw"
                      draggable={false}
                    />
                  </div>

                  {/* TITLE */}
                  <div className="mt-5 text-center">
                    <div
                      className={`
                        text-lg
                        md:text-xl
                        text-[#1f2b91]
                        transition-all
                        duration-300
                        ${
                          currentIndex === i
                            ? "font-bold"
                            : "font-medium"
                        }
                      `}
                    >
                      {panel.title}
                    </div>
                  </div>

                  {/* BUTTON */}
                  <div className="flex justify-center pt-4 pb-2">
                    <a
                      href={panel.link}
                      onClick={(e) => e.stopPropagation()}
                      className="
                        bg-black/80
                        text-white
                        font-bold
                        px-2
                        md:px-6
                        py-2
                        rounded-full
                        shadow-md
                        flex
                        items-center
                        gap-
                        transition-transform
                        hover:scale-105
                        text-xs
                        md:text-sm
                        lg:text-base
                      "
                    >
                      ★ Shop 🛒 ★
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}