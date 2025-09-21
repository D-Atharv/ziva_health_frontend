"use client";

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Rocket, Ticket, Users, Lock } from "lucide-react";

const features = [
  {
    icon: <Rocket />,
    title: "Launch Instantly",
    description: "Create events in minutes.",
  },
  {
    icon: <Ticket />,
    title: "Easy Registration",
    description: "Attendees register quickly.",
  },
  {
    icon: <Users />,
    title: "Manage Capacity",
    description: "Avoid overbooking.",
  },
  {
    icon: <Lock />,
    title: "Secure & Private",
    description: "Your data is safe.",
  },
];

export function FeaturesSection() {
  return (
    <section className="snap-start flex-shrink-0 w-screen h-screen flex flex-col items-center justify-center p-8">
      <h2 className="text-4xl font-bold mb-12 text-center text-green-400 drop-shadow-lg">
        Why Youll Love EventHub
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
        {features.map((feature, idx) => (
          <Card
            key={idx}
            className="bg-black/60 border border-green-600 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          >
            <CardHeader className="flex items-center gap-3">
              <div className="text-green-400">{feature.icon}</div>
              <CardTitle className="text-green-200 text-lg">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-100">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
