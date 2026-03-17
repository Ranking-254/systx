// app/privacy/page.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, 
  Eye, 
  Database, 
  Server, 
  ShieldCheck,
  ArrowRight,
  Terminal,
  Fingerprint,
  Cookie
} from 'lucide-react';
import Link from 'next/link';

const PrivacyCard = ({ title, content, icon: Icon, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
    viewport={{ once: true }}
    className="relative group h-full"
  >
    <div className="absolute inset-0 bg-primary translate-x-2 translate-y-2 rounded-xl transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3" />
    <div className="relative h-full bg-white/5 dark:bg-black/20 backdrop-blur-xl border-2 border-foreground/20 rounded-xl p-6 overflow-hidden hover:border-primary/50 transition-colors">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        <div className="p-3 bg-primary/10 rounded-lg border border-primary/20 w-fit mb-4">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-black uppercase tracking-tight italic mb-3">{title}</h3>
        <p className="text-foreground/60 font-mono text-xs leading-relaxed">{content}</p>
      </div>
    </div>
  </motion.div>
);

export default function PrivacyPage() {
  const dataPractices = [
    {
      title: "Data Collection",
      icon: Database,
      content: "We collect only project-essential data: contact details, technical requirements, and usage analytics. No biometric data, no unnecessary tracking. We build software, not surveillance systems."
    },
    {
      title: "Encryption Standards",
      icon: Lock,
      content: "AES-256 encryption at rest, TLS 1.3 in transit. Your project data is treated like our own—locked down, segmented, and monitored. We use zero-knowledge architecture where possible."
    },
    {
      title: "Third-Party Sharing",
      icon: Eye,
      content: "We don't sell data. Period. Limited sharing only with essential infrastructure providers (AWS, Vercel) under strict DPAs. No marketing partnerships, no data brokers."
    },
    {
      title: "Retention Policy",
      icon: Server,
      content: "Project data retained for duration of engagement + 1 year for support, then securely purged. Backups encrypted and rotated every 30 days. You can request immediate deletion."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Hero */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(var(--color-primary)_1px,transparent_1px),linear-gradient(90deg,var(--color-primary)_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.03]" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-mono text-xs uppercase tracking-wider mb-6"
              >
                <ShieldCheck size={14} />
                Zero-Trust Architecture
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic mb-6 leading-[0.9]"
              >
                Privacy<br/>
                <span className="text-emerald-500">Protocol</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-foreground/60 font-mono text-sm uppercase tracking-widest leading-relaxed"
              >
                We handle sensitive infrastructure for global clients. 
                Privacy isn't compliance—it's engineering. 
                Here's exactly how we protect your data.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" />
              <div className="relative bg-white/5 dark:bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Fingerprint className="w-8 h-8 text-emerald-500" />
                    <div>
                      <div className="text-sm font-bold uppercase tracking-wider">Security Status</div>
                      <div className="text-[10px] font-mono text-emerald-500">ALL SYSTEMS SECURE</div>
                    </div>
                  </div>
                  <div className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse" />
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Encryption", status: "AES-256", active: true },
                    { label: "Access Control", status: "MFA Required", active: true },
                    { label: "Audit Logs", status: "Real-time", active: true },
                    { label: "Data Residency", status: "EU/US/KE", active: true }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                      <span className="text-xs font-mono text-foreground/60 uppercase">{item.label}</span>
                      <span className="text-xs font-bold text-emerald-500">{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Data Practices Grid */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-black uppercase italic tracking-tight mb-4">
            Data <span className="text-primary">Governance</span>
          </h2>
          <p className="text-foreground/50 font-mono text-sm uppercase tracking-widest">
            Four pillars of our privacy architecture
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {dataPractices.map((practice, i) => (
            <PrivacyCard key={i} {...practice} index={i} />
          ))}
        </div>
      </section>

      {/* Cookie Policy */}
      <section className="max-w-4xl mx-auto px-6 py-20 border-t border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-primary translate-x-2 translate-y-2 rounded-xl" />
          <div className="relative bg-gradient-to-br from-amber-500/10 to-transparent border-2 border-amber-500/30 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-500/20 rounded-lg">
                <Cookie className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase italic tracking-tight mb-3 text-amber-500">
                  Cookie Protocol
                </h3>
                <p className="text-foreground/70 font-mono text-sm leading-relaxed mb-4">
                  Our site uses essential cookies only—no tracking pixels, no ad retargeting, 
                  no behavioral profiling. We use session cookies for our dashboard and 
                  analytics cookies (anonymized) to improve our services. No third-party 
                  marketing scripts load on our domain.
                </p>
                <div className="flex gap-4 text-[10px] font-mono uppercase tracking-wider">
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-500 rounded-full">Essential Only</span>
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-500 rounded-full">No Trackers</span>
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-500 rounded-full">GDPR Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Your Rights */}
      <section className="max-w-4xl mx-auto px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-black uppercase italic tracking-tight mb-4">
            Your <span className="text-primary">Rights</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {[
            "Right to Access — Request all data we hold about you",
            "Right to Rectification — Correct inaccurate information",
            "Right to Erasure — 'Right to be forgotten', complete data deletion",
            "Right to Portability — Receive your data in machine-readable format",
            "Right to Object — Opt-out of any data processing activities"
          ].map((right, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-lg hover:border-primary/30 transition-colors group"
            >
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-sm group-hover:bg-primary group-hover:text-background transition-colors">
                {i + 1}
              </div>
              <span className="font-mono text-sm text-foreground/80">{right}</span>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-foreground/50 font-mono text-sm mb-6">
            Exercise your rights: privacy@systx.infra
          </p>
          <Link 
            href="mailto:privacy@systx.infra"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white dark:text-black font-bold uppercase tracking-tighter rounded-lg hover:bg-accent transition-colors"
          >
            Contact DPO
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-foreground/40 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-primary" />
            <span>SYSTX_INFRA // PRIVACY_DIVISION</span>
          </div>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/careers" className="hover:text-primary transition-colors">Careers</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}