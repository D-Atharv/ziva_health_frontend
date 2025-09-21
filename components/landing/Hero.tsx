"use client";

import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function Hero() {
  const router = useRouter();

  return (
    <section className="snap-start flex-shrink-0 w-screen h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden bg-black text-green-400 font-mono">
      <motion.h1
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="text-5xl md:text-7xl font-extrabold drop-shadow-lg"
      >
        EventHub Terminal Edition
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-lg md:text-xl max-w-2xl text-center text-green-200"
      >
        Navigate events like a hacker. Discover, create, and join events in a
        fully terminal-styled interface.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex gap-4 mt-6"
      >
        <Button
          size="lg"
          className="rounded-full font-mono bg-black border border-green-400 hover:bg-green-900/20 shadow-lg text-green-400 hover:text-green-100"
          onClick={() => router.push("/login")}
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </section>
  );
}
