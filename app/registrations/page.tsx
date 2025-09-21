"use client";

import { useAuth } from "@/hooks/useAuth";
import { RegistrationCard } from "@/components/registrations/RegistrationCard";
import { useRegistrations } from "@/hooks/useRegistration";

export default function RegistrationsPage() {
  const { user } = useAuth();
  const { registrations, loading, error, cancelRegistration } =
    useRegistrations(user?.id ?? 0);

  if (!user)
    return (
      <p className="text-center mt-10">
        Please login to see your registrations.
      </p>
    );
  if (loading)
    return <p className="text-center mt-10">Loading registrations...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (registrations.length === 0)
    return <p className="text-center mt-10">No registrations found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {registrations.map((reg) => (
        <RegistrationCard
          key={reg.id}
          registration={reg}
          onCancel={cancelRegistration}
        />
      ))}
    </div>
  );
}
