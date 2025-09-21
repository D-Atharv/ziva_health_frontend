"use client";

import { useAuth } from "@/hooks/useAuth";
import { RegistrationCard } from "@/components/registrations/RegistrationCard";
import { useRegistrations } from "@/hooks/useRegistration";
import { AlertTriangle, ListChecks, Loader2 } from "lucide-react";

export default function RegistrationsPage() {
  const { user } = useAuth();
  const { registrations, loading, error, cancelRegistration } =
    useRegistrations(user?.id ?? 0);

  const renderContent = () => {
    if (!user) {
      return (
        <div className="flex items-center gap-2 text-yellow-400">
          <AlertTriangle className="w-5 h-5" />
          <span>Please login to see your registrations.</span>
        </div>
      );
    }
    if (loading) {
      return (
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin w-5 h-5" />
          <span>
            Loading registrations...
            <span className="inline-block w-2.5 h-5 bg-green-400 ml-1 animate-blink"></span>
          </span>
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex items-center gap-2 text-red-500">
          <AlertTriangle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      );
    }
    if (registrations.length === 0) {
      return (
        <div className="flex items-center gap-2 text-gray-400">
          <ListChecks className="w-5 h-5" />
          <span>No active registrations found.</span>
        </div>
      );
    }
    return (
      <div className="flex flex-col gap-8">
        {registrations.map((reg) => (
          <RegistrationCard
            key={reg.id}
            registration={reg}
            onCancel={cancelRegistration}
          />
        ))}
      </div>
    );
  };

  return (
    <main className="min-h-screen w-full bg-black text-green-400 font-mono p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto bg-[#0A0A0A] border-2 border-green-800/60 rounded-lg shadow-2xl shadow-green-500/10 overflow-hidden">
        <div className="p-4 border-b border-green-800/60">
          <p className="text-green-300">
            <span className="text-cyan-400">user@eventhub</span>:
            <span className="text-neutral-400">~</span>$ ./my-registrations
          </p>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">{renderContent()}</div>
      </div>
    </main>
  );
}
