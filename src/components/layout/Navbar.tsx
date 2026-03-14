"use client";
import React, { useEffect, useState } from 'react';
import { SystxLogo } from "../ui/SystxLogo";
import { supabase } from "@/lib/superbase"; 
import { 
  Lock, ChevronRight, Sun, Moon, 
  Menu, X, LayoutDashboard, LogOut
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);
  
  useEffect(() => setIsMobileMenuOpen(false), [pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const navLinkStyle = (path: string) => `
    relative text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center gap-1
    ${pathname === path 
      ? 'text-emerald-500 dark:text-emerald-400' 
      : 'text-zinc-600 dark:text-zinc-500 hover:text-black dark:hover:text-white'}
  `;

  return (
    <nav className="fixed top-0 w-full z-[100] border-b border-zinc-200 dark:border-white/5 bg-white/90 dark:bg-black/80 backdrop-blur-xl px-4 md:px-6 py-4 flex items-center justify-between font-mono transition-colors duration-300">
      
      {/* 1. Brand Section */}
      <div className="flex items-center gap-4">
        <Link href="/" className="hover:opacity-80 transition-opacity dark:invert-0">
          <SystxLogo />
        </Link>
        <div className="hidden lg:block h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-2" />
        <div className="hidden lg:flex items-center gap-2 text-[9px] text-emerald-600 dark:text-emerald-500/80 tracking-widest">
          <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
          SYS_v2.0.6
        </div>
      </div>

      {/* 2. Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        <Link href="/" className={navLinkStyle('/')}>Home</Link>
        <Link href="/services" className={navLinkStyle('/services')}>Services</Link>
        <Link href="/tools" className={navLinkStyle('/tools')}>Tools</Link>
        <Link href="/about" className={navLinkStyle('/about')}>About</Link>
        <Link href="/contacts" className={navLinkStyle('/contacts')}>Contacts</Link>
      </div>

      {/* 3. Global Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-sm border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-emerald-500 transition-all bg-zinc-50 dark:bg-transparent"
        >
          {mounted ? (theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />) : <div className="w-[14px] h-[14px]" />}
        </button>

        {user ? (
          <>
            <Link 
              href="/portal" 
              className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-widest text-emerald-500 border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 rounded-sm hover:bg-emerald-500/10 transition-all"
            >
              <LayoutDashboard size={10} /> Dashboard
            </Link>
            <button 
              onClick={handleLogout}
              className="hidden lg:flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-black px-5 py-2.5 font-bold text-[10px] uppercase tracking-tighter hover:bg-red-500 transition-all duration-300 rounded-sm"
            >
              Logout <LogOut size={14} />
            </button>
          </>
        ) : (
          <>
            <Link 
              href="/auth?mode=login" 
              className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-sm hover:border-emerald-500 transition-all"
            >
              <Lock size={10} /> Login
            </Link>
            <Link 
              href="/auth?mode=register" 
              className="hidden lg:flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-black px-5 py-2.5 font-bold text-[10px] uppercase tracking-tighter hover:bg-emerald-600 transition-all duration-300 rounded-sm"
            >
              Book_a_Session <ChevronRight size={14} />
            </Link>
          </>
        )}

        <button 
          className="md:hidden p-2 text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* 4. Mobile Menu Overlay & Floating Card */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Background Blur Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-[80] md:hidden"
            />
            
            {/* The Floating Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-20 left-4 right-4 z-[90] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xl rounded-xl md:hidden flex flex-col gap-6"
            >
              <div className="flex flex-col gap-4">
                <Link href="/" className="text-xl font-bold uppercase tracking-tight">Home</Link>
                <Link href="/services" className="text-xl font-bold uppercase tracking-tight">Services</Link>
                <Link href="/tools" className="text-xl font-bold uppercase tracking-tight">Tools</Link>
                <Link href="/about" className="text-xl font-bold uppercase tracking-tight">About</Link>
                <Link href="/contacts" className="text-xl font-bold uppercase tracking-tight">Contacts</Link>
              </div>

              <div className="h-[1px] bg-zinc-100 dark:bg-zinc-900 w-full" />

              <div className="space-y-3">
                {user ? (
                  <>
                    <Link 
                      href="/portal" 
                      className="flex items-center justify-center gap-2 w-full py-3.5 bg-emerald-500 text-black font-black text-[10px] uppercase tracking-widest rounded-lg"
                    >
                      Dashboard <LayoutDashboard size={14} />
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 w-full py-3.5 border border-red-500/20 text-red-500 font-mono text-[10px] uppercase tracking-widest rounded-lg"
                    >
                      Logout <LogOut size={14} />
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/auth?mode=login" 
                      className="flex items-center justify-center gap-2 w-full py-3.5 border border-zinc-200 dark:border-zinc-800 font-mono text-[10px] uppercase tracking-widest rounded-lg"
                    >
                      <Lock size={12} /> Login
                    </Link>
                    <Link 
                      href="/auth?mode=register" 
                      className="flex items-center justify-center gap-2 w-full py-3.5 bg-zinc-900 dark:bg-white text-white dark:text-black font-black text-[10px] uppercase tracking-widest rounded-lg"
                    >
                      Book_a_Session <ChevronRight size={14} />
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};