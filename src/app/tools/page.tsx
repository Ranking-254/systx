"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { supabase } from "@/lib/superbase";
import { 
  Zap, Camera, Laugh, RefreshCw, Download, 
  Upload, Crosshair, MapPin, Trash2, Search,
  Terminal, Cpu, Shield, Eye, FileImage,
  ChevronRight, AlertCircle, CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<'MEME' | 'JOKE' | 'CONVERT'>('JOKE');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#080705] text-orange-50/90 pt-20 md:pt-24 px-4 md:px-6 pb-12 font-mono selection:bg-amber-500/30 overflow-x-hidden relative">
      <Navbar />
      
      {/* Ambient glow following mouse */}
      <div 
        className="fixed w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none z-0 transition-all duration-700 ease-out hidden md:block"
        style={{ 
          left: mousePosition.x - 192, 
          top: mousePosition.y - 192 
        }}
      />

      <div className="max-w-5xl mx-auto space-y-8 md:space-y-12 relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-amber-500/20 bg-amber-500/5 rounded-full mb-2 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-amber-500/80">System_Utilities_Active</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black italic tracking-tighter uppercase text-white leading-none">
            Utility_Node_<span className="text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">v1.0</span>
          </h1>
          <p className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-[0.5em]">[ Fun_Mode: Operational ]</p>
        </motion.div>

        {/* Navigation Tabs - Mobile Scrollable */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex overflow-x-auto pb-2 md:pb-0 md:flex-wrap justify-start md:justify-center gap-2 md:gap-3 no-scrollbar"
        >
          <TabButton 
            active={activeTool === 'JOKE'} 
            onClick={() => setActiveTool('JOKE')} 
            icon={<Laugh size={14}/>} 
            label="Joke_Decrypter" 
          />
          <TabButton 
            active={activeTool === 'CONVERT'} 
            onClick={() => setActiveTool('CONVERT')} 
            icon={<RefreshCw size={14}/>} 
            label="Ultra_Converter" 
          />
          <TabButton 
            active={activeTool === 'MEME'} 
            onClick={() => setActiveTool('MEME')} 
            icon={<Camera size={14}/>} 
            label="HUD_Meme_Gen" 
          />
        </motion.div>

        {/* Primary Workspace */}
        <motion.div 
          key={activeTool}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative bg-zinc-900/30 border border-zinc-800 p-4 md:p-8 overflow-hidden backdrop-blur-xl rounded-xl min-h-[400px] md:min-h-[450px] shadow-2xl shadow-black/50"
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-amber-500/20 rounded-tl-xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-amber-500/20 rounded-br-xl" />
          
          <div className="absolute top-0 right-0 p-3 md:p-4 text-[7px] md:text-[8px] text-amber-500/30 uppercase tracking-[0.4em] font-bold">
            SYSTX_CORE_PROCESSOR
          </div>
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTool}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTool === 'JOKE' && <JokeTool />}
              {activeTool === 'CONVERT' && <ConvertTool />}
              {activeTool === 'MEME' && <MemeTool />}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* System Status Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          <StatusCard icon={Cpu} label="CPU_Load" value="12%" />
          <StatusCard icon={Shield} label="Security" value="ACTIVE" active />
          <StatusCard icon={Eye} label="Uptime" value="99.9%" />
          <StatusCard icon={Terminal} label="Node_ID" value="NBO-01" />
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { top: -100%; }
          100% { top: 100%; }
        }
        .animate-scan {
          position: absolute;
          animation: scan 3s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

// --- 1. JOKE DECRYPTER (Enhanced) ---
function JokeTool() {
  const [jokes, setJokes] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getJokes() {
      try {
        const { data, error } = await supabase.from('jokes').select('*');
        if (error) throw error;
        if (data && data.length > 0) {
          setJokes(data);
        } else {
          // Fallback jokes if database is empty
          setJokes([
            { field: "SYSTEM", question: "Why do programmers prefer dark mode?", answer: "Because light attracts bugs." },
            { field: "DEVOPS", question: "Why did the developer go broke?", answer: "Because he used up all his cache." },
            { field: "SECURITY", question: "Why do hackers prefer dark alleys?", answer: "Better encryption." }
          ]);
        }
      } catch (err) {
        setError("CONNECTION_FAILED");
        // Fallback
        setJokes([
          { field: "SYSTEM", question: "Why do programmers prefer dark mode?", answer: "Because light attracts bugs." },
          { field: "DEVOPS", question: "Why did the developer go broke?", answer: "Because he used up all his cache." }
        ]);
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
      setIndex(Math.floor(Math.random() * jokes.length));
      setIsScanning(false);
    }, 600);
  };

  const currentJoke = jokes[index] || jokes[0];

  return (
    <div className="text-center space-y-8 md:space-y-12 py-6 md:py-10 flex flex-col items-center">
      {error && (
        <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-[10px] uppercase tracking-wider">
          <AlertCircle size={14} />
          {error} // Using_Local_Cache
        </div>
      )}

      <div className="space-y-4 md:space-y-6 w-full max-w-lg min-h-[140px] md:min-h-[160px]">
        {/* Category Tag */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
          <p className="text-zinc-600 text-[9px] uppercase tracking-[0.4em]">Transmission_Source:</p>
          <span className="text-amber-500/70 text-[9px] font-bold uppercase border border-amber-500/30 px-3 py-1 rounded-full bg-amber-500/10 tracking-widest backdrop-blur-sm">
            {isScanning ? "SCANNING..." : (currentJoke?.field || "GENERAL")}
          </span>
        </div>

        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className={`relative text-xl md:text-2xl font-bold italic tracking-tight text-white transition-all duration-500 px-4 ${isScanning ? 'blur-md opacity-20 scale-95' : ''}`}>
            "{currentJoke?.question || 'INITIALIZING...'}"
          </p>
        </div>
        
        <div className="h-16 md:h-20 flex items-center justify-center">
          {showAnswer ? (
            <motion.p 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-amber-400 font-black uppercase text-lg md:text-xl tracking-wider drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]"
            >
              {currentJoke?.answer}
            </motion.p>
          ) : (
            <button 
              onClick={() => setShowAnswer(true)}
              disabled={isScanning}
              className="group relative px-6 py-3 text-[9px] text-amber-500/70 hover:text-amber-400 border border-amber-500/30 hover:border-amber-500/60 rounded-lg uppercase tracking-[0.2em] transition-all bg-amber-500/5 hover:bg-amber-500/10 backdrop-blur-sm overflow-hidden disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Eye size={14} />
                [ Decrypt_Punchline ]
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
          )}
        </div>
      </div>

      <button 
        onClick={nextJoke} 
        disabled={jokes.length === 0 || isScanning}
        className="group relative bg-amber-500 text-black px-8 md:px-12 py-3 md:py-4 font-black uppercase text-[10px] md:text-xs tracking-widest hover:bg-amber-400 transition-all active:scale-95 shadow-lg shadow-amber-500/20 disabled:opacity-50 rounded-lg overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-2">
          {isScanning ? (
            <RefreshCw size={14} className="animate-spin" />
          ) : (
            <Zap size={14} />
          )}
          {isScanning ? "RE-ROUTING..." : "Next_Entry"}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
      </button>
    </div>
  );
}

// --- 2. ULTRA CONVERTER (Enhanced) ---
function ConvertTool() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [convertedFormat, setConvertedFormat] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setConvertedUrl(null);
      setConvertedFormat('');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
      setConvertedUrl(null);
      setConvertedFormat('');
    }
  };

  const performTransformation = (format: 'image/webp' | 'image/jpeg' | 'image/png') => {
    if (!preview) return;
    setIsConverting(true);
    setConvertedFormat(format.split('/')[1].toUpperCase());
    
    const img = new Image();
    img.src = preview;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL(format, 0.85);
      setTimeout(() => {
        setConvertedUrl(dataUrl);
        setIsConverting(false);
      }, 800);
    };
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setConvertedUrl(null);
    setConvertedFormat('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-6 py-2 md:py-4">
      <canvas ref={canvasRef} className="hidden" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
        {/* Source Panel */}
        <div 
          className="border border-zinc-800 p-4 md:p-6 bg-black/40 rounded-lg text-center group hover:border-amber-500/40 transition-all relative overflow-hidden"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <p className="text-[9px] text-zinc-500 uppercase mb-4 tracking-widest font-bold flex items-center justify-center gap-2">
            <FileImage size={12} />
            Source_Material
          </p>
          
          <label className="cursor-pointer block relative">
            <input 
              ref={fileInputRef}
              type="file" 
              className="hidden" 
              onChange={handleFileChange} 
              accept="image/*" 
            />
            {preview ? (
              <div className="relative group/image">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="h-32 md:h-40 mx-auto object-contain rounded-lg grayscale group-hover/image:grayscale-0 transition-all duration-500 shadow-lg" 
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    clearFile();
                  }}
                  className="absolute -top-2 -right-2 p-1.5 bg-red-500/20 border border-red-500/50 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 size={12} />
                </button>
                <p className="mt-2 text-[9px] text-zinc-500 truncate px-4">{file?.name}</p>
              </div>
            ) : (
              <div className="h-32 md:h-40 border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center text-zinc-600 gap-3 group-hover:border-amber-500/30 group-hover:text-amber-500/50 transition-all rounded-lg bg-zinc-900/20">
                <Upload size={28} strokeWidth={1.5} className="animate-pulse" /> 
                <span className="text-[9px] uppercase tracking-widest">Drop_File_Here</span>
                <span className="text-[8px] text-zinc-700">or click to browse</span>
              </div>
            )}
          </label>
        </div>

        {/* Output Panel */}
        <div className="border border-zinc-800 p-4 md:p-6 bg-black/40 rounded-lg text-center min-h-[200px] flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-amber-500/5 to-transparent" />
          
          <p className="text-[9px] text-amber-500/70 uppercase mb-4 tracking-widest font-bold flex items-center justify-center gap-2 relative z-10">
            <Zap size={12} />
            Optimized_Payload
          </p>
          
          {isConverting ? (
            <div className="space-y-4 relative z-10">
              <div className="relative">
                <RefreshCw className="animate-spin text-amber-500 mx-auto" size={36} />
                <div className="absolute inset-0 blur-xl bg-amber-500/20" />
              </div>
              <div className="space-y-2">
                <span className="text-amber-500 text-[8px] animate-pulse tracking-[0.4em] block">ATOMIZING_DATA...</span>
                <div className="w-32 h-1 bg-zinc-800 mx-auto rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 animate-[loading_1s_ease-in-out_infinite]" />
                </div>
              </div>
            </div>
          ) : convertedUrl ? (
            <div className="space-y-4 relative z-10">
              <div className="relative inline-block">
                <img 
                  src={convertedUrl} 
                  alt="Converted" 
                  className="h-28 md:h-32 mx-auto object-contain border border-amber-500/30 rounded-lg shadow-lg" 
                />
                <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-amber-500 text-black text-[8px] font-black uppercase rounded">
                  {convertedFormat}
                </div>
              </div>
              <a 
                href={convertedUrl} 
                download={`SYSTX_${convertedFormat}_${file?.name.split('.')[0] || 'export'}`}
                className="inline-flex items-center gap-2 bg-amber-500 text-black px-4 py-2.5 text-[10px] font-black uppercase hover:bg-amber-400 transition-all rounded-lg shadow-lg shadow-amber-500/20 group"
              >
                <Download size={14} className="group-hover:animate-bounce" />
                Download_Asset
              </a>
            </div>
          ) : (
            <div className="text-zinc-800 uppercase text-[9px] tracking-widest flex flex-col items-center gap-2 relative z-10">
              <div className="w-16 h-16 border-2 border-zinc-800 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-zinc-800 rounded-full" />
              </div>
              Buffer_Empty
            </div>
          )}
        </div>
      </div>

      {/* Conversion Controls */}
      {preview && !isConverting && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-3"
        >
          {[
            { format: 'image/webp' as const, label: 'WebP', desc: 'Optimized' },
            { format: 'image/png' as const, label: 'PNG', desc: 'Lossless' },
            { format: 'image/jpeg' as const, label: 'JPG', desc: 'Standard' }
          ].map((item) => (
            <button 
              key={item.format}
              onClick={() => performTransformation(item.format)}
              disabled={!!convertedUrl}
              className="group relative border border-zinc-800 p-3 md:p-4 hover:border-amber-500/50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-zinc-900/20 hover:bg-amber-500/5"
            >
              <div className="text-xs md:text-sm font-black text-zinc-400 group-hover:text-amber-400 transition-colors uppercase tracking-wider">
                {item.label}
              </div>
              <div className="text-[8px] text-zinc-600 group-hover:text-amber-500/60 uppercase tracking-widest mt-1">
                {item.desc}
              </div>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

// --- 3. HUD MEME ENGINE (Enhanced) ---
function MemeTool() {
  const [image, setImage] = useState<string | null>(null);
  const [scanLine, setScanLine] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!image) return;
    const interval = setInterval(() => {
      setScanLine(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, [image]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(URL.createObjectURL(file));
    }
  };

  const downloadMeme = () => {
    // In a real implementation, you'd use html2canvas here
    alert("Download is currently unavailable for this current file");
  };

  return (
    <div className="space-y-4 md:space-y-6 text-center py-2 md:py-4">
      {!image ? (
        <label 
          className="border-2 border-dashed border-zinc-800 p-12 md:p-20 block cursor-pointer hover:border-amber-500/50 transition-all bg-black/20 rounded-xl group relative overflow-hidden"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input 
            ref={fileInputRef}
            type="file" 
            className="hidden" 
            onChange={handleFileSelect}
            accept="image/*"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="relative inline-block">
              <Camera className="mx-auto mb-4 text-zinc-700 group-hover:text-amber-500/50 transition-colors" size={48} strokeWidth={1} />
              <div className="absolute inset-0 blur-xl bg-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-zinc-600 group-hover:text-zinc-400 text-[10px] uppercase tracking-widest font-bold transition-colors">
              Feed_Scanner_Source
            </p>
            <p className="text-zinc-800 text-[8px] uppercase tracking-widest mt-2">
              Drop image or click to upload
            </p>
          </div>
        </label>
      ) : (
        <div className="space-y-4">
          <div className="relative inline-block border-2 border-amber-500/30 shadow-2xl overflow-hidden group rounded-lg max-w-full">
            <img 
              src={image} 
              alt="HUD Target" 
              className="max-h-[300px] md:max-h-[380px] w-auto grayscale contrast-125 brightness-75" 
            />
            
            {/* HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none p-3 md:p-4 flex flex-col justify-between overflow-hidden">
              {/* Top Bar */}
              <div className="flex justify-between items-start">
                <div className="text-amber-500 text-[6px] md:text-[8px] text-left font-bold tracking-widest space-y-0.5 md:space-y-1 bg-black/40 p-2 rounded backdrop-blur-sm border border-amber-500/20">
                  <p className="flex items-center gap-1">
                    <Shield size={8} className="text-emerald-400" />
                    SYSTX_INTEL: ACTIVE
                  </p>
                  <p>REF_ID: 0x{Math.random().toString(16).slice(2,8).toUpperCase()}</p>
                  <p>COORDS: {(-1.29 + Math.random() * 0.1).toFixed(4)}° S, {(36.82 + Math.random() * 0.1).toFixed(4)}° E</p>
                  <p className="text-emerald-400">SAT_LINK: ENCRYPTED</p>
                </div>
                <Crosshair 
                       className="text-amber-500/60 animate-pulse w-6 h-6 md:w-8 md:h-8" 
                     strokeWidth={1} 
                     />
              </div>
              
              {/* Center Reticle */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 md:w-24 md:h-24 border border-amber-500/30 rounded-full flex items-center justify-center">
                  <div className="w-1 h-4 bg-amber-500/50 absolute" />
                  <div className="w-4 h-1 bg-amber-500/50 absolute" />
                  <div className="w-2 h-2 bg-amber-500/80 rounded-full animate-pulse" />
                </div>
              </div>
              
              {/* Scanning Line */}
              <div 
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent shadow-[0_0_10px_rgba(245,158,11,0.8)] z-20 transition-all duration-75"
                style={{ top: `${scanLine}%` }}
              />
              <div 
                className="absolute left-0 right-0 h-16 md:h-24 bg-gradient-to-b from-transparent via-amber-500/10 to-transparent pointer-events-none transition-all duration-75"
                style={{ top: `calc(${scanLine}% - 32px)` }}
              />

              {/* Bottom Bar */}
              <div className="flex justify-between items-end">
                <div className="border border-amber-500 bg-amber-500/20 text-amber-400 px-2 py-1 text-[6px] md:text-[8px] font-black uppercase backdrop-blur-sm rounded">
                  Threat_Level: MINIMAL
                </div>
                <div className="text-amber-500/60 flex gap-2 items-center bg-black/40 p-1.5 rounded backdrop-blur-sm">
                  <MapPin size={10} /> 
                  <Search size={10} />
                  <span className="text-[6px] md:text-[8px] font-bold">ZOOM: 4.5x</span>
                </div>
              </div>

              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-amber-500/50" />
              <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-amber-500/50" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-amber-500/50" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-amber-500/50" />
            </div>
            
            {/* Controls */}
            <div className="absolute top-2 right-2 flex flex-col gap-2 z-30">
              <button 
                onClick={downloadMeme}
                className="p-2 bg-amber-500/90 border border-amber-500 text-black hover:bg-amber-400 transition-all rounded shadow-lg backdrop-blur-sm"
                title="Download"
              >
                <Download size={14} />
              </button>
              <button 
                onClick={() => setImage(null)}
                className="p-2 bg-black/80 border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white transition-all rounded shadow-lg backdrop-blur-sm"
                title="Clear"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          
          <p className="text-[8px] md:text-[10px] text-zinc-600 uppercase tracking-[0.2em]">
            Visual demonstration of surveillance aesthetics // For entertainment purposes
          </p>
        </div>
      )}
    </div>
  );
}

// --- SHARED UI COMPONENTS ---

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 md:gap-3 px-4 md:px-8 py-3 md:py-4 border transition-all text-[9px] md:text-[10px] uppercase font-black tracking-wider rounded-lg whitespace-nowrap flex-shrink-0 backdrop-blur-sm
        ${active 
          ? 'bg-amber-500 text-black border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)]' 
          : 'bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300'
        }`}
    >
      {icon} 
      <span className="hidden sm:inline">{label}</span>
      <span className="sm:hidden">{label.split('_')[0]}</span>
      {active && <ChevronRight size={14} className="hidden md:block" />}
    </button>
  );
}

function StatusCard({ icon: Icon, label, value, active }: any) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative bg-zinc-900/40 border border-zinc-800 p-3 md:p-4 rounded-lg flex items-center gap-3 hover:border-amber-500/30 transition-colors backdrop-blur-sm">
        <div className={`p-2 rounded-lg ${active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-500'}`}>
          <Icon size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[8px] md:text-[9px] text-zinc-500 uppercase tracking-wider truncate">{label}</div>
          <div className={`text-xs md:text-sm font-bold uppercase tracking-wider truncate ${active ? 'text-emerald-400' : 'text-zinc-300'}`}>
            {value}
          </div>
        </div>
        {active && (
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse flex-shrink-0" />
        )}
      </div>
    </div>
  );
}