"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Mail, Phone, X, ArrowRight, Laptop, Camera, Megaphone, Briefcase, Loader2 } from 'lucide-react';
import { supabase } from "@/lib/superbase"; 

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: ''
  });

  const services = [
    { title: "Custom Software Development", icon: <Laptop size={20} /> },
    { title: "Responsive Web Design", icon: <Laptop size={20} /> },
    { title: "Mobile-Friendly Applications", icon: <Laptop size={20} /> },
    { title: "Marketing", icon: <Megaphone size={20} /> },
    { title: "Commercial", icon: <Briefcase size={20} /> },
    { title: "Product Photography", icon: <Camera size={20} /> },
    { title: "Wedding & Event coverage", icon: <Camera size={20} /> },
    { title: "Consultation", icon: <User size={20} /> },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const sequence = ["INITIALIZING_UPLINK...", "ENCRYPTING_DATA...", "COMMITTING_TO_DATABASE...", "DEPLOYMENT_SUCCESSFUL"];
    
    for (let msg of sequence) {
      setStatusMessage(msg);
      await new Promise(res => setTimeout(res, 800)); 
    }

    try {
      // 1. GET CURRENT LOGGED IN USER
      const { data: { user } } = await supabase.auth.getUser();

      // 2. INSERT WITH USER_ID LINK
      const { error } = await supabase
        .from('bookings')
        .insert([{ 
          service_type: formData.service,
          preferred_date: formData.date,
          preferred_time: formData.time,
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          user_id: user?.id // THE MAGIC LINK: If they are logged in, we tag the booking
        }]);

      if (error) throw error;
      
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSubmitting(false);
        setStatusMessage("");
      }, 1000);

    } catch (err) {
      console.error(err);
      setStatusMessage("UPLINK_CRITICAL_FAILURE");
      setTimeout(() => setIsSubmitting(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30 font-sans">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none">
              Engineering <span className="text-emerald-500">Digital</span> Excellence.
            </h1>
            <p className="text-zinc-400 font-mono text-sm uppercase tracking-widest leading-relaxed max-w-md">
              // From custom architecture to high-end media coverage. We deploy solutions that scale.
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-black px-8 py-4 font-black uppercase text-xs tracking-[0.2em] flex items-center gap-3 hover:bg-emerald-500 hover:text-white transition-all group"
            >
              Initialize Booking <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-video bg-zinc-900 rounded-sm overflow-hidden border border-zinc-800 shadow-2xl shadow-emerald-500/10"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent" />
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80" 
              alt="Tech Infrastructure" 
              className="w-full h-full object-cover mix-blend-overlay opacity-60"
            />
          </motion.div>
        </div>
      </section>

      {/* --- SERVICE CARDS SECTION --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ borderColor: '#10b981' }}
              className="p-6 bg-zinc-950 border border-zinc-900 rounded-sm transition-colors group"
            >
              <div className="text-emerald-500 mb-4 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-zinc-300">
                {service.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- BOOKING MODAL --- */}
      <AnimatePresence mode="wait">
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 p-8 rounded-sm shadow-2xl overflow-hidden"
            >
              {/* Submission Overlay */}
              <AnimatePresence>
                {isSubmitting && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="absolute inset-0 z-10 bg-black flex flex-col items-center justify-center space-y-4"
                  >
                    <Loader2 className="text-emerald-500 animate-spin" size={32} />
                    <p className="font-mono text-[10px] tracking-[0.3em] text-emerald-500 animate-pulse">{statusMessage}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white"
              >
                <X size={20} />
              </button>

              <h2 className="text-xl font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 animate-pulse" /> Book_a_Service
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-[10px]">
                <div className="space-y-1">
                  <label className="text-zinc-500 uppercase tracking-tighter">Select_Service</label>
                  <select 
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full bg-black border border-zinc-800 p-3 text-white outline-none focus:border-emerald-500 transition-colors"
                  >
                    <option value="">Select a service</option>
                    {services.map((s, i) => <option key={i} value={s.title}>{s.title}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-zinc-500 uppercase tracking-tighter">Preferred_Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={12} />
                      <input 
                        required
                        type="date" 
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="w-full bg-black border border-zinc-800 p-3 pl-10 text-white outline-none focus:border-emerald-500 transition-colors [color-scheme:dark]" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-zinc-500 uppercase tracking-tighter">Preferred_Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={12} />
                      <input 
                        required
                        type="time" 
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                        className="w-full bg-black border border-zinc-800 p-3 pl-10 text-white outline-none focus:border-emerald-500 transition-colors [color-scheme:dark]" 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-500 uppercase tracking-tighter">Full_Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={12} />
                    <input 
                      required
                      type="text" 
                      placeholder="ENTRY NAME" 
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-black border border-zinc-800 p-3 pl-10 text-white outline-none focus:border-emerald-500 transition-colors" 
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-500 uppercase tracking-tighter">Email_Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={12} />
                    <input 
                      required
                      type="email" 
                      placeholder="NODE@PROVIDER.COM" 
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-black border border-zinc-800 p-3 pl-10 text-white outline-none focus:border-emerald-500 transition-colors" 
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-500 uppercase tracking-tighter">Phone_Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={12} />
                    <input 
                      required
                      type="tel" 
                      placeholder="+XXX XXX XXX" 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-black border border-zinc-800 p-3 pl-10 text-white outline-none focus:border-emerald-500 transition-colors" 
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-500 text-black font-black uppercase py-4 mt-4 tracking-[0.2em] hover:bg-white transition-all disabled:opacity-50"
                >
                  Commit_Booking
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}