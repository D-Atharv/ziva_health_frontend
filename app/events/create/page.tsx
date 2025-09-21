import { EventForm } from "@/components/events/EventForm";

export default function CreateEventPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      <EventForm />
    </div>
  );
}
