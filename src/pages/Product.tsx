import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Eye, Cpu, AlertTriangle, Zap, BarChart3, Shield, Activity, Lock, Globe, Server } from "lucide-react";
import networkViz from "@/assets/network-viz.jpg";

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.section ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className={`section-padding ${className}`}>
      {children}
    </motion.section>
  );
}

const modules = [
  { icon: Activity, title: "Live Log Stream", desc: "Real-time log ingestion from any source. Process millions of events per second with intelligent filtering and pattern matching." },
  { icon: Cpu, title: "AI Anomaly Detection", desc: "Deep learning models trained on your baseline behavior. Detect zero-day threats and insider attacks with 98.7% accuracy." },
  { icon: AlertTriangle, title: "Threat Detection", desc: "Multi-layered threat detection combining signature-based and behavioral analysis. Integrates with global threat intelligence feeds." },
  { icon: Zap, title: "Automated Remediation", desc: "AI-generated response playbooks. Automatically block malicious IPs, quarantine endpoints, and notify security teams." },
  { icon: BarChart3, title: "Risk Dashboard", desc: "Comprehensive risk posture visualization. Track security metrics, compliance status, and vulnerability trends in real-time." },
  { icon: Shield, title: "Risk Scoring", desc: "Dynamic risk scoring engine that considers threat landscape, asset criticality, and vulnerability exposure." },
  { icon: Globe, title: "Geo Attack Map", desc: "Visualize attack origins worldwide. Track adversary TTPs and correlate with geopolitical threat intelligence." },
  { icon: Lock, title: "Compliance Engine", desc: "Automated compliance monitoring for SOC 2, ISO 27001, GDPR, and HIPAA. Generate audit-ready reports instantly." },
  { icon: Server, title: "Infrastructure Monitor", desc: "End-to-end visibility across cloud, on-premise, and hybrid environments. Monitor health, performance, and security posture." },
];

export default function Product() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <Section>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
            The Complete <span className="text-gradient">AI Security</span> Platform
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-16">
            From log ingestion to automated remediation — everything you need to protect your infrastructure.
          </p>
        </div>
      </Section>

      <Section className="bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((m, i) => (
              <motion.div key={m.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="floating-card p-8 group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <m.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-heading font-bold mb-6">Built for <span className="text-gradient">Enterprise Scale</span></h2>
            <div className="space-y-4">
              {[
                "Process 10M+ events per second",
                "99.99% platform uptime SLA",
                "SOC 2 Type II certified",
                "Deploy on-premise or cloud",
                "Role-based access control",
                "API-first architecture",
              ].map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border/30">
            <img src={networkViz} alt="Network visualization" className="w-full h-80 object-cover" loading="lazy" width={1280} height={720} />
          </div>
        </div>
      </Section>
    </div>
  );
}
