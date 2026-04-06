'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import api from '@/src/lib/api';
import toast from 'react-hot-toast';
import { X, CheckCircle2 } from 'lucide-react';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  creatorName: string;
  creatorId: string;
  price: number;
  onSuccess?: () => void;
}

export default function MembershipModal({ isOpen, onClose, creatorName, creatorId, price, onSuccess }: MembershipModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  if (!isOpen) return null;

  const handlePurchase = async () => {
    setIsProcessing(true);
    try {
      await api.post(`/user/subscribe/${creatorId}`);
      setIsSuccess(true);
      toast.success(`Welcome to ${creatorName}'s membership!`);
      if (onSuccess) onSuccess();
      
      // Auto-close after 2 seconds on success
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 2000);
    } catch (err) {
      toast.error('Purchase failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4 transition-all duration-300">
      <div className="bg-[#fcfaf7] rounded-[32px] w-full max-w-[480px] overflow-hidden shadow-2xl border border-[#e4ded2] relative animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        {!isProcessing && !isSuccess && (
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-black/5 rounded-full transition-colors text-[#5a5a5a]"
          >
            <X size={20} />
          </button>
        )}

        {isSuccess ? (
          <div className="p-12 flex flex-col items-center text-center">
            <div className="bg-green-100 p-4 rounded-full mb-6">
              <CheckCircle2 size={48} className="text-green-600" />
            </div>
            <h2 className="font-['Figtree',sans-serif] text-2xl font-bold text-[#1a1a1a] mb-2">Membership Activated!</h2>
            <p className="font-['Figtree',sans-serif] text-[#5a5a5a]">You now have full access to {creatorName}'s exclusive content.</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {/* Header Image/Background */}
            <div className="h-24 bg-gradient-to-r from-[#f95c4b] to-[#ff7a6c] flex items-center justify-center">
              <Image src="/assets/creator/diamond.svg" alt="Membership" width={40} height={40} className="brightness-0 invert opacity-90" />
            </div>

            <div className="p-8">
              <h2 className="font-['Figtree',sans-serif] text-2xl font-bold text-[#1a1a1a] mb-2">Join {creatorName}'s Inner Circle</h2>
              <p className="font-['Figtree',sans-serif] text-[#5a5a5a] mb-8">Get exclusive access to premium posts, insights, and direct interactions with {creatorName}.</p>

              <div className="bg-white border border-[#e4ded2] rounded-2xl p-6 mb-8 flex justify-between items-center shadow-sm">
                <div>
                  <p className="text-[12px] font-bold text-[#f95c4b] uppercase tracking-wider mb-1">Monthly Plan</p>
                  <p className="text-[15px] font-semibold text-[#1a1a1a]">Recurring Subscription</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#1a1a1a]">{formattedPrice}</p>
                  <p className="text-[13px] text-[#5a5a5a]">per month</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={handlePurchase}
                  disabled={isProcessing}
                  className="w-full bg-[#f95c4b] text-white py-4 rounded-full font-bold text-[16px] hover:bg-[#eb5242] transition-all shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : 'Confirm Purchase'}
                </button>
                <button 
                  onClick={onClose}
                  disabled={isProcessing}
                  className="w-full bg-transparent text-[#5a5a5a] py-3 rounded-full font-semibold text-[14px] hover:text-[#1a1a1a] transition-colors"
                >
                  Maybe Later
                </button>
              </div>

              <p className="text-center text-[11px] text-[#aaa] mt-6 px-4">
                By subscribing, you agree to our Terms of Service and Privacy Policy. You can cancel your membership at any time.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
