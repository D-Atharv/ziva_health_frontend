import { EventForm } from "@/components/events/EventForm";

export default function CreateEventPage() {
  return (
    <main className="min-h-screen w-full bg-black text-green-400 font-mono p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto bg-[#0A0A0A] border-2 border-green-800/60 rounded-lg shadow-2xl shadow-green-500/10 overflow-hidden">
        <div className="p-4 border-b border-green-800/60">
          <p className="text-green-300">
            <span className="text-cyan-400">user@eventhub</span>:
            <span className="text-neutral-400">~</span>$
            ./create-event-wizard.sh
          </p>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          <EventForm />
        </div>
      </div>
    </main>
  );
}
