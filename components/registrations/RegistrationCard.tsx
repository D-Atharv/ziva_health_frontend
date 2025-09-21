"use client";

import { Registration } from "@/types/types";
import { CancelButton } from "./CancelButton";
import { Calendar, MapPin } from "lucide-react";

interface Props {
  registration: Registration;
  onCancel: (eventId: number) => Promise<void>;
}

export function RegistrationCard({ registration, onCancel }: Props) {
  const { event } = registration;
  const clientDate = new Date(event.dateTime).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="border-l-2 border-green-700 pl-4 transition-all hover:border-green-400">
      <h2 className="text-xl font-bold text-green-300 mb-2">{event.title}</h2>
      <p className="text-green-500 mb-4 whitespace-pre-wrap">
        {event.description}
      </p>
      <div className="space-y-2 text-sm">
        <p className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-green-600" />
          <span className="w-20">Date:</span>
          <span>{clientDate}</span>
        </p>
        <p className="flex items-center gap-3">
          <MapPin className="w-4 h-4 text-green-600" />
          <span className="w-20">Location:</span>
          <span>{event.location}</span>
        </p>
      </div>
      <div className="mt-4">
        <CancelButton eventId={event.id} onCancel={onCancel} />
      </div>
    </div>
  );
}
