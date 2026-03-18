"use client";

import React, { useState, useEffect } from 'react';

import { supabase } from "@/lib/superbase";

import { motion, AnimatePresence } from "framer-motion";

import {

  User, Shield, LogOut, X, Trash2,

  Save, Loader2, AlertTriangle, Fingerprint

} from "lucide-react";



export function UserDrawer() {

  const [isOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState<any>(null);

  const [newName, setNewName] = useState("");

  const [isDeleting, setIsDeleting] = useState(false);

  const [confirmText, setConfirmText] = useState("");

  const [isDeleted, setIsDeleted] = useState(false);



  const fetchProfile = async () => {

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {

      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();

      setProfile({ ...data, email: user.email });

      setNewName(data?.display_name || "");

    }

  };



  useEffect(() => { if (isOpen) fetchProfile(); }, [isOpen]);



  // Determine Icon based on role/status

  const getIdentityIcon = () => {

  if (profile?.role === 'admin') return <Shield size={16} className="text-amber-500" />;

  if (profile?.role === 'client') return <Fingerprint size={16} className="text-emerald-500" />;

  return <User size={16} className="text-zinc-500" />;

};



  const handleUpdateProfile = async () => {

    setLoading(true);

    const { error } = await supabase

      .from('profiles')

      .update({ display_name: newName })

      .eq('id', profile.id);

    if (!error) {

      setProfile({ ...profile, display_name: newName });

      setLoading(false);

    }

  };



 const handleTerminateAccount = async () => {

  if (!confirm("Final Warning: This will permanently destroy your account.")) return;

 

  setLoading(true);

 

  try {

    const { error } = await supabase.rpc('delete_current_user');



    if (error) {

      console.error("PURGE_ERROR:", error.message);

    } else {

      // 1. Wipe the local session

      await supabase.auth.signOut();

      window.localStorage.clear();

     

      // 2. Show the goodbye message instead of redirecting

      setIsDeleted(true);



      // 3. Wait 3 seconds, then send them home

      setTimeout(() => {

        window.location.href = '/';

      }, 3000);

    }

  } catch (err) {

    console.error(err);

  } finally {

    setLoading(false);

  }

};



  return (

    <>

      {/* TRIGGER - Minimal Icon Button */}

      <button

        onClick={() => setIsOpen(true)}

        className="relative group flex items-center justify-center h-10 w-10 bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-sm hover:border-emerald-500/50 transition-all active:scale-95"

      >

        <div className="flex items-center justify-center">

          {getIdentityIcon()}

        </div>

       

        {/* Subtle status indicator dot */}

        <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />

      </button>



      <AnimatePresence>

        {isOpen && (

          <>

            {/* OVERLAY */}

            <motion.div

  initial={{ opacity: 0 }}

  animate={{ opacity: 1 }}

  exit={{ opacity: 0 }}

  onClick={() => {setIsOpen(false); setIsDeleting(false);}}

  className="fixed inset-0 bg-black/70 backdrop-blur-[20px] z-[999]"

/>



           {/* DRAWER */}

<motion.div

  initial={{ x: '100%' }}

  animate={{ x: 0 }}

  exit={{ x: '100%' }}

  transition={{ type: "spring", damping: 25, stiffness: 200 }}

  className="fixed top-0 right-0 h-full w-full max-w-sm

  relative

  bg-white/30 dark:bg-zinc-950/30

  backdrop-blur-2xl

  border-l border-white/20 dark:border-white/10

  z-[1000] p-8 font-mono

  shadow-[0_0_80px_rgba(255,255,255,0.1),0_0_40px_rgba(0,0,0,0.3),inset_0_0_60px_rgba(255,255,255,0.05)]

  before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent before:pointer-events-none before:rounded-sm

  after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent

  flex flex-col"

>

              <div className="flex justify-between items-center mb-12">

                <div className="flex items-center gap-2">

                  <div className="p-2 bg-emerald-500/10 rounded-sm">

                    {getIdentityIcon()}

                  </div>

                  <div>

                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em]">Identity_Node</h2>

                    <p className="text-[8px] text-zinc-500 uppercase tracking-widest">{profile?.role || 'User'}_Access_Granted</p>

                  </div>

                </div>

                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-sm transition-colors">

                  <X size={18} className="text-zinc-500" />

                </button>

              </div>



              {/* MAIN CONTENT AREA */}
              <div className="flex-1 flex flex-col">
                {isDeleted ? (
                  /* GOODBYE MESSAGE */
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 flex flex-col items-center justify-center text-center space-y-6 p-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <span className="text-3xl">👋</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-800 dark:text-zinc-200 mb-2">Goodbye_Friend</h3>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">
                        Your account has been removed.<br/>
                        We hope to see you again soon!
                      </p>
                    </div>
                    <div className="flex items-center gap-2 pt-4">
                      <Loader2 size={12} className="animate-spin text-zinc-400" />
                      <span className="text-[8px] text-zinc-400 uppercase font-bold tracking-widest">Redirecting...</span>
                    </div>
                  </motion.div>
                ) : !isDeleting ? (

                <div className="space-y-8 flex-1 animate-in fade-in slide-in-from-right-4 duration-300">

                  <div className="space-y-4">

                    <div className="space-y-1">

                      <label className="text-[9px] text-zinc-500 uppercase tracking-widest">Display_Name</label>

                      <input

                        className="w-full bg-white/40 dark:bg-black/40 border border-white/20 dark:border-white/10 p-3 text-xs text-black dark:text-white outline-none focus:border-emerald-400/50 transition-all rounded-sm backdrop-blur-sm"

                        value={newName}

                        onChange={(e) => setNewName(e.target.value)}

                      />

                    </div>

                    <div className="space-y-1">

                      <label className="text-[9px] text-zinc-500 uppercase tracking-widest">Auth_Email</label>

                      <div className="w-full bg-white/40 dark:bg-black/40 border border-white/20 dark:border-white/10 p-3 text-xs text-zinc-400 italic rounded-sm backdrop-blur-sm">

                        {profile?.email}

                      </div>

                    </div>

                    <button

                      onClick={handleUpdateProfile}

                      disabled={loading}

                      className="w-full bg-white/60 dark:bg-white/10 text-black dark:text-white py-3 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400/60 dark:hover:bg-emerald-500/60 hover:text-white transition-all flex items-center justify-center gap-2 rounded-sm backdrop-blur-md border border-white/20 dark:border-white/10"

                    >

                      {loading ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}

                      Save_Changes

                    </button>

                  </div>



                  <div className="border-t border-white/20 dark:border-white/10 pt-8 space-y-4">

                    <button

                      onClick={() => supabase.auth.signOut().then(() => window.location.href = '/')}

                      className="w-full flex items-center justify-between group p-3 border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 transition-all rounded-sm backdrop-blur-sm"

                    >

                      <span className="text-[10px] text-zinc-500 group-hover:text-black dark:group-hover:text-white uppercase tracking-widest font-bold">Sign_Out</span>

                      <LogOut size={14} className="text-zinc-400 group-hover:text-emerald-500" />

                    </button>



                    <button

                      onClick={() => setIsDeleting(true)}

                      className="w-full flex items-center justify-between group p-3 border border-red-500/20 hover:bg-red-500/10 transition-all rounded-sm backdrop-blur-sm"

                    >

                      <span className="text-[10px] text-red-500/50 group-hover:text-red-500 uppercase tracking-widest font-bold">Delete_Record</span>

                      <Trash2 size={14} className="text-red-900/50 group-hover:text-red-500" />

                    </button>

                  </div>

                </div>

              ) : (

                /* DELETE CONFIRMATION UI */

                <div className="space-y-6 flex-1">

                   {/* ... Keep your existing Delete UI logic ... */}

                   <div className="p-4 bg-red-500/10 border border-red-500/20 backdrop-blur-md rounded-sm">

                    <div className="flex items-center gap-2 text-red-500 mb-2">

                      <AlertTriangle size={16} />

                      <span className="text-[11px] font-black uppercase tracking-tighter">Critical_Warning</span>

                    </div>

                    <p className="text-[10px] text-red-500/70 leading-relaxed uppercase tracking-widest">

                      Deleting your account will permanently delete all your session data and bookings.

                    </p>

                  </div>

                 

                  <div className="space-y-2">

                    <label className="text-[9px] text-zinc-500 uppercase tracking-widest italic">Type "TERMINATE" to execute wipe</label>

                    <input

                      autoFocus

                      className="w-full bg-transparent border-b-2 border-red-500 p-3 text-lg text-red-500 outline-none font-black"

                      value={confirmText}

                      onChange={(e) => setConfirmText(e.target.value.toUpperCase())}

                    />

                  </div>



                  <div className="flex gap-4 pt-4">

                    <button onClick={() => setIsDeleting(false)} className="text-[10px] text-blue-500 uppercase font-black hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">Abort</button>

                    <button

                      onClick={handleTerminateAccount}

                      disabled={confirmText !== "TERMINATE" || loading}

                      className="flex-1 bg-red-500/60 text-white py-3 text-[10px] font-black uppercase tracking-[0.2em] disabled:opacity-20 hover:bg-red-500 transition-all rounded-sm backdrop-blur-md border border-red-400/30"

                    >

                      Delete Account

                    </button>

                  </div>

                </div>
                )}
                </div>

                <div className="mt-auto pt-8 border-t border-white/20 dark:border-white/10">

                <div className="flex items-center justify-between text-[8px] text-zinc-400 font-mono tracking-tighter opacity-50">

                  <span>SECURE_ID: {profile?.id?.slice(0, 12)}...</span>

                  <span>V3.0.1</span>

                </div>

              </div>

            </motion.div>

          </>

        )}

      </AnimatePresence>

    </>

  );

}