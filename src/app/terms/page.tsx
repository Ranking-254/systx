// app/terms/page.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Scale, 
  FileText, 
  Shield, 
  AlertCircle, 
  CheckCircle2,
  ArrowRight,
  Terminal,
  Globe,
  Lock
} from 'lucide-react';
import Link from 'next/link';

const Section = ({ title, children, icon: Icon, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
    viewport={{ once: true }}
    className="relative group mb-8"
  >
    {/* Neobrutalist shadow */}
    <div className="absolute inset-0 bg-primary translate-x-2 translate-y-2 rounded-xl transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3" />
    
    {/* Glass card */}
    <div className="relative bg-white/5 dark:bg-black/20 backdrop-blur-xl border-2 border-foreground/20 rounded-xl p-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight italic">{title}</h2>
        </div>
        <div className="prose prose-invert max-w-none">
          {children}
        </div>
      </div>
    </div>
  </motion.div>
);

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Hero */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(var(--color-primary)_1px,transparent_1px),linear-gradient(90deg,var(--color-primary)_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.03]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-xs uppercase tracking-wider mb-6"
          >
            <Scale size={14} />
            Legal Framework
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic mb-6"
          >
            Terms of<br/>
            <span className="text-primary">Service</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-foreground/60 font-mono text-sm uppercase tracking-widest max-w-2xl mx-auto"
          >
            Last updated: March 17, 2026 // Version 2.4 // Effective immediately
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-32">
        <Section title="Service Agreement" icon={FileText} index={0}>
          <div className="space-y-4 text-foreground/70 font-mono text-sm leading-relaxed">
            <p>
              By engaging SYSTX Infrastructure for software development, cloud infrastructure, or cybersecurity services, 
              you agree to these terms. We build high-performance digital assets—this agreement ensures we do it with 
              precision and clarity.
            </p>
            <ul className="space-y-3 mt-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>All project scopes defined in Statement of Work (SOW) documents take precedence over general terms.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Client retains full ownership of custom code upon final payment. We retain rights to reusable frameworks.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Third-party API costs (AWS, Twilio, etc.) are billed separately from development fees.</span>
              </li>
            </ul>
          </div>
        </Section>

        <Section title="Payment Structure" icon={Globe} index={1}>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[
              { phase: "Initiation", amount: "40%", desc: "Project kickoff & architecture" },
              { phase: "Development", amount: "40%", desc: "Build & iteration cycles" },
              { phase: "Deployment", amount: "20%", desc: "Launch & handover" }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 rounded-lg p-4 border border-white/10 text-center">
                <div className="text-2xl font-black text-primary mb-1">{item.amount}</div>
                <div className="text-xs font-bold uppercase tracking-wider mb-1">{item.phase}</div>
                <div className="text-[10px] text-foreground/50 font-mono">{item.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-foreground/70 font-mono text-sm leading-relaxed">
            Net 15 payment terms. Late payments subject to 1.5% monthly service charge. 
            We accept wire transfer, crypto (USDC, BTC), and major credit cards.
          </p>
        </Section>

        <Section title="Liability & Warranty" icon={Shield} index={2}>
          <div className="space-y-4 text-foreground/70 font-mono text-sm leading-relaxed">
            <p>
              We warranty our code against critical defects for 90 days post-deployment. 
              This covers bugs in logic we wrote—not changes to third-party APIs or client-modified code.
            </p>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <p className="text-amber-500/90 text-xs">
                <strong className="block mb-1 uppercase tracking-wider">Security Notice</strong>
                While we implement best-practice security measures, clients are responsible for 
                maintaining secure credentials, access controls, and regular security audits post-handover.
              </p>
            </div>
          </div>
        </Section>

        <Section title="Termination" icon={Lock} index={3}>
          <p className="text-foreground/70 font-mono text-sm leading-relaxed mb-4">
            Either party may terminate with 30 days written notice. Upon termination:
          </p>
          <ul className="space-y-2 text-foreground/70 font-mono text-sm">
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary" />
              Client receives all work completed and paid for
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary" />
              Outstanding invoices become immediately due
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary" />
              We provide 60 days of transitional support (billed hourly)
            </li>
          </ul>
        </Section>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-foreground/50 font-mono text-sm mb-6">
            Questions about these terms? Our legal team is available.
          </p>
          <Link 
            href="/#onboarding"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white dark:text-black font-bold uppercase tracking-tighter rounded-lg hover:bg-accent transition-colors"
          >
            Contact Legal Team
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-foreground/40 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-primary" />
            <span>SYSTX_INFRA // LEGAL_DIVISION</span>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/Careers" className="hover:text-primary transition-colors">Careers</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}