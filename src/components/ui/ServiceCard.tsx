"use client";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  code: string;
  description: string;
  icon: LucideIcon;
}

export const ServiceCard = ({ title, code, description, icon: Icon }: Props) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group relative bg-zinc-900/30 border border-zinc-800 p-8 rounded-sm overflow-hidden hover:border-emerald-500/50 transition-colors"
    >
      {/* Background ID Tag */}
      <div className="absolute top-0 right-0 p-2 font-mono text-[10px] text-zinc-700">
        {code}
      </div>

      <div className="relative z-10 space-y-4">
        <div className="h-10 w-10 bg-emerald-500/10 rounded flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-all">
          <Icon size={20} />
        </div>
        
        <h3 className="text-xl font-bold tracking-tighter uppercase">{title}</h3>
        <p className="text-sm text-zinc-500 leading-relaxed font-mono">
          {description}
        </p>
        
        <div className="pt-4 flex items-center gap-2 text-[10px] font-mono text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="animate-pulse">●</span> EXECUTING_CAPABILITY...
        </div>
      </div>

      {/* Hover Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
};