import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockNotifications } from "@/lib/mockData";
import { AlertTriangle, Bell, CheckCircle2, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { Notification } from "@/lib/types";

const ICON: Record<Notification["type"], { icon: typeof Bell; color: string }> = {
  emergency: { icon: AlertTriangle, color: "text-destructive bg-destructive/10" },
  assignment: { icon: ClipboardList, color: "text-primary bg-primary/10" },
  update: { icon: CheckCircle2, color: "text-success bg-success/10" },
  request: { icon: Bell, color: "text-accent bg-accent/10" },
};

export default function Notifications() {
  const [list, setList] = useState(mockNotifications);
  const markAll = () => setList(list.map((n) => ({ ...n, read: true })));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Stay on top of urgent requests and assignments.</p>
        </div>
        <Button variant="outline" onClick={markAll}>Mark all as read</Button>
      </div>

      <div className="space-y-3">
        {list.map((n) => {
          const { icon: Icon, color } = ICON[n.type];
          return (
            <Card key={n.id} className={cn("flex items-start gap-4 p-5 shadow-soft transition-smooth hover:shadow-elegant", !n.read && "border-l-4 border-l-primary")}>
              <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", color)}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{n.title}</p>
                  {!n.read && <Badge className="h-5 bg-primary text-primary-foreground">New</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">{n.message}</p>
                <p className="mt-1 text-xs text-muted-foreground">{new Date(n.createdAt).toLocaleString()}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
