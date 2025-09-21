"use client";

import { useState } from "react";
import { Event } from "@/types/types";
import { useEvents } from "@/hooks/useEvents";

interface Props {
  event: Event;
  userId: number;
  availableSpots: number;
  onChange?: (registered: boolean) => void;
}

export function RegistrationButton({
  event,
  userId,
  onChange,
  availableSpots,
}: Props) {
  const { register, cancel } = useEvents();
  const [isRegistered, setIsRegistered] = useState(
    event.registrations?.some((r) => r.userId === userId) ?? false
  );
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await register(event.id);
      setIsRegistered(true);
      onChange?.(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    setLoading(true);
    try {
      await cancel(event.id);
      setIsRegistered(false);
      onChange?.(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const buttonText = loading
    ? isRegistered
      ? "Cancelling..."
      : "Registering..."
    : isRegistered
    ? "[ Cancel Registration ]"
    : "[ Register ]";

  return (
    <button
      onClick={isRegistered ? handleCancel : handleRegister}
      disabled={loading || (!isRegistered && availableSpots <= 0)}
      className={`text-lg font-mono px-3 py-1 rounded transition-all ${
        isRegistered
          ? "text-red-400 hover:text-red-300 hover:bg-red-900/40"
          : "text-cyan-400 hover:text-cyan-300 hover:bg-cyan-900/40"
      } disabled:opacity-40 disabled:cursor-not-allowed`}
    >
      {buttonText}
    </button>
  );
}
