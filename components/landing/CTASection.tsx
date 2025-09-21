"use client";

import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function CTASection() {
  const router = useRouter();

  return (
    <section className="snap-start flex-shrink-0 w-screen h-screen flex flex-col items-center justify-center text-center p-8 bg-black text-green-400 font-mono relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-green-900/20 animate-pulse pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
      ></motion.div>

      <motion.h2
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="text-5xl font-bold mb-4 drop-shadow-lg relative z-10"
      >
        Ready to Dive In?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg text-green-200 max-w-xl mb-8 relative z-10"
      >
        Host your first event or find something amazing to join. The community
        is waiting!
      </motion.p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
        className="relative z-10"
      >
        <Button
          className="px-8 py-6 text-lg rounded-full font-mono border border-green-400 bg-black hover:bg-green-900/20 shadow-lg text-green-400 hover:text-green-100 transition-all"
          onClick={() => router.push("/login")}
        >
          Create Your First Event
        </Button>
      </motion.div>
    </section>
  );
}
