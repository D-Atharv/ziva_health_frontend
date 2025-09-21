"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const commands = [
  { command: "./go-home", href: "/" },
  { command: "./list-events", href: "/events" },
  { command: "./my-registrations", href: "/registrations" },
];

export default function NotFoundPage() {
  const pathname = usePathname();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.5 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const title = "COMMAND NOT FOUND";

  return (
    <main className="min-h-screen w-full bg-black text-green-400 font-mono p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto bg-[#0A0A0A] border-2 border-green-800/60 rounded-lg shadow-2xl shadow-green-500/10 overflow-hidden">
        <div className="bg-neutral-900/80 px-4 py-2 flex items-center justify-between border-b border-green-800/60">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <p className="text-sm text-green-500">zsh</p>
          <div className="w-14"></div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          <p className="text-green-300 text-sm sm:text-base">
            <span className="text-cyan-400">user@eventhub</span>:
            <span className="text-neutral-400">~</span>$ ls -a
          </p>
          <p className="text-neutral-400 text-xs sm:text-sm">
            . .. .env .git .next components
          </p>

          <p className="mt-4 text-green-300 text-sm sm:text-base">
            <span className="text-cyan-400">user@eventhub</span>:
            <span className="text-neutral-400">~</span>$ .{pathname}
          </p>

          <div className="mt-6 overflow-x-auto">
            <motion.pre
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-green-500 text-center text-xs sm:text-base md:text-xl lg:text-2xl font-bold select-none whitespace-pre leading-tight"
            >
              {String.raw`
  _  _    ___   _  _   
 | || |  / _ \ | || |  
 | || |_| | | || || |_ 
 |__   _| |_| ||__   _|
    |_|  \___/    |_|  
`}
            </motion.pre>
          </div>

          {/* Typing Animation */}
          <motion.p
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-red-500 text-lg sm:text-xl text-center mt-4"
          >
            {title.split("").map((char, index) => (
              <motion.span key={index} variants={letterVariants}>
                {char}
              </motion.span>
            ))}
          </motion.p>

          <p className="text-neutral-400 text-center text-xs sm:text-sm mt-2">
            The route <span className="text-yellow-400">{pathname}</span> does
            not exist.
          </p>
          <p className="text-neutral-400 text-center text-xs sm:text-sm mt-4">
            Try one of the available commands:
          </p>

          {/* Helpful Commands */}
          <div className="mt-6 space-y-2 text-sm sm:text-base">
            {commands.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-200 transition-colors group"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                <span>{item.command}</span>
              </Link>
            ))}
          </div>

          {/* Blinking Prompt */}
          <div className="mt-6 flex items-center gap-2 text-sm sm:text-base">
            <span className="text-cyan-400">user@eventhub</span>:
            <span className="text-neutral-400">~</span>$
            <span className="inline-block w-2 h-4 sm:w-2.5 sm:h-5 bg-green-400 ml-2 animate-blink"></span>
          </div>
        </div>
      </div>
    </main>
  );
}
