"use client";

import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import PurchaseGroup from './PurchaseGroup';
import PurchaseDetailPanel from './PurchaseDetailPanel';
import { PurchaseItemData } from './PurchaseItem';

// Static placeholder data matching Figma structure
const THUMBNAIL = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400&auto=format&fit=crop";

const TODAY_ITEMS: PurchaseItemData[] = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  title: "Enrolled for this new even by creator name",
  price: "₹1500",
  date: "23 Jan, 2025",
  time: "3 : 25 pm",
  thumbnail: THUMBNAIL,
}));

const YESTERDAY_ITEMS: PurchaseItemData[] = Array.from({ length: 5 }, (_, i) => ({
  id: i + 100,
  title: "Enrolled for this new even by creator name",
  price: "₹1500",
  date: "23 Jan, 2025",
  time: "3 : 25 pm",
  thumbnail: THUMBNAIL,
}));

export default function PurchaseHistoryContent() {
  const [selectedItem, setSelectedItem] = useState<PurchaseItemData | null>(null);

  const handleSelect = (item: PurchaseItemData) => {
    setSelectedItem((prev) => (prev?.id === item.id ? null : item));
  };

  return (
    <div className="flex flex-col items-start w-full px-[42px] py-[42px]">
      {/* Header Row */}
      <div className="flex items-start justify-between w-full mb-[32px]">
        {/* Title + Subtitle */}
        <div className="flex flex-col gap-[4px]">
          <h1 className="font-[family-name:var(--font-fjalla)] font-normal text-[40px] leading-[57.6px] tracking-[0.8px] text-[var(--heading,#1a1a1a)]">
            Purchase History
          </h1>
          <p className="font-[family-name:var(--font-figtree)] font-semibold text-[19px] leading-[29.2px] tracking-[0.38px] text-[#757575]">
            View all your purchases, track transactions, and access invoices anytime.
          </p>
        </div>

        {/* Filter Dropdown */}
        <button className="flex items-center gap-[8px] bg-[#faf8f5] border border-[var(--alt-sec,#e4ded2)] rounded-[32px] px-[16px] py-[8px] shadow-sm hover:bg-[#f6f4f1] transition-colors shrink-0">
          <Calendar className="size-[16px] text-[var(--heading,#1a1a1a)]" />
          <span className="font-[family-name:var(--font-figtree)] font-medium text-[14px] text-[var(--heading,#1a1a1a)] whitespace-nowrap">
            This week
          </span>
          <ChevronDown className="size-[14px] text-[var(--heading,#1a1a1a)]" />
        </button>
      </div>

      {/* Content: List + Detail Panel */}
      <div className="flex gap-[24px] w-full">
        {/* Purchase Groups (scrollable list) */}
        <div className={`flex flex-col gap-[32px] ${selectedItem ? 'flex-1 min-w-0' : 'w-full max-w-[1116px]'}`}>
          <PurchaseGroup
            label="Today"
            items={TODAY_ITEMS}
            selectedId={selectedItem?.id}
            onSelect={handleSelect}
          />
          <PurchaseGroup
            label="Yesterday"
            items={YESTERDAY_ITEMS}
            selectedId={selectedItem?.id}
            onSelect={handleSelect}
          />
        </div>

        {/* Detail Panel (conditionally rendered) */}
        {selectedItem && (
          <PurchaseDetailPanel item={selectedItem} />
        )}
      </div>
    </div>
  );
}
