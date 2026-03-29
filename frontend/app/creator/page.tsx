"use client"
/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect } from 'react';
import api from '@/src/lib/api';
import { Settings, Edit2, Palette, Rocket, Megaphone, ArrowRight, MoreHorizontal, PenTool, Camera, X, Plus, Package, ShoppingBag, Search, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function CreatorHomePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Home');
  const [basicsOpen, setBasicsOpen] = useState(false);
  const [recommendOpen, setRecommendOpen] = useState(false);
  const [creatorData, setCreatorData] = useState<any>(null);
  const [profileForm, setProfileForm] = useState({ name: '', username: '', bio: '' });
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/creator/dashboard');
        setCreatorData(res.data);
        if (res.data?.creator) {
          setProfileForm({
            name: res.data.creator.name || '',
            username: res.data.creator.username || '',
            bio: res.data.creator.bio || ''
          });
        }
      } catch (err) {
        console.error("Error fetching creator dashboard:", err);
      }
    };
    fetchDashboard();
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    try {
       const res = await api.put('/creator/update-profile', profileForm);
       setCreatorData({ ...creatorData, creator: res.data });
       toast.success("Profile updated!");
       setBasicsOpen(false);
    } catch (err) {
       toast.error("Failed to update profile");
    } finally {
       setUpdating(false);
    }
  };

  const creator = creatorData?.creator;
  const stats = creatorData?.stats;

  return (
    <div className="flex flex-col items-center bg-[#f9f9f9] min-h-screen font-[var(--font-figtree)] pb-20 relative">

      {/* Hero Section */}
      <div className="w-full max-w-5xl px-8 flex flex-col items-center justify-center pt-16 pb-12 relative">
        <h1 className="text-[42px] font-bold text-[#1c1917] tracking-tighter mb-2 shadow-sm font-['Fjalla One'] uppercase">
          {creator?.name || 'Creator Name'}
        </h1>
        <p className="text-slate-500 font-medium mb-8">@{creator?.username || 'username'}</p>

        <div className="flex gap-10 border-b border-slate-200/80 w-full justify-center">
          {['Home', 'Collections', 'Shop', 'Membership', 'Recommendations'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[15px] font-bold pb-4 border-b-2 transition-all duration-200 ${activeTab === tab ? 'text-[#1c1917] border-rose-500' : 'text-slate-400 hover:text-slate-800 border-transparent'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-4xl px-8 flex flex-col items-stretch space-y-6">

        {/* ----- HOME TAB ----- */}
        {activeTab === 'Home' && (
          <>
            {/* Header Row */}
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-[28px] font-bold tracking-tight text-[#1c1917] font-['Fjalla One'] uppercase">Home</h2>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setBasicsOpen(true)}
                  className="px-5 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-full hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm"
                >
                  Edit Page <PenTool className="w-3.5 h-3.5 text-slate-500" />
                </button>
                <button className="w-10 h-10 bg-white border border-slate-200 text-slate-700 rounded-full hover:bg-slate-50 shadow-sm flex items-center justify-center transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Onboarding Card */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-[#1c1917] mb-2 font-['Fjalla One'] uppercase">Welcome to Creatorhub</h3>
              <p className="text-sm font-medium text-slate-500 mb-6">
                Let's set-up your page and start growth your community. <a href="#" className="underline text-rose-500 hover:text-rose-600 transition-colors">Learn More</a>
              </p>
              <p className="text-[13px] font-bold text-rose-500 mb-8 font-['Fjalla One']">0 of 5 complete</p>

              <div className="space-y-0 relative">
                {/* Item 1 */}
                <div onClick={() => setBasicsOpen(true)} className="flex gap-5 items-start relative group cursor-pointer py-4 border-b border-slate-100/80">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-slate-100 transition-colors">
                    <Settings className="w-5 h-5 text-slate-600 stroke-[1.5]" />
                  </div>
                  <div className="pt-1 flex-1">
                    <h4 className="text-[15px] font-bold text-[#1c1917] mb-1 uppercase font-['Fjalla One']">Start with basics</h4>
                    <p className="text-[13px] font-medium text-slate-500">Add your name, photo and what you create.</p>
                  </div>
                  <div className="pt-2">
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-rose-500 transition-colors" />
                  </div>
                </div>

                {/* Item 2 */}
                <div onClick={() => router.push('/creator/post')} className="flex gap-5 items-start relative group cursor-pointer py-4 border-b border-slate-100/80">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-slate-100 transition-colors">
                    <Edit2 className="w-5 h-5 text-slate-600 stroke-[1.5]" />
                  </div>
                  <div className="pt-1 flex-1">
                    <h4 className="text-[15px] font-bold text-[#1c1917] mb-1 uppercase font-['Fjalla One']">Make your first post</h4>
                    <p className="text-[13px] font-medium text-slate-500 mb-1">Create a public welcome post or share your first exclusive post just for members.</p>
                    <span className="text-[13px] font-medium text-rose-500 hover:text-rose-600 underline">Tips for your first post</span>
                  </div>
                  <div className="pt-2">
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-rose-500 transition-colors" />
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex gap-5 items-start relative group cursor-pointer py-4 border-b border-slate-100/80">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-slate-100 transition-colors">
                    <Palette className="w-5 h-5 text-slate-600 stroke-[1.5]" />
                  </div>
                  <div className="pt-1 flex-1">
                    <h4 className="text-[15px] font-bold text-[#1c1917] mb-1 uppercase font-['Fjalla One']">Choose your layout</h4>
                    <p className="text-[13px] font-medium text-slate-500">Customise your post layout, header and page colours.</p>
                  </div>
                  <div className="pt-2">
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-rose-500 transition-colors" />
                  </div>
                </div>

                {/* Item 4 */}
                <div className="flex gap-5 items-start relative group cursor-pointer py-4 border-b border-slate-100/80">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-slate-100 transition-colors">
                    <Rocket className="w-5 h-5 text-slate-600 stroke-[1.5]" />
                  </div>
                  <div className="pt-1 flex-1">
                    <h4 className="text-[15px] font-bold text-[#1c1917] mb-1 uppercase font-['Fjalla One']">Publish your page</h4>
                    <p className="text-[13px] font-medium text-slate-500">You can come back to edit your page at any time.</p>
                  </div>
                  <div className="pt-2">
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-rose-500 transition-colors" />
                  </div>
                </div>

                {/* Item 5 */}
                <div className="flex gap-5 items-start relative group cursor-pointer py-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-slate-100 transition-colors">
                    <Megaphone className="w-5 h-5 text-slate-600 stroke-[1.5]" />
                  </div>
                  <div className="pt-1 flex-1">
                    <h4 className="text-[15px] font-bold text-[#1c1917] mb-1 uppercase font-['Fjalla One']">Promote your Creatorhub</h4>
                    <p className="text-[13px] font-medium text-slate-500">Share previews on social media with a link to your page.</p>
                  </div>
                  <div className="pt-2">
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-rose-500 transition-colors" />
                  </div>
                </div>
              </div>
            </div>

            {/* Earn Money Card */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex-1">
                <h3 className="text-[17px] font-bold text-[#1c1917] mb-3 font-['Fjalla One'] uppercase">Earnings Breakdown</h3>
                <p className="text-[14px] font-medium text-slate-600 leading-relaxed max-w-3xl">
                  Your current balance is <span className="text-xl font-bold text-emerald-600 font-['Fjalla One']">${stats?.totalEarned?.toLocaleString() || '0'}</span>.
                  This month you earned <span className="font-bold text-[#111827]">${stats?.thisMonth?.toLocaleString() || '0'}</span>.
                </p>
                <button className="mt-6 px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold rounded-full transition-colors w-fit shadow-sm">
                  Go to Analytics
                </button>
              </div>

              {creator?.socialLinks && (
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(creator.socialLinks as Record<string, string>).map(([platform, url]) => (
                    url && (
                      <div
                        key={platform}
                        className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg flex items-center gap-2"
                      >
                        <span className="text-[11px] font-bold text-slate-500 uppercase">
                          {platform}
                        </span>
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* ----- COLLECTIONS TAB ----- */}
        {activeTab === 'Collections' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-[28px] font-bold tracking-tight text-[#1c1917] font-['Fjalla One'] uppercase">Collections</h2>
              <button className="px-5 py-2 bg-rose-500 text-white text-sm font-bold rounded-full hover:bg-rose-600 transition-colors flex items-center gap-2 shadow-sm">
                <Plus className="w-4 h-4" /> New Collection
              </button>
            </div>
            <div className="bg-white border border-slate-200/60 rounded-2xl p-12 shadow-sm flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                <Package className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-[#1c1917] mb-2 font-['Fjalla One'] uppercase">No collections yet</h3>
              <p className="text-sm font-medium text-slate-500 mb-8 max-w-sm">
                Organize your posts into collections to make it easier for your fans to find what they&apos;re looking for.
              </p>
            </div>
          </div>
        )}

        {/* ----- SHOP TAB ----- */}
        {activeTab === 'Shop' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-[28px] font-bold tracking-tight text-[#1c1917] font-['Fjalla One'] uppercase">Shop</h2>
              <button className="px-5 py-2 bg-rose-500 text-white text-sm font-bold rounded-full hover:bg-rose-600 transition-colors flex items-center gap-2 shadow-sm">
                <Plus className="w-4 h-4" /> Add Product
              </button>
            </div>
            <div className="bg-white border border-slate-200/60 rounded-2xl p-12 shadow-sm flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                <ShoppingBag className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-[#1c1917] mb-2 font-['Fjalla One'] uppercase">Your shop is empty</h3>
              <p className="text-sm font-medium text-slate-500 mb-8 max-w-sm">
                Start selling digital products, merchandise, or services directly to your fans.
              </p>
            </div>
          </div>
        )}

        {/* ----- MEMBERSHIP TAB ----- */}
        {activeTab === 'Membership' && (
          <div className="bg-[#ede9df] rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row min-h-[500px]">
            <div className="p-12 md:w-1/2 flex flex-col justify-center gap-8 border-r border-[#d6d3d1]/30">
              <h2 className="text-[36px] font-bold text-[#1c1917] leading-tight font-['Fjalla One'] uppercase">Build your paid membership</h2>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/60 flex items-center justify-center shrink-0 shadow-sm border border-white">
                    <Rocket className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#1c1917] mb-1 font-['Fjalla One'] uppercase">Income you can count on</h4>
                    <p className="text-[14px] font-medium text-slate-600">Earn recurring income from your biggest fans.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/60 flex items-center justify-center shrink-0 shadow-sm border border-white">
                    <PenTool className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#1c1917] mb-1 font-['Fjalla One'] uppercase">Start with what you have</h4>
                    <p className="text-[14px] font-medium text-slate-600">Offer something you&apos;re already excited to share with your fans, plus some added perks.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/60 flex items-center justify-center shrink-0 shadow-sm border border-white">
                    <Megaphone className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#1c1917] mb-1 font-['Fjalla One'] uppercase">Grow your creative business</h4>
                    <p className="text-[14px] font-medium text-slate-600">Get insights on your members, create exclusive member-only Chats and more.</p>
                  </div>
                </div>
              </div>

              <button className="bg-[#f5f5f4] hover:bg-white text-[#1c1917] px-8 py-3.5 rounded-full text-base font-bold shadow-md transition-all w-fit mt-4 flex items-center gap-2 border border-[#d6d3d1]">
                Get Started <Rocket className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#f5f5f4] md:w-1/2 flex items-center justify-center p-12 overflow-hidden relative">
              <div className="bg-[#1c1917] w-full max-w-[300px] rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.05] transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80" alt="Membership" className="w-full h-48 object-cover" />
                <div className="p-8">
                  <h4 className="text-white text-base font-bold mb-1 font-['Fjalla One'] uppercase">Friend of the Show</h4>
                  <p className="text-white text-2xl font-bold mb-6 font-['Fjalla One']">$5 <span className="text-sm font-medium text-slate-400">/ month</span></p>
                  <button className="w-full py-3 bg-[#be185d] text-white text-sm font-bold rounded-xl shadow-lg hover:bg-[#9d174d] transition-colors mb-10">Join now</button>

                  <div className="space-y-3">
                    <div className="w-full h-1.5 bg-slate-800 rounded-full"></div>
                    <div className="w-4/5 h-1.5 bg-slate-800 rounded-full"></div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full"></div>
                    <div className="w-3/4 h-1.5 bg-slate-800 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----- RECOMMENDATIONS TAB ----- */}
        {activeTab === 'Recommendations' && (
          <div className="space-y-6 w-full">
            <div className="bg-[#ede9df] rounded-3xl p-12 flex flex-col items-start shadow-sm border border-[#d6d3d1]/30">
              <h2 className="text-[28px] font-bold text-[#1c1917] mb-4 font-['Fjalla One'] uppercase">Recommendations for your fans</h2>
              <p className="text-base font-medium text-[#44403c] mb-8 max-w-2xl leading-relaxed">
                Highlight other creators your fans might like. The creators you recommend will be notified and they'll be able to recommend you to their fans too.
              </p>
              <button onClick={() => setRecommendOpen(true)} className="bg-[#f5f5f4] hover:bg-white text-[#1c1917] px-8 py-3.5 rounded-full text-base font-bold shadow-md transition-all border border-[#d6d3d1] flex items-center gap-2">
                Add Recommendation <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-white border border-slate-200/60 rounded-3xl p-12 shadow-sm">
              <h2 className="text-[22px] font-bold text-[#1c1917] mb-4 font-['Fjalla One'] uppercase">Creators recommending you to their fans</h2>
              <p className="text-base font-medium text-slate-500 max-w-2xl leading-relaxed">
                Creators who recommend you will appear here. You can try recommending a creator first.
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Basics Form Modal Overlay */}
      {basicsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px]">
          <form onSubmit={handleProfileUpdate} className="bg-white rounded-[32px] shadow-2xl w-[440px] p-8 pt-6 relative flex flex-col">

            <div className="flex justify-center w-full relative mb-8">
              <h3 className="text-base font-bold text-[#1c1917] font-['Fjalla One'] uppercase">Start with the basics</h3>
              <button
                type="button"
                onClick={() => setBasicsOpen(false)}
                className="absolute right-0 top-0 w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex justify-center mb-8 relative">
              <div className="w-24 h-24 rounded-full bg-rose-500 text-white text-4xl font-black flex items-center justify-center shadow-inner relative z-10 border-4 border-white overflow-hidden">
                {profileForm.name?.charAt(0) || 'U'}
              </div>
              <div className="absolute left-[58%] bottom-0 w-8 h-8 bg-white rounded-full flex items-center justify-center border border-slate-200 shadow-md z-20 cursor-pointer hover:bg-slate-50 transition-colors">
                <Camera className="w-4 h-4 text-slate-500" />
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2.5 ml-1 uppercase font-['Fjalla One']">Display Name</label>
                <input 
                  type="text" 
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                  placeholder="Your Name" 
                  className="w-full bg-[#fcfcfc] border border-slate-200 rounded-xl px-4 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-rose-200 focus:border-rose-300 transition-colors shadow-sm" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2.5 ml-1 uppercase font-['Fjalla One']">Your Creator Username</label>
                <div className="relative">
                  <span className="absolute left-4 top-4 text-sm text-slate-400 font-medium select-none">@</span>
                  <input 
                    type="text" 
                    value={profileForm.username}
                    onChange={(e) => setProfileForm({...profileForm, username: e.target.value})}
                    placeholder="username" 
                    className="w-full bg-[#fcfcfc] border border-slate-200 rounded-xl pl-9 pr-4 py-4 text-sm font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-rose-200 focus:border-rose-300 transition-colors shadow-sm" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2.5 ml-1 uppercase font-['Fjalla One']">Bio / What do you create ?</label>
                <textarea 
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                  placeholder="E.g. A podcast for pizza makers" 
                  className="w-full bg-[#fcfcfc] border border-slate-200 rounded-xl px-4 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-rose-200 focus:border-rose-300 transition-colors shadow-sm mb-2 min-h-[100px] resize-none" 
                />
                <p className="text-[11px] font-medium text-slate-500 px-1">Be specific so people can discover your work.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button type="button" onClick={() => setBasicsOpen(false)} className="flex-1 py-4 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-bold rounded-2xl transition-colors border border-slate-200">
                Cancel
              </button>
              <button 
                type="submit"
                disabled={updating}
                className="flex-1 py-4 bg-[#d94828] hover:bg-[#c93d1f] text-white text-sm font-bold rounded-2xl shadow-xl transition-all border-b-4 border-[#b9381b] disabled:opacity-50"
              >
                {updating ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Recommendation Modal */}
      {recommendOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px]">
          <div className="bg-white rounded-[32px] shadow-2xl w-[480px] p-8 relative flex flex-col">
            <button onClick={() => setRecommendOpen(false)} className="absolute right-6 top-6 w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-xl font-bold text-[#1c1917] mb-2 pr-8 leading-tight font-['Fjalla One'] uppercase">Add a recommendation</h2>
            <p className="text-[13px] font-medium text-slate-500 mb-8 leading-relaxed">Search for creators to recommend them to your fans. We will notify them about your recommendation.</p>

            <div className="space-y-6 mb-10">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Search by name or URL..." className="w-full bg-[#fcfcfc] border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-rose-200 transition-colors" />
              </div>

              <div className="space-y-3 max-h-[220px] overflow-y-auto px-1">
                {[
                  { name: 'Alex Rivera', role: 'Podcaster', img: 'https://i.pravatar.cc/150?u=12' },
                  { name: 'Chef Maria', role: 'Cooking Hub', img: 'https://i.pravatar.cc/150?u=13' },
                  { name: 'Jordan Smith', role: 'Tech Enthusiast', img: 'https://i.pravatar.cc/150?u=14' }
                ].map((creator, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/20 cursor-pointer transition-all group">
                    <div className="flex items-center gap-3">
                      <img src={creator.img} className="w-10 h-10 rounded-full border border-slate-100" alt={creator.name} />
                      <div>
                        <p className="text-[13px] font-bold text-[#111827]">{creator.name}</p>
                        <p className="text-[11px] font-medium text-slate-400">{creator.role}</p>
                      </div>
                    </div>
                    <Plus className="w-4 h-4 text-slate-300 group-hover:text-rose-500" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setRecommendOpen(false)} className="flex-1 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-bold rounded-2xl transition-colors border border-slate-200">
                Cancel
              </button>
              <button className="flex-1 py-3.5 bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold rounded-2xl shadow-lg transition-colors border-b-4 border-rose-700">
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
