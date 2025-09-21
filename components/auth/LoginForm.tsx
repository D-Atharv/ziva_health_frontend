"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { apiFetch } from "@/lib/api";
import type { AuthResponse } from "@/types/types";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Terminal } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginForm() {
  const { refreshUser } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [typedText, setTypedText] = useState("");
  const title = "Welcome to EventHub";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(title.slice(0, i + 1));
      i++;
      if (i === title.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await apiFetch<AuthResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      await refreshUser();
      router.push("/events");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="w-screen h-screen bg-black text-green-400 font-mono flex items-center justify-center p-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="w-full max-w-2xl bg-[#0A0A0A] border-2 border-green-800/60 rounded-lg shadow-2xl shadow-green-500/20 overflow-hidden relative"
      >
        <div className="bg-neutral-900/80 px-4 py-2 flex items-center justify-between border-b border-green-800/60">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <p className="text-sm text-green-500">/usr/bin/login</p>
          <div className="w-14"></div>
        </div>

        <div className="p-6 md:p-8">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, delay: 0.1 }}
            className="flex items-center gap-2 mb-6"
          >
            <Terminal className="w-8 h-8" />
            <h1 className="text-2xl md:text-3xl font-bold">
              {typedText}
              <span className="inline-block w-3 h-6 bg-green-400 ml-2 animate-blink"></span>
            </h1>
          </motion.div>

          <Card className="bg-transparent border-none shadow-none">
            <CardContent className="p-0">
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <Label htmlFor="email" className="text-green-400">
                    &gt;
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email..."
                    className="flex-1 bg-black border-b border-green-600 text-green-100 placeholder:text-green-700 focus-visible:ring-0 p-2"
                    required
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Label htmlFor="password" className="text-green-400">
                    &gt;
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="flex-1 bg-black border-b border-green-600 text-green-100 placeholder:text-green-700 focus-visible:ring-0 p-2"
                    required
                  />
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-500 text-sm"
                  >
                    [error]: {error}
                  </motion.p>
                )}

                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-green-900/50 border border-green-400 text-green-300 hover:bg-green-800/60 hover:text-green-100 py-3 text-lg transition-all duration-300"
                    disabled={loading}
                  >
                    <span className="mr-2">&gt;</span>
                    {loading ? "Authenticating..." : "Execute Login"}
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center mt-2 text-green-300 hover:text-green-100 cursor-pointer underline"
                  onClick={() => router.push("/register")}
                >
                  Dont have an account? Register
                </motion.div>
              </motion.form>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes blink {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 1s step-start infinite;
        }
      `}</style>
    </main>
  );
}
