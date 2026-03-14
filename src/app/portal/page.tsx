"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from "@/lib/superbase";
import { Navbar } from "@/components/layout/Navbar";
import { Loader2, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export default function ClientPortal() {
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientData = async () => {
      setLoading(true);
      
      // 1. Get the logged-in user's ID
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // 2. Fetch the LATEST booking for this specific user
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (data) setBooking(data);
      }
      setLoading(false);
    };

    fetchClientData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-500" size={24} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 px-6">
      <Navbar />
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-black uppercase italic tracking-tighter">Project_Hub</h1>
        
        {booking ? (
          <div className="bg-zinc-900/20 border border-zinc-800 p-8 rounded-sm space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.3em]">Active_Deployment</p>
                <h2 className="text-2xl font-bold uppercase">{booking.service_type}</h2>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 border border-emerald-500/30 bg-emerald-500/5 text-emerald-500 text-[10px] font-mono uppercase">
                <Clock size={12} /> {booking.status || 'Pending'}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 py-6 border-y border-zinc-900 font-mono text-[11px]">
              <div>
                <p className="text-zinc-600 mb-1 tracking-widest uppercase">Scheduled_Date</p>
                <p>{booking.preferred_date}</p>
              </div>
              <div>
                <p className="text-zinc-600 mb-1 tracking-widest uppercase">Uplink_Time</p>
                <p>{booking.preferred_time}</p>
              </div>
            </div>
            
            <p className="text-zinc-500 text-[10px] italic">
              // System is awaiting admin review for this module.
            </p>
          </div>
        ) : (
          <div className="border border-dashed border-zinc-800 p-12 text-center">
            <p className="text-zinc-600 font-mono text-xs uppercase tracking-widest">
              [ NO_ACTIVE_UPLINKS_DETECTED ]
            </p>
          </div>
        )}
      </div>
    </div>
  );
}