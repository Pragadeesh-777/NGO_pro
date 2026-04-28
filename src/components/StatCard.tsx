import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  change?: number;
  accent?: "primary" | "success" | "warning" | "destructive";
}

const accentMap = {
  primary: "from-primary/10 to-primary/5 text-primary",
  success: "from-success/10 to-success/5 text-success",
  warning: "from-warning/10 to-warning/5 text-warning",
  destructive: "from-destructive/10 to-destructive/5 text-destructive",
};

export function StatCard({ label, value, icon, change, accent = "primary" }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden p-6 shadow-soft transition-smooth hover:shadow-elegant hover:-translate-y-0.5">
      <div className={cn("absolute right-0 top-0 h-24 w-24 rounded-full bg-gradient-to-br blur-2xl opacity-60", accentMap[accent])} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
          {change !== undefined && (
            <div className={cn("mt-2 inline-flex items-center gap-1 text-xs font-medium", change >= 0 ? "text-success" : "text-destructive")}>
              {change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {Math.abs(change)}% vs last month
            </div>
          )}
        </div>
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br", accentMap[accent])}>
          {icon}
        </div>
      </div>
    </Card>
  );
}
