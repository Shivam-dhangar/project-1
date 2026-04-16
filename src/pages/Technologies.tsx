import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Database, Server, Code, Cpu, Cloud, Globe, Terminal, Activity } from "lucide-react";

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.section ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className={`section-padding ${className}`}>
      {children}
    </motion.section>
  );
}

const techs = [
  { icon: Database, name: "Elasticsearch", desc: "Distributed search and analytics engine for log data indexing and full-text search at scale." },
  { icon: Server, name: "OpenSearch", desc: "Open-source search suite for real-time application monitoring and log analytics." },
  { icon: Code, name: "Python", desc: "Core ML pipeline and data processing built with Python, scikit-learn, and TensorFlow." },
  { icon: Cpu, name: "Machine Learning", desc: "Custom anomaly detection models using isolation forests, autoencoders, and transformer architectures." },
  { icon: Cloud, name: "Docker & K8s", desc: "Containerized microservices architecture with Kubernetes orchestration for elastic scaling." },
  { icon: Globe, name: "AWS", desc: "Cloud-native deployment on AWS with multi-region availability and edge computing." },
  { icon: Terminal, name: "Node.js", desc: "High-performance API gateway and real-time WebSocket connections for live data streaming." },
  { icon: Activity, name: "Apache Kafka", desc: "Event streaming platform for high-throughput, fault-tolerant log pipeline processing." },
];

export default function Technologies() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <Section>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
            Our <span className="text-gradient">Technology</span> Stack
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built on battle-tested, enterprise-grade technologies designed for security at scale.
          </p>
        </div>
      </Section>

      <Section className="bg-secondary/50">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 gap-6">
          {techs.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="floating-card p-8 flex gap-5">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <t.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">{t.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}
