"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from "@/lib/superbase"; // Note: Checked for 'superbase' typo
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2, Mail } from 'lucide-react';

export function ContactForm({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', project_type: 'SOFTWARE_DEV', message: ''
  });

  // Define styles at the top of the component scope
  const isLight = variant === "light";
  const labelStyle = `block text-[10px] font-mono uppercase mb-2 tracking-widest ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`;
  const inputStyle = `w-full border p-4 font-mono text-xs outline-none transition-all ${isLight ? 'bg-zinc-50 border-zinc-200 text-black focus:border-emerald-500' : 'bg-zinc-900/50 border-zinc-800 text-white focus:border-emerald-500'}`;

  // REDIRECT_PROTOCOL
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (success) {
      console.log(`📡 REDIRECT_SEQUENCE_ACTIVE: ${countdown}s remaining`);
      
      if (countdown > 0) {
        interval = setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
      } else {
        console.log("🚀 INITIATING_HARD_REDIRECT...");
        window.location.href = '/';
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [success, countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Ensure we match your table columns: name, email, company, project_type, message
    const { error: dbError } = await supabase.from('leads').insert([formData]);

    if (dbError) {
      console.error("UPLINK_ERROR:", dbError);
      setError(`UPLINK_FAILURE: ${dbError.message}`);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
      <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
        <CheckCircle className="text-emerald-500" size={40} />
        <div className="absolute inset-0 border-2 border-emerald-500/20 rounded-full animate-ping" />
      </div>
      <h3 className={`font-black uppercase italic text-2xl ${isLight ? 'text-black' : 'text-white'}`}>
        Transmission_Complete
      </h3>
      <div className="mt-6 space-y-2">
        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">Redirecting to Core in:</p>
        <div className="text-4xl font-black text-emerald-500 font-mono tracking-tighter">
          00:0{countdown}
        </div>
      </div>
    </motion.div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelStyle}>Full_Name</label>
          <input required className={inputStyle} placeholder="NAME_ID" onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>
        <div>
          <label className={labelStyle}>Email_Address</label>
          <input required type="email" className={inputStyle} placeholder="COMM_CHANNEL@HOST.COM" onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </div>
      </div>
      <div>
        <label className={labelStyle}>Project_Protocol</label>
        <select className={inputStyle} value={formData.project_type} onChange={(e) => setFormData({...formData, project_type: e.target.value})}>
          <option value="SOFTWARE_DEV">SOFTWARE_DEVELOPMENT</option>
          <option value="CLOUD_INFRA">CLOUD_INFRASTRUCTURE</option>
          <option value="CYBER_SEC">CYBERSECURITY_AUDIT</option>
        </select>
      </div>
      <div>
        <label className={labelStyle}>Message_Payload</label>
        <textarea required rows={4} className={`${inputStyle} resize-none`} placeholder="ENTER_REQUIREMENTS..." onChange={(e) => setFormData({...formData, message: e.target.value})} />
      </div>
      {error && <p className="text-red-500 font-mono text-[10px] italic bg-red-500/10 p-2 border border-red-500/20">{error}</p>}
      <button 
        disabled={loading}
        className="w-full bg-black text-white font-black uppercase py-4 text-xs tracking-[0.3em] hover:bg-emerald-500 hover:text-black transition-all flex items-center justify-center gap-3 group disabled:opacity-50 border border-zinc-800"
      >
        {loading ? <Loader2 className="animate-spin" /> : <>Initialize_Uplink <Send size={14} /></>}
      </button>
    </form>
  );
}