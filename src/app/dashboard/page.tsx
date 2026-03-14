"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from "@/lib/superbase"; 
import { useRouter } from 'next/navigation';
import { Navbar } from "@/components/layout/Navbar";
import { 
  Terminal, Database, Users, LogOut, Mail, 
  Loader2, Trash2, CalendarCheck, MessageSquare, 
  Plus, CheckCircle2, X, ListTodo, ShieldCheck, RefreshCw, Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'leads' | 'bookings'>('leads');
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [newMilestone, setNewMilestone] = useState({ title: "", desc: "" });
  const [manualProgress, setManualProgress] = useState<number>(0);

  // Helper for Status Badge Styling
  const getStatusMeta = (prog: number) => {
    if (prog === 0) return { label: "VOID", color: "text-zinc-500", border: "border-zinc-500/20", bg: "bg-zinc-500/5" };
    if (prog <= 30) return { label: "INITIATING", color: "text-orange-500", border: "border-orange-500/20", bg: "bg-orange-500/5" };
    if (prog <= 70) return { label: "OPERATIONAL", color: "text-cyan-400", border: "border-cyan-400/20", bg: "bg-cyan-400/5" };
    if (prog < 100) return { label: "FINALIZING", color: "text-indigo-400", border: "border-indigo-400/20", bg: "bg-indigo-400/5" };
    return { label: "STABLE", color: "text-emerald-500", border: "border-emerald-500/20", bg: "bg-emerald-500/5" };
  };

  useEffect(() => {
    const checkAdminAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
      if (profile?.role !== 'admin') { router.push('/portal'); } else { setAuthorized(true); }
    };
    checkAdminAccess();
  }, [router]);

  const fetchData = async () => {
    const { data: leadsData } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    const { data: bookingsData } = await supabase.from('bookings').select('*, milestones(*)').order('created_at', { ascending: false });
    if (leadsData) setLeads(leadsData);
    if (bookingsData) setBookings(bookingsData);
    setLoading(false);
  };

  useEffect(() => {
    if (!authorized) return;
    fetchData();
    const channel = supabase.channel('dashboard-uplink')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => fetchData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'milestones' }, () => fetchData())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [authorized]);

  const updateManualProgress = async () => {
    if (!selectedBooking) return;
    const val = Math.min(100, Math.max(0, manualProgress));
    setBookings(prev => prev.map(b => b.id === selectedBooking.id ? { ...b, progress: val } : b));
    const { error } = await supabase.from('bookings').update({ progress: val }).eq('id', selectedBooking.id);
    if (error) fetchData();
  };

  const addMilestone = async () => {
    if (!newMilestone.title || !selectedBooking) return;
    await supabase.from('milestones').insert({
      booking_id: selectedBooking.id,
      title: newMilestone.title,
      description: newMilestone.desc,
      order_index: (selectedBooking.milestones?.length || 0) + 1
    });
    setNewMilestone({ title: "", desc: "" });
    fetchData();
  };

  if (!authorized) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 px-6 pb-12 selection:bg-emerald-500/30 font-mono">
      <Navbar />
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-zinc-900 pb-8 gap-4">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase">Command_Center</h1>
            <div className="flex items-center gap-3 mt-2 font-mono text-[10px]">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-emerald-500 tracking-[0.4em] uppercase italic">[ Session_Active: Admin_Root ]</p>
            </div>
          </div>
          <button onClick={() => supabase.auth.signOut().then(() => window.location.href = '/')} className="flex items-center gap-2 text-zinc-500 hover:text-red-500 font-mono text-[10px] uppercase transition-all">
            <LogOut size={14} /> Terminate_Session
          </button>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatBox icon={<MessageSquare size={18}/>} label="General_Leads" value={leads.length} />
          <StatBox icon={<CalendarCheck size={18}/>} label="Service_Bookings" value={bookings.length} color="text-emerald-400" />
          <StatBox icon={<Database size={18}/>} label="Db_Stability" value="99.9%" />
          <StatBox icon={<Terminal size={18}/>} label="Uptime" value="ACTIVE" />
        </div>

        <div className="flex gap-4 border-b border-zinc-900/50">
          <button onClick={() => setActiveTab('leads')} className={`pb-4 px-2 text-[10px] uppercase tracking-widest transition-all ${activeTab === 'leads' ? 'text-emerald-500 border-b-2 border-emerald-500' : 'text-zinc-600 hover:text-white'}`}>Inquiries_Buffer ({leads.length})</button>
          <button onClick={() => setActiveTab('bookings')} className={`pb-4 px-2 text-[10px] uppercase tracking-widest transition-all ${activeTab === 'bookings' ? 'text-emerald-500 border-b-2 border-emerald-500' : 'text-zinc-600 hover:text-white'}`}>Service_Bookings ({bookings.length})</button>
        </div>

        {/* Data Feed */}
        <div className="bg-zinc-900/10 border border-zinc-900 rounded-sm overflow-hidden backdrop-blur-sm">
          <table className="w-full text-left text-[11px]">
            <thead className="text-zinc-600 uppercase border-b border-zinc-900 bg-zinc-900/30">
              <tr>
                <th className="p-4 font-medium">Uplink_Time</th>
                <th className="p-4 font-medium">Identity</th>
                <th className="p-4 font-medium">Module / Status</th>
                <th className="p-4 font-medium">Status/Data</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/50">
              {(activeTab === 'leads' ? leads : bookings).map((item) => {
                const prog = Number(item.progress) || 0;
                const status = getStatusMeta(prog);
                return (
                <tr key={item.id} className="hover:bg-emerald-500/[0.03] transition-colors group">
                  <td className="p-4 text-zinc-500">{new Date(item.created_at).toLocaleDateString()}</td>
                  <td className="p-4">
                    <div className="text-white font-bold uppercase">{item.full_name || item.name}</div>
                    <div className="text-zinc-500 text-[9px] lowercase">{item.email}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-zinc-400 font-bold tracking-tighter uppercase">{item.service_type || item.project_type || 'GENERAL'}</span>
                      <div className={`w-fit px-2 py-0.5 border ${status.border} ${status.color} ${status.bg} text-[8px] rounded-sm font-black`}>
                        {status.label}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-zinc-400">
                    {activeTab === 'bookings' ? (
                      <div className="flex flex-col gap-2 min-w-[140px]">
                        <div className="flex justify-between items-center text-[9px] uppercase font-mono tracking-widest">
                          <span className={status.color}>{prog === 100 ? "SYSTX_COMPLETE" : "UPLINK_PROGRESS"}</span>
                          <span className="text-white">{prog}%</span>
                        </div>
                        <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                          <motion.div 
                            key={`prog-${item.id}-${prog}`}
                            initial={{ width: 0 }} 
                            animate={{ width: `${prog}%` }} 
                            transition={{ duration: 0.8 }}
                            className={`h-full ${status.bg.replace('/5', '')} ${prog === 100 ? 'bg-emerald-500' : status.color.replace('text', 'bg')}`} 
                          />
                        </div>
                      </div>
                    ) : item.message}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      {activeTab === 'bookings' && (
                        <button onClick={() => { setSelectedBooking(item); setManualProgress(item.progress || 0); }} className="text-emerald-500 hover:text-emerald-400 transition-colors">
                          <ListTodo size={14} />
                        </button>
                      )}
                      <button onClick={async () => { if(confirm('Purge?')) { await supabase.from(activeTab).delete().eq('id', item.id); fetchData(); } }} className="text-zinc-700 hover:text-red-500 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedBooking && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedBooking(null)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-[#0a0a0a] border border-zinc-800 w-full max-w-xl p-8 rounded-sm shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold uppercase italic tracking-tighter text-emerald-500">Project_Control</h2>
                  <p className="text-[9px] text-zinc-500 font-mono tracking-widest mt-1">Manual_Override_Active</p>
                </div>
                <button onClick={() => setSelectedBooking(null)}><X size={20} className="text-zinc-500 hover:text-white" /></button>
              </div>

              <div className="mb-8 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-sm">
                <label className="text-[9px] text-emerald-500 uppercase tracking-[0.2em] block mb-3 underline">Set_Global_Progress (%)</label>
                <div className="flex gap-3">
                  <input type="number" min="0" max="100" className="bg-black border border-zinc-800 p-2 text-sm text-white w-24 outline-none focus:border-emerald-500" value={manualProgress} onChange={(e) => setManualProgress(Number(e.target.value))} />
                  <button onClick={updateManualProgress} className="flex-1 bg-emerald-500 text-black py-2 font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all">Sync_Uplink <RefreshCw size={12}/></button>
                </div>
              </div>

              {/* References */}
              <div className="grid gap-4 mb-8">
                <input placeholder="Add Milestone Title..." className="bg-black border border-zinc-800 p-3 text-[11px] outline-none focus:border-emerald-500 w-full" value={newMilestone.title} onChange={e => setNewMilestone({...newMilestone, title: e.target.value})} />
                <button onClick={addMilestone} className="border border-zinc-800 text-zinc-400 py-2 font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:text-white hover:border-zinc-600 transition-all"><Plus size={14}/> Add_Module_Ref</button>
              </div>

              <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                {selectedBooking.milestones?.sort((a:any, b:any) => a.order_index - b.order_index).map((m: any) => (
                  <div key={m.id} className="flex items-center justify-between p-3 border border-zinc-900 bg-zinc-900/30">
                    <span className="text-[11px] font-bold text-white">{m.title}</span>
                    <button onClick={async () => { await supabase.from('milestones').delete().eq('id', m.id); fetchData(); }} className="text-zinc-700 hover:text-red-500"><Trash2 size={12} /></button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatBox({ icon, label, value, color = "text-white" }: any) {
  return (
    <div className="bg-zinc-900/20 border border-zinc-900 p-6 space-y-4 group hover:border-emerald-500/30 transition-all">
      <div className="text-zinc-600 group-hover:text-emerald-500 transition-colors">{icon}</div>
      <div>
        <div className="text-[9px] text-zinc-500 uppercase tracking-widest">{label}</div>
        <div className={`text-2xl font-black italic tracking-tight ${color}`}>{value}</div>
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-emerald-500" size={24} />
        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.5em] animate-pulse">Verifying_Authorization...</p>
      </div>
    </div>
  );
}