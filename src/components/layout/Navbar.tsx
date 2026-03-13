"use client";
import React, { useEffect, useState } from 'react';
import { SystxLogo } from "../ui/SystxLogo";
import { 
  Wifi, Shield, Lock, ChevronRight, 
  Sun, Moon, Monitor // Added icons for theme
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes"; // Required for theme logic

export const Navbar = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering icons after mount
  useEffect(() => setMounted(true), []);

  // Helper for active link styling - now reactive to theme
  const navLinkStyle = (path: string) => `
    relative text-[10px] uppercase tracking-widest transition-all duration-300 group
    ${pathname === path 
      ? 'text-emerald-500 dark:text-emerald-400' 
      : 'text-zinc-600 dark:text-zinc-500 hover:text-black dark:hover:text-white'}
  `;

  return (
    <nav className="fixed top-0 w-full z-[100] border-b border-zinc-200 dark:border-white/5 bg-white/80 dark:bg-black/60 backdrop-blur-xl px-6 py-4 flex items-center justify-between font-mono transition-colors duration-300">
      
      {/* 1. Brand Section */}
      <div className="flex items-center gap-4">
        <Link href="/" className="hover:opacity-80 transition-opacity dark:invert-0 transition-all">
          <SystxLogo />
        </Link>
        <div className="hidden lg:block h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-2" />
        <div className="hidden lg:flex items-center gap-2 text-[9px] text-emerald-600 dark:text-emerald-500/80 tracking-widest">
          <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
          SYS_v2.0.6
        </div>
      </div>

      {/* 2. Navigation Actions */}
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className={navLinkStyle('/')}>Home</Link>
          <Link href="#services" className={navLinkStyle('#services')}>Services</Link>
          <Link href="/tools" className={navLinkStyle('/tools')}>Tools</Link>
          <Link href="/about" className={navLinkStyle('/about')}>About</Link>
          <Link href="/contacts" className={navLinkStyle('/contacts')}>Contacts</Link>
        </div>

        <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800 hidden md:block" />

        <div className="flex items-center gap-4">
          
          {/* THEME SWITCHER BUTTON */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-sm border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-emerald-500 dark:hover:text-amber-400 transition-all bg-zinc-50 dark:bg-transparent"
            aria-label="Toggle Theme"
          >
            {mounted ? (
              theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />
            ) : (
              <div className="w-[14px] h-[14px]" /> // Placeholder during load
            )}
          </button>

          {/* LOGIN */}
          <Link 
            href="/auth?mode=login" 
            className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-sm hover:border-zinc-400 dark:hover:border-zinc-600"
          >
            <Lock size={10} />
            Login
          </Link>

          {/* BOOK A SESSION */}
          <Link 
            href="/auth?mode=register" 
            className="relative group overflow-hidden bg-zinc-900 dark:bg-white text-white dark:text-black px-5 py-2.5 font-bold text-[10px] uppercase tracking-tighter flex items-center gap-2 hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white transition-all duration-300 rounded-sm"
          >
            <span className="relative z-10">Book_a_Session</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 opacity-40 group-hover:animate-shine" />
          </Link>
        </div>
      </div>
    </nav>
  );
};