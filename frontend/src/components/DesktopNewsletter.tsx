"use client";

import type { FormEvent } from "react";

export default function DesktopNewsletter() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section className="w-full bg-[#f6f4f1] px-5 pb-20 md:px-16 md:pb-28">
      <div className="relative mx-auto h-[462px] max-w-[1312px] overflow-hidden rounded-[32px] bg-[#121212] p-6 md:p-12">
        <img
          src="/assets/images/unsplash_HD8KlyWRYYM.png"
          alt="Creator"
          className="absolute bottom-0 left-0 h-full w-[308px] object-cover"
        />

        <img
          src="/assets/mobile-landing/newsletter/newsletter-glow-polygon.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -left-[140px] -top-[36px] w-[560px] rotate-[168deg] mix-blend-lighten opacity-80"
        />

        <div className="relative z-10 ml-auto flex h-full w-full max-w-[767px] flex-col justify-center gap-4">
          <h2
            className="text-[32px] leading-[1.3] tracking-[0.8px] text-[#f2f2f2] md:text-[40px] md:leading-[57.6px]"
            style={{ fontFamily: "'Fjalla One', sans-serif" }}
          >
            Join Our Creator Community &amp; Get Exclusive Insights, Growth
            Strategies, and Updates Straight to Your Inbox
          </h2>

          <p className="text-[16px] leading-[25.8px] tracking-[0.32px] text-[#b8b8b8] font-[var(--font-figtree)]">
            Stay ahead in the creator economy with expert tips, monetization
            strategies, platform updates, and curated content designed to help
            you grow faster and smarter.
          </p>

          <form onSubmit={handleSubmit} className="pt-1">
            <div className="flex h-[42px] items-center justify-between border-b border-[#f95c4b] pl-3">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="h-full flex-1 bg-transparent text-[16px] text-[#f2f2f2] placeholder:text-[#8a8a8a] outline-none"
                style={{ fontFamily: "var(--font-lexend), 'Lexend', sans-serif" }}
              />

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-[42px] border border-[#ff9465] bg-[#121212] px-4 py-3 text-[16px] text-[#f2f2f2] shadow-[8px_8px_20px_rgba(69,9,0,0.16)]"
                style={{ fontFamily: "var(--font-lexend), 'Lexend', sans-serif" }}
              >
                <span>Subscribe Now</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
                    stroke="#f2f2f2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="10 17 15 12 10 7"
                    stroke="#f2f2f2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="15"
                    y1="12"
                    x2="3"
                    y2="12"
                    stroke="#f2f2f2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
