import { cn } from "@/lib/utils";
import { Urgency } from "@/lib/types";

const urgencyStyles: Record<Urgency, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-accent/15 text-accent",
  high: "bg-warning/15 text-warning",
  critical: "bg-destructive/15 text-destructive animate-pulse-glow",
};

const labels: Record<Urgency, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

export function UrgencyBadge({ urgency, className }: { urgency: Urgency; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold", urgencyStyles[urgency], className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", urgency === "critical" ? "bg-destructive" : urgency === "high" ? "bg-warning" : urgency === "medium" ? "bg-accent" : "bg-muted-foreground")} />
      {labels[urgency]}
    </span>
  );
}
