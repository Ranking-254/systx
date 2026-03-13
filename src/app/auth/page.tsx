"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { supabase } from "@/lib/superbase"; // Fixed typo from superbase
import { useRouter, useSearchParams } from 'next/navigation';
import { SystxLogo } from "@/components/ui/SystxLogo";
import { Lock, Mail, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  
  // Initialize mode based on URL, default to login
  const [mode, setMode] = useState<'login' | 'register'>('login');
  
  useEffect(() => {
    const m = searchParams.get('mode');
    if (m === 'register') setMode('register');
  }, [searchParams]);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'register') {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
        });
        if (error) throw error;
        alert("INITIALIZATION_COMPLETE: Check email.");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        
        if (error) throw error;

        if (data.session) {
          router.refresh();
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 500);
        }
      }
    } catch (err: any) {
      setError(`[ AUTH_ERROR: ${err.message.toUpperCase()} ]`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 selection:bg-emerald-500/30">
      <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="text-center space-y-4">
          <SystxLogo />
          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em] animate-pulse">
            {mode === 'login' ? '[ AUTH_REQUIRED ]' : '[ INITIALIZE_ACCOUNT ]'}
          </p>
        </div>

        <div className="bg-zinc-950/50 border border-zinc-800 p-8 rounded-sm backdrop-blur-md shadow-2xl shadow-emerald-500/5">
          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Uplink_Email</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" size={14} />
                <input 
                  type="email" 
                  required
                  placeholder="name@provider.com"
                  className="w-full bg-black/50 border border-zinc-800 p-3 pl-10 text-xs font-mono text-white outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-700"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Access_Key</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" size={14} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  placeholder="••••••••"
                  className="w-full bg-black/50 border border-zinc-800 p-3 pl-10 pr-12 text-xs font-mono text-white outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-700"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-emerald-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 font-mono text-[9px] uppercase tracking-tighter">
                {error}
              </div>
            )}

            <button 
              disabled={loading}
              className="w-full bg-white text-black font-black uppercase py-4 text-xs tracking-[0.2em] hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <>
                  {mode === 'login' ? 'Authorize_Entry' : 'Create_Identity'} 
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-zinc-900 pt-6">
            <button 
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-zinc-500 font-mono text-[9px] uppercase tracking-widest hover:text-white transition-colors"
            >
              {mode === 'login' ? '// No identity detected? Initialize' : '// Identity exists? Return to login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrap in Suspense to satisfy Next.js Build Requirements
export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <AuthContent />
    </Suspense>
  );
}