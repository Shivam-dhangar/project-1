import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Shield, Eye, EyeOff, Users, Code, BarChart3, Lock } from "lucide-react";

const demoRoles: { role: UserRole; label: string; icon: typeof Shield; desc: string }[] = [
  { role: "admin", label: "Admin Demo", icon: Shield, desc: "Full access to all modules" },
  { role: "analyst", label: "Security Analyst", icon: BarChart3, desc: "Alerts, anomalies, incidents" },
  { role: "developer", label: "Developer", icon: Code, desc: "Logs, APIs, integrations" },
  { role: "viewer", label: "Executive View", icon: Users, desc: "Reports & analytics" },
];

export default function DemoAuth() {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<"login" | "signup">(searchParams.get("mode") === "login" ? "login" : "signup");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", password: "", role: "analyst" as UserRole });
  const { login, loginAsDemo, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      login(form.email, form.password);
    } else {
      signup({ name: form.name, email: form.email, company: form.company, role: form.role });
    }
    navigate("/dashboard");
  };

  const handleDemoLogin = (role: UserRole) => {
    loginAsDemo(role);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-primary" />
            <span className="font-heading font-bold text-xl text-foreground">
              Onewatch <span className="text-primary">AI</span>
            </span>
          </div>
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
            {mode === "login" ? "Welcome Back" : "Start Free Demo"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {mode === "login" ? "Sign in to your account" : "Create an account to access the demo"}
          </p>
        </div>

        <div className="glass-panel p-8">
          {/* Demo Quick Login */}
          <div className="mb-6">
            <p className="text-xs text-muted-foreground mb-3 text-center">Quick demo access — choose a role:</p>
            <div className="grid grid-cols-2 gap-2">
              {demoRoles.map((d) => (
                <button
                  key={d.role}
                  onClick={() => handleDemoLogin(d.role)}
                  className="glass-panel p-3 text-left hover:border-primary/30 transition-all duration-300 group"
                >
                  <d.icon className="w-4 h-4 text-primary mb-1.5 group-hover:scale-110 transition-transform" />
                  <div className="text-xs font-semibold text-foreground">{d.label}</div>
                  <div className="text-[10px] text-muted-foreground">{d.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or {mode === "login" ? "sign in" : "create account"}</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Name</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="Full name"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Company</label>
                  <input
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="Company name"
                  />
                </div>
              </>
            )}

            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="you@company.com"
                required
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors pr-10"
                  placeholder="••••••••"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mode === "signup" && (
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Role</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
                >
                  <option value="admin">Admin</option>
                  <option value="analyst">Security Analyst</option>
                  <option value="developer">Developer</option>
                  <option value="viewer">Viewer / Executive</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg glow-primary hover:opacity-90 transition-all"
            >
              {mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              {mode === "login" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
