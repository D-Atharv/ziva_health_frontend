"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import Link from "next/link";

export default function Terminal404() {
  const controls = useAnimation();

  // Create jitter/glitch animation
  useEffect(() => {
    const loop = async () => {
      while (true) {
        await controls.start({
          x: [-5, 5, -5, 5, 0],
          y: [0, -5, 5, -5, 0],
          rotate: [-2, 2, -2, 2, 0],
          transition: { duration: 0.1 },
        });
        await new Promise((r) => setTimeout(r, 100));
      }
    };
    loop();
  }, [controls]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-green-500 font-mono overflow-hidden">
      {/* Fullscreen "404" */}
      <motion.h1
        animate={controls}
        className="text-[12rem] md:text-[20rem] font-extrabold select-none"
      >
        404
      </motion.h1>

      {/* Terminal-style message */}
      <p className="text-xl md:text-2xl mt-4 animate-pulse">
        Error: Page Not Found
      </p>

      <p className="text-green-500/70 mt-2 md:text-lg">
        The command you entered does not exist in this system.
      </p>

      {/* Home button */}
      <Link href="/">
        <button className="mt-8 px-6 py-3 border border-green-500 hover:bg-green-500/20 rounded font-mono text-green-500 hover:text-white transition-all">
          Go Back Home
        </button>
      </Link>

      {/* Optional: simulate blinking cursor */}
      <div className="mt-4 h-6 w-6 bg-green-500 animate-blink"></div>

      <style jsx>{`
        .animate-blink {
          animation: blink 1s infinite;
        }
        @keyframes blink {
          0%,
          50%,
          100% {
            opacity: 1;
          }
          25%,
          75% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
