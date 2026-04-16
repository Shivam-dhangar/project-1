import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Linkedin } from "lucide-react";
import datacenter from "@/assets/datacenter.jpg";

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className={`section-padding ${className}`}
    >
      {children}
    </motion.section>
  );
}

const team = [
  {
    name: "Shivam Dhangar",
    role: "Frontend Developer",
    bio: "Passionate frontend developer with 2 years of experience building responsive and scalable web applications using Angular and modern UI frameworks.",
    image: "/team/ved.jpg",
    linkedin: "https://www.linkedin.com/in/shivam-dhangar-a6196523a/",
  },
  {
    name: "Zaheer Khan",
    role: "Backend Developer",
    bio: "Backend developer with hands-on experience in building APIs, handling databases, and working with Node.js to create efficient server-side solutions.",
    image: "/team/zk.jfif",
    linkedin: "https://www.linkedin.com/in/zaheer-khan1/",
  },
  {
    name: "Vedanshu Wankhede",
    role: "Full Stack Developer",
    bio: "Full stack developer with 1+ years of experience working across frontend and backend, focused on building clean and functional web applications.",
    image: "/team/sd.jfif",
    linkedin: "https://www.linkedin.com/in/vedanshu-wankhede-59485822a/",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-20">
      
      {/* HERO SECTION */}
      <Section>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
              Securing the Future with{" "}
              <span className="text-gradient">AI</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Onewatch AI was founded in 2024 by a group of passionate developers
              focused on building modern, scalable, and intelligent solutions.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              We aim to leverage AI and modern technologies to create secure,
              efficient, and user-friendly platforms. Our goal is to continuously
              learn, improve, and deliver impactful digital solutions.
            </p>

            <Link
              to="/demo"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-7 py-3.5 rounded-lg glow-primary hover:opacity-90 transition-all"
            >
              Try the Platform <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="rounded-2xl overflow-hidden border border-border/30">
            <img
              src={datacenter}
              alt="Onewatch operations"
              className="w-full h-96 object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </Section>

      {/* TEAM SECTION */}
      <Section className="bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
              Our <span className="text-gradient">Team</span>
            </h2>
            <p className="text-muted-foreground">
              A team of passionate developers building modern web solutions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="floating-card p-8 text-center hover:scale-105 transition-transform"
              >
                {/* IMAGE */}
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border border-border shadow"
                />

                {/* NAME */}
                <h3 className="font-heading font-semibold text-foreground mb-1">
                  {t.name}
                </h3>

                {/* ROLE */}
                <p className="text-xs text-primary mb-2">{t.role}</p>

                {/* BIO */}
                <p className="text-sm text-muted-foreground mb-4">
                  {t.bio}
                </p>

                {/* LINKEDIN */}
                <a
                  href={t.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center"
                >
                  <Linkedin className="w-5 h-5 text-blue-500 hover:scale-110 transition" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}