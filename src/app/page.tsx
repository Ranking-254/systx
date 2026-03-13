"use client";
import React from 'react';
import { Particles } from "@/components/ui/Particles";
import { Code2, Cloud, ShieldAlert, Laptop, ArrowRight, CheckCircle2, Zap, Cpu } from "lucide-react";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ContactForm } from "@/components/ui/ContactForm";
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="bg-background text-foreground transition-colors duration-500 selection:bg-primary/30">
      
      {/* SECTION 1: HERO (The Hook) */}
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden">
        <Particles />
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.08] dark:opacity-[0.04]" 
          style={{ 
            backgroundImage: 'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)', 
            backgroundSize: '60px 60px' 
          }} 
        />

        <div className="z-10 text-center space-y-8 max-w-4xl mt-[-10vh]">
          <div className="space-y-2">
            <p className="text-primary font-mono text-xs tracking-[0.5em] animate-pulse uppercase">
              [ High_Performance_IT_Solutions ]
            </p>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-foreground uppercase italic leading-[0.8]">
              {/* TARGET 1: ENGINEERING - Emerald in light, Foreground in dark */}
              <span className="transition-colors duration-500 text-emerald-500 dark:text-foreground">
                ENGINEERING
              </span> 
              <br />
              <span className="text-primary drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">THE FUTURE</span>
            </h1>
          </div>

          <p className="max-w-xl mx-auto text-foreground/60 font-mono text-sm uppercase tracking-widest leading-relaxed">
            Software Development // Cloud Infrastructure // Cybersecurity 
            <br/>
            <span className="text-foreground/80 font-bold italic">Building scalable digital assets for global clients.</span>
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => document.getElementById('onboarding')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative group overflow-hidden bg-primary text-white dark:text-black font-bold px-10 py-4 rounded-sm hover:bg-accent transition-all duration-300 transform active:scale-95"
            >
              <span className="relative z-10 uppercase tracking-tighter flex items-center gap-2">
                Initiate_Project <ArrowRight size={16} />
              </span>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/40 opacity-40 group-hover:animate-shine" />
            </button>
            
            {/* TARGET 2: View_Capabilities - Emerald text/border in light mode */}
            <button 
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-emerald-500 dark:border-foreground/10 text-emerald-500 dark:text-foreground px-10 py-4 rounded-sm hover:bg-emerald-500/5 dark:hover:bg-foreground/5 transition-all duration-500 font-mono text-sm uppercase tracking-tighter"
            >
              View_Capabilities
            </button>
          </div>
        </div>

        {/* Hero Bottom Status */}
        <div className="absolute bottom-10 left-10 font-mono text-[10px] text-foreground/40 space-y-1 hidden lg:block">
          <p className="flex items-center gap-2 text-primary/60">
            <span className="h-1 w-1 rounded-full bg-primary animate-ping" />
            CORE_ENGINE: OPERATIONAL
          </p>
          <p>LOC: NBO_001 // CLIENT_READY</p>
        </div>
      </div>

      {/* SECTION 2: SERVICES */}
      <section id="services" className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4 border-l-2 border-primary pl-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tighter uppercase italic">Technical_Specialties</h2>
            <p className="text-foreground/50 font-mono text-xs uppercase tracking-widest">Our core engineering stack and operational domains</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ServiceCard title="Software_Dev" code="NODE_01" icon={Code2} description="Bespoke web/mobile apps built with React, Next.js, and Node.js for maximum scalability." />
          <ServiceCard title="Cloud_Infra" code="NODE_02" icon={Cloud} description="AWS/Azure orchestration, Docker containers, and automated CI/CD pipeline deployments." />
          <ServiceCard title="Cyber_Sec" code="NODE_03" icon={ShieldAlert} description="Hardened system architecture, penetration testing, and advanced data encryption protocols." />
          <ServiceCard title="Digital_SaaS" code="NODE_04" icon={Laptop} description="Full-stack ERP, Clinic, and POS systems optimized for business operational efficiency." />
        </div>
      </section>

      {/* SECTION 2.2: TECH STACK */}
      <section id="tools" className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-foreground/5">
        <div className="mb-16">
          <h2 className="text-2xl font-black tracking-tighter uppercase italic flex items-center gap-3">
            <Cpu className="text-primary" size={20} /> Approved_Tech_Stack
          </h2>
          <p className="text-foreground/50 font-mono text-[10px] uppercase tracking-widest mt-2">
            High-performance frameworks and cloud-native infrastructure
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: "Next.js", category: "Frontend", level: "98%" },
            { name: "TypeScript", category: "Language", level: "100%" },
            { name: "PostgreSQL", category: "Database", level: "94%" },
            { name: "AWS", category: "Cloud", level: "88%" },
            { name: "Docker", category: "DevOps", level: "90%" },
            { name: "Tailwind", category: "Styling", level: "95%" },
          ].map((tech, i) => (
            <div key={i} className="group relative bg-card border border-foreground/10 p-4 hover:border-primary/50 transition-all duration-500">
              <div className="absolute inset-0 bg-scanline opacity-[0.02] pointer-events-none" />
              <div className="flex justify-between items-start mb-4">
                <div className="text-[10px] font-mono text-primary/70">{tech.category}</div>
                <div className="text-[8px] font-mono text-foreground/30">v.0{i+1}</div>
              </div>
              <h3 className="text-foreground font-black uppercase text-sm mb-4 group-hover:text-primary transition-colors">
                {tech.name}
              </h3>
              <div className="space-y-1">
                <div className="flex justify-between text-[8px] font-mono text-foreground/40 uppercase">
                  <span>Compatibility</span>
                  <span>{tech.level}</span>
                </div>
                <div className="h-[1px] w-full bg-foreground/10">
                  <div className="h-full bg-primary/50" style={{ width: tech.level }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: THE "CLIENT EXPERIENCE" */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32 bg-card/40 border-y border-foreground/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="text-primary font-mono text-xs flex items-center gap-2">
              <Zap size={14} fill="currentColor" /> CLIENT_MANAGEMENT_SYSTEM
            </div>
            <h2 className="text-5xl font-black tracking-tighter uppercase italic leading-tight text-foreground">
              Full Transparency <br/> 
              <span className="text-foreground/40">During Every Build.</span>
            </h2>
            <p className="text-foreground/60 font-mono text-sm leading-relaxed">
              We don't just build and disappear. Every client receives access to our <strong>Command Center</strong> dashboard.
            </p>
            <div className="space-y-3 pt-4">
              {[
                "Direct Engineering Channel",
                "Real-time Deployment Tracking",
                "Automated Infrastructure Audits"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-xs font-mono text-foreground/70 uppercase">
                  <CheckCircle2 size={16} className="text-primary" /> {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-background border border-foreground/10 p-6 rounded shadow-2xl">
               <div className="flex justify-between items-center mb-6 border-b border-foreground/10 pb-4">
                  <div className="text-[10px] font-mono text-primary uppercase tracking-widest">Live_Status_Monitor</div>
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
               </div>
               <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-mono uppercase text-foreground/40">
                      <span>Infra_Deployment</span>
                      <span>92%</span>
                    </div>
                    <div className="h-1.5 w-full bg-foreground/5 overflow-hidden">
                       <div className="h-full bg-primary w-[92%]" />
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CONTACT/ONBOARDING */}
      <section id="onboarding" className="relative z-10 max-w-4xl mx-auto px-6 py-32">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-foreground">
            Start_The_<span className="text-primary">Build</span>
          </h2>
        </div>
        <div className="bg-card border border-foreground/10 p-8 md:p-12">
          <ContactForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-foreground/10 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-foreground font-black italic tracking-tighter text-xl uppercase">
            SYSTX<span className="text-primary">_INFRA</span>
          </div>
          <div className="text-[10px] font-mono text-foreground/30 uppercase tracking-[0.2em]">
            Precision Software // Scalable Systems // 2026
          </div>
        </div>
      </footer>

      {/* FLOATING_COMMUNICATIONS_LAYER */}
      <div className="fixed bottom-8 w-full px-8 z-[90] pointer-events-none flex justify-between items-end">
        <a 
          href="https://wa.me/254716700151"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto group relative flex items-center justify-center w-12 h-12 bg-[#25D366]/10 border border-[#25D366]/20 rounded-full hover:bg-[#25D366] transition-all duration-500 shadow-[0_0_15px_rgba(37,211,102,0.1)] hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white group-hover:scale-110 transition-transform">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 0 5.414 0 12.05c0 2.123.555 4.197 1.608 6.02L0 24l6.117-1.605a12.03 12.03 0 005.925 1.556h.005c6.632 0 12.045-5.413 12.045-12.048 0-3.212-1.25-6.232-3.52-8.502z"/>
          </svg>
        </a>

        <button 
          onClick={() => document.getElementById('onboarding')?.scrollIntoView({ behavior: 'smooth' })}
          className="pointer-events-auto group flex flex-col items-end gap-2"
        >
          <div className="bg-primary/10 border border-primary/30 p-3 hover:bg-primary hover:text-white dark:hover:text-black transition-all duration-300 rounded-sm">
            <ArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform" size={20} />
          </div>
        </button>
      </div>
    </div>
  );
}