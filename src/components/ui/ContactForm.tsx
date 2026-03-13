"use client";
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

export function ContactForm() {
  // Use the environment variable instead of the hardcoded string
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_ID as string);

  if (state.succeeded) {
    return (
      <div className="text-center py-12 border border-emerald-500 bg-emerald-500/5">
        <p className="font-mono text-emerald-500 text-sm uppercase tracking-[0.2em]">
          [ Access_Granted ]: Message Transmitted Successfully.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="full-name" className="text-[10px] font-mono uppercase text-foreground/40 tracking-widest">
            Client_Identity
          </label>
          <input
            id="full-name"
            type="text" 
            name="name"
            required
            placeholder="NAME / CO"
            className="w-full bg-background border border-foreground/10 p-4 text-xs font-mono uppercase outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-[10px] font-mono uppercase text-foreground/40 tracking-widest">
            Comms_Channel
          </label>
          <input
            id="email"
            type="email" 
            name="email"
            required
            placeholder="EMAIL_ADDRESS"
            className="w-full bg-background border border-foreground/10 p-4 text-xs font-mono uppercase outline-none focus:border-primary transition-colors"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-[10px] font-mono mt-1" />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-[10px] font-mono uppercase text-foreground/40 tracking-widest">
          Project_Parameters
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="DEFINE_MISSION_OBJECTIVES..."
          className="w-full bg-background border border-foreground/10 p-4 text-xs font-mono uppercase outline-none focus:border-primary transition-colors resize-none"
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-[10px] font-mono mt-1" />
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full bg-foreground text-background py-4 font-black uppercase tracking-tighter hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        <span className="flex items-center justify-center gap-2">
          {state.submitting ? "UPLOADING_DATA..." : "EXECUTE_INITIATION"}
        </span>
      </button>
    </form>
  );
}