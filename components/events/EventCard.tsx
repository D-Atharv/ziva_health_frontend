"use client";

import { Event } from "@/types/types";
import { useAuth } from "@/hooks/useAuth";
import { RegistrationButton } from "./RegistrationButton";
import { useState, useEffect } from "react";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const { user } = useAuth();
  const [clientDate, setClientDate] = useState("");
  const [availableSpots, setAvailableSpots] = useState(
    event.maxCapacity - (event.registrations?.length ?? 0)
  );

  useEffect(() => {
    setClientDate(new Date(event.dateTime).toLocaleString());
  }, [event.dateTime]);

  const handleRegisterChange = (registered: boolean) => {
    setAvailableSpots((prev) => (registered ? prev - 1 : prev + 1));
  };

  return (
    <div className="border rounded-md p-4 shadow-sm bg-card">
      <h2 className="text-xl font-bold">{event.title}</h2>
      <p>{event.description}</p>
      <p>
        <strong>Date:</strong> {clientDate || "Loading..."}
      </p>
      <p>
        <strong>Location:</strong> {event.location}
      </p>
      <p>
        <strong>Available Spots:</strong> {availableSpots}
      </p>
      {user && (
        <RegistrationButton
          event={event}
          userId={user.id}
          availableSpots={availableSpots}
          onChange={handleRegisterChange}
        />
      )}
    </div>
  );
}
