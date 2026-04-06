import React from 'react';
import Link from 'next/link';

interface BalanceCardProps {
  balance: number;
}

export default function BalanceCard({ balance }: BalanceCardProps) {
  // Format balance with commas
  const formattedBalance = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(balance);

  return (
    <div 
      className="flex flex-col gap-[16px] items-center justify-center w-full max-w-[1116px] rounded-[16px] py-[40px] px-[16px] shadow-sm mb-[42px]"
      style={{ backgroundImage: "linear-gradient(158.802deg, #E14517 57.525%, #D6361F 100%)" }}
    >
      <div className="flex flex-col items-center gap-[4px]">
        <p className="font-[family-name:var(--font-figtree)] font-medium text-[16px] leading-[25.8px] tracking-[0.32px] text-[var(--bg,#f6f4f1)]">
          Available balance
        </p>
        <p className="font-[family-name:var(--font-fjalla)] font-normal text-[40px] leading-[42.1px] tracking-[0.56px] text-[var(--bg-2,#faf8f5)]">
          {formattedBalance}
        </p>
      </div>

      <div className="flex gap-[8px] items-start justify-center mt-[8px]">
        <Link href="/user/wallet/add-credits">
          <button className="bg-[var(--bg-2,#faf8f5)] hover:bg-[#f0f0f0] transition-colors border border-[#e2e2e2] rounded-[24px] px-[16px] py-[8px] flex items-center justify-center">
            <span className="font-[family-name:var(--font-figtree)] font-medium text-[13px] leading-[18.3px] tracking-[0.26px] text-[var(--heading,#1a1a1a)]">
              Add credits
            </span>
          </button>
        </Link>
        <Link href="/user/wallet/redeem">
          <button className="bg-[var(--bg-2,#faf8f5)] hover:bg-[#f0f0f0] transition-colors border border-[#e2e2e2] rounded-[24px] px-[16px] py-[8px] flex items-center justify-center">
            <span className="font-[family-name:var(--font-figtree)] font-medium text-[13px] leading-[18.3px] tracking-[0.26px] text-[var(--heading,#1a1a1a)]">
              Redeem code
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}
