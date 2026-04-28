// Mock data store for SmartAid NGO platform
import { Volunteer, CommunityRequest, Assignment, Notification, User } from "./types";

export const mockVolunteers: Volunteer[] = [
  { id: "v1", name: "Aarav Sharma", email: "aarav@example.com", phone: "+91 98765 11111", skills: ["Medical", "First Aid", "Driving"], experience: 4, rating: 4.8, completedTasks: 32, available: true, location: { city: "Mumbai", lat: 19.076, lng: 72.8777 }, avatar: "AS" },
  { id: "v2", name: "Diya Patel", email: "diya@example.com", phone: "+91 98765 22222", skills: ["Education", "Counseling"], experience: 3, rating: 4.9, completedTasks: 28, available: true, location: { city: "Mumbai", lat: 19.12, lng: 72.85 }, avatar: "DP" },
  { id: "v3", name: "Rohan Mehta", email: "rohan@example.com", phone: "+91 98765 33333", skills: ["Logistics", "Driving", "Food Distribution"], experience: 6, rating: 4.7, completedTasks: 54, available: true, location: { city: "Pune", lat: 18.5204, lng: 73.8567 }, avatar: "RM" },
  { id: "v4", name: "Sara Khan", email: "sara@example.com", phone: "+91 98765 44444", skills: ["Medical", "Blood Donation", "Elderly Care"], experience: 5, rating: 5.0, completedTasks: 41, available: false, location: { city: "Delhi", lat: 28.6139, lng: 77.209 }, avatar: "SK" },
  { id: "v5", name: "Vikram Iyer", email: "vikram@example.com", phone: "+91 98765 55555", skills: ["Disaster Relief", "Logistics", "First Aid"], experience: 7, rating: 4.6, completedTasks: 67, available: true, location: { city: "Chennai", lat: 13.0827, lng: 80.2707 }, avatar: "VI" },
  { id: "v6", name: "Priya Reddy", email: "priya@example.com", phone: "+91 98765 66666", skills: ["Education", "Translation", "Counseling"], experience: 2, rating: 4.5, completedTasks: 14, available: true, location: { city: "Bengaluru", lat: 12.9716, lng: 77.5946 }, avatar: "PR" },
  { id: "v7", name: "Arjun Nair", email: "arjun@example.com", phone: "+91 98765 77777", skills: ["Food Distribution", "Driving"], experience: 1, rating: 4.3, completedTasks: 8, available: true, location: { city: "Mumbai", lat: 19.05, lng: 72.9 }, avatar: "AN" },
  { id: "v8", name: "Meera Joshi", email: "meera@example.com", phone: "+91 98765 88888", skills: ["Medical", "Elderly Care", "First Aid"], experience: 5, rating: 4.9, completedTasks: 45, available: true, location: { city: "Pune", lat: 18.55, lng: 73.9 }, avatar: "MJ" },
];

export const mockRequests: CommunityRequest[] = [
  { id: "r1", title: "Emergency food supplies for flood victims", description: "200 displaced families need immediate ration kits and clean water.", category: "Disaster Relief", urgency: "critical", status: "open", peopleAffected: 800, requiredSkills: ["Food Distribution", "Logistics", "Driving"], location: { city: "Mumbai", area: "Kurla West", lat: 19.072, lng: 72.879 }, createdAt: "2026-04-26T08:30:00Z", ngoName: "Helping Hands Foundation" },
  { id: "r2", title: "Blood donors needed - O Negative", description: "Critical surgery patient at City Hospital, 4 units required by tomorrow.", category: "Medical Emergency", urgency: "critical", status: "in_progress", peopleAffected: 1, requiredSkills: ["Blood Donation", "Medical"], location: { city: "Delhi", area: "Saket", lat: 28.52, lng: 77.21 }, createdAt: "2026-04-27T14:00:00Z", ngoName: "Red Cross Delhi" },
  { id: "r3", title: "After-school tutoring for slum children", description: "30 children aged 8-14 need volunteers for math and English support.", category: "Education", urgency: "medium", status: "open", peopleAffected: 30, requiredSkills: ["Education", "Counseling"], location: { city: "Mumbai", area: "Dharavi", lat: 19.04, lng: 72.85 }, createdAt: "2026-04-25T10:00:00Z", ngoName: "Asha Education Trust" },
  { id: "r4", title: "Medical camp for elderly residents", description: "Free health checkup for 120 senior citizens at community center.", category: "Elderly Support", urgency: "high", status: "assigned", peopleAffected: 120, requiredSkills: ["Medical", "Elderly Care", "First Aid"], location: { city: "Pune", area: "Kothrud", lat: 18.508, lng: 73.81 }, createdAt: "2026-04-24T09:00:00Z", ngoName: "Senior Care Society" },
  { id: "r5", title: "Daily meal distribution drive", description: "Need volunteers to pack and deliver 500 meals to homeless shelters.", category: "Food Support", urgency: "medium", status: "open", peopleAffected: 500, requiredSkills: ["Food Distribution", "Logistics"], location: { city: "Bengaluru", area: "Indiranagar", lat: 12.97, lng: 77.64 }, createdAt: "2026-04-26T07:00:00Z", ngoName: "Roti Bank Bengaluru" },
  { id: "r6", title: "Cyclone relief - shelter setup", description: "Setting up temporary shelters for 1500 displaced people on coast.", category: "Disaster Relief", urgency: "critical", status: "open", peopleAffected: 1500, requiredSkills: ["Disaster Relief", "Logistics", "First Aid"], location: { city: "Chennai", area: "Marina", lat: 13.05, lng: 80.28 }, createdAt: "2026-04-27T05:00:00Z", ngoName: "CoastalCare NGO" },
  { id: "r7", title: "Winter blanket distribution", description: "Distributing 200 blankets to homeless in city center.", category: "Food Support", urgency: "low", status: "completed", peopleAffected: 200, requiredSkills: ["Logistics", "Food Distribution"], location: { city: "Delhi", area: "Connaught Place", lat: 28.633, lng: 77.219 }, createdAt: "2026-04-15T11:00:00Z", ngoName: "Helping Hands Foundation" },
  { id: "r8", title: "Mental health awareness workshop", description: "Workshop facilitators needed for college students.", category: "Education", urgency: "medium", status: "open", peopleAffected: 150, requiredSkills: ["Counseling", "Education"], location: { city: "Mumbai", area: "Andheri", lat: 19.119, lng: 72.847 }, createdAt: "2026-04-26T13:00:00Z", ngoName: "Mind Matters" },
];

export const mockAssignments: Assignment[] = [
  { id: "a1", requestId: "r2", volunteerId: "v4", confidence: 96, status: "accepted", assignedAt: "2026-04-27T15:00:00Z" },
  { id: "a2", requestId: "r4", volunteerId: "v8", confidence: 92, status: "in_progress", assignedAt: "2026-04-24T11:00:00Z" },
  { id: "a3", requestId: "r4", volunteerId: "v3", confidence: 78, status: "accepted", assignedAt: "2026-04-24T11:30:00Z" },
  { id: "a4", requestId: "r7", volunteerId: "v5", confidence: 85, status: "completed", assignedAt: "2026-04-15T12:00:00Z" },
];

export const mockNotifications: Notification[] = [
  { id: "n1", type: "emergency", title: "Critical: Cyclone relief request", message: "1500 people need shelter setup in Chennai. Volunteers needed urgently.", read: false, createdAt: "2026-04-27T05:05:00Z" },
  { id: "n2", type: "assignment", title: "New task assigned", message: "You've been matched to Medical camp for elderly residents.", read: false, createdAt: "2026-04-24T11:00:00Z" },
  { id: "n3", type: "update", title: "Task completed", message: "Winter blanket distribution marked as completed. Great job!", read: true, createdAt: "2026-04-15T18:00:00Z" },
  { id: "n4", type: "request", title: "New request in your area", message: "After-school tutoring request posted near you.", read: true, createdAt: "2026-04-25T10:05:00Z" },
];

export const mockUsers: User[] = [
  { id: "u1", name: "Admin User", email: "admin@smartaid.org", role: "admin", avatar: "AU" },
  { id: "u2", name: "Helping Hands NGO", email: "ngo@smartaid.org", role: "ngo", avatar: "HH" },
  { id: "u3", name: "Aarav Sharma", email: "volunteer@smartaid.org", role: "volunteer", avatar: "AS", volunteerId: "v1" },
];

// Monthly impact data for charts
export const monthlyImpact = [
  { month: "Nov", requests: 45, completed: 38, volunteers: 120 },
  { month: "Dec", requests: 62, completed: 55, volunteers: 145 },
  { month: "Jan", requests: 78, completed: 71, volunteers: 168 },
  { month: "Feb", requests: 84, completed: 79, volunteers: 192 },
  { month: "Mar", requests: 96, completed: 88, volunteers: 215 },
  { month: "Apr", requests: 112, completed: 94, volunteers: 248 },
];

export const categoryDistribution = [
  { name: "Food Support", value: 32, color: "hsl(217 91% 55%)" },
  { name: "Medical", value: 24, color: "hsl(0 84% 60%)" },
  { name: "Education", value: 18, color: "hsl(199 89% 48%)" },
  { name: "Disaster Relief", value: 14, color: "hsl(38 92% 50%)" },
  { name: "Elderly Support", value: 8, color: "hsl(142 71% 45%)" },
  { name: "Other", value: 4, color: "hsl(215 16% 47%)" },
];

export const areaNeeds = [
  { area: "Mumbai", needs: 42, fulfilled: 35 },
  { area: "Delhi", needs: 38, fulfilled: 31 },
  { area: "Pune", needs: 24, fulfilled: 22 },
  { area: "Chennai", needs: 31, fulfilled: 19 },
  { area: "Bengaluru", needs: 28, fulfilled: 25 },
];

export const responseTimeData = [
  { week: "W1", hours: 8.2 },
  { week: "W2", hours: 6.5 },
  { week: "W3", hours: 5.1 },
  { week: "W4", hours: 4.3 },
  { week: "W5", hours: 3.8 },
  { week: "W6", hours: 3.2 },
];
