import { Volunteer, CommunityRequest } from "./types";

// Haversine distance in km
export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

const URGENCY_WEIGHT: Record<string, number> = { low: 1, medium: 1.2, high: 1.5, critical: 2 };

// Smart matching score (0-100)
export function matchScore(volunteer: Volunteer, request: CommunityRequest): number {
  if (!volunteer.available) return 0;

  const skillOverlap = request.requiredSkills.filter((s) => volunteer.skills.includes(s)).length;
  const skillScore = request.requiredSkills.length
    ? (skillOverlap / request.requiredSkills.length) * 50
    : 25;

  const dist = distanceKm(volunteer.location, request.location);
  // Closer = better. 0km => 30, 50km+ => 0
  const distanceScore = Math.max(0, 30 - dist * 0.6);

  const ratingScore = (volunteer.rating / 5) * 10;
  const experienceScore = Math.min(volunteer.experience, 10);

  const raw = skillScore + distanceScore + ratingScore + experienceScore;
  const urgencyMultiplier = URGENCY_WEIGHT[request.urgency] ?? 1;
  return Math.min(100, Math.round(raw * (0.85 + 0.15 * urgencyMultiplier / 2)));
}

export function recommendVolunteers(request: CommunityRequest, volunteers: Volunteer[], limit = 5) {
  return volunteers
    .map((v) => ({ volunteer: v, score: matchScore(v, request), distance: distanceKm(v.location, request.location) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

// Priority score for triage (0-100)
export function priorityScore(req: CommunityRequest): number {
  const urgency = URGENCY_WEIGHT[req.urgency] ?? 1;
  const peopleFactor = Math.min(50, Math.log10(req.peopleAffected + 1) * 18);
  const ageHours = (Date.now() - new Date(req.createdAt).getTime()) / 3600000;
  const ageFactor = Math.min(20, ageHours * 0.5);
  return Math.min(100, Math.round(urgency * 25 + peopleFactor + ageFactor));
}
