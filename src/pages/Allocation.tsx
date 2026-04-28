import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockRequests, mockVolunteers } from "@/lib/mockData";
import { recommendVolunteers, priorityScore } from "@/lib/matching";
import { UrgencyBadge } from "@/components/UrgencyBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { Sparkles, MapPin, Star, CheckCircle2, Send } from "lucide-react";
import { toast } from "sonner";

export default function Allocation() {
  const [params] = useSearchParams();
  const initial = params.get("request") ?? mockRequests[0].id;
  const [selectedId, setSelectedId] = useState<string>(initial);
  const [assigned, setAssigned] = useState<Set<string>>(new Set());

  const request = mockRequests.find((r) => r.id === selectedId) ?? mockRequests[0];
  const recs = useMemo(() => recommendVolunteers(request, mockVolunteers, 6), [request]);
  const priority = priorityScore(request);

  const assign = (vid: string, name: string) => {
    setAssigned((s) => new Set(s).add(vid));
    toast.success(`${name} notified — assignment sent`);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-primary shadow-soft">
          <Sparkles className="h-3 w-3" /> AI-powered matching
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Smart Volunteer Allocation</h1>
        <p className="text-muted-foreground">We rank volunteers by skills overlap, distance, rating, and availability.</p>
      </div>

      <Card className="p-6 shadow-soft">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <UrgencyBadge urgency={request.urgency} />
              <StatusBadge status={request.status} />
              <Badge variant="outline">{request.category}</Badge>
            </div>
            <h2 className="mt-2 text-xl font-semibold">{request.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{request.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{request.location.area}, {request.location.city}</span>
              <span>{request.peopleAffected.toLocaleString()} people affected</span>
              <span>By {request.ngoName}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {request.requiredSkills.map((s) => (<Badge key={s} variant="secondary">{s}</Badge>))}
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Priority Score</div>
              <div className="text-4xl font-bold text-gradient">{priority}</div>
            </div>
            <Select value={selectedId} onValueChange={setSelectedId}>
              <SelectTrigger className="w-[260px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                {mockRequests.map((r) => (
                  <SelectItem key={r.id} value={r.id}>{r.title.slice(0, 40)}{r.title.length > 40 ? "…" : ""}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Recommended volunteers</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recs.map(({ volunteer: v, score, distance }) => {
            const isAssigned = assigned.has(v.id);
            const matched = request.requiredSkills.filter((s) => v.skills.includes(s));
            return (
              <Card key={v.id} className="group p-5 shadow-soft transition-smooth hover:shadow-elegant hover:-translate-y-0.5">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">{v.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="truncate font-semibold">{v.name}</p>
                      {v.available ? <span className="h-2 w-2 rounded-full bg-success" /> : <span className="h-2 w-2 rounded-full bg-muted-foreground" />}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-0.5"><Star className="h-3 w-3 fill-warning text-warning" />{v.rating}</span>
                      <span>·</span>
                      <span>{v.completedTasks} tasks</span>
                      <span>·</span>
                      <span>{distance.toFixed(1)} km</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Match confidence</span>
                    <span className="font-semibold text-primary">{score}%</span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {v.skills.map((s) => (
                    <Badge key={s} variant={matched.includes(s) ? "default" : "outline"} className="text-[10px]">{s}</Badge>
                  ))}
                </div>

                <Button
                  onClick={() => assign(v.id, v.name)}
                  disabled={isAssigned || !v.available}
                  className={`mt-4 w-full ${isAssigned ? "" : "bg-gradient-primary hover:opacity-90"}`}
                  variant={isAssigned ? "secondary" : "default"}
                >
                  {isAssigned ? <><CheckCircle2 className="mr-2 h-4 w-4" />Assigned</> : <><Send className="mr-2 h-4 w-4" />Assign volunteer</>}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
