import { useAuth } from "@/context/AuthContext";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, ClipboardList, CheckCircle2, AlertTriangle, ArrowRight, TrendingUp } from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";
import { mockRequests, mockVolunteers, mockAssignments, monthlyImpact, categoryDistribution, areaNeeds } from "@/lib/mockData";
import { Link } from "react-router-dom";
import { UrgencyBadge } from "@/components/UrgencyBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { priorityScore } from "@/lib/matching";

export default function Dashboard() {
  const { user } = useAuth();
  const role = user?.role ?? "volunteer";

  const totalVolunteers = mockVolunteers.length;
  const activeRequests = mockRequests.filter((r) => r.status !== "completed" && r.status !== "cancelled").length;
  const completed = mockRequests.filter((r) => r.status === "completed").length + mockAssignments.filter((a) => a.status === "completed").length;
  const critical = mockRequests.filter((r) => r.urgency === "critical").length;

  const topRequests = [...mockRequests]
    .map((r) => ({ ...r, priority: priorityScore(r) }))
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 5);

  // Volunteer view: their assignments
  const myAssignments = role === "volunteer"
    ? mockAssignments.filter((a) => a.volunteerId === (user?.volunteerId ?? "v1"))
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-muted-foreground">
          {role === "admin" && "Platform overview across all NGOs and volunteers."}
          {role === "ngo" && "Here's what's happening with your community requests."}
          {role === "volunteer" && "Tasks matched to your skills and location."}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label={role === "volunteer" ? "Tasks Assigned" : "Total Volunteers"} value={role === "volunteer" ? myAssignments.length : totalVolunteers.toLocaleString()} icon={<Users className="h-5 w-5" />} change={12} accent="primary" />
        <StatCard label="Active Requests" value={activeRequests} icon={<ClipboardList className="h-5 w-5" />} change={8} accent="warning" />
        <StatCard label="Completed Tasks" value={completed} icon={<CheckCircle2 className="h-5 w-5" />} change={24} accent="success" />
        <StatCard label="High Priority" value={critical} icon={<AlertTriangle className="h-5 w-5" />} change={-5} accent="destructive" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Monthly Impact</h3>
              <p className="text-sm text-muted-foreground">Requests handled vs volunteers active</p>
            </div>
            <Badge variant="secondary" className="gap-1"><TrendingUp className="h-3 w-3" />+22%</Badge>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyImpact}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
              <Area type="monotone" dataKey="completed" stroke="hsl(var(--primary))" fill="url(#g1)" strokeWidth={2} />
              <Area type="monotone" dataKey="volunteers" stroke="hsl(var(--accent))" fill="url(#g2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 shadow-soft">
          <h3 className="text-lg font-semibold">Resource Distribution</h3>
          <p className="text-sm text-muted-foreground">By category</p>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={categoryDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3}>
                {categoryDistribution.map((entry, i) => (<Cell key={i} fill={entry.color} />))}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {categoryDistribution.map((c) => (
              <div key={c.name} className="flex items-center gap-2 text-xs">
                <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />
                <span className="text-muted-foreground truncate">{c.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Priority Queue</h3>
            <Button asChild variant="ghost" size="sm">
              <Link to="/requests">View all <ArrowRight className="ml-1 h-3 w-3" /></Link>
            </Button>
          </div>
          <div className="space-y-3">
            {topRequests.map((r) => (
              <Link key={r.id} to="/requests" className="flex items-center justify-between rounded-xl border bg-card p-4 transition-smooth hover:border-primary/40 hover:shadow-soft">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <UrgencyBadge urgency={r.urgency} />
                    <StatusBadge status={r.status} />
                    <span className="text-xs text-muted-foreground">{r.location.area}, {r.location.city}</span>
                  </div>
                  <p className="mt-1.5 truncate font-medium">{r.title}</p>
                  <p className="text-xs text-muted-foreground">{r.peopleAffected.toLocaleString()} people affected</p>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-xs text-muted-foreground">Priority</div>
                  <div className="text-2xl font-bold text-gradient">{r.priority}</div>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        <Card className="p-6 shadow-soft">
          <h3 className="text-lg font-semibold">Area-wise Needs</h3>
          <p className="text-sm text-muted-foreground">Needs vs fulfilled</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={areaNeeds}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="area" stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="needs" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              <Bar dataKey="fulfilled" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
