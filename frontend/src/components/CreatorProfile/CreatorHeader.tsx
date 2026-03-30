"use client";

import React from 'react';
import { ThumbsUp, ThumbsDown, Share } from 'lucide-react';

export default function CreatorHeader() {
  return (
    <div className="flex items-center justify-between w-full max-w-[1116px] mt-[20px]">
      {/* Creator Info */}
      <div className="flex items-center gap-[12px]">
        <div className="size-[40px] rounded-[32px] overflow-hidden bg-[var(--place-holder,#9a9a9a)] relative shrink-0 shadow-sm">
          {/* Avatar Placeholder */}
          <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&h=256&auto=format&fit=crop" 
            alt="Andrea Nelson" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col items-start justify-center whitespace-nowrap">
          <p className="font-[family-name:var(--font-figtree)] font-semibold text-[19px] leading-[29.2px] tracking-[0.38px] text-[var(--heading,#1a1a1a)]">
            Andrea Nelson
          </p>
          <p className="font-[family-name:var(--font-figtree)] font-medium text-[13px] leading-[18.3px] tracking-[0.26px] text-[var(--body,#5a5a5a)]">
            Users : 128k
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-[8px]">
        
        {/* Like/Dislike Pill */}
        <div className="bg-[var(--bg-2,#faf8f5)] shadow-sm border border-[var(--input-field-border,#d8d1c7)] h-[44px] rounded-[36px] flex items-center p-[12px] gap-[12px] shrink-0">
          <button className="flex items-center justify-center gap-[6px] hover:opacity-70 transition-opacity">
            <ThumbsUp className="size-[20px] text-[var(--heading,#1a1a1a)]" />
            <span className="font-[family-name:var(--font-figtree)] font-bold text-[16px] leading-[25.8px] tracking-[0.32px] text-[var(--heading,#1a1a1a)]">
              1.2k
            </span>
          </button>
          {/* Divider seamlessly represented by proximity */}
          <button className="flex items-center justify-center gap-[6px] hover:opacity-70 transition-opacity border-l border-[var(--input-field-border,#d8d1c7)] pl-[12px]">
            <ThumbsDown className="size-[20px] text-[var(--heading,#1a1a1a)]" />
            <span className="font-[family-name:var(--font-figtree)] font-bold text-[16px] leading-[25.8px] tracking-[0.32px] text-[var(--heading,#1a1a1a)]">
              1.2k
            </span>
          </button>
        </div>

        {/* Share Button */}
        <button className="bg-[var(--bg-2,#faf8f5)] hover:bg-[#f0f0f0] shadow-sm transition-colors border border-[var(--input-field-border,#d8d1c7)] h-[44px] rounded-[36px] flex items-center justify-center gap-[6px] px-[16px] py-[12px] shrink-0">
          <Share className="size-[20px] text-[var(--heading,#1a1a1a)]" />
          <span className="font-[family-name:var(--font-figtree)] font-bold text-[16px] leading-[25.8px] tracking-[0.32px] text-[var(--heading,#1a1a1a)]">
            Share
          </span>
        </button>

      </div>
    </div>
  );
}
