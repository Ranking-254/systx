"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, Film, Ticket, Star, 
  MapPin, Users, Calendar, ArrowRight, 
  PlayCircle, CheckCircle2 
} from 'lucide-react';

export default function MediaPage() {
  const [loading, setLoading] = useState(false);

 const gallery = [
    { 
      title: "Corporate Keynote", 
      category: "Event Coverage", 
      // This is now the direct image source link:
      img: "https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
  },
    { 
      title: "Product Launch", 
      category: "Photography", 
      img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80" 
    },
    { 
      title: "Architectural Cine", 
      category: "Cinematography", 
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80" 
    },
  ];
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 selection:bg-emerald-500/30">
      
      {/* --- SECTION 1: VISUAL GALLERY --- */}
      <section className="px-6 max-w-7xl mx-auto mb-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-emerald-500 underline underline-offset-8 decoration-emerald-500/30">Media_&_Coverage</h2>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Capturing the <br/>Infrastructure of <span className="text-zinc-500">Light.</span></h1>
          </div>
          <p className="max-w-xs text-zinc-500 font-mono text-[10px] uppercase leading-relaxed border-l border-zinc-800 pl-4">
            // High-fidelity production for high-stakes environments. We don't just record; we document excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {gallery.map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="group relative aspect-[4/5] overflow-hidden border border-zinc-800 bg-zinc-900"
            >
              <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest mb-1">{item.category}</p>
                <h3 className="font-bold uppercase tracking-tighter">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- SECTION 2: CINEMA PLUS+ AD --- */}
      <section className="bg-zinc-950 border-y border-zinc-900 py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-500/5 blur-[120px] rounded-full" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              <Star size={12} className="text-emerald-500 fill-emerald-500" />
              <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">Premium_Access</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">Cinema <br/><span className="text-emerald-500">Plus+</span></h2>
            
            <p className="text-zinc-400 font-mono text-sm leading-relaxed max-w-md">
              Experience film the way it was engineered. Our high-end ticket booking system provides exclusive access to 8K private screenings, luxury lounges, and VIP concierge services.
            </p>

            <ul className="space-y-3 font-mono text-[11px] text-zinc-500 uppercase">
              <li className="flex items-center gap-3"><CheckCircle2 size={14} className="text-emerald-500" /> Dual-Laser 8K Projection</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={14} className="text-emerald-500" /> Dolby Atmos Infinite Spatial Audio</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={14} className="text-emerald-500" /> Biometric Ticket Authentication</li>
            </ul>
          </div>

          {/* --- CINEMA PLUS+ BOOKING FORM --- */}
          <div className="bg-black border border-zinc-800 p-8 md:p-10 shadow-2xl relative">
            <div className="absolute -top-px left-0 w-20 h-px bg-emerald-500" />
            <h3 className="text-xl font-bold uppercase tracking-widest mb-8 flex items-center gap-3">
              <Ticket size={20} className="text-emerald-500" /> Secure_Ticket_Uplink
            </h3>

            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Select_Experience</label>
                  <select className="w-full bg-zinc-900/50 border border-zinc-800 p-3 text-[11px] font-mono text-white outline-none focus:border-emerald-500 transition-all">
                    <option>IMAX_ELITE</option>
                    <option>PRIVATE_SUITE</option>
                    <option>NOIR_LOUNGE</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Seat_Count</label>
                  <input type="number" min="1" max="10" placeholder="01" className="w-full bg-zinc-900/50 border border-zinc-800 p-3 text-[11px] font-mono text-white outline-none focus:border-emerald-500 transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Screening_Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                  <input type="date" className="w-full bg-zinc-900/50 border border-zinc-800 p-3 pl-10 text-[11px] font-mono text-white outline-none focus:border-emerald-500 transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Special_Requirements</label>
                <textarea rows={2} placeholder="ALLERGIES / ACCESSIBILITY / VIP_REQUESTS" className="w-full bg-zinc-900/50 border border-zinc-800 p-3 text-[11px] font-mono text-white outline-none focus:border-emerald-500 transition-all resize-none" />
              </div>

              <button className="w-full bg-white text-black font-black uppercase py-4 text-xs tracking-[0.3em] hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-3">
                Initialize_Transaction <ArrowRight size={14} />
              </button>
              
              <p className="text-[8px] text-zinc-600 font-mono text-center uppercase tracking-tighter">
                * Payment authenticated via secure SYSTX gateway
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}