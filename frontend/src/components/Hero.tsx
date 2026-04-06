"use client";
import Link from "next/link";

const statItems = [
  { value: "500+", label: "Active Creators" },
  { value: "120K+", label: "Subscriber" },
  { value: "1M+", label: "Content Views" },
];

function ArrowUpCircle() {
  return (
    <div className="flex size-[56px] rotate-45 items-center justify-center overflow-hidden rounded-full border border-[#f6f4f1]/50 shadow-[0px_0px_250px_0px_#dc3f1a,0px_0px_180px_0px_#dc3f1a,0px_0px_105px_0px_#dc3f1a,0px_0px_52px_0px_#dc3f1a] lg:size-[66px] xl:size-[72px]">
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="9" stroke="#F6F4F1" strokeWidth="2" />
        <path
          d="M10 14L14 10M14 10H10M14 10V14"
          stroke="#F6F4F1"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      className="relative h-[760px] w-full overflow-hidden xl:h-[820px]"
      style={{
        background:
          "linear-gradient(180deg, rgba(58,58,58,0.2) 13.9%, rgba(228,222,210,0.2) 48.5%, rgba(246,244,241,0.2) 86.6%), linear-gradient(90deg, #e14f40 0%, #e14f40 100%)",
      }}
    >
      <div className="relative mx-auto h-full w-full max-w-[1440px]">
        <div className="pointer-events-none absolute left-1/2 top-[74px] h-[520px] w-[780px] -translate-x-1/2 mix-blend-hard-light lg:h-[620px] lg:w-[980px] xl:top-[77px] xl:h-[743px] xl:w-[1200px]">
          <img src="/image-001.png" alt="" className="h-full w-full object-cover" />
        </div>

        <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex w-[calc(100%-200px)] max-w-[920px] -translate-x-1/2 -translate-y-1/2 flex-col items-center py-[36px] text-center text-[#f6f4f1] backdrop-blur-[12px]">
          <p
            className="text-[96px] leading-[0.9] tracking-[2.4px] mix-blend-overlay lg:text-[148px] lg:tracking-[3.2px] xl:text-[220px] xl:tracking-[4.4px]"
            style={{ fontFamily: "'Fjalla One', sans-serif" }}
          >
            CREATEOR
          </p>
          <p
            className="text-[96px] leading-[0.9] tracking-[2.4px] lg:text-[148px] lg:tracking-[3.2px] xl:text-[220px] xl:tracking-[4.4px]"
            style={{ fontFamily: "'Fjalla One', sans-serif" }}
          >
            MONETIZE
          </p>
        </div>

        <div className="absolute left-6 top-[76px] z-30 flex w-[172px] flex-col gap-[8px] lg:left-10 lg:top-[92px] xl:left-[64px] xl:top-[104px] xl:w-[178px]">
          <div className="flex items-center border-b border-[#e4ded2] pb-[8px] pr-[8px]">
            <img
              src="/assets/images/Frame 2147243329.png"
              alt="Creator 1"
              className="-mr-[8px] size-[44px] rounded-full border border-[#f6f4f1] object-cover"
            />
            <img
              src="/assets/images/Frame 2147243330.png"
              alt="Creator 2"
              className="-mr-[8px] size-[44px] rounded-full border border-[#f6f4f1] object-cover"
            />
            <img
              src="/assets/images/Frame 2147243331.png"
              alt="Creator 3"
              className="size-[44px] rounded-full border border-[#f6f4f1] object-cover"
            />
          </div>
          <p
            className="text-center text-[16px] leading-[25.8px] tracking-[0.32px] text-white"
            style={{ fontFamily: "'Fjalla One', sans-serif" }}
          >
            FOR THE NEXT GEN CREATORS
          </p>
        </div>

        <div className="absolute left-6 top-[286px] z-30 flex w-[150px] flex-col gap-[12px] text-white lg:left-10 lg:top-[336px] lg:w-[165px] xl:left-[64px] xl:top-[361px] xl:w-[169px] xl:gap-[16px]">
          {statItems.map((item, index) => (
            <div
              key={item.label}
              className={`pb-[8px] ${index < statItems.length - 1 ? "border-b border-[#faf8f5]" : ""}`}
            >
              <p
                className="text-[22px] leading-[1.2] tracking-[0.4px] lg:text-[26px] xl:text-[28px] xl:leading-[42.1px] xl:tracking-[0.56px]"
                style={{ fontFamily: "'Fjalla One', sans-serif" }}
              >
                {item.value}
              </p>
              <p className="text-[15px] font-semibold leading-[1.2] tracking-[0.26px] lg:text-[17px] xl:text-[19px] xl:leading-[29.2px] xl:tracking-[0.38px]">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div className="absolute bottom-[102px] right-6 z-30 w-[198px] text-[13px] font-bold leading-[20px] tracking-[0.26px] text-white lg:right-10 lg:bottom-[90px] lg:w-[214px] lg:text-[16px] lg:leading-[25.8px] lg:tracking-[0.32px] xl:bottom-[112px] xl:left-[1162px] xl:right-auto xl:top-[620px]">
          <p>
            Join a new wave of creators building income, influence, and impact.
            Unlock exclusive content, connect with your audience, and turn your
            passion into profit.
          </p>
        </div>

        <Link
          href="/marketplace"
          className="absolute left-1/2 top-[650px] z-30 inline-flex -translate-x-1/2 items-center gap-[8px] rounded-[42px] border border-[#ff9465] px-[16px] py-[12px] text-[16px] text-[#f6f4f1] shadow-[8px_8px_20px_rgba(69,9,0,0.35)] lg:top-[684px] xl:top-[694px]"
          style={{
            fontFamily: "var(--font-lexend), 'Lexend', sans-serif",
            backgroundImage:
              "linear-gradient(147deg, rgb(225,69,23) 57.5%, rgb(214,54,31) 100%)",
          }}
        >
          <span>Explore Creators</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.5 8.5L8.5 3.5M8.5 3.5H5M8.5 3.5V7"
              stroke="#F6F4F1"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        <div className="absolute right-8 top-[142px] z-30 lg:right-12 lg:top-[150px] xl:left-[1182px] xl:right-auto xl:top-[155px]">
          <ArrowUpCircle />
        </div>
      </div>
    </section>
  );
}
