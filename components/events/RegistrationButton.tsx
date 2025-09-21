"use client";

import { useState } from "react";
import { Event } from "@/types/types";
import { Button } from "../ui/button";
import { useEvents } from "@/hooks/useEvents";

interface Props {
  event: Event;
  userId: number;
  availableSpots: number; 
  onChange?: (registered: boolean) => void; 
}

export function RegistrationButton({
  event,
  userId,
  onChange,
  availableSpots,
}: Props) {
  const { register, cancel } = useEvents();
  const [isRegistered, setIsRegistered] = useState(
    event.registrations?.some((r) => r.userId === userId) ?? false
  );
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await register(event.id);
      setIsRegistered(true);
      onChange?.(true); 
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    setLoading(true);
    try {
      await cancel(event.id);
      setIsRegistered(false);
      onChange?.(false); 
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return isRegistered ? (
    <Button variant="destructive" onClick={handleCancel} disabled={loading}>
      Cancel
    </Button>
  ) : (
    <Button onClick={handleRegister} disabled={loading || availableSpots <= 0}>
      Register
    </Button>
  );
}
