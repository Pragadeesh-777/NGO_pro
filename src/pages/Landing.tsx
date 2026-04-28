import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Heart, MapPin, Sparkles, Users, ShieldCheck, Activity, BarChart3, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImg from "@/assets/hero-volunteers.jpg";
import { useEffect, useState } from "react";

function useCountUp(target: number, duration = 1500) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setN(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return n;
}

const stats = [
  { value: 12450, suffix: "+", label: "Active Volunteers" },
  { value: 3820, suffix: "+", label: "Requests Resolved" },
  { value: 96, suffix: "%", label: "Match Accuracy" },
  { value: 4, suffix: "h", label: "Avg Response Time" },
];

const features = [
  { icon: Sparkles, title: "Smart Allocation", desc: "AI-powered matching pairs the right volunteer with each request based on skills, location, and availability." },
  { icon: Activity, title: "Priority Triage", desc: "Real-time scoring surfaces critical needs first, so urgent cases never get lost in the noise." },
  { icon: MapPin, title: "Live Map View", desc: "See requests, volunteers, and resource centers on an interactive map. Coordinate field teams in seconds." },
  { icon: BarChart3, title: "Impact Analytics", desc: "Track response time, area-wise needs, and monthly impact with beautiful interactive dashboards." },
  { icon: ShieldCheck, title: "Role-Based Access", desc: "Secure workflows for Admins, NGO Managers and Volunteers with JWT-based authentication." },
  { icon: Heart, title: "Built for Impact", desc: "Designed with field NGOs to handle real chaos: surveys, WhatsApp messages, spreadsheets — all unified." },
];

const steps = [
  { n: "01", title: "Collect", desc: "NGOs log community needs via web, mobile, or import from spreadsheets and chat." },
  { n: "02", title: "Prioritize", desc: "Our AI scores urgency using affected population, time, and severity signals." },
  { n: "03", title: "Match", desc: "Top volunteers are recommended with confidence scores in seconds." },
  { n: "04", title: "Deliver", desc: "Track progress live, capture impact, and report back to stakeholders." },
];

const testimonials = [
  { name: "Anjali Verma", role: "Director, Helping Hands", text: "SmartAid cut our response time by 60%. We now reach families during disasters when minutes matter." },
  { name: "Rajesh Kumar", role: "Volunteer Coordinator", text: "The matching is uncanny. Volunteers feel valued because tasks actually fit their skills." },
  { name: "Dr. Fatima A.", role: "Mobile Clinic Lead", text: "We finally have one place to see needs and resources. Game-changer for medical camps." },
];

export default function Landing() {
  const c1 = useCountUp(stats[0].value);
  const c2 = useCountUp(stats[1].value);
  const c3 = useCountUp(stats[2].value);
  const c4 = useCountUp(stats[3].value);
  const counts = [c1, c2, c3, c4];

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-soft" />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="container relative grid gap-10 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              Live in 12 cities · 30+ NGOs onboard
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Coordinate volunteers.<br />
              <span className="text-gradient">Multiply impact.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              SmartAid unifies community needs, prioritizes urgent cases, and matches the right volunteers in seconds —
              so your NGO spends less time coordinating and more time helping.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-primary shadow-glow hover:opacity-90">
                <Link to="/signup">Start free <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/about">See how it works</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-primary opacity-20 blur-3xl" />
            <div className="overflow-hidden rounded-3xl border bg-card shadow-elegant">
              <img src={heroImg} alt="Volunteers helping community" width={1280} height={960} className="w-full" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border bg-card p-4 shadow-elegant md:block animate-float">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/15"><Users className="h-5 w-5 text-success" /></div>
                <div>
                  <p className="text-xs text-muted-foreground">Matched today</p>
                  <p className="text-lg font-bold">+248 volunteers</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="container relative pb-16">
          <div className="grid grid-cols-2 gap-4 rounded-2xl border bg-card/80 p-6 shadow-soft backdrop-blur md:grid-cols-4 md:p-8">
            {stats.map((s, i) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-gradient md:text-4xl">{counts[i].toLocaleString()}{s.suffix}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Features</span>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Everything your NGO needs in one place</h2>
          <p className="mt-3 text-muted-foreground">From intake to impact — built with volunteer coordinators in mind.</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Card className="group h-full p-6 transition-smooth hover:shadow-elegant hover:-translate-y-1">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary transition-smooth group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-secondary/30 py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">How it works</span>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">From chaos to coordination in 4 steps</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Card key={s.n} className="relative p-6 shadow-soft">
                <div className="text-4xl font-bold text-gradient opacity-30">{s.n}</div>
                <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Loved by NGOs</span>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Stories from the field</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="p-6 shadow-soft">
              <Quote className="h-6 w-6 text-primary/40" />
              <p className="mt-3 text-sm leading-relaxed">{t.text}</p>
              <div className="mt-5 flex items-center gap-3 border-t pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground">
                  {t.name.split(" ").map((p) => p[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 text-center text-primary-foreground md:p-16">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white, transparent 50%)" }} />
          <div className="relative">
            <h2 className="text-3xl font-bold md:text-4xl">Ready to multiply your impact?</h2>
            <p className="mx-auto mt-3 max-w-xl opacity-90">Join hundreds of NGOs using SmartAid to coordinate volunteers and respond to community needs faster.</p>
            <Button asChild size="lg" variant="secondary" className="mt-6">
              <Link to="/signup">Create your free account <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
