"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  sections: string[];
  containerRef: React.RefObject<HTMLDivElement>;
}

export function FloatingDots({ sections, containerRef }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isDesktop = window.innerWidth >= 768;
      const scrollPos = isDesktop ? container.scrollLeft : container.scrollTop;
      const size = isDesktop ? container.clientWidth : container.clientHeight;
      const index = Math.round(scrollPos / size);
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [containerRef]);

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const isDesktop = window.innerWidth >= 768;
    container.scrollTo({
      [isDesktop ? "left" : "top"]:
        index * (isDesktop ? container.clientWidth : container.clientHeight),
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
      {sections.map((section, i) => (
        <button
          key={i}
          onClick={() => scrollToIndex(i)}
          className="group relative flex items-center"
          aria-label={`Scroll to ${section} section`}
        >
          {/* Tooltip */}
          <span className="absolute right-full mr-3 px-3 py-1 bg-black/80 text-green-400 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-mono tracking-wide">
            {section}
          </span>

          {/* Dot */}
          <motion.div
            animate={{
              scale: i === activeIndex ? [1, 1.5, 1] : 1,
              boxShadow:
                i === activeIndex
                  ? "0 0 10px #00ff99, 0 0 20px #00ff99, 0 0 30px #00ff99"
                  : "0 0 5px #008000",
            }}
            transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              i === activeIndex
                ? "bg-green-400"
                : "bg-green-800 hover:bg-green-500"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
