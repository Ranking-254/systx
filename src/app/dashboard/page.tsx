"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from "@/lib/superbase"; 
import { useRouter } from 'next/navigation'; // Added for the guard
import { Navbar } from "@/components/layout/Navbar";
import { 
  Terminal, Database, Users, LogOut, Mail, 
  Loader2, Trash2, CalendarCheck, MessageSquare, ExternalLink
} from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'leads' | 'bookings'>('leads');
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false); // Guard state

  useEffect(() => {
    const checkAdminAccess = async () => {
      // 1. Get current session
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
        return;
      }

      // 2. Verify admin role in profiles
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role !== 'admin') {
        router.push('/portal'); // Kick non-admins to the portal
      } else {
        setAuthorized(true); // Allow admin to see the content
      }
    };

    checkAdminAccess();
  }, [router]);

  useEffect(() => {
    // Only run data fetching if the user is authorized as an admin
    if (!authorized) return;

    const fetchData = async () => {
      setLoading(true);
      
      const { data: leadsData } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: bookingsData } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (leadsData) setLeads(leadsData);
      if (bookingsData) setBookings(bookingsData);
      setLoading(false);
    };

    fetchData();

    const channel = supabase.channel('dashboard-uplink')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'leads' }, 
        payload => setLeads(prev => [payload.new, ...prev]))
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'bookings' }, 
        payload => setBookings(prev => [payload.new, ...prev]))
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [authorized]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const deleteEntry = async (id: string, table: 'leads' | 'bookings') => {
    if (!confirm(`[ WARNING ]: PURGE_ENTRY_FROM_${table.toUpperCase()}_BUFFER?`)) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (!error) {
      if (table === 'leads') setLeads(leads.filter(l => l.id !== id));
      else setBookings(bookings.filter(b => b.id !== id));
    }
  };

  // Guard: Show loading state until authorization is confirmed
  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-emerald-500" size={24} />
          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.5em] animate-pulse">
            Verifying_Authorization...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 px-6 pb-12 selection:bg-emerald-500/30">
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
          <button onClick={handleSignOut} className="flex items-center gap-2 text-zinc-500 hover:text-red-500 font-mono text-[10px] uppercase transition-all">
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

        {/* Table Controls */}
        <div className="flex gap-4 border-b border-zinc-900/50">
          <button 
            onClick={() => setActiveTab('leads')}
            className={`pb-4 px-2 font-mono text-[10px] uppercase tracking-widest transition-all ${activeTab === 'leads' ? 'text-emerald-500 border-b-2 border-emerald-500' : 'text-zinc-600 hover:text-white'}`}
          >
            Inquiries_Buffer ({leads.length})
          </button>
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`pb-4 px-2 font-mono text-[10px] uppercase tracking-widest transition-all ${activeTab === 'bookings' ? 'text-emerald-500 border-b-2 border-emerald-500' : 'text-zinc-600 hover:text-white'}`}
          >
            Service_Bookings ({bookings.length})
          </button>
        </div>

        {/* Data Feed */}
        <div className="bg-zinc-900/10 border border-zinc-900 rounded-sm overflow-hidden backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-[11px]">
              <thead className="text-zinc-600 uppercase border-b border-zinc-900 bg-zinc-900/30">
                <tr>
                  <th className="p-4 font-medium">Uplink_Time</th>
                  <th className="p-4 font-medium">Identity</th>
                  <th className="p-4 font-medium">Module</th>
                  <th className="p-4 font-medium">Payload_Data</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/50">
                {(activeTab === 'leads' ? leads : bookings).map((item) => (
                  <tr key={item.id} className="hover:bg-emerald-500/[0.03] transition-colors group">
                    <td className="p-4 text-zinc-500">
                      {new Date(item.created_at).toLocaleDateString()}
                      <span className="block text-[9px] opacity-40">{new Date(item.created_at).toLocaleTimeString()}</span>
                    </td>
                    <td className="p-4">
                      <div className="text-white font-bold uppercase">{item.full_name || item.name}</div>
                      <div className="text-zinc-500 text-[9px] lowercase">{item.email}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 border border-emerald-500/20 text-emerald-500 text-[9px] rounded-sm bg-emerald-500/5">
                        {item.service_type || item.project_type || 'GENERAL'}
                      </span>
                    </td>
                    <td className="p-4 text-zinc-400 max-w-xs">
                      {activeTab === 'bookings' ? (
                        <div className="space-y-1">
                          <p className="text-emerald-500/80">[ SCHEDULED: {item.preferred_date} @ {item.preferred_time} ]</p>
                          <p className="text-[9px] italic opacity-60 truncate">{item.phone}</p>
                        </div>
                      ) : (
                        <p className="truncate group-hover:whitespace-normal transition-all">{item.message}</p>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <a href={`mailto:${item.email}`} className="text-zinc-500 hover:text-emerald-500 transition-colors">
                          <Mail size={14} />
                        </a>
                        <button onClick={() => deleteEntry(item.id, activeTab)} className="text-zinc-700 hover:text-red-500 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
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