import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Questions about Onewatch AI? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="space-y-6">
            {[
              { icon: Mail, label: "Email", value: "hello@onewatch.ai" },
              { icon: MapPin, label: "Office", value: "Dhamnod, Indore, Madhya Pradesh" },
            ].map((c) => (
              <div key={c.label} className="floating-card p-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <c.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{c.label}</div>
                  <div className="text-sm font-medium text-foreground">{c.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 glass-panel p-8">
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Name</label>
                  <input className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
                  <input className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors" placeholder="you@company.com" />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Subject</label>
                <input className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors" placeholder="How can we help?" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Message</label>
                <textarea rows={5} className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none" placeholder="Tell us about your security needs..." />
              </div>
              <button className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg glow-primary hover:opacity-90 transition-all">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
