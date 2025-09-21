"use client";

import { Button } from "../ui/button";


interface Props {
  eventId: number;
  onCancel: (eventId: number) => void;
}

export function CancelButton({ eventId, onCancel }: Props) {
  return (
    <Button variant="destructive" onClick={() => onCancel(eventId)}>
      Cancel
    </Button>
  );
}
