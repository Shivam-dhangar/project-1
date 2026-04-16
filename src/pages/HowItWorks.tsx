import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.section ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className={`section-padding ${className}`}>
      {children}
    </motion.section>
  );
}

const steps = [
  { num: "01", title: "Connect Your Data Sources", desc: "Integrate logs from any source — SIEM, cloud providers, endpoints, firewalls, identity providers. Our ingestion engine supports 200+ data formats out of the box.", details: ["AWS CloudTrail, Azure AD, GCP Audit Logs", "Okta, CrowdStrike, SentinelOne, Palo Alto", "Custom REST APIs and Syslog"] },
  { num: "02", title: "AI Learns Your Baseline", desc: "Our ML models analyze weeks of historical data to establish your normal behavior patterns. Every environment is unique — our models adapt to yours.", details: ["User behavior analytics (UEBA)", "Network traffic baselines", "Application activity patterns"] },
  { num: "03", title: "Real-Time Anomaly Detection", desc: "Once baselines are established, the AI continuously monitors all activity. Deviations trigger immediate analysis and scoring.", details: ["Sub-second detection latency", "98.7% accuracy, 1.3% false positive rate", "Contextual correlation across sources"] },
  { num: "04", title: "Alert, Respond & Remediate", desc: "When threats are confirmed, the platform generates detailed alerts with context, severity scoring, and AI-suggested remediation steps.", details: ["Automated response playbooks", "Integration with Slack, PagerDuty, Jira", "One-click remediation actions"] },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <Section>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
            How Onewatch AI <span className="text-gradient">Works</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From integration to automated response — see how our AI protects your infrastructure step by step.
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto space-y-8">
          {steps.map((step, i) => (
            <motion.div key={step.num} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="floating-card p-8 lg:p-10">
              <div className="flex items-start gap-6">
                <div className="text-5xl font-heading font-bold text-primary/20 shrink-0">{step.num}</div>
                <div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{step.desc}</p>
                  <div className="space-y-2">
                    {step.details.map((d) => (
                      <div key={d} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ChevronRight className="w-3 h-3 text-primary shrink-0" />
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to See It in Action?</h2>
          <p className="text-muted-foreground mb-8">Try the interactive demo with real dashboards and simulated threat data.</p>
          <Link to="/demo" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-7 py-3.5 rounded-lg glow-primary hover:opacity-90 transition-all">
            Launch Demo
          </Link>
        </div>
      </Section>
    </div>
  );
}
