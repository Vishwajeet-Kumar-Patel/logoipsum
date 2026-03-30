"use client"

import React, { useState, useEffect } from 'react';
import { Search, Info, Send, Smile, Paperclip, MoreVertical, List, Bold, Italic, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import api from '@/src/lib/api';
import toast from 'react-hot-toast';

export default function MessagesPage() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await api.get('/creator/messages');
      // Grouping by conversationId
      const grouped = res.data.reduce((acc: any, msg: any) => {
        if (!acc[msg.conversationId]) acc[msg.conversationId] = [];
        acc[msg.conversationId].push(msg);
        return acc;
      }, {});
      
      const chatList = Object.keys(grouped).map((id) => ({
        id,
        messages: grouped[id],
        lastMessage: grouped[id][0],
        participant: grouped[id][0].sender._id === id ? grouped[id][0].recipient : grouped[id][0].sender
      }));

      setConversations(chatList);
      if (chatList.length > 0 && !selectedChatId) {
        setSelectedChatId(chatList[0].id);
        setMessages(chatList[0].messages);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChatId) return;
    
    const currentChat = conversations.find((c: any) => c.id === selectedChatId);
    if (!currentChat) return;

    try {
      const recipientId = currentChat.participant._id;
      const res = await api.post('/creator/messages', {
        recipientId,
        text: newMessage
      });
      
      setMessages([res.data, ...messages]);
      setNewMessage('');
      fetchMessages(); // Refresh chat list
    } catch (err) {
      toast.error("Failed to send");
    }
  };

  const activeConversation = conversations.find((c: any) => c.id === selectedChatId);

  return (
    <div className="flex h-[calc(100vh-72px)] bg-[#f9f9f9] font-sans">
      
      {/* Sidebar - Conversation List */}
      <div className="w-[380px] border-r border-slate-200/60 bg-white flex flex-col pt-8 h-full shrink-0 shadow-sm z-10">
         <div className="px-8 mb-8">
            <h1 className="text-3xl font-bold text-[#1c1917] mb-8">Your Messages</h1>
            <div className="relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <input type="text" placeholder="Search conversation" className="w-full bg-[#f8f9fa] border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-rose-200 focus:border-rose-300 transition-colors shadow-sm" />
            </div>
         </div>

         <div className="flex-1 overflow-y-auto w-full">
            {conversations.map((chat: any) => (
              <div 
                key={chat.id} 
                onClick={() => { setSelectedChatId(chat.id); setMessages(chat.messages); }}
                className={`flex items-center gap-4 px-8 py-4 cursor-pointer transition-all border-b border-slate-100/60 ${selectedChatId === chat.id ? 'bg-rose-50/20 border-l-4 border-l-rose-500' : 'hover:bg-slate-50'}`}
              >
                 <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full border border-slate-200 shadow-sm bg-rose-100 flex items-center justify-center font-bold text-rose-600">
                        {chat.participant?.name?.charAt(0) || '?'}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                 </div>
                 <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                       <h3 className="text-[15px] font-bold text-[#1c1917] truncate">{chat.participant?.name || 'User'}</h3>
                       <span className="text-[11px] font-bold text-slate-400">{new Date(chat.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="text-[13px] font-medium text-slate-500 truncate">{chat.lastMessage.text}</p>
                 </div>
              </div>
            ))}
            {conversations.length === 0 && <div className="p-10 text-center text-slate-400 font-bold">No conversations yet.</div>}
         </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full bg-[#fbfbfb] relative">
         
         {/* Chat Header */}
         {activeConversation ? (
           <>
            <header className="h-[72px] bg-white border-b border-slate-200/60 flex items-center justify-between px-8 shrink-0 shadow-sm z-0">
                <div className="flex items-center gap-4">
                  <div className="relative">
                      <div className="w-10 h-10 rounded-full border border-slate-200 shadow-sm bg-rose-100 flex items-center justify-center font-bold text-rose-600">
                        {activeConversation.participant?.name?.charAt(0)}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                      <h2 className="text-[15px] font-extrabold text-[#111827] leading-tight">{activeConversation.participant?.name}</h2>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <span className="text-[11px] font-bold text-slate-400 capitalize">Active</span>
                      </div>
                  </div>
                </div>
                <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors shadow-sm">
                  <Info className="w-5 h-5" />
                </button>
            </header>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-12 space-y-10 flex flex-col-reverse">
                {messages.map((msg: any) => (
                  <div key={msg._id} className={`flex items-start gap-4 max-w-2xl ${msg.sender._id !== activeConversation.participant?._id ? 'flex-row-reverse ml-auto' : ''}`}>
                    <div className={`w-8 h-8 rounded-full border border-white translate-y-2 shadow-sm flex items-center justify-center text-[10px] font-black ${msg.sender._id !== activeConversation.participant?._id ? 'bg-rose-200 text-rose-700' : 'bg-slate-100 text-slate-600'}`}>
                      {msg.sender.name.charAt(0)}
                    </div>
                    <div className={`px-6 py-4 rounded-3xl shadow-sm ${msg.sender._id !== activeConversation.participant?._id ? 'bg-rose-100 text-[#111827] rounded-tr-none' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'}`}>
                        <p className="text-[15px] font-medium leading-relaxed">
                          {msg.text}
                        </p>
                    </div>
                  </div>
                ))}
            </div>

            {/* Chat Input Area */}
            <div className="p-10 shrink-0">
                <div className="bg-white border border-slate-200 rounded-[28px] overflow-hidden shadow-md">
                  <div className="p-6">
                    <textarea 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Write your message here" 
                      className="w-full text-base font-medium text-[#111827] focus:outline-none bg-transparent resize-none min-h-[40px]" 
                    />
                  </div>
                  <div className="px-8 pb-6 flex items-center justify-between border-t border-slate-50/50 pt-4">
                      <div className="flex items-center gap-6 text-slate-400">
                        <List className="w-5 h-5 cursor-pointer hover:text-slate-700" />
                        <Italic className="w-5 h-5 cursor-pointer hover:text-slate-700" />
                        <Bold className="w-5 h-5 cursor-pointer hover:text-slate-700" />
                        <Paperclip className="w-5 h-5 cursor-pointer hover:text-slate-700" />
                      </div>
                      <button 
                        onClick={handleSendMessage}
                        className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-2.5 rounded-full text-sm font-bold shadow-md active:scale-95 transition-all"
                      >
                        Send
                      </button>
                  </div>
                </div>
            </div>
           </>
         ) : (
           <div className="flex-1 flex items-center justify-center text-slate-400 font-bold">Select a chat to start messaging</div>
         )}

      </div>

    </div>
  );
}
