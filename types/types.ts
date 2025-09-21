export interface AuthResponse {
  message: string;
}
export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export interface Registration {
  id: number;
  userId: number;
  eventId: number;
  registrationDate: string;
  status: string;
  event: Event;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  dateTime: string;
  location: string;
  maxCapacity: number;
  createdBy: number;
  createdAt: string;
  availableSpots: number;
  registrationCount: number;
  registrations?: Registration[];
}
