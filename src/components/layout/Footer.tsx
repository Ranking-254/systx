"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Mail, MapPin, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import {FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link';

export function Footer() {
  const socialLinks = [
    { icon: <Twitter size={14} />, href: "https://x.com/NjuePattin?t=PzrpeIWy5cPN7hFZ_YfFlw&s=09" },
    { icon: <Facebook size={14} />, href: "#" },
    { icon: <Instagram size={14} />, href: "https://www.instagram.com/pattin_njue?igsh=MWJqZjVqZjV2ZW56cg=="  },
    { icon: <Linkedin size={14} />, href: "https://www.linkedin.com/in/pattin-njue-a789412b0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
    { icon: <FaWhatsapp size={14} />, href: "https://wa.me/254716700151?text=Hello%20SYSTX%20Team%2C%20I%20would%20like%20to%20inquire%20about%20your%20services" },
  ];

  const footerLinks = [
    { name: "Core", href: "/" },
    { name: "Nodes", href: "/contacts" },
    { name: "Telemetry", href: "/dashboard" },
    { name: "Protocols", href: "#" },
  ];

  return (
    <footer className="relative z-10 bg-black border-t border-zinc-900 px-6 py-20 selection:bg-emerald-500/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* LEFT COLUMN: System Integrity (LOGO & INFO) */}
        <div className="space-y-6 pr-12">
          <Link href="/" className="flex items-center gap-2 group">
            <Terminal className="text-emerald-500" size={20} />
            <span className="text-white font-black italic tracking-tighter text-xl uppercase">
            SYSTX//DIGITAL_INFRA <span className="text-emerald-500 text-xs">/ System_Integrity_v2.0</span>
            </span>
          </Link>
          <p className="text-zinc-500 font-mono text-xs leading-relaxed max-w-sm">
            Operational Protocol active. Precision engineering and scalable IT architecture deployed globally. Building resilient digital assets for forward-thinking clients.
          </p>
          <div className="text-[9px] font-mono text-zinc-700 tracking-widest uppercase flex items-center gap-3">
             <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
             NODE_STATUS: ONLINE // SECURITY_PROTOCOLS: ACTIVE
          </div>
        </div>

        {/* RIGHT COLUMN: Uplink Directory (LINKS, SOCIALS, ADDR) */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-12 md:text-right">
          
          {/* UPLINK_DIRECTORY */}
          <div className="space-y-4">
             <div className="text-[10px] text-zinc-600 font-mono uppercase mb-4 tracking-widest">Uplink_Directory</div>
             <div className="space-y-2 text-[11px] font-mono uppercase text-zinc-400 tracking-wider">
               {footerLinks.map((link) => (
                 <Link key={link.name} href={link.href} className="block hover:text-emerald-500 transition-colors">
                   {">"} {link.name}
                 </Link>
               ))}
             </div>
          </div>

          {/* CONTACT_PROTOCOLS */}
          <div className="space-y-4 flex flex-col items-start md:items-end">
             <div className="text-[10px] text-zinc-600 font-mono uppercase mb-4 tracking-widest">Contact_Protocols</div>
             <div className="space-y-2 text-[11px] font-mono text-zinc-400">
               <div className="flex items-center md:flex-row-reverse gap-2"> <Mail size={12} className="text-emerald-500/50" /> info@SYSTX.co.ke</div>
               <div className="flex items-center md:flex-row-reverse gap-2"> <MapPin size={12} className="text-emerald-500/50" /> NBO_NODE_001 // MERU, KENYA</div>
             </div>
             
             {/* SOCIAL_COMM_CHANNELS */}
             <div className="flex gap-2.5 pt-4">
                {socialLinks.map((social, i) => (
                  <a 
                    key={i} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-1.5 border border-zinc-800 text-zinc-600 hover:border-emerald-500 hover:text-emerald-500 transition-all rounded-sm"
                  >
                    {social.icon}
                  </a>
                ))}
             </div>
          </div>

        </div>
      </div>

      {/* BOTTOM_BAR */}
      <div className="max-w-7xl mx-auto border-t border-zinc-900 mt-16 pt-8 flex justify-between items-center font-mono text-[9px] text-zinc-700 tracking-widest uppercase">
         <div>© 2026 SYSTX CREATIONS // ALL_RIGHTS_RESERVED</div>
         <div>SYSTEM_TIME: {new Date().toISOString().slice(0,10)}Z // LOCATION: AFRICA_NBO</div>
      </div>
    </footer>
  );
}