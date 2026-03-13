"use client";
import React from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { TypingEffect } from "@/components/ui/TypingEffect";
// import { Footer } from "@/components/layout/Footer"; 
import { Target, Users, Zap, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutUsPage() {
  // Updated icons to use the 'text-primary' variable
  const valueProps = [
    { icon: <Target className="text-primary" size={32} />, title: "Precision", description: "Every project node is audited for performance and scalability." },
    { icon: <Zap className="text-primary" size={32} />, title: "Performance", description: "Bespoke systems optimized for speed and operational efficiency." },
    { icon: <Users className="text-primary" size={32} />, title: "Collaboration", description: "Direct engineering channels for real-time project transparency." },
    { icon: <Award className="text-primary" size={32} />, title: "Expertise", description: "A roster of verified IT specialists driving your digital assets." },
  ];

  const milestones = [
    { year: "2024.1", event: "SYSTEM_ALPHA // systx// established." },
    { year: "2024.6", event: "UPLINK_STABLE // 50+ successful client deployments complete." },
    { year: "2025.1", event: "INFRA_HARDENED // Secured initial enterprise-level audit." },
    { year: "2025.Q3", event: "NODE_EXPANSION // Launched global specialist network." },
  ];

  return (
    /* theme-about class targets the slate variables in your CSS */
    <div className="theme-about bg-background min-h-screen text-foreground pt-24 selection:bg-primary/30 transition-colors duration-500">
      <Navbar />

      {/* SECTION 1: THE HERO */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32 border-l border-zinc-900 ml-6 md:ml-12 lg:ml-auto">
        <div className="space-y-6 max-w-4xl">
          <p className="text-[10px] text-primary uppercase font-mono tracking-[0.5em] animate-pulse">
            [ VISION_MANIFEST ]
          </p>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.8]">
            <TypingEffect text="SYSTX//DIGITAL_INFRA" /> <br/> 
            <span className="text-foreground drop-shadow-[0_0_20px_var(--primary-glow)]">Architecting Digital Infrastructure.</span>
          </h1>
          <p className="max-w-xl text-zinc-500 font-mono text-sm leading-relaxed pt-4">
            We are a dedicated collective of IT specialists and software engineers, united by a singular protocol: precision deployment of digital assets.
          </p>
        </div>
      </section>

      {/* SECTION 2: CORE VALUES */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 bg-card/20 border-y border-zinc-900">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="flex-1 space-y-6 pr-8">
             <div className="inline-block bg-primary/10 border border-primary/20 px-3 py-1 rounded-full text-[10px] text-primary font-mono uppercase tracking-widest">
               Our_Core_Values
             </div>
             <h2 className="text-4xl font-black tracking-tighter uppercase italic leading-tight text-foreground">
               Engineering <br/> 
               <span className="text-zinc-500">Without Compromise.</span>
             </h2>
             <p className="text-zinc-400 font-mono text-sm leading-relaxed">
               Your digital presence is an operational node in a global network. We ensure that node is secure, performant, and perfectly aligned with your business logic.
             </p>
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
            {valueProps.map((value, i) => (
              <div key={i} className="space-y-4 border-l-2 border-primary/30 pl-6 group hover:border-primary transition-all">
                <div className="group-hover:scale-110 transition-transform">{value.icon}</div>
                <h3 className="text-lg font-bold text-foreground uppercase group-hover:text-primary transition-colors">{value.title}</h3>
                <p className="text-xs text-zinc-500 font-mono tracking-wide leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: TIMELINE */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 pb-32">
        <div className="text-center mb-16 space-y-4 border-l-4 border-primary pl-6 lg:border-l-0 lg:pl-0 lg:max-w-xl lg:mx-auto">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">Operational_Timeline</h2>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.4em]">Audit Trail // Deployment Milestones</p>
        </div>
        <div className="space-y-6">
          {milestones.map((milestone, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-8 bg-card/10 border border-zinc-900 p-6 rounded-sm">
                <div className="w-24 text-4xl md:text-6xl font-black text-primary/20 font-mono">{milestone.year}</div>
                <div className="flex-1 border-t md:border-t-0 md:border-l border-zinc-900 pt-4 md:pt-0 md:pl-8 flex items-center">
                    <p className="text-zinc-300 font-mono text-sm tracking-widest leading-relaxed uppercase">
                       {milestone.event}
                    </p>
                </div>
            </div>
          ))}
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
}