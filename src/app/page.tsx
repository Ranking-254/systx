"use client";
import React, { useState, useEffect } from 'react';
import { Particles } from "@/components/ui/Particles";
import { 
  Code2, 
  Cloud, 
  ShieldAlert, 
  Laptop, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Cpu,
  Sparkles,
  Globe,
  Shield,
  Terminal,
  ArrowUpRight,
  Play,
  Star,
  Users
} from "lucide-react";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ContactForm } from "@/components/ui/ContactForm";
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Enhanced Service Card with Glassmorphism + Neobrutalism
const GlassServiceCard = ({ title, code, icon: Icon, description, index }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Neobrutalist shadow layer */}
      <div className="absolute inset-0 bg-primary translate-x-2 translate-y-2 rounded-lg transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3" />
      
      {/* Glassmorphism card */}
      <div className="relative h-full bg-white/5 dark:bg-black/20 backdrop-blur-xl border-2 border-foreground/20 rounded-lg p-6 overflow-hidden transition-all duration-500 group-hover:border-primary/50 group-hover:bg-white/10 dark:group-hover:bg-black/30">
        {/* Liquid glass shimmer effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
          <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-shimmer" />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-primary/10 rounded-lg backdrop-blur-sm border border-primary/20">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <span className="text-[10px] font-mono text-primary/60 bg-primary/5 px-2 py-1 rounded border border-primary/20">
              {code}
            </span>
          </div>
          
          <h3 className="text-lg font-black uppercase tracking-tight mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-sm text-foreground/60 leading-relaxed font-mono">
            {description}
          </p>
          
          {/* Animated arrow */}
          <div className="mt-4 flex items-center gap-2 text-xs font-mono text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <span>Explore</span>
            <ArrowUpRight size={14} className="animate-pulse" />
          </div>
        </div>
        
        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-primary/20 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
};

// Liquid Glass Tech Card
const LiquidTechCard = ({ tech, index }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="group relative"
    >
      <div className="relative bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-black/20 backdrop-blur-md border border-white/20 rounded-xl p-4 overflow-hidden">
        {/* Liquid blob effect */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary/30 rounded-full blur-2xl group-hover:bg-accent/30 transition-colors duration-500" />
        <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-accent/20 rounded-full blur-xl group-hover:bg-primary/20 transition-colors duration-500" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[9px] font-mono text-primary/70 uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-full">
              {tech.category}
            </span>
            <span className="text-[8px] font-mono text-foreground/30">v.0{index + 1}</span>
          </div>
          
          <h3 className="text-foreground font-black uppercase text-sm mb-3 group-hover:text-primary transition-colors">
            {tech.name}
          </h3>
          
          <div className="space-y-2">
            <div className="flex justify-between text-[9px] font-mono text-foreground/50 uppercase">
              <span>Proficiency</span>
              <span className="text-primary">{tech.level}</span>
            </div>
            <div className="h-1.5 w-full bg-foreground/10 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: tech.level }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Floating Stat Card
const StatCard = ({ value, label, icon: Icon }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="relative group"
  >
    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative bg-white/5 dark:bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl p-4 text-center">
      <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
      <div className="text-2xl font-black text-foreground">{value}</div>
      <div className="text-[10px] font-mono text-foreground/50 uppercase tracking-wider">{label}</div>
    </div>
  </motion.div>
);

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => setScrollY(window.scrollY);
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-background text-foreground transition-colors duration-500 selection:bg-primary/30 overflow-x-hidden">
      
      {/* Global liquid cursor follower */}
      <div 
        className="fixed w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none z-0 transition-all duration-700 ease-out hidden lg:block"
        style={{ 
          left: mousePosition.x - 192, 
          top: mousePosition.y - 192,
          transform: `translate(${scrollY * 0.05}px, ${scrollY * 0.05}px)`
        }}
      />

      {/* SECTION 1: HERO */}
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden">
        <Particles />
        
        {/* Animated grid background */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.02]" 
          style={{ 
            backgroundImage: 'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)', 
            backgroundSize: '80px 80px',
            transform: `perspective(500px) rotateX(60deg) translateY(${scrollY * 0.2}px)`,
            transformOrigin: 'center top'
          }} 
        />

        {/* Floating glass orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="z-10 text-center space-y-8 max-w-5xl mt-[-10vh] relative">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 dark:bg-black/20 backdrop-blur-md border border-primary/20 text-primary font-mono text-xs tracking-wider uppercase"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            High Performance IT Solutions
          </motion.div>

          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-foreground uppercase italic leading-[0.85]"
            >
              <span className="block bg-gradient-to-r from-emerald-500 via-primary to-accent bg-clip-text text-transparent">
                ENGINEERING
              </span> 
              <span className="block text-foreground/90 drop-shadow-2xl">
                THE FUTURE
              </span>
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto text-foreground/60 font-mono text-sm md:text-base uppercase tracking-widest leading-relaxed"
          >
            Software Development // Cloud Infrastructure // Cybersecurity 
            <br/>
            <span className="text-foreground font-bold italic bg-primary/10 px-2 py-1 rounded backdrop-blur-sm">
              Building scalable digital assets for global clients.
            </span>
          </motion.p>
          
          {/* CTA Buttons with Neobrutalism */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-6"
          >
            {/* Primary CTA - Neobrutalist */}
            <button 
              onClick={() => document.getElementById('onboarding')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative group"
            >
              <div className="absolute inset-0 bg-primary translate-x-1.5 translate-y-1.5 rounded-lg transition-transform duration-200 group-hover:translate-x-2 group-hover:translate-y-2" />
              <div className="relative bg-foreground text-background dark:bg-white dark:text-black font-bold px-8 py-4 rounded-lg border-2 border-foreground dark:border-white uppercase tracking-tighter flex items-center gap-3 transition-transform duration-200 group-hover:-translate-y-0.5">
                Initiate Project
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
            
            {/* Secondary CTA - Glassmorphism */}
            <button 
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative group px-8 py-4 rounded-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-foreground/20 rounded-lg group-hover:border-primary/50 transition-colors" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative font-mono text-sm uppercase tracking-tighter text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                View Capabilities
                <ArrowUpRight size={14} />
              </span>
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-center gap-8 pt-12 opacity-60"
          >
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider">
              <Shield className="w-4 h-4 text-primary" />
              <span>Enterprise Security</span>
            </div>
            <div className="w-1 h-1 bg-foreground/30 rounded-full" />
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider">
              <Globe className="w-4 h-4 text-primary" />
              <span>Global Delivery</span>
            </div>
            <div className="w-1 h-1 bg-foreground/30 rounded-full" />
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider">
              <Zap className="w-4 h-4 text-primary" />
              <span>24/7 Support</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Bottom Status - Glass panel */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-10 left-10 hidden lg:block"
        >
          <div className="bg-white/5 dark:bg-black/20 backdrop-blur-md border border-white/10 rounded-lg p-4 font-mono text-[10px] text-foreground/50 space-y-2">
            <p className="flex items-center gap-2 text-primary">
              <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
              CORE_ENGINE: OPERATIONAL
            </p>
            <p className="flex items-center gap-2">
              <Terminal size={12} />
              LOC: NBO_001 // CLIENT_READY
            </p>
            <div className="h-1 w-full bg-foreground/10 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-primary w-3/4 animate-pulse" />
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 right-10 hidden lg:flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest rotate-90 origin-center translate-x-4">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </div>

      {/* SECTION 2: SERVICES - Enhanced with Glassmorphism + Neobrutalism */}
      <section id="services" className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-primary" />
              <span className="text-primary font-mono text-xs uppercase tracking-widest">What We Do</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
              Technical<br/>
              <span className="text-foreground/40">Specialties</span>
            </h2>
          </div>
          <p className="text-foreground/50 font-mono text-xs uppercase tracking-widest max-w-xs text-right">
            Our core engineering stack and operational domains
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Software_Dev", code: "NODE_01", icon: Code2, description: "Bespoke web/mobile apps built with React, Next.js, and Node.js for maximum scalability." },
            { title: "Cloud_Infra", code: "NODE_02", icon: Cloud, description: "AWS/Azure orchestration, Docker containers, and automated CI/CD pipeline deployments." },
            { title: "Cyber_Sec", code: "NODE_03", icon: ShieldAlert, description: "Hardened system architecture, penetration testing, and advanced data encryption protocols." },
            { title: "Digital_SaaS", code: "NODE_04", icon: Laptop, description: "Full-stack ERP, Clinic, and POS systems optimized for business operational efficiency." },
          ].map((service, i) => (
            <GlassServiceCard key={i} {...service} index={i} />
          ))}
        </div>
      </section>

      {/* SECTION 2.2: TECH STACK - Liquid Glass Cards */}
      <section id="tools" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="relative bg-gradient-to-br from-white/5 to-transparent dark:from-white/[0.02] rounded-3xl p-8 md:p-12 border border-white/10 backdrop-blur-sm">
          <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic flex items-center gap-3">
                <Cpu className="text-primary" size={28} />
                Approved<br/>
                <span className="text-primary">Tech Stack</span>
              </h2>
              <p className="text-foreground/50 font-mono text-xs uppercase tracking-widest mt-3">
                High-performance frameworks and cloud-native infrastructure
              </p>
            </div>
            <div className="flex gap-4">
              <StatCard value="99.9%" label="Uptime" icon={Zap} />
              <StatCard value="50+" label="Projects" icon={Star} />
              <StatCard value="24/7" label="Support" icon={Users} />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
           {[
              { name: "Next.js", category: "Framework", level: "98%" },
            { name: "TypeScript", category: "Architecture", level: "100%" },
             { name: "PostgreSQL", category: "Relational_DB", level: "94%" },
            { name: "MongoDB", category: "NoSQL_MERN", level: "98%" },
            { name: "Node.js", category: "Backend_MERN", level: "95%" },
            { name: "Express", category: "Middleware", level: "90%" },
            { name: "React", category: "Library", level: "98%" },
            { name: "Supabase", category: "Realtime_BAAS", level: "96%" },
            { name: "AWS", category: "Cloud_Infra", level: "88%" },
            { name: "Docker", category: "Containerization", level: "90%" },
            { name: "Framer_Motion", category: "Animations", level: "94%" },
            { name: "Tailwind", category: "UI_Styling", level: "95%" },
            ].map((tech, i) => (
              <LiquidTechCard key={i} tech={tech} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: CLIENT EXPERIENCE - Glassmorphism Dashboard Preview */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-xs uppercase tracking-wider">
              <Sparkles size={14} />
              Client Management System
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic leading-[0.9]">
              Full Transparency<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                During Every Build.
              </span>
            </h2>
            
            <p className="text-foreground/60 font-mono text-sm leading-relaxed max-w-md">
              We don't just build and disappear. Every client receives access to our <strong className="text-primary">Command Center</strong> dashboard for real-time project insights.
            </p>
            
            <div className="space-y-4 pt-4">
              {[
                "Direct Engineering Channel",
                "Real-time Deployment Tracking", 
                "Automated Infrastructure Audits",
                "Secure Document Exchange"
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-3 rounded-lg bg-white/5 dark:bg-black/10 border border-white/5 hover:border-primary/30 transition-colors group"
                >
                  <div className="p-1.5 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors">
                    <CheckCircle2 size={16} className="text-primary" />
                  </div>
                  <span className="text-sm font-mono text-foreground/80 uppercase tracking-wider">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Dashboard Preview - Liquid Glass */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-accent/30 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
            
            <div className="relative bg-white/5 dark:bg-black/30 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-2xl overflow-hidden">
              {/* Liquid background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <Terminal className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-bold uppercase tracking-tight">Live Status Monitor</div>
                      <div className="text-[10px] font-mono text-foreground/50">Project: CLIENT_DASHBOARD_V2</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-500 uppercase">Online</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Infrastructure Deployment", value: 92, color: "bg-primary" },
                    { label: "Security Audit", value: 100, color: "bg-emerald-500" },
                    { label: "API Integration", value: 78, color: "bg-yellow-500" },
                    { label: "UI/UX Polish", value: 65, color: "bg-purple-500" }
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[11px] font-mono uppercase text-foreground/60">
                        <span>{item.label}</span>
                        <span className="text-foreground">{item.value}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.value}%` }}
                          transition={{ duration: 1.5, delay: 0.5 + (i * 0.1) }}
                          viewport={{ once: true }}
                          className={`h-full ${item.color} rounded-full shadow-[0_0_10px_rgba(0,0,0,0.3)]`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                  <div className="flex gap-2">
                    <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono uppercase">
                      Last Deploy: 2m ago
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-500 uppercase">
                      All Systems Go
                    </div>
                  </div>
                  <Play size={16} className="text-primary" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: CONTACT/ONBOARDING - Enhanced Glass Form */}
      <section id="onboarding" className="relative z-10 max-w-5xl mx-auto px-6 py-32">
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic"
          >
            Start The<br/>
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Build
            </span>
          </motion.h2>
          <p className="text-foreground/50 font-mono text-sm uppercase tracking-widest">
            Ready to transform your digital infrastructure?
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* Neobrutalist shadow */}
          <div className="absolute inset-0 bg-primary translate-x-3 translate-y-3 rounded-2xl transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4" />
          
          {/* Glass container */}
          <div className="relative bg-white/10 dark:bg-black/20 backdrop-blur-2xl border-2 border-foreground/20 rounded-2xl p-8 md:p-12 overflow-hidden">
            {/* Liquid shimmer */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-50" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <ContactForm />
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER - Glassmorphism */}
      <footer className="relative border-t border-white/10 mt-20">
        <div className="absolute inset-0 bg-white/5 dark:bg-black/20 backdrop-blur-lg" />
        <div className="relative max-w-7xl mx-auto py-12 px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Terminal className="w-5 h-5 text-primary" />
              </div>
              <div className="text-foreground font-black italic tracking-tighter text-2xl uppercase">
                SYSTX<span className="text-primary">.INFRA</span>
              </div>
            </div>
            
           <div className="flex items-center gap-6 text-[11px] font-mono text-foreground/40 uppercase tracking-widest">
   <Link href="/Privacy" className="hover:text-primary transition-colors cursor-pointer">
    Privacy
  </Link>
  <span className="w-1 h-1 bg-foreground/20 rounded-full" />
  <Link href="/terms" className="hover:text-primary transition-colors cursor-pointer">
    Terms
  </Link>
  <span className="w-1 h-1 bg-foreground/20 rounded-full" />
  <Link href="/Careers" className="hover:text-primary transition-colors cursor-pointer">
    Careers
  </Link>
</div>

            <div className="text-[10px] font-mono text-foreground/30 uppercase tracking-[0.2em]">
              Precision Software // Scalable Systems // 2026
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING COMMUNICATIONS LAYER */}
      <div className="fixed bottom-8 w-full px-8 z-[90] pointer-events-none flex justify-between items-end">
        {/* WhatsApp - Liquid Glass */}
        <motion.a 
          whileHover={{ scale: 1.1 }}
          href="https://wa.me/254716700151?text=Hello%20SYSTX%20Team%2C%20I%20would%20like%20to%20inquire%20about%20your%20services"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto group relative"
        >
          <div className="absolute inset-0 bg-[#25D366] rounded-full blur-xl opacity-20 group-hover:opacity-50 transition-opacity" />
          <div className="relative flex items-center justify-center w-14 h-14 bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-[#25D366]/30 rounded-full hover:bg-[#25D366]/20 transition-all duration-500 shadow-lg">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#25D366]">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 0 5.414 0 12.05c0 2.123.555 4.197 1.608 6.02L0 24l6.117-1.605a12.03 12.03 0 005.925 1.556h.005c6.632 0 12.045-5.413 12.045-12.048 0-3.212-1.25-6.232-3.52-8.502z"/>
            </svg>
          </div>
          <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-foreground text-background text-[10px] font-mono uppercase rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chat on WhatsApp
          </span>
        </motion.a>

        {/* Back to top - Neobrutalist */}
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="pointer-events-auto relative group"
        >
          <div className="absolute inset-0 bg-primary translate-x-1 translate-y-1 rounded-lg transition-transform duration-200 group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
          <div className="relative p-3 bg-foreground text-background dark:bg-white dark:text-black rounded-lg border-2 border-foreground dark:border-white transition-transform duration-200 group-hover:-translate-y-0.5">
            <ArrowRight className="-rotate-45" size={20} />
          </div>
        </motion.button>
      </div>
    </div>
  );
}