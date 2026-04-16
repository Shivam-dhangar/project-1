import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Activity, AlertTriangle, BarChart3, Cpu, Lock, Eye, Zap, ArrowRight, ChevronRight, Server, Globe, Code, Database, Cloud, Terminal } from "lucide-react";
import heroCyber from "@/assets/hero-cyber.jpg";
import datacenter from "@/assets/datacenter.jpg";
import networkViz from "@/assets/network-viz.jpg";

function AnimatedCounter({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function SectionWrapper({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`section-padding ${className}`}
    >
      {children}
    </motion.section>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroCyber} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass-panel px-4 py-2 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-medium text-muted-foreground">AI-Powered Threat Detection</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6"
            >
              Detect Threats
              <br />
              <span className="text-gradient">Before They Strike</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed"
            >
              Onewatch AI continuously monitors your infrastructure with advanced machine learning to detect anomalies, predict threats, and automate response — in real time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/demo"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-7 py-3.5 rounded-lg glow-primary hover:opacity-90 transition-all duration-300"
              >
                Start Free Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/product"
                className="inline-flex items-center gap-2 glass-panel px-7 py-3.5 text-foreground font-medium hover:border-primary/30 transition-all duration-300"
              >
                Explore Product
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Threats Blocked", value: 12847, suffix: "+", icon: Shield },
                { label: "Logs Analyzed", value: 2400000, suffix: "", icon: Activity },
                { label: "Avg Response", value: 0.3, suffix: "s", icon: Zap },
                { label: "Uptime", value: 99.99, suffix: "%", icon: Lock },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.15 }}
                  className="floating-card p-6"
                >
                  <stat.icon className="w-5 h-5 text-primary mb-3" />
                  <div className="stat-number text-2xl text-foreground mb-1">
                    {stat.value >= 1000 ? (
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    ) : (
                      <>{stat.value}{stat.suffix}</>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    { icon: Eye, title: "Log Monitoring", desc: "Real-time ingestion and analysis of all system logs across your infrastructure." },
    { icon: Cpu, title: "AI Detection", desc: "Machine learning models trained on your baseline to detect anomalous behavior." },
    { icon: AlertTriangle, title: "Threat Alerts", desc: "Instant notifications with severity scoring and contextual threat intelligence." },
    { icon: Zap, title: "Remediation", desc: "Automated response playbooks with AI-suggested remediation steps." },
    { icon: BarChart3, title: "Risk Dashboard", desc: "Comprehensive risk posture visualization with trend analysis." },
    { icon: Shield, title: "Risk Scoring", desc: "Dynamic risk scoring based on threat landscape and vulnerability exposure." },
  ];

  return (
    <SectionWrapper>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
            What <span className="text-gradient">Onewatch AI</span> Does
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A unified platform for AI-driven cybersecurity monitoring, detection, and response.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="floating-card p-8 group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function HowItWorksSection() {
  const steps = [
    { num: "01", title: "Connect Your Logs", desc: "Integrate with any log source — SIEM, cloud, endpoints, firewalls." },
    { num: "02", title: "AI Learns Behavior", desc: "Our ML models establish baselines of normal activity patterns." },
    { num: "03", title: "Detect Anomalies", desc: "Real-time detection of deviations, threats, and suspicious behavior." },
    { num: "04", title: "Alert & Fix", desc: "Automated alerts with AI-suggested remediation and response playbooks." },
  ];

  return (
    <SectionWrapper className="bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From integration to automated response in four simple steps.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative floating-card p-8 text-center"
            >
              <div className="text-4xl font-heading font-bold text-primary/20 mb-4">{step.num}</div>
              <h3 className="font-heading font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-muted-foreground/30">
                  <ChevronRight className="w-6 h-6" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function DashboardPreview() {
  return (
    <SectionWrapper>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
            Dashboard <span className="text-gradient">Preview</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive security operations center, powered by AI.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-2 rounded-2xl glow-primary"
        >
          <div className="rounded-xl overflow-hidden border border-border/30">
            <div className="bg-card p-4 border-b border-border/30 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-critical/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
              </div>
              <span className="text-xs text-muted-foreground ml-2 font-mono">onewatch.ai/dashboard</span>
            </div>
            <div className="grid grid-cols-4 gap-3 p-6 bg-secondary/30">
              {[
                { label: "Risk Score", value: "27/100", color: "text-success" },
                { label: "Active Threats", value: "3", color: "text-warning" },
                { label: "Logs Today", value: "2.4M", color: "text-info" },
                { label: "AI Confidence", value: "98.7%", color: "text-primary" },
              ].map((s) => (
                <div key={s.label} className="glass-panel p-4 text-center">
                  <div className={`stat-number text-xl ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-secondary/30 border-t border-border/30">
              <div className="log-stream text-muted-foreground space-y-1">
                <div><span className="text-success">INFO</span> [10:34:12] Connection established from 192.168.1.45</div>
                <div><span className="text-warning">WARN</span> [10:34:15] Unusual login pattern detected — user:jdoe</div>
                <div><span className="text-critical">CRIT</span> [10:34:18] Brute force attempt blocked — IP: 45.33.12.8</div>
                <div><span className="text-info">INFO</span> [10:34:22] ML model updated — anomaly threshold recalibrated</div>
                <div><span className="text-success">INFO</span> [10:34:25] Firewall rule #2847 applied successfully</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="text-center mt-10">
          <Link
            to="/demo"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-7 py-3.5 rounded-lg glow-primary hover:opacity-90 transition-all"
          >
            Try Interactive Demo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}

function TechSection() {
  const techs = [
    { icon: Database, name: "Elasticsearch" },
    { icon: Server, name: "OpenSearch" },
    { icon: Code, name: "Python" },
    { icon: Cpu, name: "Machine Learning" },
    { icon: Cloud, name: "Docker" },
    { icon: Globe, name: "AWS" },
    { icon: Terminal, name: "Node.js" },
    { icon: Activity, name: "Kafka" },
  ];

  return (
    <SectionWrapper className="bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
            Built With <span className="text-gradient">Modern Tech</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {techs.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="floating-card p-6 text-center"
            >
              <t.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <span className="text-sm font-medium text-foreground">{t.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function AboutSection() {
  return (
    <SectionWrapper>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-6">
              Who <span className="text-gradient">We Are</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Onewatch AI is built by a team of cybersecurity experts, data scientists, and engineers who believe that AI should be the first line of defense — not the last.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We combine decades of security operations experience with cutting-edge machine learning to deliver a platform that detects threats faster and more accurately than traditional tools.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
              Learn more about us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border/30">
            <img src={datacenter} alt="Onewatch AI Operations" className="w-full h-80 object-cover" loading="lazy" width={1280} height={720} />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function TeamSection() {
  const team = [
    { name: "Alex Morgan", role: "CEO & Co-Founder", initials: "AM" },
    { name: "Sarah Chen", role: "CTO", initials: "SC" },
    { name: "James Wilson", role: "Head of AI/ML", initials: "JW" },
    { name: "Emily Davis", role: "VP Engineering", initials: "ED" },
  ];

  return (
    <SectionWrapper className="bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
            Our <span className="text-gradient">Team</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="floating-card p-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary font-heading font-bold text-lg">
                {t.initials}
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-1">{t.name}</h3>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function ContactSection() {
  return (
    <SectionWrapper>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-muted-foreground">Ready to secure your infrastructure? Let's talk.</p>
        </div>
        <div className="glass-panel p-8 lg:p-12">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Name</label>
                <input className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors" placeholder="Your name" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                <input className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors" placeholder="you@company.com" />
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Company</label>
              <input className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors" placeholder="Your company" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Message</label>
              <textarea rows={4} className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none" placeholder="Tell us about your security needs..." />
            </div>
            <button className="w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-lg glow-primary hover:opacity-90 transition-all">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </SectionWrapper>
  );
}

function LogTicker() {
  const logs = [
    "Blocked brute force from 45.33.12.8",
    "Anomaly detected: unusual API calls from service-account-7",
    "Firewall rule updated: blocked port 445",
    "ML model retrained: 99.2% accuracy",
    "Suspicious file upload intercepted",
    "New CVE-2026-1234 patch applied",
    "DDoS mitigation active — 2.3M requests/min",
    "Credential stuffing attempt blocked",
  ];

  return (
    <div className="overflow-hidden border-y border-border/30 bg-secondary/30 py-3">
      <div className="ticker-scroll flex gap-8 whitespace-nowrap">
        {[...logs, ...logs].map((log, i) => (
          <span key={i} className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            {log}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <LogTicker />
      <FeaturesSection />
      <HowItWorksSection />
      <DashboardPreview />
      <TechSection />
      <AboutSection />
      <TeamSection />
      <ContactSection />
    </div>
  );
}
