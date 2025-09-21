"use client";

import { Search, PlusCircle, Users } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <Search className="h-12 w-12 text-cyan-400 mb-4" />,
    title: "Discover Events",
    description: "Browse exciting events and communities.",
  },
  {
    icon: <PlusCircle className="h-12 w-12 text-purple-400 mb-4" />,
    title: "Create Your Own",
    description: "Launch and manage your event easily.",
  },
  {
    icon: <Users className="h-12 w-12 text-green-400 mb-4" />,
    title: "Connect & Attend",
    description: "Join, interact, and share experiences.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="snap-start flex-shrink-0 w-screen h-screen flex flex-col items-center justify-center bg-black text-green-400 font-mono p-8 relative overflow-hidden">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center drop-shadow-lg">
        How It Works
      </h2>
      <div className="flex flex-col md:flex-row gap-10 max-w-6xl">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2, type: "spring", stiffness: 100 }}
            className="flex-1 text-center p-8 bg-black/70 border border-green-700 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          >
            {step.icon}
            <h3 className="text-2xl font-semibold text-green-200 mb-2">
              {step.title}
            </h3>
            <p className="text-green-100">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
