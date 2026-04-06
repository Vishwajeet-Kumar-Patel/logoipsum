"use client";

const categories = [
  "DESIGN", "FITNESS", "TECH", "MUSIC",
  "BUSINESS", "LIFESTYLE", "CONTENT", "EDUCATION",
];

/* Six-pointed asterisk SVG matching Figma's icon/asterisk */
function AsteriskIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2V22M12 2L7 7M12 2L17 7M12 22L7 17M12 22L17 17M2 12H22M2 12L7 7M2 12L7 17M22 12L17 7M22 12L17 17"
        stroke="#3a3a3a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Marquee({ animate = true }: { animate?: boolean }) {
  // Keep one segment wider than desktop viewport so translateX(-50%)
  // stays continuous with no visible empty gaps.
  const segment = [...categories, ...categories, ...categories, ...categories];

  const renderSegment = (keyPrefix: string, hidden = false) => (
    <div
      aria-hidden={hidden ? true : undefined}
      className="inline-flex h-full items-center whitespace-nowrap"
      style={{ gap: "14px" }}
    >
      {segment.map((cat, i) => (
        <div
          key={`${keyPrefix}-${i}`}
          className="flex shrink-0 items-center"
          style={{ gap: "14px" }}
        >
          <span
            className="text-[#3a3a3a]"
            style={{
              fontFamily: "'Fjalla One', sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "1",
              letterSpacing: "0.05em",
            }}
          >
            {cat}
          </span>
          <AsteriskIcon className="size-4 shrink-0" />
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="relative z-20 w-full">
        <div className="relative h-11 w-full overflow-hidden border-y border-[#d9d3c8] bg-[#e4ded2] p-0">
          <div
            className={`marquee-track inline-flex h-full min-w-max items-center whitespace-nowrap leading-none ${animate ? "marquee-slide" : ""}`}
            style={{ gap: "14px", padding: "0 14px" }}
          >
            {renderSegment("primary")}
            {renderSegment("clone", true)}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee-slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-slide {
          animation: marquee-slide 60s linear infinite;
          will-change: transform;
        }
      `}</style>
    </>
  );
}