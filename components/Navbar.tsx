"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, UserCircle, Terminal, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export function Navbar() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="w-full bg-[#0A0A0A] text-green-400 font-mono border-b-2 border-green-800/60 p-4">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Terminal className="w-6 h-6 text-green-500 group-hover:animate-pulse" />
          <h1 className="text-xl font-bold text-green-300 group-hover:text-green-100 transition-colors">
            EventHub
          </h1>
        </Link>

        <div className="hidden sm:flex items-center gap-4 text-sm sm:gap-6">
          {loading ? (
            <div className="w-24 h-6 bg-green-900/50 animate-pulse rounded-md"></div>
          ) : user ? (
            <>
              <Link
                href="/events"
                className="hover:text-white transition-colors"
              >
                [ Events ]
              </Link>
              <Link
                href="/events/create"
                className="hover:text-white transition-colors"
              >
                [ Create ]
              </Link>
              <Link
                href="/registrations"
                className="hover:text-white transition-colors"
              >
                [ My Registrations ]
              </Link>
              <div className="hidden md:flex items-center gap-2 text-cyan-400">
                <UserCircle className="w-5 h-5" />
                <span>{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hover:text-white transition-colors"
              >
                [ Login ]
              </Link>
              <Link
                href="/register"
                className="hover:text-white transition-colors"
              >
                [ Register ]
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden flex items-center text-green-400 hover:text-white transition-colors"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="sm:hidden mt-3 space-y-3 flex flex-col items-start bg-[#0A0A0A] border-t border-green-800/40 p-4 rounded-lg">
          {loading ? (
            <div className="w-24 h-6 bg-green-900/50 animate-pulse rounded-md"></div>
          ) : user ? (
            <>
              <Link
                href="/events"
                onClick={() => setMenuOpen(false)}
                className="hover:text-white transition-colors"
              >
                [ Events ]
              </Link>
              <Link
                href="/events/create"
                onClick={() => setMenuOpen(false)}
                className="hover:text-white transition-colors"
              >
                [ Create ]
              </Link>
              <Link
                href="/registrations"
                onClick={() => setMenuOpen(false)}
                className="hover:text-white transition-colors"
              >
                [ My Registrations ]
              </Link>
              <div className="flex items-center gap-2 text-cyan-400">
                <UserCircle className="w-5 h-5" />
                <span>{user.name}</span>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="hover:text-white transition-colors"
              >
                [ Login ]
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="hover:text-white transition-colors"
              >
                [ Register ]
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
