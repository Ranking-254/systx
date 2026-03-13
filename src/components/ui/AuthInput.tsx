"use client";
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const AuthInput = ({ label, type, ...props }: Props) => {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="space-y-1 w-full">
      <label className="text-[10px] uppercase text-zinc-500 font-mono tracking-widest">{label}</label>
      <div className="relative">
        <input
          {...props}
          type={isPassword ? (show ? 'text' : 'password') : type}
          className="w-full bg-zinc-950 border border-zinc-800 p-3 text-sm font-mono text-white focus:border-emerald-500 outline-none transition-all rounded-sm"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-emerald-500 transition-colors"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
};