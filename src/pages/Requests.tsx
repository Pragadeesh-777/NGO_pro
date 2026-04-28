import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { mockRequests } from "@/lib/mockData";
import { CommunityRequest, Urgency, RequestStatus } from "@/lib/types";
import { UrgencyBadge } from "@/components/UrgencyBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { priorityScore } from "@/lib/matching";
import { Plus, Search, Download, MapPin, Users as UsersIcon } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const CATEGORIES = ["Food Support", "Medical Emergency", "Education", "Disaster Relief", "Blood Donation", "Elderly Support"];
const SKILLS = ["Medical", "First Aid", "Driving", "Education", "Counseling", "Logistics", "Food Distribution", "Disaster Relief", "Blood Donation", "Elderly Care", "Translation"];

export default function Requests() {
  const [requests, setRequests] = useState<CommunityRequest[]>(mockRequests);
  const [search, setSearch] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    title: "", description: "", category: "Food Support", urgency: "medium" as Urgency,
    peopleAffected: 1, area: "", city: "", skills: [] as string[],
  });

  const filtered = useMemo(() => {
    return requests
      .filter((r) =>
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.location.area.toLowerCase().includes(search.toLowerCase()) ||
        r.location.city.toLowerCase().includes(search.toLowerCase())
      )
      .filter((r) => urgencyFilter === "all" || r.urgency === urgencyFilter)
      .filter((r) => statusFilter === "all" || r.status === statusFilter)
      .map((r) => ({ ...r, priority: priorityScore(r) }))
      .sort((a, b) => b.priority - a.priority);
  }, [requests, search, urgencyFilter, statusFilter]);

  const create = () => {
    if (!form.title.trim() || !form.area.trim()) return toast.error("Title and area required");
    const newReq: CommunityRequest = {
      id: `r_${Date.now()}`,
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      urgency: form.urgency,
      status: "open",
      peopleAffected: Number(form.peopleAffected) || 1,
      requiredSkills: form.skills.length ? form.skills : ["Logistics"],
      location: { city: form.city || "Mumbai", area: form.area, lat: 19.076 + Math.random() * 0.1, lng: 72.877 + Math.random() * 0.1 },
      createdAt: new Date().toISOString(),
      ngoName: "Your NGO",
    };
    setRequests([newReq, ...requests]);
    setOpen(false);
    setForm({ ...form, title: "", description: "", area: "", peopleAffected: 1, skills: [] });
    toast.success("Request created");
  };

  const exportCsv = () => {
    const header = "id,title,category,urgency,status,people,city,area,createdAt\n";
    const rows = filtered.map((r) => `${r.id},"${r.title}",${r.category},${r.urgency},${r.status},${r.peopleAffected},${r.location.city},${r.location.area},${r.createdAt}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "smartaid-requests.csv"; a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported");
  };

  const toggleSkill = (s: string) => {
    setForm((f) => ({ ...f, skills: f.skills.includes(s) ? f.skills.filter((x) => x !== s) : [...f.skills, s] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community Requests</h1>
          <p className="text-muted-foreground">Manage and prioritize incoming needs.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportCsv}><Download className="mr-2 h-4 w-4" />Export CSV</Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary hover:opacity-90"><Plus className="mr-2 h-4 w-4" />New Request</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create community request</DialogTitle>
                <DialogDescription>Capture a new need so volunteers can be matched.</DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <div><Label>Title</Label><Input className="mt-1.5" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
                <div><Label>Description</Label><Textarea className="mt-1.5" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Category</Label>
                    <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                      <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                      <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Urgency</Label>
                    <Select value={form.urgency} onValueChange={(v) => setForm({ ...form, urgency: v as Urgency })}>
                      <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>City</Label><Input className="mt-1.5" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Mumbai" /></div>
                  <div><Label>Area</Label><Input className="mt-1.5" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} placeholder="Andheri West" /></div>
                </div>
                <div><Label>People affected</Label><Input type="number" min={1} className="mt-1.5" value={form.peopleAffected} onChange={(e) => setForm({ ...form, peopleAffected: Number(e.target.value) })} /></div>
                <div>
                  <Label>Required skills</Label>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {SKILLS.map((s) => (
                      <Badge key={s} variant={form.skills.includes(s) ? "default" : "outline"} onClick={() => toggleSkill(s)} className="cursor-pointer">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button className="bg-gradient-primary" onClick={create}>Create request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="p-4 shadow-soft">
        <div className="flex flex-wrap gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" placeholder="Search by title or location..." />
          </div>
          <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
            <SelectTrigger className="w-[160px]"><SelectValue placeholder="Urgency" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All urgency</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((r) => (
          <Card key={r.id} className="group p-5 shadow-soft transition-smooth hover:shadow-elegant hover:-translate-y-0.5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <UrgencyBadge urgency={r.urgency} />
                  <StatusBadge status={r.status} />
                  <Badge variant="outline" className="text-xs">{r.category}</Badge>
                </div>
                <h3 className="mt-2.5 font-semibold leading-snug">{r.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{r.description}</p>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Priority</div>
                <div className="text-2xl font-bold text-gradient">{r.priority}</div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t pt-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{r.location.area}, {r.location.city}</span>
              <span className="inline-flex items-center gap-1"><UsersIcon className="h-3 w-3" />{r.peopleAffected.toLocaleString()} affected</span>
              <Button asChild size="sm" variant="ghost" className="h-7 px-2 text-xs">
                <Link to={`/allocation?request=${r.id}`}>Find volunteers →</Link>
              </Button>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card className="col-span-full p-10 text-center text-muted-foreground">No requests match these filters.</Card>
        )}
      </div>
    </div>
  );
}
