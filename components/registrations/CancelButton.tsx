"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  eventId: number;
  onCancel: (eventId: number) => Promise<void>;
}

export function CancelButton({ eventId, onCancel }: Props) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await onCancel(eventId);
    } catch (error) {
      console.error("Failed to cancel registration:", error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={cn(
        "text-lg transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed",
        "text-red-400 hover:text-red-300 hover:bg-red-900/40",
        "px-2 py-1 rounded"
      )}
    >
      {loading ? "Cancelling..." : "[ Cancel Registration ]"}
    </button>
  );
}
