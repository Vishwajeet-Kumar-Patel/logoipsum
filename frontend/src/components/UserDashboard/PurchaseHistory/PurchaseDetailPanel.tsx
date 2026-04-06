"use client";

import React from 'react';
import { PurchaseItemData } from './PurchaseItem';

interface PurchaseDetailPanelProps {
  item: PurchaseItemData;
}

export default function PurchaseDetailPanel({ item }: PurchaseDetailPanelProps) {
  return (
    <div className="w-[320px] shrink-0 flex flex-col gap-[16px] sticky top-[42px]">
      {/* Header: Paid to */}
      <div className="flex flex-col gap-[2px]">
        <p className="font-[family-name:var(--font-figtree)] font-semibold text-[16px] leading-[25.8px] tracking-[0.32px] text-[var(--heading,#1a1a1a)]">
          Paid to - creator name
        </p>
        <p className="font-[family-name:var(--font-figtree)] font-medium text-[13px] leading-[18.3px] tracking-[0.26px] text-[var(--place-holder,#9a9a9a)]">
          Date : {item.date}
        </p>
      </div>

      {/* Purchased Event Card */}
      <div className="bg-[#faf8f5] border border-[var(--alt-sec,#e4ded2)] rounded-[8px] p-[16px] flex flex-col gap-[16px]">
        {/* Event Row */}
        <div className="flex items-start gap-[12px]">
          <div className="size-[48px] rounded-[8px] overflow-hidden shrink-0 bg-[#e0e0e0]">
            <img
              src={item.thumbnail}
              alt="Event"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-[2px] flex-1 min-w-0">
            <p className="font-[family-name:var(--font-figtree)] font-semibold text-[14px] leading-[20px] text-[var(--heading,#1a1a1a)]">
              Purchased event/item name
            </p>
            <p className="font-[family-name:var(--font-figtree)] font-medium text-[12px] leading-[16px] text-[#757575]">
              A step-by-step guided fitness program to help ......
            </p>
          </div>
          <p className="font-[family-name:var(--font-figtree)] font-bold text-[16px] text-[var(--heading,#1a1a1a)] whitespace-nowrap shrink-0">
            ₹240.00
          </p>
        </div>

        {/* Metadata */}
        <div className="flex flex-col gap-[4px]">
          <p className="font-[family-name:var(--font-figtree)] font-medium text-[12px] leading-[18px] text-[#757575]">
            Duration : 1Hour 30Min
          </p>
          <p className="font-[family-name:var(--font-figtree)] font-medium text-[12px] leading-[18px] text-[#757575]">
            Language : English, hindi
          </p>
          <p className="font-[family-name:var(--font-figtree)] font-medium text-[12px] leading-[18px] text-[#757575]">
            Star date : 4 June, 2026
          </p>
          <p className="font-[family-name:var(--font-figtree)] font-medium text-[12px] leading-[18px] text-[#757575]">
            Content type : Video/livestream/pdf files
          </p>
        </div>
      </div>

      {/* Applied Coupon & Payment Method */}
      <div className="bg-[#faf8f5] border border-[var(--alt-sec,#e4ded2)] rounded-[8px] p-[16px] flex flex-col gap-[12px]">
        <div className="flex flex-col gap-[2px]">
          <p className="font-[family-name:var(--font-figtree)] font-semibold text-[14px] text-[var(--heading,#1a1a1a)]">
            Applied Coupon
          </p>
          <p className="font-[family-name:var(--font-figtree)] font-medium text-[13px] text-[#757575]">
            HDBHSB21534
          </p>
        </div>
        <div className="flex flex-col gap-[2px]">
          <p className="font-[family-name:var(--font-figtree)] font-semibold text-[14px] text-[var(--heading,#1a1a1a)]">
            Payment Method Used
          </p>
          <p className="font-[family-name:var(--font-figtree)] font-medium text-[13px] text-[#757575]">
            UPI
          </p>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="flex flex-col gap-[8px]">
        <p className="font-[family-name:var(--font-figtree)] font-semibold text-[16px] leading-[25.8px] tracking-[0.32px] text-[var(--heading,#1a1a1a)]">
          Invoice Details
        </p>
        <div className="flex flex-col gap-[6px]">
          {[
            { label: "Total MRP", value: "₹20" },
            { label: "Discount on MRP", value: "₹20" },
            { label: "Coupon discount", value: "₹20" },
            { label: "Platform fee", value: "₹20" },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <p className="font-[family-name:var(--font-figtree)] font-medium text-[14px] text-[#757575]">
                {row.label}
              </p>
              <p className="font-[family-name:var(--font-figtree)] font-medium text-[14px] text-[var(--heading,#1a1a1a)]">
                {row.value}
              </p>
            </div>
          ))}
          {/* Total */}
          <div className="flex items-center justify-between border-t border-[#e4ded2] pt-[8px] mt-[4px]">
            <p className="font-[family-name:var(--font-figtree)] font-bold text-[14px] text-[var(--heading,#1a1a1a)]">
              Total payable amount
            </p>
            <p className="font-[family-name:var(--font-figtree)] font-bold text-[16px] text-[var(--heading,#1a1a1a)]">
              ₹1200
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-[8px] mt-[4px]">
        <button className="w-full h-[44px] bg-[#9a9a9a] rounded-[32px] flex items-center justify-center cursor-default">
          <span className="font-[family-name:var(--font-figtree)] font-bold text-[16px] text-white">
            Already Paid
          </span>
        </button>
        <button className="w-full h-[44px] bg-transparent border border-[var(--cta,#f95c4b)] rounded-[32px] flex items-center justify-center hover:bg-[#fef2f0] transition-colors">
          <span className="font-[family-name:var(--font-figtree)] font-bold text-[16px] text-[var(--cta,#f95c4b)]">
            Download Receipt
          </span>
        </button>
      </div>
    </div>
  );
}
