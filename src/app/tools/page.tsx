"use client";
import React, { useState, useRef, useEffect } from 'react'; // Added useEffect
import { Navbar } from "@/components/layout/Navbar";
import { supabase } from "@/lib/superbase"; // Ensure this path matches your project setup
import { 
  Zap, Camera, Laugh, RefreshCw, Download, 
  Upload, Eye, Crosshair, MapPin, Trash2, FileImage, Search
} from "lucide-react";

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<'MEME' | 'JOKE' | 'CONVERT'>('JOKE');

  return (
    <div className="min-h-screen bg-[#080705] text-orange-50/90 pt-24 px-6 pb-12 font-mono selection:bg-amber-500/30">
      <Navbar />
      
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-amber-500/20 bg-amber-500/5 rounded-full mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[8px] uppercase tracking-[0.3em] text-amber-500/80">System_Utilities_Active</span>
          </div>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white leading-none">
            Utility_Node_<span className="text-amber-500 text-glow">v1.0</span>
          </h1>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.5em]">[ Fun_Mode: Operational ]</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-3">
          <TabButton active={activeTool === 'JOKE'} onClick={() => setActiveTool('JOKE')} icon={<Laugh size={14}/>} label="Joke_Decrypter" />
          <TabButton active={activeTool === 'CONVERT'} onClick={() => setActiveTool('CONVERT')} icon={<RefreshCw size={14}/>} label="Ultra_Converter" />
          <TabButton active={activeTool === 'MEME'} onClick={() => setActiveTool('MEME')} icon={<Camera size={14}/>} label="HUD_Meme_Gen" />
        </div>

        {/* Primary Workspace */}
        <div className="bg-zinc-900/20 border border-zinc-800 p-8 relative overflow-hidden backdrop-blur-md rounded-sm min-h-[450px] shadow-2xl">
          <div className="absolute top-0 right-0 p-3 text-[7px] text-amber-500/30 uppercase tracking-[0.4em]">
            SYSTX_CORE_PROCESSOR
          </div>
          
          {activeTool === 'JOKE' && <JokeTool />}
          {activeTool === 'CONVERT' && <ConvertTool />}
          {activeTool === 'MEME' && <MemeTool />}
        </div>
      </div>

      {/* Global CSS for the Scan Animation */}
      <style jsx global>{`
        @keyframes scan {
          0% { top: -100%; }
          100% { top: 100%; }
        }
        .animate-scan {
          position: absolute;
          animation: scan 3s linear infinite;
        }
        .text-glow {
          text-shadow: 0 0 15px rgba(245, 158, 11, 0.5);
        }
      `}</style>
    </div>
  );
}

// --- 1. JOKE DECRYPTER (Supabase Integrated) ---
function JokeTool() {
  const [jokes, setJokes] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isScanning, setIsScanning] = useState(true);

  // Fetch jokes from Supabase on component load
  useEffect(() => {
    async function getJokes() {
      const { data, error } = await supabase.from('jokes').select('*');
      if (!error && data) {
        setJokes(data);
      }
      setIsScanning(false);
    }
    getJokes();
  }, []);

  const nextJoke = () => {
    if (jokes.length === 0) return;
    setIsScanning(true);
    setShowAnswer(false);
    setTimeout(() => {
      // Pick a random index from the fetched jokes
      setIndex(Math.floor(Math.random() * jokes.length));
      setIsScanning(false);
    }, 600);
  };

  return (
    <div className="text-center space-y-12 py-10 flex flex-col items-center">
      <div className="space-y-6 max-w-lg min-h-[160px]">
        {/* Category Tag Logic */}
        <div className="flex justify-center items-center gap-2">
           <p className="text-zinc-600 text-[9px] uppercase tracking-[0.4em]">Transmission_Source:</p>
           <span className="text-amber-500/50 text-[9px] font-bold uppercase border border-amber-500/20 px-2 py-0.5 rounded-sm bg-amber-500/5 tracking-widest">
             {isScanning ? "..." : (jokes[index]?.field || "GENERAL")}
           </span>
        </div>

        <p className={`text-2xl font-bold italic tracking-tight text-white transition-all duration-500 ${isScanning ? 'blur-md opacity-20' : ''}`}>
          {jokes.length > 0 ? jokes[index].question : "CONNECTING_TO_DATABASE..."}
        </p>
        
        <div className="h-16 flex items-center justify-center">
          {showAnswer ? (
            <p className="text-amber-500 font-black uppercase text-xl animate-in zoom-in duration-300">
               {jokes[index]?.answer}
            </p>
          ) : (
            <button 
              onClick={() => setShowAnswer(true)}
              className="text-[9px] text-amber-500/50 hover:text-amber-500 border border-amber-500/20 px-6 py-2 uppercase tracking-widest transition-all bg-amber-500/5 hover:bg-amber-500/10"
            >
              [ Decrypt_Punchline ]
            </button>
          )}
        </div>
      </div>

      <button 
        onClick={nextJoke} 
        disabled={jokes.length === 0}
        className="bg-amber-500 text-black px-12 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all active:scale-95 shadow-lg shadow-amber-500/20 disabled:opacity-50"
      >
        {isScanning ? "RE-ROUTING..." : "Next_Entry"}
      </button>
    </div>
  );
}

// --- 2. ULTRA CONVERTER (Operational) ---
function ConvertTool() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setConvertedUrl(null);
    }
  };

  const performTransformation = (format: 'image/webp' | 'image/jpeg' | 'image/png') => {
    if (!preview) return;
    setIsConverting(true);
    const img = new Image();
    img.src = preview;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL(format, 0.8);
      setTimeout(() => {
        setConvertedUrl(dataUrl);
        setIsConverting(false);
      }, 1200);
    };
  };

  return (
    <div className="space-y-8 py-4">
      <canvas ref={canvasRef} className="hidden" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="border border-zinc-800 p-6 bg-black/40 text-center group hover:border-amber-500/40 transition-all">
          <p className="text-[9px] text-zinc-600 uppercase mb-4 tracking-widest font-bold">Source_Material</p>
          <label className="cursor-pointer block">
            <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
            {preview ? (
              <img src={preview} alt="Preview" className="h-40 mx-auto object-contain rounded-sm grayscale group-hover:grayscale-0 transition-all" />
            ) : (
              <div className="h-40 border border-dashed border-zinc-800 flex flex-col items-center justify-center text-zinc-700 gap-3 group-hover:text-amber-500/50">
                <Upload size={24} strokeWidth={1} /> 
                <span className="text-[9px] uppercase tracking-widest">Inject_Asset</span>
              </div>
            )}
          </label>
        </div>

        <div className="border border-zinc-800 p-6 bg-black/40 text-center min-h-[200px] flex flex-col justify-center">
          <p className="text-[9px] text-amber-500 uppercase mb-4 tracking-widest font-bold">Optimized_Payload</p>
          {isConverting ? (
            <div className="space-y-4">
              <RefreshCw className="animate-spin text-amber-500 mx-auto" size={32} />
              <span className="text-amber-500 text-[8px] animate-pulse tracking-[0.4em]">ATOMIZING_DATA...</span>
            </div>
          ) : convertedUrl ? (
            <div className="space-y-4">
               <img src={convertedUrl} alt="Converted" className="h-32 mx-auto object-contain border border-amber-500/20" />
               <a href={convertedUrl} download={`SYSTX_WARM_${file?.name.split('.')[0]}`}
                className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 text-[10px] font-black uppercase hover:bg-amber-500 transition-all"
               >
                 Download <Download size={12} />
               </a>
            </div>
          ) : (
            <div className="text-zinc-800 uppercase text-[9px] tracking-widest">Buffer_Empty</div>
          )}
        </div>
      </div>

      {preview && !isConverting && (
        <div className="grid grid-cols-3 gap-3">
          <button onClick={() => performTransformation('image/webp')} className="border border-zinc-800 p-3 hover:border-amber-500 text-[9px] uppercase font-bold text-zinc-500 hover:text-white transition-all">To_WebP</button>
          <button onClick={() => performTransformation('image/png')} className="border border-zinc-800 p-3 hover:border-amber-500 text-[9px] uppercase font-bold text-zinc-500 hover:text-white transition-all">To_PNG</button>
          <button onClick={() => performTransformation('image/jpeg')} className="border border-zinc-800 p-3 hover:border-amber-500 text-[9px] uppercase font-bold text-zinc-500 hover:text-white transition-all">To_JPG</button>
        </div>
      )}
    </div>
  );
}

// --- 3. HUD MEME ENGINE (Visual HUD Overlay) ---
function MemeTool() {
  const [image, setImage] = useState<string | null>(null);

  return (
    <div className="space-y-6 text-center py-4">
      {!image ? (
        <label className="border-2 border-dashed border-zinc-800 p-20 block cursor-pointer hover:border-amber-500/50 transition-all bg-black/20">
          <input type="file" className="hidden" onChange={(e) => setImage(URL.createObjectURL(e.target.files![0]))} />
          <Camera className="mx-auto mb-4 text-zinc-800" size={48} strokeWidth={1} />
          <p className="text-zinc-600 text-[10px] uppercase tracking-widest font-bold">Feed_Scanner_Source</p>
        </label>
      ) : (
        <div className="relative inline-block border border-amber-500/30 shadow-2xl overflow-hidden group">
          <img src={image} alt="HUD Target" className="max-h-[380px] w-auto grayscale contrast-125 brightness-75" />
          
          {/* THE HUD ELEMENTS */}
          <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between overflow-hidden">
            <div className="flex justify-between items-start">
              <div className="text-amber-500 text-[7px] text-left font-bold tracking-widest space-y-1">
                <p>[ SYSTX_INTEL: ACTIVE ]</p>
                <p>REF_ID: 0x{Math.random().toString(16).slice(2,8).toUpperCase()}</p>
                <p>COORDS: 40.7128° N, 74.0060° W</p>
              </div>
              <Crosshair className="text-amber-500/50 animate-pulse" size={32} strokeWidth={1} />
            </div>
            
            {/* THE ANIMATED SCAN LINE */}
            <div className="animate-scan w-full h-[2px] bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,1)] z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent h-1/3 w-full animate-scan" />

            <div className="flex justify-between items-end">
              <div className="border border-amber-500 bg-amber-500/10 text-amber-500 px-2 py-0.5 text-[8px] font-black uppercase">
                Threat_Level: MINIMAL
              </div>
              <div className="text-amber-500/50 flex gap-2">
                 <MapPin size={10} /> <Search size={10} />
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setImage(null)}
            className="absolute top-2 right-2 bg-black border border-amber-500 text-amber-500 p-1 hover:bg-amber-500 hover:text-black transition-all z-20"
          >
            <Trash2 size={12} />
          </button>
        </div>
      )}
      <p className="text-[8px] text-zinc-700 uppercase tracking-[0.2em]">Note: This system is for visual demonstration of surveillance aesthetics.</p>
    </div>
  );
}

// --- SHARED UI ---
function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick}
      className={`flex items-center gap-3 px-8 py-4 border transition-all text-[9px] uppercase font-black tracking-widest
        ${active ? 'bg-amber-500 text-black border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'bg-transparent text-zinc-600 border-zinc-800 hover:border-zinc-500 hover:text-zinc-400'}`}
    >
      {icon} {label}
    </button>
  );
}