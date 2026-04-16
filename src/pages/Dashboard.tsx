import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Shield, Activity, AlertTriangle, BarChart3, Cpu, Lock, Eye, Zap, Settings, Users, LogOut,
  Globe, Server, Code, Bell, FileText, Layers, Timer, Heart, Plug, CreditCard, TrendingUp,
  ChevronRight, Menu, X
} from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

const threatData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  threats: Math.floor(Math.random() * 50) + 5,
  blocked: Math.floor(Math.random() * 45) + 3,
}));

const loginData = Array.from({ length: 7 }, (_, i) => ({
  day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
  failed: Math.floor(Math.random() * 200) + 20,
  success: Math.floor(Math.random() * 1000) + 500,
}));

const riskPieData = [
  { name: "Critical", value: 3, color: "hsl(0, 84%, 60%)" },
  { name: "High", value: 12, color: "hsl(38, 92%, 50%)" },
  { name: "Medium", value: 28, color: "hsl(45, 76%, 60%)" },
  { name: "Low", value: 57, color: "hsl(142, 71%, 45%)" },
];

const incidents = [
  { time: "10:34", severity: "critical", msg: "Brute force attack detected from 45.33.12.8", status: "Active" },
  { time: "10:28", severity: "high", msg: "Suspicious lateral movement in subnet 10.0.2.x", status: "Investigating" },
  { time: "10:15", severity: "medium", msg: "Unusual data exfiltration pattern detected", status: "Mitigated" },
  { time: "09:52", severity: "low", msg: "Failed SSH login attempts from 192.168.1.100", status: "Resolved" },
  { time: "09:30", severity: "high", msg: "Malware signature match on endpoint WS-042", status: "Quarantined" },
];

const logStream = [
  { time: "10:34:58", level: "CRIT", msg: "Brute force: 847 attempts in 60s from 45.33.12.8" },
  { time: "10:34:55", level: "WARN", msg: "Rate limit exceeded: API endpoint /auth/login" },
  { time: "10:34:52", level: "INFO", msg: "Firewall rule #2847 updated: block 45.33.12.0/24" },
  { time: "10:34:48", level: "INFO", msg: "ML model prediction: 97.3% confidence anomaly" },
  { time: "10:34:45", level: "WARN", msg: "DNS query spike: 12x baseline for ns1.suspect.com" },
  { time: "10:34:40", level: "INFO", msg: "TLS certificate rotation completed for *.onewatch.ai" },
  { time: "10:34:35", level: "CRIT", msg: "Credential stuffing detected: 2,341 unique passwords" },
  { time: "10:34:30", level: "INFO", msg: "Geo-block enforced: 14 connections from restricted region" },
];

const geoAttacks = [
  { country: "Russia", attacks: 2847, pct: 32 },
  { country: "China", attacks: 1923, pct: 22 },
  { country: "North Korea", attacks: 1204, pct: 14 },
  { country: "Iran", attacks: 892, pct: 10 },
  { country: "Brazil", attacks: 634, pct: 7 },
  { country: "USA", attacks: 521, pct: 6 },
];

type SidebarItem = { icon: typeof Shield; label: string; key: string };

const sidebarByRole: Record<UserRole, SidebarItem[]> = {
  admin: [
    { icon: BarChart3, label: "Overview", key: "overview" },
    { icon: Activity, label: "Live Logs", key: "logs" },
    { icon: Cpu, label: "AI Detection", key: "ai" },
    { icon: AlertTriangle, label: "Alerts", key: "alerts" },
    { icon: Zap, label: "Remediation", key: "remediation" },
    { icon: TrendingUp, label: "Risk Dashboard", key: "risk" },
    { icon: Globe, label: "Geo Attacks", key: "geo" },
    { icon: Timer, label: "Incidents", key: "incidents" },
    { icon: Heart, label: "System Health", key: "health" },
    { icon: Users, label: "Users", key: "users" },
    { icon: Plug, label: "Integrations", key: "integrations" },
    { icon: CreditCard, label: "Billing", key: "billing" },
    { icon: Settings, label: "Settings", key: "settings" },
  ],
  analyst: [
    { icon: BarChart3, label: "Overview", key: "overview" },
    { icon: AlertTriangle, label: "Alerts", key: "alerts" },
    { icon: Cpu, label: "AI Detection", key: "ai" },
    { icon: Timer, label: "Incidents", key: "incidents" },
    { icon: TrendingUp, label: "Risk Dashboard", key: "risk" },
    { icon: Zap, label: "Remediation", key: "remediation" },
    { icon: Globe, label: "Geo Attacks", key: "geo" },
  ],
  developer: [
    { icon: BarChart3, label: "Overview", key: "overview" },
    { icon: Activity, label: "Logs", key: "logs" },
    { icon: Code, label: "API Access", key: "api" },
    { icon: Plug, label: "Integrations", key: "integrations" },
    { icon: Heart, label: "System Health", key: "health" },
    { icon: AlertTriangle, label: "Alerts", key: "alerts" },
  ],
  viewer: [
    { icon: BarChart3, label: "Executive View", key: "overview" },
    { icon: TrendingUp, label: "Risk Score", key: "risk" },
    { icon: FileText, label: "Reports", key: "reports" },
    { icon: Layers, label: "Analytics", key: "analytics" },
  ],
};

function StatCard({ icon: Icon, label, value, change, color }: { icon: typeof Shield; label: string; value: string; change?: string; color: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="floating-card p-5">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-9 h-9 rounded-lg bg-${color}/10 flex items-center justify-center`}>
          <Icon className={`w-4 h-4`} style={{ color: `hsl(var(--${color}))` }} />
        </div>
        {change && <span className="text-xs text-success font-mono">{change}</span>}
      </div>
      <div className="stat-number text-2xl text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </motion.div>
  );
}

function OverviewPanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Shield} label="Risk Score" value="27/100" change="↓ 12%" color="success" />
        <StatCard icon={AlertTriangle} label="Active Threats" value="3" change="↓ 2" color="warning" />
        <StatCard icon={Activity} label="Logs Today" value="2.4M" change="↑ 18%" color="info" />
        <StatCard icon={Cpu} label="AI Confidence" value="98.7%" change="↑ 0.3%" color="primary" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="glass-panel p-5">
          <h3 className="text-sm font-heading font-semibold text-foreground mb-4">Threat Activity (24h)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={threatData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(213,23%,16%)" />
              <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "hsl(213,27%,69%)" }} interval={3} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(213,27%,69%)" }} />
              <Tooltip contentStyle={{ background: "hsl(213,22%,11%)", border: "1px solid hsl(213,23%,16%)", borderRadius: "8px", fontSize: 12 }} />
              <Area type="monotone" dataKey="threats" stroke="hsl(0,84%,60%)" fill="hsl(0,84%,60%,0.1)" />
              <Area type="monotone" dataKey="blocked" stroke="hsl(142,71%,45%)" fill="hsl(142,71%,45%,0.1)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-panel p-5">
          <h3 className="text-sm font-heading font-semibold text-foreground mb-4">Failed vs Successful Logins</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={loginData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(213,23%,16%)" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(213,27%,69%)" }} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(213,27%,69%)" }} />
              <Tooltip contentStyle={{ background: "hsl(213,22%,11%)", border: "1px solid hsl(213,23%,16%)", borderRadius: "8px", fontSize: 12 }} />
              <Bar dataKey="failed" fill="hsl(0,84%,60%,0.7)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="success" fill="hsl(142,71%,45%,0.7)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-panel p-5">
          <h3 className="text-sm font-heading font-semibold text-foreground mb-4">Recent Incidents</h3>
          <div className="space-y-3">
            {incidents.map((inc, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border/30">
                <span className="text-xs font-mono text-muted-foreground w-12">{inc.time}</span>
                <span className={`w-2 h-2 rounded-full ${
                  inc.severity === "critical" ? "bg-critical" : inc.severity === "high" ? "bg-warning" : inc.severity === "medium" ? "bg-primary" : "bg-success"
                }`} />
                <span className="text-sm text-foreground flex-1 truncate">{inc.msg}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  inc.status === "Active" ? "bg-critical/10 text-critical" : inc.status === "Investigating" ? "bg-warning/10 text-warning" : "bg-success/10 text-success"
                }`}>{inc.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-panel p-5">
          <h3 className="text-sm font-heading font-semibold text-foreground mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={riskPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value" paddingAngle={3}>
                {riskPieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(213,22%,11%)", border: "1px solid hsl(213,23%,16%)", borderRadius: "8px", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {riskPieData.map((r) => (
              <div key={r.name} className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full" style={{ background: r.color }} />
                <span className="text-muted-foreground">{r.name}</span>
                <span className="ml-auto text-foreground font-mono">{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LogsPanel() {
  const [logs, setLogs] = useState(logStream);
  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => {
        const newLog = {
          time: new Date().toLocaleTimeString("en-US", { hour12: false }),
          level: ["INFO", "WARN", "CRIT", "INFO"][Math.floor(Math.random() * 4)],
          msg: [
            "Connection attempt from 10.0.1." + Math.floor(Math.random() * 255),
            "Rate limit check passed for /api/v2/data",
            "TLS handshake completed in 23ms",
            "Suspicious query pattern on db-prod-03",
            "Health check OK: all services operational",
          ][Math.floor(Math.random() * 5)],
        };
        return [newLog, ...prev.slice(0, 19)];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-heading font-semibold text-foreground">Live Log Stream</h3>
        <span className="flex items-center gap-1.5 text-xs text-success"><span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> Live</span>
      </div>
      <div className="space-y-1 font-mono text-xs max-h-[500px] overflow-y-auto">
        {logs.map((log, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex gap-3 p-2 rounded hover:bg-secondary/50">
            <span className="text-muted-foreground w-20 shrink-0">{log.time}</span>
            <span className={`w-10 shrink-0 ${log.level === "CRIT" ? "text-critical" : log.level === "WARN" ? "text-warning" : "text-success"}`}>{log.level}</span>
            <span className="text-foreground/80">{log.msg}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AlertsPanel() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <StatCard icon={AlertTriangle} label="Critical" value="3" color="critical" />
        <StatCard icon={Bell} label="High" value="12" color="warning" />
        <StatCard icon={Eye} label="Medium" value="28" color="primary" />
      </div>
      <div className="glass-panel p-5">
        <h3 className="text-sm font-heading font-semibold text-foreground mb-4">Active Alerts</h3>
        <div className="space-y-3">
          {incidents.map((inc, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border/30 hover:border-primary/20 transition-colors">
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${inc.severity === "critical" ? "bg-critical animate-pulse" : inc.severity === "high" ? "bg-warning" : "bg-primary"}`} />
                <div>
                  <div className="text-sm text-foreground">{inc.msg}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Detected at {inc.time} — {inc.status}</div>
                </div>
              </div>
              <button className="text-xs text-primary hover:underline">Investigate</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GeoPanel() {
  return (
    <div className="glass-panel p-5">
      <h3 className="text-sm font-heading font-semibold text-foreground mb-4">Attack Origins (Last 24h)</h3>
      <div className="space-y-3">
        {geoAttacks.map((g) => (
          <div key={g.country} className="flex items-center gap-3">
            <span className="text-sm text-foreground w-28">{g.country}</span>
            <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary/60 rounded-full" style={{ width: `${g.pct}%` }} />
            </div>
            <span className="text-xs font-mono text-muted-foreground w-16 text-right">{g.attacks.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HealthPanel() {
  const services = [
    { name: "API Gateway", status: "operational", uptime: "99.99%" },
    { name: "ML Pipeline", status: "operational", uptime: "99.95%" },
    { name: "Log Ingestion", status: "operational", uptime: "99.99%" },
    { name: "Alert Engine", status: "degraded", uptime: "98.50%" },
    { name: "Database Cluster", status: "operational", uptime: "99.99%" },
    { name: "Search Index", status: "operational", uptime: "99.97%" },
  ];
  return (
    <div className="glass-panel p-5">
      <h3 className="text-sm font-heading font-semibold text-foreground mb-4">System Health</h3>
      <div className="space-y-3">
        {services.map((s) => (
          <div key={s.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border/30">
            <div className="flex items-center gap-3">
              <span className={`w-2 h-2 rounded-full ${s.status === "operational" ? "bg-success" : "bg-warning animate-pulse"}`} />
              <span className="text-sm text-foreground">{s.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs capitalize ${s.status === "operational" ? "text-success" : "text-warning"}`}>{s.status}</span>
              <span className="text-xs font-mono text-muted-foreground">{s.uptime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GenericPanel({ title, description }: { title: string; description: string }) {
  return (
    <div className="glass-panel p-8 text-center">
      <Layers className="w-10 h-10 text-primary mx-auto mb-4" />
      <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export default function Dashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const [activeKey, setActiveKey] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated || !user) return <Navigate to="/demo" />;

  const sidebarItems = sidebarByRole[user.role];

  const renderPanel = () => {
    switch (activeKey) {
      case "overview": return <OverviewPanel />;
      case "logs": return <LogsPanel />;
      case "alerts": return <AlertsPanel />;
      case "geo": return <GeoPanel />;
      case "health": return <HealthPanel />;
      case "incidents": return <AlertsPanel />;
      case "ai": return <GenericPanel title="AI Anomaly Detection" description="ML models analyzing 2.4M log entries per day. Current detection accuracy: 98.7%. Next model retraining scheduled in 4 hours." />;
      case "remediation": return <GenericPanel title="Remediation Suggestions" description="AI-generated response playbooks for 3 active incidents. Auto-remediation enabled for low-severity events." />;
      case "risk": return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <StatCard icon={Shield} label="Overall Risk" value="27/100" change="↓ 12% this week" color="success" />
            <StatCard icon={TrendingUp} label="Security Posture" value="Strong" color="success" />
          </div>
          <GeoPanel />
        </div>
      );
      case "users": return <GenericPanel title="User Management" description="14 active users across 4 roles. 2 pending invitations. Last audit: 2 hours ago." />;
      case "integrations": return <GenericPanel title="Integrations" description="Connected: AWS CloudTrail, Okta, PagerDuty, Slack, Jira. 12 active webhooks." />;
      case "billing": return <GenericPanel title="Billing" description="Enterprise Plan — $2,499/mo. Next billing: Apr 1, 2026. 2.4M logs/day of 5M included." />;
      case "settings": return <GenericPanel title="Settings" description="Organization settings, notification preferences, API keys, and security policies." />;
      case "api": return <GenericPanel title="API Access" description="REST & GraphQL APIs available. Rate limit: 10,000 req/min. API key: ow_live_***...k8f2" />;
      case "reports": return <GenericPanel title="Reports" description="Weekly executive summary, monthly compliance report, quarterly risk assessment." />;
      case "analytics": return <GenericPanel title="Analytics" description="Security metrics trending dashboard. MTTR: 12 min. MTTD: 3.2 min. False positive rate: 1.3%." />;
      default: return <OverviewPanel />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-secondary border-r border-border/50 flex flex-col transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        <div className="p-5 border-b border-border/50 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-heading font-bold text-sm text-foreground">Onewatch <span className="text-primary">AI</span></span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-muted-foreground"><X className="w-5 h-5" /></button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              onClick={() => { setActiveKey(item.key); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                activeKey === item.key
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
              {user.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground truncate">{user.name}</div>
              <div className="text-xs text-muted-foreground capitalize">{user.role}</div>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-muted-foreground"><Menu className="w-5 h-5" /></button>
            <h1 className="font-heading font-semibold text-foreground capitalize">
              {sidebarItems.find(s => s.key === activeKey)?.label || "Overview"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-success"><span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> All Systems Operational</span>
            <span className="text-xs text-muted-foreground font-mono">{new Date().toLocaleTimeString()}</span>
          </div>
        </header>

        <div className="p-6">
          <motion.div key={activeKey} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {renderPanel()}
          </motion.div>
        </div>
      </main>

      {sidebarOpen && <div className="fixed inset-0 z-40 bg-background/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}
