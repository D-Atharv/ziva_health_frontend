import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api";
import type { Registration } from "@/types/types";

export function useRegistrations(userId: number) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRegistrations = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiFetch<Registration[]>(
        `/users/${userId}/registrations`
      );
      setRegistrations(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Failed to fetch registrations");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const cancelRegistration = useCallback(
    async (eventId: number) => {
      try {
        await apiFetch(`/events/${eventId}/register`, { method: "DELETE" });
        await fetchRegistrations();
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Failed to cancel registration");
      }
    },
    [fetchRegistrations]
  );

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  return {
    registrations,
    loading,
    error,
    fetchRegistrations,
    cancelRegistration,
  };
}
