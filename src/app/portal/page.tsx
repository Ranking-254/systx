"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from "@/lib/superbase";
import { Navbar } from "@/components/layout/Navbar";
import { Loader2, Clock, Activity, BellRing } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ClientPortal() {
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false); // New state for toast

  const getStatusMeta = (prog: number) => {
    if (prog === 0) return { label: "VOID", color: "text-zinc-500", border: "border-zinc-500/20", bg: "bg-zinc-500/5" };
    if (prog <= 30) return { label: "INITIATING", color: "text-orange-500", border: "border-orange-500/20", bg: "bg-orange-500/5" };
    if (prog <= 70) return { label: "OPERATIONAL", color: "text-cyan-400", border: "border-cyan-400/20", bg: "bg-cyan-400/5" };
    if (prog < 100) return { label: "FINALIZING", color: "text-indigo-400", border: "border-indigo-400/20", bg: "bg-indigo-400/5" };
    return { label: "STABLE", color: "text-emerald-500", border: "border-emerald-500/20", bg: "bg-emerald-500/5" };
  };

  const fetchClientData = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from('bookings')
        .select(`*, milestones (*)`)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (data) setBooking(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchClientData();
  }, [fetchClientData]);

  useEffect(() => {
    if (!booking?.id) return;

    const channel = supabase.channel(`booking-update-${booking.id}`)
      .on(
        'postgres_changes', 
        { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'bookings',
          filter: `id=eq.${booking.id}` 
        }, 
        (payload) => {
          // Toast trigger: show if progress specifically changed
          if (payload.new.progress !== undefined) {
             setShowToast(true);
             setTimeout(() => setShowToast(false), 4000);
          }

          setBooking((prev: any) => ({
            ...prev,
            ...payload.new
          }));
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'milestones',
          filter: `booking_id=eq.${booking.id}`
        },
        () => {
          fetchClientData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [booking?.id, fetchClientData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-500" size={24} />
      </div>
    );
  }

  const prog = Number(booking?.progress) || 0;
  const status = getStatusMeta(prog);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 px-6 pb-20 relative overflow-x-hidden">
      <Navbar />

      {/* --- LIVE UPDATE NOTIFICATION --- */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="fixed top-24 right-6 z-[100] bg-emerald-500 text-black px-5 py-3 rounded-sm font-mono text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          >
            <BellRing size={14} className="animate-pulse" />
            Uplink_Update: Status_Synchronized
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-end">
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">Project_Hub</h1>
          <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            LIVE_SYNC_ACTIVE
          </div>
        </div>
        
        {booking ? (
          <div className="space-y-6">
            <div className="bg-zinc-900/20 border border-zinc-800 p-8 rounded-sm space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.3em] mb-1">Active_Deployment</p>
                  <h2 className="text-3xl font-bold uppercase tracking-tight">{booking.service_type}</h2>
                </div>
                
                <div className={`px-4 py-2 border ${status.border} ${status.color} ${status.bg} text-[10px] font-black uppercase tracking-[0.2em] rounded-sm flex items-center gap-2`}>
                  <Activity size={14} className="animate-pulse" />
                  {status.label}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-end font-mono text-[10px] uppercase tracking-widest">
                  <span className="text-zinc-500">System_Deployment_Progress</span>
                  <span className={status.color}>{prog}%</span>
                </div>
                <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800 p-[1px]">
                  <motion.div 
                    key={`client-prog-bar-${prog}`}
                    initial={false} 
                    animate={{ width: `${prog}%` }}
                    transition={{ duration: 1.2, ease: "circOut" }}
                    className={`h-full rounded-full ${prog === 100 ? 'bg-emerald-500' : status.color.replace('text', 'bg')}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 py-6 border-y border-zinc-900 font-mono text-[11px]">
                <div>
                  <p className="text-zinc-600 mb-1 tracking-widest uppercase italic">// Scheduled_Date</p>
                  <p className="text-zinc-300">{booking.preferred_date}</p>
                </div>
                <div>
                  <p className="text-zinc-600 mb-1 tracking-widest uppercase italic">// Uplink_Time</p>
                  <p className="text-zinc-300">{booking.preferred_time}</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/10 border border-zinc-900/50 p-8 rounded-sm">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-500 mb-10">Module_Sequence / Detailed_Trace</h3>
              
              <div className="space-y-0 ml-2">
                {booking.milestones?.sort((a:any, b:any) => a.order_index - b.order_index).map((m: any, idx: number) => (
                    <div key={m.id} className="relative pl-8 pb-10 group">
                      {idx !== booking.milestones.length - 1 && (
                        <div className="absolute left-[4px] top-2 w-[1px] h-full bg-zinc-800 transition-colors group-hover:bg-zinc-700" />
                      )}
                      
                      <div className={`absolute left-0 top-1.5 h-2 w-2 rounded-full z-10 transition-all duration-500 ${
                        m.is_completed ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]' : 'bg-zinc-800 border border-zinc-700'
                      }`} />
                      
                      <div className="flex flex-col gap-1">
                        <span className={`text-[9px] font-bold font-mono uppercase tracking-widest ${m.is_completed ? 'text-emerald-500' : 'text-zinc-600'}`}>
                          {m.is_completed ? '>> PHASE_COMPLETE' : '>> WAITING_FOR_UPLINK'}
                        </span>
                        <h4 className={`text-sm font-bold uppercase tracking-tight ${m.is_completed ? 'text-white' : 'text-zinc-500'}`}>{m.title}</h4>
                        <p className={`text-[11px] font-mono max-w-md leading-relaxed ${m.is_completed ? 'text-zinc-400' : 'text-zinc-600'}`}>{m.description}</p>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="border border-dashed border-zinc-800 p-20 text-center text-zinc-600 uppercase text-xs tracking-widest">
            [ NO_ACTIVE_UPLINKS_DETECTED ]
          </div>
        )}
      </div>
    </div>
  );
}