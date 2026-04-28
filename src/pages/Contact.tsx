import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! We'll be in touch soon.");
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  return (
    <div className="container py-16">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Get in touch</h1>
          <p className="mt-3 text-muted-foreground">Have questions about onboarding your NGO? We'd love to help.</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Card className="p-6 text-center shadow-soft"><Mail className="mx-auto h-6 w-6 text-primary" /><p className="mt-2 font-semibold">Email</p><p className="text-sm text-muted-foreground">hello@smartaid.org</p></Card>
          <Card className="p-6 text-center shadow-soft"><Phone className="mx-auto h-6 w-6 text-primary" /><p className="mt-2 font-semibold">Phone</p><p className="text-sm text-muted-foreground">+91 22 6789 1234</p></Card>
          <Card className="p-6 text-center shadow-soft"><MapPin className="mx-auto h-6 w-6 text-primary" /><p className="mt-2 font-semibold">Office</p><p className="text-sm text-muted-foreground">Mumbai, India</p></Card>
        </div>

        <Card className="mt-8 p-8 shadow-soft">
          <form onSubmit={submit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div><Label htmlFor="n">Name</Label><Input id="n" required className="mt-1.5" /></div>
              <div><Label htmlFor="e">Email</Label><Input id="e" type="email" required className="mt-1.5" /></div>
            </div>
            <div><Label htmlFor="org">Organization</Label><Input id="org" className="mt-1.5" /></div>
            <div><Label htmlFor="m">Message</Label><Textarea id="m" rows={5} required className="mt-1.5" /></div>
            <Button type="submit" disabled={sending} className="bg-gradient-primary hover:opacity-90">
              {sending ? "Sending..." : "Send message"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
