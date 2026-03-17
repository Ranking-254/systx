// app/careers/page.tsx
"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, 
  Code2, 
  Brain, 
  Users, 
  Zap,
  ArrowRight,
  Terminal,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle2,
  Globe,
  Sparkles,
  Cpu,
    Shield,
} from 'lucide-react';
import Link from 'next/link';

const JobCard = ({ job, index }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="relative group"
    >
      {/* Neobrutalist shadow */}
      <div className="absolute inset-0 bg-primary translate-x-2 translate-y-2 rounded-xl transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3" />
      
      <div 
        className={`relative bg-white/5 dark:bg-black/20 backdrop-blur-xl border-2 ${isExpanded ? 'border-primary' : 'border-foreground/20'} rounded-xl overflow-hidden transition-all duration-500 cursor-pointer`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Header */}
        <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-lg border transition-colors ${isExpanded ? 'bg-primary/20 border-primary' : 'bg-primary/10 border-primary/20'}`}>
              <job.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase italic tracking-tight group-hover:text-primary transition-colors">
                {job.title}
              </h3>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-[10px] font-mono text-foreground/50 uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <MapPin size={12} /> {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {job.type}
                </span>
                <span className="flex items-center gap-1 text-emerald-500">
                  <DollarSign size={12} /> {job.salary}
                </span>
              </div>
            </div>
          </div>
          
          <motion.div 
            animate={{ rotate: isExpanded ? 90 : 0 }}
            className="p-2 bg-foreground/5 rounded-lg"
          >
            <ArrowRight size={20} className="text-foreground/60" />
          </motion.div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-foreground/10"
            >
              <div className="p-6 space-y-6">
                <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                  {job.description}
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-3 text-primary">Requirements</h4>
                    <ul className="space-y-2">
                      {job.requirements.map((req: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/60 font-mono">
                          <CheckCircle2 size={14} className="text-primary flex-shrink-0 mt-0.5" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-3 text-accent">Nice to Have</h4>
                    <ul className="space-y-2">
                      {job.niceToHave.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/60 font-mono">
                          <Sparkles size={14} className="text-accent flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-foreground/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="text-[10px] font-mono text-foreground/40 uppercase">
                    Posted: {job.posted} // Ref: {job.ref}
                  </div>
                  <Link 
                    href={`mailto:careers@systx.infra?subject=Application: ${job.title}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white dark:text-black font-bold uppercase tracking-tighter text-sm rounded-lg hover:bg-accent transition-colors"
                  >
                    Apply Now
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const PerkCard = ({ icon: Icon, title, description }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="relative group p-6 bg-white/5 border border-white/10 rounded-xl hover:border-primary/30 transition-colors"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
    <Icon className="w-8 h-8 text-primary mb-4" />
    <h3 className="font-black uppercase tracking-tight mb-2">{title}</h3>
    <p className="text-xs font-mono text-foreground/60 leading-relaxed">{description}</p>
  </motion.div>
);

export default function CareersPage() {
  const jobs = [
    {
      title: "Senior Full-Stack Engineer",
      icon: Code2,
      location: "Nairobi / Remote",
      type: "Full-time",
      salary: "$60k - $90k",
      posted: "2 days ago",
      ref: "ENG-001",
      description: "Build high-performance web applications for global clients. You'll architect scalable systems using Next.js, Node.js, and PostgreSQL while mentoring junior developers.",
      requirements: [
        "5+ years with React/Next.js",
        "Strong TypeScript skills",
        "Database design (PostgreSQL/Mongo)",
        "AWS/GCP experience",
        "CI/CD pipeline knowledge"
      ],
      niceToHave: [
        "Open source contributions",
        "React Native experience",
        "Kubernetes knowledge",
        "Previous startup experience"
      ]
    },
    {
      title: "DevOps Engineer",
      icon: Cpu,
      location: "Nairobi / Hybrid",
      type: "Full-time",
      salary: "$55k - $80k",
      posted: "1 week ago",
      ref: "OPS-002",
      description: "Own our infrastructure. Design resilient systems, automate deployments, and ensure 99.9% uptime for mission-critical client applications.",
      requirements: [
        "3+ years in DevOps/SRE roles",
        "Docker & Kubernetes mastery",
        "Terraform/CloudFormation",
        "Monitoring (Datadog/Grafana)",
        "Security hardening experience"
      ],
      niceToHave: [
        "AWS certifications",
        "Go/Rust scripting",
        "Service mesh experience",
        "On-call automation"
      ]
    },
    {
      title: "UX/UI Designer",
      icon: Sparkles,
      location: "Remote",
      type: "Full-time",
      salary: "$45k - $70k",
      posted: "3 days ago",
      ref: "DES-003",
      description: "Design interfaces that engineers love to build and users love to use. Create design systems, prototype interactions, and bridge the gap between aesthetics and functionality.",
      requirements: [
        "Portfolio of complex web apps",
        "Figma mastery",
        "Design systems experience",
        "Prototyping skills",
        "Basic HTML/CSS understanding"
      ],
      niceToHave: [
        "Motion design skills",
        "Frontend dev experience",
        "User research background",
        "Accessibility certification"
      ]
    },
    {
      title: "Cybersecurity Analyst",
      icon: Shield,
      location: "Nairobi",
      type: "Full-time",
      salary: "$50k - $75k",
      posted: "5 days ago",
      ref: "SEC-004",
      description: "Protect our clients' digital assets. Conduct penetration testing, vulnerability assessments, and implement security protocols for fintech and healthcare clients.",
      requirements: [
        "Security+ or CEH certification",
        "Penetration testing experience",
        "SIEM tools knowledge",
        "Incident response skills",
        "Compliance (GDPR/HIPAA) knowledge"
      ],
      niceToHave: [
        "OSCP certification",
        "Bug bounty experience",
        "Python automation",
        "Cloud security specialty"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Hero */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(var(--color-primary)_1px,transparent_1px),linear-gradient(90deg,var(--color-primary)_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.03]" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-xs uppercase tracking-wider mb-6"
          >
            <Rocket size={14} />
            Now Hiring: 4 Open Positions
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic mb-6 leading-[0.9]"
          >
            Build The<br/>
            <span className="text-primary">Future With Us</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-foreground/60 font-mono text-sm uppercase tracking-widest max-w-2xl mx-auto leading-relaxed"
          >
            Join a team of engineers solving complex problems for global clients. 
            Competitive pay, cutting-edge stack, zero bureaucracy.
          </motion.p>
        </div>
      </div>

      {/* Culture/Perks */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-white/10">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-black uppercase italic tracking-tight mb-4">
            Engineering <span className="text-primary">Culture</span>
          </h2>
          <p className="text-foreground/50 font-mono text-sm uppercase tracking-widest">
            Why engineers choose SYSTX
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PerkCard 
            icon={Brain}
            title="Learning Budget"
            description="$2,000 annual budget for courses, conferences, and certifications. We invest in your growth."
          />
          <PerkCard 
            icon={Globe}
            title="Remote First"
            description="Work from anywhere. We have hubs in Nairobi, but our team is distributed globally."
          />
          <PerkCard 
            icon={Zap}
            title="Modern Stack"
            description="Next.js 14, TypeScript, PostgreSQL, AWS. No legacy codebases. Always latest stable."
          />
          <PerkCard 
            icon={Users}
            title="Small Teams"
            description="3-4 engineers per project. No micromanagement. Direct client collaboration."
          />
        </div>

        {/* Additional benefits bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {[
            "Health Insurance",
            "Flexible Hours",
            "Equipment Allowance",
            "Profit Sharing",
            "Unlimited PTO",
            "Home Office Setup"
          ].map((benefit, i) => (
            <span 
              key={i} 
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-mono uppercase tracking-wider text-foreground/70 hover:border-primary/30 transition-colors"
            >
              {benefit}
            </span>
          ))}
        </motion.div>
      </section>

      {/* Open Positions */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4"
        >
          <div>
            <h2 className="text-3xl font-black uppercase italic tracking-tight mb-2">
              Open <span className="text-primary">Positions</span>
            </h2>
            <p className="text-foreground/50 font-mono text-xs uppercase tracking-widest">
              Click to expand details
            </p>
          </div>
          <div className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest">
            Updated: March 17, 2026
          </div>
        </motion.div>

        <div className="space-y-6">
          {jobs.map((job, i) => (
            <JobCard key={i} job={job} index={i} />
          ))}
        </div>
      </section>

      {/* No perfect match? */}
      <section className="max-w-4xl mx-auto px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-primary translate-x-2 translate-y-2 rounded-xl" />
          <div className="relative bg-gradient-to-br from-white/10 to-transparent border-2 border-foreground/20 rounded-xl p-8 md:p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
            
            <div className="relative z-10">
              <h3 className="text-2xl font-black uppercase italic tracking-tight mb-4">
                Don't See a Perfect Match?
              </h3>
              <p className="text-foreground/60 font-mono text-sm max-w-lg mx-auto mb-8 leading-relaxed">
                We're always looking for exceptional talent. Send us your portfolio 
                and tell us what you'd build at SYSTX.
              </p>
              <Link 
                href="mailto:careers@systx.infra?subject=General Application"
                className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background dark:bg-white dark:text-black font-bold uppercase tracking-tighter rounded-lg hover:bg-primary hover:text-white dark:hover:text-white transition-all"
              >
                Send Open Application
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-foreground/40 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-primary" />
            <span>SYSTX_INFRA // TALENT_ACQUISITION</span>
          </div>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}