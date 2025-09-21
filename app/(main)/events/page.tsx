"use client";

import { EventCard } from "@/components/events/EventCard";
import { useEvents } from "@/hooks/useEvents";
import { List } from "lucide-react";

export default function EventListPage() {
  const { events, loading } = useEvents();

  return (
    <main className="min-h-screen w-full bg-black text-green-400 font-mono p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto bg-[#0A0A0A] border-2 border-green-800/60 rounded-lg shadow-2xl shadow-green-500/10 overflow-hidden">
        <div className="p-4 border-b border-green-800/60">
          <p className="text-green-300">
            <span className="text-cyan-400">user@eventhub</span>:
            <span className="text-neutral-400">~</span>$ ./list-events --all
          </p>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {loading ? (
            <div className="flex items-center gap-2">
              <List className="animate-spin w-5 h-5" />
              <span>
                Fetching event data...
                <span className="inline-block w-2.5 h-5 bg-green-400 ml-1 animate-blink"></span>
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
