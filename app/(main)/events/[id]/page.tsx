"use client";

import { useEvents } from "@/hooks/useEvents";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Event } from "@/types/types";
import { EventCard } from "@/components/events/EventCard";

export default function EventDetailsPage() {
  const { id } = useParams();
  const { events, fetchEvents } = useEvents();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const loadEvent = async () => {
      const found = events.find((e) => e.id === Number(id));
      if (found) setEvent(found);
      else {
        await fetchEvents();
        const updated = events.find((e) => e.id === Number(id));
        if (updated) setEvent(updated);
      }
    };
    loadEvent();
  }, [id, events, fetchEvents]);

  if (!event) return <p>Loading...</p>;

  return <EventCard event={event} />;
}
