"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Calendar, MapPin } from "lucide-react";

const events = [
  {
    title: "Global Tech Summit",
    date: "Oct 10, 2025",
    location: "Virtual",
    category: "Tech",
    color: "border-green-400",
    spots: 32,
  },
  {
    title: "Indie Music Fest",
    date: "Nov 5, 2025",
    location: "City Park",
    category: "Music",
    color: "border-cyan-400",
    spots: 50,
  },
  {
    title: "Startup Pitch Night",
    date: "Dec 2, 2025",
    location: "Innovation Hub",
    category: "Business",
    color: "border-yellow-400",
    spots: 20,
  },
];

export function TimelineSection() {
  return (
    <section className="snap-start flex-shrink-0 w-screen h-screen flex flex-col items-center justify-center p-8">
      <h2 className="text-4xl font-bold mb-12 text-center text-green-400">
        Upcoming Events
      </h2>
      <div className="flex flex-col md:flex-row gap-6 max-w-6xl">
        {events.map((event, idx) => (
          <Card
            key={idx}
            className={`w-80 bg-black/60 border-t-4 ${event.color} border-green-700 rounded-lg shadow-md flex flex-col hover:scale-105 transition-transform duration-300`}
          >
            <CardHeader>
              <p className="text-green-400 text-sm font-mono">
                {event.category}
              </p>
              <CardTitle className="text-green-200 text-lg">
                {event.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 text-green-100">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" /> {event.date}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {event.location}
              </div>
            </CardContent>
            <CardFooter className="text-green-300 text-sm">
              {event.spots} spots left
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
