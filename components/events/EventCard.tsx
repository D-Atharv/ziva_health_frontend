"use client";

import { Event } from "@/types/types";
import { useAuth } from "@/hooks/useAuth";
import { RegistrationButton } from "./RegistrationButton";
import { useState, useEffect } from "react";
import { Calendar, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const { user, loading: authLoading } = useAuth();
  const [clientDate, setClientDate] = useState("");
  const [availableSpots, setAvailableSpots] = useState(
    event.maxCapacity - (event.registrations?.length ?? 0)
  );
  const [typedTitle, setTypedTitle] = useState("");

  useEffect(() => {
    setClientDate(
      new Date(event.dateTime).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    );

    let i = 0;
    const interval = setInterval(() => {
      setTypedTitle(event.title.slice(0, i + 1));
      i++;
      if (i > event.title.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, [event.title, event.dateTime]);

  const handleRegisterChange = (registered: boolean) => {
    setAvailableSpots((prev) => (registered ? prev - 1 : prev + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0A0A0A] border-2 border-green-800/60 rounded-lg shadow-lg p-6 hover:shadow-green-500/50 transition-all relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDBmMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxwYXRoIGQ9Ik0wIDBoMTAwVjFIMHoiLz48L3N2Zz4=')] bg-repeat opacity-10 animate-pulse"></div>

      <h2 className="text-2xl md:text-3xl font-bold text-green-400 mb-3 relative">
        {typedTitle}
        <span className="inline-block w-3 h-6 bg-green-400 ml-2 animate-blink"></span>
      </h2>

      <p className="text-green-200 mb-3 whitespace-pre-wrap">
        {event.description}
      </p>

      <div className="space-y-2 text-sm text-green-300">
        <p className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-green-600" />
          <span className="w-20">Date:</span>
          <span>{clientDate || "Loading..."}</span>
        </p>
        <p className="flex items-center gap-3">
          <MapPin className="w-4 h-4 text-green-600" />
          <span className="w-20">Location:</span>
          <span>{event.location}</span>
        </p>
        <p className="flex items-center gap-3">
          <Users className="w-4 h-4 text-green-600" />
          <span className="w-20">Spots Left:</span>
          <span>{availableSpots}</span>
        </p>
      </div>

      {authLoading ? (
        <span className="text-green-400 text-sm">Checking auth...</span>
      ) : user ? (
        <RegistrationButton
          event={event}
          userId={user.id}
          availableSpots={availableSpots}
          onChange={handleRegisterChange}
        />
      ) : null}
    </motion.div>
  );
}
