import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { toast } from "sonner";
import { Loader2, Building2, HeartHandshake, ShieldCheck } from "lucide-react";
import { UserRole } from "@/lib/types";
import { cn } from "@/lib/utils";

const roles: { id: UserRole; title: string; desc: string; icon: typeof Building2 }[] = [
  { id: "ngo", title: "NGO Manager", desc: "Manage requests, allocate volunteers, track impact", icon: Building2 },
  { id: "volunteer", title: "Volunteer", desc: "Find tasks that match your skills and location", icon: HeartHandshake },
  { id: "admin", title: "Admin", desc: "Oversee the platform and all NGO operations", icon: ShieldCheck },
];

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>("ngo");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(name, email, password, role);
      toast.success("Account created! Welcome to SmartAid.");
      navigate("/dashboard");
    } catch {
      toast.error("Could not create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-soft p-4 py-10">
      <div className="w-full max-w-2xl">
        <Link to="/" className="mb-6 flex justify-center"><Logo /></Link>
        <Card className="p-8 shadow-elegant">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Pick a role to get started.</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={cn(
                  "rounded-xl border p-4 text-left transition-smooth hover:border-primary/50 hover:shadow-soft",
                  role === r.id ? "border-primary bg-primary-soft shadow-soft" : "border-border"
                )}
              >
                <r.icon className={cn("h-5 w-5", role === r.id ? "text-primary" : "text-muted-foreground")} />
                <p className="mt-2 text-sm font-semibold">{r.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{r.desc}</p>
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5" />
            </div>
            <Button type="submit" disabled={loading} className="bg-gradient-primary hover:opacity-90 sm:col-span-2">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Create account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
