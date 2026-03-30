"use client"

import React, { useState } from 'react';
import { Video, X, Camera, Mic, MicOff, CameraOff, Clock, User, Shield, Image as ImageIcon, MessageSquare, Bell, ShieldCheck, ChevronDown, Check, Upload } from 'lucide-react';
import api from '@/src/lib/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function CreateLivestreamPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Go live now');
  const [audience, setAudience] = useState('All members');
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const handleStartLive = async () => {
    if (!title) return toast.error("Title is required");
    
    setPublishing(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('audience', audience);
      formData.append('scheduledTime', activeTab === 'Go live now' ? new Date().toISOString() : new Date(Date.now() + 86400000).toISOString());
      if (file) formData.append('file', file);

      await api.post('/creator/livestreams', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success("Livestream created!");
      router.push('/creator');
    } catch (err) {
      toast.error("Failed to start live.");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="flex bg-[#f9f9f9] min-h-screen font-sans">
      
      {/* Left Column: Preview */}
      <div className="flex-1 p-12 max-w-5xl border-r border-slate-200/60 overflow-y-auto">
         <header className="mb-12">
            <h1 className="text-[44px] font-bold text-[#1c1917] tracking-tight mb-2">Create a livestream</h1>
            <p className="text-2xl font-bold text-slate-600 tracking-tight leading-tight">
               Set up and schedule live sessions to connect with your audience in real time.
            </p>
         </header>

         {/* Stream Preview Container */}
         <div className="space-y-12">
            <div className="bg-[#a8a29e] rounded-[32px] overflow-hidden shadow-2xl aspect-[16/9] relative flex flex-col items-center justify-center p-12 text-center text-white/80 group">
               <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
                  <CameraOff className="w-8 h-8 text-white" />
               </div>
               <p className="text-lg font-bold text-white mb-2 leading-relaxed max-w-sm">
                  Allow renown to access your camera and microphone
               </p>
               <p className="text-sm font-medium text-white/60 leading-relaxed max-w-xs">
                  Go to your browser settings to change your permissions.
               </p>
               
               <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-rose-500 shadow-xl hover:scale-105 active:scale-95 transition-all">
                    <CameraOff className="w-5 h-5" />
                  </button>
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-rose-500 shadow-xl hover:scale-105 active:scale-95 transition-all">
                    <MicOff className="w-5 h-5" />
                  </button>
               </div>
            </div>
         </div>
      </div>

      {/* Right Column: Settings */}
      <aside className="w-[380px] p-8 bg-white overflow-y-auto shrink-0 border-l border-slate-200/60 h-screen sticky top-0 shadow-sm">
         
         <button 
           onClick={handleStartLive}
           disabled={publishing}
           className="w-full py-4.5 bg-[#f87171] hover:bg-[#ef4444] text-white text-base font-black rounded-2xl shadow-xl transition-all mb-10 border-b-4 border-[#dc2626] disabled:opacity-50"
         >
            {publishing ? 'Starting...' : 'Start Live'}
         </button>

         <div className="space-y-10 pb-20">
            
            {/* Time Settings */}
            <div>
               <h4 className="text-sm font-bold text-[#111827] border-b border-slate-100 pb-5 mb-5 uppercase tracking-widest text-[11px] opacity-60">Choose a time</h4>
               <div className="space-y-3">
                  {['Go live now', 'Schedule for later'].map((t) => (
                    <div 
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${activeTab === t ? 'border-rose-500 bg-rose-50/20' : 'border-slate-100 bg-[#fbfbfb] hover:bg-slate-50'}`}
                    >
                       <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${activeTab === t ? 'border-rose-500' : 'border-slate-300'}`}>
                          {activeTab === t && <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>}
                       </div>
                       <span className="text-[13px] font-bold text-[#111827]">{t}</span>
                    </div>
                  ))}
               </div>

               {activeTab === 'Schedule for later' && (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                     <div className="bg-white border border-slate-100 rounded-xl p-3 px-5 shadow-sm">
                        <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Date</p>
                        <p className="text-[14px] font-bold text-[#111827]">1 march, 2026</p>
                     </div>
                     <div className="bg-white border border-slate-100 rounded-xl p-3 px-5 shadow-sm">
                        <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Time</p>
                        <p className="text-[14px] font-bold text-[#111827]">10 : 00 am</p>
                     </div>
                  </div>
               )}
            </div>

            {/* Content Details */}
            <div>
               <h4 className="text-sm font-bold text-[#111827] border-b border-slate-100 pb-5 mb-5 uppercase tracking-widest text-[11px] opacity-60">About this live</h4>
               <div className="space-y-3">
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title" 
                    className="w-full bg-[#fbfbfb] border border-slate-100 rounded-xl px-5 py-4 text-[13px] font-bold text-[#111827] focus:outline-none focus:ring-1 focus:ring-rose-200" 
                  />
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description ( optional )" 
                    rows={4} 
                    className="w-full bg-[#fbfbfb] border border-slate-100 rounded-xl px-5 py-4 text-[13px] font-bold text-[#111827] focus:outline-none focus:ring-1 focus:ring-rose-200 resize-none" 
                  />
               </div>
            </div>

            {/* Audience Section */}
            <div>
               <h4 className="text-sm font-bold text-[#111827] border-b border-slate-100 pb-5 mb-5 uppercase tracking-widest text-[11px] opacity-60">Audience</h4>
               <div className="space-y-3">
                  {[
                    { id: 'All members', label: 'All members', icon: User },
                    { id: 'Paid access', label: 'Paid access', icon: Shield }
                  ].map((a) => (
                    <div 
                      key={a.id}
                      onClick={() => setAudience(a.id)}
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${audience === a.id ? 'border-rose-500 bg-rose-50/20' : 'border-slate-100 bg-[#fbfbfb] hover:bg-slate-50'}`}
                    >
                       <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${audience === a.id ? 'border-rose-500' : 'border-slate-300'}`}>
                          {audience === a.id && <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>}
                       </div>
                       <span className="text-[13px] font-bold text-[#111827]">{a.label}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Thumbnail */}
            <div>
               <h4 className="text-sm font-bold text-[#111827] border-b border-slate-100 pb-5 mb-5 uppercase tracking-widest text-[11px] opacity-60">Add a thumbnail</h4>
               <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm mb-4 relative group cursor-pointer" onClick={() => document.getElementById('thumb-upload')?.click()}>
                  <img src={previewUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80"} className="w-full aspect-video object-cover" alt="Thumbnail preview" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Upload className="w-8 h-8 text-white" />
                  </div>
               </div>
               <input id="thumb-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
               <button 
                 onClick={() => document.getElementById('thumb-upload')?.click()}
                 className="w-full py-3 bg-[#fbfbfb] border border-slate-100 rounded-xl text-[13px] font-bold text-[#1c1917] hover:bg-white transition-all shadow-sm"
               >
                  {file ? 'Change Thumbnail' : 'Upload'}
               </button>
            </div>

            {/* Live Settings */}
            <div>
               <h4 className="text-sm font-bold text-[#111827] border-b border-slate-100 pb-5 mb-5 uppercase tracking-widest text-[11px] opacity-60">Live settings</h4>
               <div className="space-y-3">
                  {[
                    { label: 'Display chat', icon: MessageSquare },
                    { label: 'Emails and notifications', desc: 'Notify members via email and app when you schedule and start live', icon: Bell },
                    { label: 'Auto moderation', desc: 'Automatically helps filter spam, abuse and disruptive messages in your chats', icon: ShieldCheck }
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-[#fbfbfb] cursor-pointer hover:bg-slate-50 transition-all">
                       <div className="w-5 h-5 rounded-full border-2 border-slate-300 mt-1 shrink-0"></div>
                       <div>
                          <p className="text-[13px] font-bold text-[#111827]">{s.label}</p>
                          {s.desc && <p className="text-[11px] font-medium text-slate-400 mt-0.5 leading-relaxed">{s.desc}</p>}
                       </div>
                    </div>
                  ))}
               </div>
            </div>

         </div>
      </aside>

    </div>
  );
}
