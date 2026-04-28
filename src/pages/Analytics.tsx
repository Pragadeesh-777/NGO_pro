import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, RadialBarChart, RadialBar, Legend, PieChart, Pie, Cell,
} from "recharts";
import { monthlyImpact, areaNeeds, responseTimeData, categoryDistribution } from "@/lib/mockData";
import { Download, Clock, Users, TrendingUp, Target } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { toast } from "sonner";

export default function Analytics() {
  const exportReport = () => {
    const data = JSON.stringify({ monthlyImpact, areaNeeds, responseTimeData, categoryDistribution }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "smartaid-analytics-report.json"; a.click();
    URL.revokeObjectURL(url);
    toast.success("Report exported");
  };

  const engagement = [
    { name: "Engagement", value: 87, fill: "hsl(var(--primary))" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Insights into impact, response, and engagement.</p>
        </div>
        <Button variant="outline" onClick={exportReport}><Download className="mr-2 h-4 w-4" />Export report</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Avg Response Time" value="3.2h" icon={<Clock className="h-5 w-5" />} change={-18} accent="success" />
        <StatCard label="Volunteer Engagement" value="87%" icon={<Users className="h-5 w-5" />} change={6} accent="primary" />
        <StatCard label="Resource Efficiency" value="92%" icon={<Target className="h-5 w-5" />} change={4} accent="warning" />
        <StatCard label="Monthly Growth" value="+22%" icon={<TrendingUp className="h-5 w-5" />} change={11} accent="success" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 shadow-soft">
          <h3 className="font-semibold">Response Time (hours)</h3>
          <p className="text-sm text-muted-foreground">Lower is better — improving each week.</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
              <Line type="monotone" dataKey="hours" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: "hsl(var(--primary))", r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 shadow-soft">
          <h3 className="font-semibold">Volunteer Engagement</h3>
          <p className="text-sm text-muted-foreground">Active volunteers / total this month</p>
          <ResponsiveContainer width="100%" height={260}>
            <RadialBarChart innerRadius="60%" outerRadius="100%" data={engagement} startAngle={90} endAngle={-270}>
              <RadialBar background dataKey="value" cornerRadius={20} />
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-foreground" style={{ fontSize: 36, fontWeight: 700 }}>
                87%
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 shadow-soft">
          <h3 className="font-semibold">Area-wise Needs vs Fulfilled</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={areaNeeds}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="area" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="needs" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              <Bar dataKey="fulfilled" fill="hsl(var(--success))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 shadow-soft">
          <h3 className="font-semibold">Resource Allocation</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={categoryDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {categoryDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 shadow-soft lg:col-span-2">
          <h3 className="font-semibold">Monthly Impact Report</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyImpact}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="requests" stroke="hsl(var(--primary))" strokeWidth={2} />
              <Line type="monotone" dataKey="completed" stroke="hsl(var(--success))" strokeWidth={2} />
              <Line type="monotone" dataKey="volunteers" stroke="hsl(var(--accent))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
