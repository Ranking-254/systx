"use client";
import React, { useEffect, useState } from 'react';
import { SystxLogo } from "../ui/SystxLogo";
import { 
  Lock, ChevronRight, Sun, Moon, 
  ChevronDown, Code, Camera, Monitor, Smartphone, Palette
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const navLinkStyle = (path: string) => `
    relative text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center gap-1
    ${pathname === path 
      ? 'text-emerald-500 dark:text-emerald-400' 
      : 'text-zinc-600 dark:text-zinc-500 hover:text-black dark:hover:text-white'}
  `;

  const dropdownItems = {
    software: [
      { name: "Custom Dev", href: "/services#custom", icon: <Code size={12} /> },
      { name: "Web Design", href: "/services#web", icon: <Monitor size={12} /> },
      { name: "Mobile Apps", href: "/services#mobile", icon: <Smartphone size={12} /> },
    ],
    media: [
      { name: "Photography", href: "/media#photography", icon: <Camera size={12} /> },
      { name: "Event Coverage", href: "/media#events", icon: <Palette size={12} /> },
    ]
  };

  return (
    <nav className="fixed top-0 w-full z-[100] border-b border-zinc-200 dark:border-white/5 bg-white/80 dark:bg-black/60 backdrop-blur-xl px-6 py-4 flex items-center justify-between font-mono transition-colors duration-300">
      
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

      {/* 2. Navigation Actions */}
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className={navLinkStyle('/')}>Home</Link>
          
          {/* SERVICES DROPDOWN */}
          <div 
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className={navLinkStyle('/services')}>
              Services 
              <ChevronDown size={10} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full -left-10 mt-2 w-64 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-sm p-4 backdrop-blur-3xl"
                >
                  <div className="space-y-4">
                    {/* Software Group */}
                    <div>
                      <div className="text-[8px] text-zinc-400 uppercase tracking-tighter mb-2 border-b border-zinc-100 dark:border-zinc-900 pb-1">Software_Dev</div>
                      <div className="grid grid-cols-1 gap-1">
                        {dropdownItems.software.map((item) => (
                          <Link key={item.name} href={item.href} className="flex items-center gap-3 p-2 text-[10px] text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5 hover:text-emerald-500 transition-all">
                            {item.icon} {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Media Group */}
                    <div>
                      <div className="text-[8px] text-zinc-400 uppercase tracking-tighter mb-2 border-b border-zinc-100 dark:border-zinc-900 pb-1">Media_&_Coverage</div>
                      <div className="grid grid-cols-1 gap-1">
                        {dropdownItems.media.map((item) => (
                          <Link key={item.name} href={item.href} className="flex items-center gap-3 p-2 text-[10px] text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5 hover:text-emerald-500 transition-all">
                            {item.icon} {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/tools" className={navLinkStyle('/tools')}>Tools</Link>
          <Link href="/about" className={navLinkStyle('/about')}>About</Link>
          <Link href="/contacts" className={navLinkStyle('/contacts')}>Contacts</Link>
        </div>

        <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800 hidden md:block" />

        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-sm border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-emerald-500 transition-all bg-zinc-50 dark:bg-transparent"
            aria-label="Toggle Theme"
          >
            {mounted ? (theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />) : <div className="w-[14px] h-[14px]" />}
          </button>

          <Link 
            href="/auth?mode=login" 
            className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-sm hover:border-emerald-500 transition-all"
          >
            <Lock size={10} /> Login
          </Link>

          <Link 
            href="/auth?mode=register" 
            className="relative group overflow-hidden bg-zinc-900 dark:bg-white text-white dark:text-black px-5 py-2.5 font-bold text-[10px] uppercase tracking-tighter flex items-center gap-2 hover:bg-emerald-600 transition-all duration-300 rounded-sm"
          >
            <span className="relative z-10">Book_a_Session</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </nav>
  );
};