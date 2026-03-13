"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Zap } from 'lucide-react';
import { supabase } from "@/lib/superbase";

export function NewNodeModal({ isOpen, onClose, onRefresh }: any) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeploy = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from('projects')
        .insert([
          { 
            name, 
            client_id: user.id, 
            status: 'INITIALIZING', 
            progress: 10 
          }
        ]);

      if (!error) {
        setName("");
        onRefresh();
        onClose();
      }
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-zinc-950 border border-emerald-500/30 w-full max-w-md p-6 shadow-[0_0_50px_-12px_rgba(16,185,129,0.2)]"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white text-sm font-black uppercase flex items-center gap-2">
                <Cpu size={16} className="text-emerald-500" /> Deploy_New_Node
              </h2>
              <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleDeploy} className="space-y-6">
              <div>
                <label className="block text-[10px] text-zinc-500 uppercase font-bold mb-2 tracking-widest">
                  Node_Naming_Protocol
                </label>
                <input 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., QUANTUM_GATEWAY_01"
                  className="w-full bg-zinc-900/50 border border-zinc-800 p-3 text-white font-mono text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-700"
                />
              </div>

              <button 
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-black uppercase py-3 text-xs tracking-tighter transition-all flex items-center justify-center gap-2"
              >
                <Zap size={14} fill="currentColor" />
                {loading ? "INITIALIZING_SEQUENCE..." : "EXECUTE_DEPLOYMENT"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}