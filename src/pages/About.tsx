import { Card } from "@/components/ui/card";
import { Heart, Target, Eye, Users } from "lucide-react";

export default function About() {
  return (
    <div>
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">About SmartAid</span>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">Technology built to amplify human kindness</h1>
          <p className="mt-5 text-lg text-muted-foreground">
            We saw NGOs juggling WhatsApp groups, Google Forms, paper surveys and spreadsheets — losing critical hours
            during emergencies. SmartAid brings everything into one intelligent platform so volunteers reach communities faster.
          </p>
        </div>
      </section>

      <section className="container pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-8 shadow-soft">
            <Target className="h-8 w-8 text-primary" />
            <h3 className="mt-4 text-xl font-semibold">Our Mission</h3>
            <p className="mt-2 text-sm text-muted-foreground">Make community response 10× faster by removing coordination friction between NGOs, volunteers, and the people they serve.</p>
          </Card>
          <Card className="p-8 shadow-soft">
            <Eye className="h-8 w-8 text-accent" />
            <h3 className="mt-4 text-xl font-semibold">Our Vision</h3>
            <p className="mt-2 text-sm text-muted-foreground">A world where every urgent community need is answered within hours, not days — powered by data and human compassion.</p>
          </Card>
          <Card className="p-8 shadow-soft">
            <Heart className="h-8 w-8 text-destructive" />
            <h3 className="mt-4 text-xl font-semibold">Our Values</h3>
            <p className="mt-2 text-sm text-muted-foreground">Empathy first. Transparency in impact. Respect for volunteers' time. Privacy for the communities we serve.</p>
          </Card>
        </div>
      </section>

      <section className="bg-secondary/30 py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <Users className="mx-auto h-10 w-10 text-primary" />
            <h2 className="mt-3 text-3xl font-bold">Built with field NGOs</h2>
            <p className="mt-3 text-muted-foreground">
              SmartAid was co-designed with disaster relief teams, urban food banks, blood donation networks, and rural
              education NGOs across India. Every feature answers a real coordination pain.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
