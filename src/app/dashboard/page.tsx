"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from "@/lib/superbase"; 
import { Navbar } from "@/components/layout/Navbar";
import { Terminal, Database, Users, LogOut, Mail, Loader2, Trash2 } from "lucide-react";

export default function Dashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Initial Data Fetch
    const fetchLeads = async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error) setLeads(data || []);
      setLoading(false);
    };

    fetchLeads();

    // 2. Realtime Subscription Protocol
    const channel = supabase
      .channel('table-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT', // Only listen for new entries
          schema: 'public',
          table: 'leads',
        },
        (payload) => {
          console.log('📡 NEW_TRANSMISSION_DETECTED', payload);
          // Prepend the new lead so it appears at the top of the list
          setLeads((prevLeads) => [payload.new, ...prevLeads]);
        }
      )
      .subscribe();

    // 3. Cleanup Connection
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const deleteLead = async (id: string) => {
    if (!confirm("[ WARNING ]: PERMANENTLY_DELETE_TRANSMISSION?")) return;

    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);

    if (error) {
      alert("[ ERROR ]: UNABLE_TO_PURGE_DATA");
    } else {
      setLeads(leads.filter(lead => lead.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 px-6 pb-12 selection:bg-emerald-500/30">
      <Navbar />
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-zinc-900 pb-8 gap-4">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase">Command_Center</h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <p className="text-emerald-500 font-mono text-[10px] tracking-[0.4em] uppercase italic">
                [ Session_Active: Root_Access ]
              </p>
            </div>
          </div>
          <button 
            onClick={handleSignOut} 
            className="flex items-center gap-2 text-zinc-500 hover:text-red-500 font-mono text-[10px] uppercase transition-all hover:tracking-[0.2em]"
          >
            <LogOut size={14} /> Terminate_Session
          </button>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatBox icon={<Users size={20}/>} label="Total_Leads" value={loading ? "..." : leads.length} />
          <StatBox icon={<Database size={20}/>} label="System_Status" value="STABLE" color="text-emerald-500" />
          <StatBox icon={<Terminal size={20}/>} label="Uplinks_Active" value="REALTIME" />
        </div>

        {/* Leads Table */}
        <div className="bg-zinc-900/10 border border-zinc-900 rounded-sm overflow-hidden backdrop-blur-sm">
          <div className="p-4 bg-zinc-900/40 border-b border-zinc-900 flex justify-between items-center">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">Incoming_Transmission_Feed</span>
            {loading && <Loader2 size={14} className="animate-spin text-emerald-500" />}
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-[11px]">
              <thead className="text-zinc-500 uppercase border-b border-zinc-900">
                <tr>
                  <th className="p-4 font-medium">Timestamp</th>
                  <th className="p-4 font-medium">Sender_Identity</th>
                  <th className="p-4 font-medium">Protocol</th>
                  <th className="p-4 font-medium">Message_Payload</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/50">
                {leads.length === 0 && !loading ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-zinc-600 italic">No_Data_Detected_In_Buffer</td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-emerald-500/[0.03] transition-colors group">
                      <td className="p-4 text-zinc-500 whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleDateString()}
                        <span className="block text-[9px] opacity-50">{new Date(lead.created_at).toLocaleTimeString()}</span>
                      </td>
                      <td className="p-4">
                        <div className="text-white font-bold uppercase tracking-tight">{lead.name}</div>
                        <div className="text-zinc-500 text-[9px] lowercase">{lead.email}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 border border-emerald-500/20 text-emerald-500 text-[9px] rounded-full bg-emerald-500/5">
                          {lead.project_type || 'GENERAL'}
                        </span>
                      </td>
                      <td className="p-4 text-zinc-400 max-w-xs truncate group-hover:whitespace-normal group-hover:text-zinc-300 transition-all">
                        {lead.message}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <a 
                            href={`mailto:${lead.email}?subject=RE: SYSTX Project Inquiry`}
                            className="inline-flex items-center gap-2 text-emerald-500 hover:text-white border border-emerald-500/20 hover:bg-emerald-500 px-3 py-1.5 rounded-sm transition-all text-[9px] uppercase font-bold"
                          >
                            <Mail size={12} /> Reply
                          </a>
                          <button 
                            onClick={() => deleteLead(lead.id)}
                            className="text-zinc-600 hover:text-red-500 transition-colors p-1 group/trash"
                            title="Purge Transmission"
                          >
                            <Trash2 size={14} className="group-hover/trash:scale-110 transition-transform" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// StatBox component remains the same
function StatBox({ icon, label, value, color = "text-white" }: any) {
  return (
    <div className="bg-zinc-900/20 border border-zinc-900 p-6 space-y-4 group hover:border-emerald-500/50 transition-all">
      <div className="text-zinc-600 group-hover:text-emerald-500 transition-colors">{icon}</div>
      <div>
        <div className="text-[9px] text-zinc-500 uppercase tracking-widest">{label}</div>
        <div className={`text-2xl font-black italic tracking-tight ${color}`}>{value}</div>
      </div>
    </div>
  );
}