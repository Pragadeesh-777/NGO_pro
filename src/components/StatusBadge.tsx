import { cn } from "@/lib/utils";
import { RequestStatus } from "@/lib/types";

const styles: Record<RequestStatus, string> = {
  open: "bg-primary/10 text-primary",
  assigned: "bg-accent/15 text-accent",
  in_progress: "bg-warning/15 text-warning",
  completed: "bg-success/15 text-success",
  cancelled: "bg-muted text-muted-foreground",
};

const labels: Record<RequestStatus, string> = {
  open: "Open",
  assigned: "Assigned",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

export function StatusBadge({ status, className }: { status: RequestStatus; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", styles[status], className)}>
      {labels[status]}
    </span>
  );
}
