"use client";
import React from 'react';
import { Navbar } from "@/components/layout/Navbar"; 
import { TypingEffect } from "@/components/ui/TypingEffect";
import { ContactForm } from "@/components/ui/ContactForm";
import { Phone, Mail, MapPin, Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

export default function ContactsPage() {
  const contacts = [
    { icon: <Phone size={18} />, text: "+254 716 700 151" },
    { icon: <Mail size={18} />, text: "info@codecinecreations.co.ke" },
    { icon: <MapPin size={18} />, text: "Meru, Kenya" }
  ];

  const socialLinks = [
    { icon: <Twitter size={16} />, href: "#" },
    { icon: <Facebook size={16} />, href: "#" },
    { icon: <Instagram size={16} />, href: "#" },
    { icon: <Linkedin size={16} />, href: "#" },
  ];

  return (
    /* Added theme-contact class for global.css targeting */
    <div className="theme-contact bg-background min-h-screen text-foreground pt-24 pb-12 selection:bg-primary/30 transition-colors duration-500">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center min-h-[80vh]">
        
        {/* LEFT COLUMN: The "Specialist" Info */}
        <div className="space-y-10">
          <div className="space-y-4">
            <p className="text-[10px] text-primary uppercase font-mono tracking-[0.5em] animate-pulse">
              [ NODE_COMMUNICATIONS_INITIALIZED ]
            </p>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.8] text-foreground">
              GET IN <br/> 
              <span className="text-primary text-glow">TOUCH</span>
            </h1>
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest max-w-md">
              Secure line open for project inquiries and technical consultations.
            </p>
          </div>

          <div className="space-y-4">
            {contacts.map((c, i) => (
              <div key={i} className="flex items-center gap-4 bg-zinc-900/20 border border-zinc-900 p-4 rounded-sm hover:border-primary/40 transition-all">
                <div className="text-primary">{c.icon}</div>
                <span className="font-mono text-sm tracking-tighter text-zinc-300">
                  <TypingEffect text={c.text} />
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            {socialLinks.map((social, i) => (
              <a key={i} href={social.href} className="w-10 h-10 flex items-center justify-center border border-zinc-800 text-zinc-500 hover:border-primary hover:text-primary transition-all duration-300">
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: The White "Friendly" Card */}
        <div className="relative">
          {/* Blur effect now uses primary variable */}
          <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-50" />
          <div className="relative bg-white p-8 md:p-12 shadow-2xl rounded-sm">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
            <div className="mb-10">
              <h2 className="text-3xl font-black tracking-tighter uppercase italic text-zinc-900">
                Start_The_<span className="text-primary">Build</span>
              </h2>
              <div className="h-px w-12 bg-primary mt-2" />
            </div>
            
            {/* The Light Variant of our shared ContactForm */}
            <ContactForm variant="light" />
          </div>
        </div>

      </div>

      <style jsx global>{`
        .text-glow {
          text-shadow: 0 0 20px var(--primary-glow);
        }
      `}</style>
    </div>
  );
}