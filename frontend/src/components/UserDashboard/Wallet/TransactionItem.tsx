import React from 'react';
import Image from 'next/image';

export interface Transaction {
  id: string;
  title: string;
  date: string;
  time: string;
  amount: number;
  image: string;
  type: 'purchase' | 'credit' | 'refund';
}

interface TransactionItemProps {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(transaction.amount);

  return (
    <div className="bg-[#fcfaf7] border-[0.5px] border-[var(--alt-sec,#e4ded2)] flex items-center p-[12px] rounded-[8px] w-full mb-[4px] hover:border-[#d2d8e3] transition-colors">
      <div className="flex flex-1 items-center gap-[12px]">
        <div className="relative rounded-[8px] size-[60px] overflow-hidden shrink-0">
          <Image src={transaction.image} alt="Transaction thumbnail" fill className="object-cover" />
        </div>
        
        <div className="flex flex-col gap-[4px] justify-center">
          <p className="font-[family-name:var(--font-figtree)] font-medium text-[16px] leading-[25.8px] tracking-[0.32px] text-[var(--heading,#1a1a1a)]">
            {transaction.title}
          </p>
          <div className="flex items-center gap-[8px] text-[var(--body,#5a5a5a)] font-[family-name:var(--font-figtree)] font-medium text-[13px] leading-[18.3px] tracking-[0.26px]">
            <span>{transaction.date}</span>
            <span className="text-[var(--place-holder,#9a9a9a)] text-[16px] leading-[25.8px]">|</span>
            <span>{transaction.time}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center shrink-0">
        <p className="font-[family-name:var(--font-figtree)] font-semibold text-[19px] leading-[29.2px] tracking-[0.38px] text-[var(--heading,#1a1a1a)]">
          {formattedAmount}
        </p>
      </div>
    </div>
  );
}
