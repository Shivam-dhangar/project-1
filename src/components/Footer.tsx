import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-heading font-bold text-foreground">
                Onewatch <span className="text-primary">AI</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered cybersecurity platform for real-time threat detection,
              log monitoring, and automated incident response.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 ">
              Product
            </h4>
            <div className="flex flex-col gap-2.5">
              {["Product", "How It Works", "Technologies", "Pricing"].map(
                (item) => {
                  const path =
                    item === "Pricing"
                      ? "/contact"
                      : `/${item.toLowerCase().replace(/ /g, "-")}`;

                  return (
                    <Link
                      key={item}
                      to={path}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item}
                    </Link>
                  );
                },
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Company
            </h4>
            <div className="flex flex-col gap-2.5">
              {["About", "Team", "Contact", "Careers"].map((item) => {
                const route =
                  item === "About" || item === "Team" ? "/about" : "/contact";

                return (
                  <Link
                    key={item}
                    to={route}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Resources
            </h4>
            <div className="flex flex-col gap-2.5">
              {["Documentation", "API Reference", "Blog", "Security"].map(
                (item) => (
                  <span
                    key={item}
                    className="text-sm text-muted-foreground cursor-default"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div> */}
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 Onewatch AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Security"].map((item) => (
              <span
                key={item}
                className="text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
