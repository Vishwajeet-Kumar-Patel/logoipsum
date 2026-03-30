import Image from 'next/image';
import Link from 'next/link';

export default function ProfileBanner({ bannerUrl }: { bannerUrl: string }) {
  return (
    <div className="relative w-full h-[240px] overflow-hidden shrink-0">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <Image 
          src={bannerUrl} 
          alt="Creator Banner"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute bg-[rgba(0,0,0,0.15)] inset-0" />
      </div>
      
      <Link href="/user" className="absolute left-[42px] top-[42px] bg-[#faf8f5] border border-[#d8d1c7] flex gap-[4px] items-center justify-center px-[8px] py-[4px] rounded-[36px] hover:bg-white transition-colors">
        <Image src="/assets/creator/caret-left.svg" alt="Back" width={20} height={20} />
        <span className="font-['Figtree',sans-serif] font-medium leading-[25.8px] text-[#1a1a1a] text-[16px] tracking-[0.32px]">
          Back
        </span>
      </Link>
    </div>
  );
}
