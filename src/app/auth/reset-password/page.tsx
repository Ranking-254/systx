"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from "@/lib/superbase";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck, Loader2, ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // Task: Password Strength Logic (Synced with Auth card)
  const getStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'EMPTY', color: 'bg-zinc-800' };
    if (pass.length < 6) return { score: 25, label: 'WEAK_ENCRYPTION', color: 'bg-red-500' };
    if (pass.length < 10) return { score: 60, label: 'STANDARD_SECURE', color: 'bg-yellow-500' };
    return { score: 100, label: 'HIGH_STRENGTH', color: 'bg-emerald-500' };
  };
  const strength = getStrength(password);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth?mode=login');
      }
    };
    checkSession();
  }, [router]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("PASSWORDS_DO_NOT_MATCH");
      return;
    }

    if (password.length < 8) {
      setError("MIN_LENGTH_8_REQUIRED");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message.toUpperCase().replace(/ /g, "_"));
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => router.push('/portal'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 py-12 font-mono selection:bg-emerald-500/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-card bg-zinc-950/50 border border-zinc-800 p-8 md:p-10 rounded-sm backdrop-blur-xl shadow-2xl">
          <div className="space-y-2 mb-10">
            <div className="flex items-center gap-2 text-emerald-500 text-[10px] uppercase tracking-[0.4em] font-black">
              <ShieldCheck size={14} /> Security_Protocol
            </div>
            <h1 className="text-3xl font-black italic tracking-tighter uppercase text-white">
              Reset_Credentials
            </h1>
          </div>

          <AnimatePresence mode="wait">
            {!success ? (
              <motion.form 
                key="reset-form"
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleReset} 
                className="space-y-6"
              >
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-sm flex items-center gap-3 text-red-500 text-[10px] font-bold uppercase tracking-widest animate-shake">
                    <AlertCircle size={14} /> {error}
                  </div>
                )}

                <div className="space-y-4">
                  {/* New Password Field */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-widest ml-1">New Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-hover:text-emerald-500 transition-colors" size={16} />
                      <input 
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-black/50 border border-zinc-800 rounded-sm py-4 pl-12 pr-12 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-800"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-emerald-500 transition-colors"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {/* Strength Meter Integration */}
                    {password.length > 0 && (
                      <div className="space-y-2 pt-2 px-1">
                        <div className="h-[2px] w-full bg-zinc-900 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 ${strength.color}`} 
                            style={{ width: `${strength.score}%` }} 
                          />
                        </div>
                        <p className={`text-[8px] font-mono uppercase tracking-widest text-right ${strength.color.replace('bg-', 'text-')}`}>
                          {strength.label}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Verify Password Field */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-widest ml-1">Verify_New_Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-hover:text-emerald-500 transition-colors" size={16} />
                      <input 
                        type={showPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-black/50 border border-zinc-800 rounded-sm py-4 pl-12 pr-12 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-800"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>

                <button 
                  disabled={loading}
                  type="submit"
                  className="w-full bg-white text-black font-black uppercase tracking-tighter py-4 rounded-sm flex items-center justify-center gap-2 hover:bg-emerald-500 hover:text-white transition-all duration-500 group disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : (
                    <>Update_Credentials <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success-message"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-6"
              >
                <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                  <ShieldCheck size={40} className="text-emerald-500" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-black uppercase text-white tracking-widest">Access_Restored</h2>
                  <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] leading-relaxed">
                    New credentials updated. <br/> Redirecting to Command_Center...
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-8 text-center text-[8px] text-zinc-700 uppercase tracking-[0.5em]">
          SYSTX_INFRA // RECOVERY_NODE_402
        </p>
      </motion.div>
    </div>
  );
}