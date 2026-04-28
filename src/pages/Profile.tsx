import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { mockVolunteers, mockAssignments, mockRequests } from "@/lib/mockData";
import { Star, MapPin, Award, CheckCircle2 } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const volunteer = user?.role === "volunteer" ? mockVolunteers.find((v) => v.id === (user?.volunteerId ?? "v1")) : undefined;
  const myAssignments = volunteer ? mockAssignments.filter((a) => a.volunteerId === volunteer.id) : [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Profile</h1>

      <Card className="overflow-hidden shadow-soft">
        <div className="h-32 bg-gradient-hero" />
        <div className="-mt-12 p-6">
          <div className="flex flex-wrap items-end gap-4">
            <Avatar className="h-24 w-24 border-4 border-card shadow-soft">
              <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl font-bold">
                {user?.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <Badge className="mt-2 capitalize">{user?.role}</Badge>
            </div>
          </div>
        </div>
      </Card>

      {volunteer && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="p-5 shadow-soft text-center">
            <Star className="mx-auto h-6 w-6 fill-warning text-warning" />
            <div className="mt-2 text-2xl font-bold">{volunteer.rating}</div>
            <div className="text-xs text-muted-foreground">Rating</div>
          </Card>
          <Card className="p-5 shadow-soft text-center">
            <CheckCircle2 className="mx-auto h-6 w-6 text-success" />
            <div className="mt-2 text-2xl font-bold">{volunteer.completedTasks}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </Card>
          <Card className="p-5 shadow-soft text-center">
            <Award className="mx-auto h-6 w-6 text-primary" />
            <div className="mt-2 text-2xl font-bold">{volunteer.experience}y</div>
            <div className="text-xs text-muted-foreground">Experience</div>
          </Card>
          <Card className="p-5 shadow-soft text-center">
            <MapPin className="mx-auto h-6 w-6 text-accent" />
            <div className="mt-2 text-2xl font-bold">{volunteer.location.city}</div>
            <div className="text-xs text-muted-foreground">Location</div>
          </Card>
        </div>
      )}

      <Card className="p-6 shadow-soft">
        <h3 className="font-semibold">Account details</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div><Label>Full name</Label><Input defaultValue={user?.name} className="mt-1.5" /></div>
          <div><Label>Email</Label><Input defaultValue={user?.email} className="mt-1.5" /></div>
          <div><Label>Phone</Label><Input defaultValue={volunteer?.phone ?? ""} className="mt-1.5" placeholder="+91 ..." /></div>
          <div><Label>City</Label><Input defaultValue={volunteer?.location.city ?? ""} className="mt-1.5" /></div>
        </div>
        <Button className="mt-5 bg-gradient-primary hover:opacity-90">Save changes</Button>
      </Card>

      {volunteer && (
        <Card className="p-6 shadow-soft">
          <h3 className="font-semibold">Skills</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {volunteer.skills.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}
          </div>
        </Card>
      )}

      {myAssignments.length > 0 && (
        <Card className="p-6 shadow-soft">
          <h3 className="font-semibold">My recent assignments</h3>
          <div className="mt-4 space-y-3">
            {myAssignments.map((a) => {
              const r = mockRequests.find((x) => x.id === a.requestId);
              if (!r) return null;
              return (
                <div key={a.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="font-medium">{r.title}</p>
                    <p className="text-xs text-muted-foreground">{r.location.area}, {r.location.city}</p>
                  </div>
                  <Badge variant="outline" className="capitalize">{a.status.replace("_", " ")}</Badge>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
