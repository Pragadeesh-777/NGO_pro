import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
        <Heart className="h-5 w-5 text-primary-foreground" fill="currentColor" />
      </div>
      {showText && (
        <span className="text-xl font-bold tracking-tight">
          Smart<span className="text-gradient">Aid</span>
        </span>
      )}
    </div>
  );
}
