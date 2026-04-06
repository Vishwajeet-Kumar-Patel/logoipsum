import React from 'react';

type CheckoutSummaryProps = {
  creatorName: string;
  price: number;
  contentName: string;
  tax: number;
};

export default function CheckoutSummary({ creatorName, price, contentName, tax }: CheckoutSummaryProps) {
  const total = price + tax;
  const formatINR = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

  return (
    <div className="flex flex-col gap-[16px] items-start w-[480px]">
      
      {/* Title & Price Header */}
      <div className="flex flex-col gap-[12px] items-start w-[324px]">
        <h2 className="font-['Figtree',sans-serif] font-semibold leading-[29.2px] text-[#404040] text-[19px] tracking-[0.38px] w-full">
          Subscribe to membership of {creatorName}
        </h2>
        <div className="flex items-end">
          <span className="font-['Fjalla_One',sans-serif] font-normal leading-[48.6px] text-[#121212] text-[33px] tracking-[0.66px]">
            {formatINR(price)}
          </span>
          <span className="font-['Bricolage_Grotesque',sans-serif] font-light text-[#8a8a8a] text-[32px] leading-[48.6px]">
            /
          </span>
          <span className="font-['Figtree',sans-serif] font-medium leading-[25.8px] text-[#8a8a8a] text-[16px] tracking-[0.32px] pb-[8px]">
            month
          </span>
        </div>
      </div>

      {/* Line Items */}
      <div className="flex flex-col gap-[16px] w-[480px]">
        <div className="border-b-[0.7px] border-[#ccc] flex flex-col gap-[8px] pb-[20px] w-full">
          
          <div className="flex flex-col gap-[8px] w-full">
            <div className="flex items-center justify-between w-full">
              <p className="font-['Figtree',sans-serif] font-medium leading-[25.8px] text-[#3a3a3a] text-[16px] tracking-[0.32px]">
                {contentName}
              </p>
              <p className="font-['Figtree',sans-serif] font-bold leading-[25.8px] text-[#3a3a3a] text-[16px] tracking-[0.32px]">
                {formatINR(price)}
              </p>
            </div>
            
            <div className="flex items-center justify-between w-full">
              <p className="font-['Figtree',sans-serif] font-medium leading-[18.3px] text-[#9a9a9a] text-[13px] tracking-[0.26px]">
                Billed monthly
              </p>
              <p className="font-['Figtree',sans-serif] font-medium leading-[18.3px] text-[#9a9a9a] text-[13px] tracking-[0.26px]">
                {formatINR(price)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between w-full mt-[8px]">
            <p className="font-['Figtree',sans-serif] font-medium leading-[25.8px] text-[#3a3a3a] text-[16px] tracking-[0.32px]">
              Tax
            </p>
            <p className="font-['Figtree',sans-serif] font-bold leading-[25.8px] text-[#272727] text-[16px] tracking-[0.32px]">
              {formatINR(tax)}
            </p>
          </div>

        </div>

        {/* Total */}
        <div className="flex items-center justify-between w-full">
          <p className="font-['Figtree',sans-serif] font-bold leading-[29.2px] text-[#1a1a1a] text-[19px] tracking-[0.38px]">
            Total
          </p>
          <p className="font-['Figtree',sans-serif] font-bold leading-[29.2px] text-[#1a1a1a] text-[19px] tracking-[0.38px]">
            {formatINR(total)}
          </p>
        </div>

      </div>

    </div>
  );
}
