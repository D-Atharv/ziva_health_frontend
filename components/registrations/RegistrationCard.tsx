"use client";

import { Registration } from "@/types/types";
import { CancelButton } from "./CancelButton";

interface Props {
  registration: Registration;
  onCancel: (eventId: number) => void;
}

export function RegistrationCard({ registration, onCancel }: Props) {
  const { event } = registration;

  return (
    <div className="border rounded-md p-4 shadow-sm bg-card">
      <h2 className="text-xl font-bold">{event.title}</h2>
      <p>{event.description}</p>
      <p>
        <strong>Date:</strong> {new Date(event.dateTime).toLocaleString()}
      </p>
      <p>
        <strong>Location:</strong> {event.location}
      </p>
      <CancelButton eventId={event.id} onCancel={onCancel} />
    </div>
  );
}
