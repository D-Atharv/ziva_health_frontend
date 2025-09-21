import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import type { Event } from "@/types/types";

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchEvents() {
    try {
      setLoading(true);
      const data = await apiFetch<Event[]>("/events");
      setEvents(data);
    } finally {
      setLoading(false);
    }
  }

  async function register(eventId: number) {
    try {
      await apiFetch(`/events/${eventId}/register`, { method: "POST" });
      await fetchEvents();
    } catch (err) {
      console.error(err);
    }
  }

  async function cancel(eventId: number) {
    await apiFetch(`/events/${eventId}/register`, { method: "DELETE" });
    await fetchEvents();
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return { events, loading, fetchEvents, register, cancel };
}
