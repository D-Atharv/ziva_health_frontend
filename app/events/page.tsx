"use client";

import { EventCard } from "@/components/events/EventCard";
import { useEvents } from "@/hooks/useEvents";

export default function EventListPage() {
  const { events, loading } = useEvents();

  if (loading) return <p className="text-center mt-10">Loading events...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
