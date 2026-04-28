import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { mockVolunteers } from "@/lib/mockData";
import { Search, Star, MapPin, Award, Phone, Mail } from "lucide-react";

export default function Volunteers() {
  const [search, setSearch] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const filtered = useMemo(() => {
    return mockVolunteers
      .filter((v) =>
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.skills.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
        v.location.city.toLowerCase().includes(search.toLowerCase())
      )
      .filter((v) => !onlyAvailable || v.available);
  }, [search, onlyAvailable]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Volunteers</h1>
        <p className="text-muted-foreground">{filtered.length} of {mockVolunteers.length} volunteers</p>
      </div>

      <Card className="flex flex-wrap items-center gap-4 p-4 shadow-soft">
        <div className="relative min-w-[260px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" placeholder="Search by name, skill, city..." />
        </div>
        <div className="flex items-center gap-2">
          <Switch id="avail" checked={onlyAvailable} onCheckedChange={setOnlyAvailable} />
          <Label htmlFor="avail" className="cursor-pointer">Available only</Label>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((v) => (
          <Card key={v.id} className="p-6 shadow-soft transition-smooth hover:shadow-elegant hover:-translate-y-0.5">
            <div className="flex items-start gap-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg font-semibold">{v.avatar}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="truncate font-semibold">{v.name}</h3>
                  <Badge variant={v.available ? "default" : "secondary"} className={v.available ? "bg-success/15 text-success hover:bg-success/15" : ""}>
                    {v.available ? "Available" : "Busy"}
                  </Badge>
                </div>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-0.5"><Star className="h-3 w-3 fill-warning text-warning" />{v.rating}</span>
                  <span className="inline-flex items-center gap-1"><Award className="h-3 w-3" />{v.experience}y exp</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{v.location.city}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-1">
              {v.skills.map((s) => <Badge key={s} variant="outline" className="text-xs">{s}</Badge>)}
            </div>
            <div className="mt-4 flex items-center justify-between border-t pt-3 text-xs">
              <span className="text-muted-foreground">{v.completedTasks} completed</span>
              <div className="flex gap-2 text-muted-foreground">
                <Mail className="h-3.5 w-3.5" /><Phone className="h-3.5 w-3.5" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
