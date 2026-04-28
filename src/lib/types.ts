export type UserRole = "admin" | "ngo" | "volunteer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  volunteerId?: string;
}

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: number;
  rating: number;
  completedTasks: number;
  available: boolean;
  location: { city: string; lat: number; lng: number };
  avatar: string;
}

export type Urgency = "low" | "medium" | "high" | "critical";
export type RequestStatus = "open" | "assigned" | "in_progress" | "completed" | "cancelled";

export interface CommunityRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  urgency: Urgency;
  status: RequestStatus;
  peopleAffected: number;
  requiredSkills: string[];
  location: { city: string; area: string; lat: number; lng: number };
  createdAt: string;
  ngoName: string;
}

export interface Assignment {
  id: string;
  requestId: string;
  volunteerId: string;
  confidence: number;
  status: "pending" | "accepted" | "rejected" | "in_progress" | "completed";
  assignedAt: string;
}

export interface Notification {
  id: string;
  type: "emergency" | "assignment" | "update" | "request";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}
