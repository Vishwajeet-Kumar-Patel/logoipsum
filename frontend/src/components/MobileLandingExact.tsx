import Link from "next/link";
import Marquee from "./Marquee";
import MobileLandingNavbar from "./MobileLandingNavbar";

type TrendCard = {
  title: string;
  description: string;
  image: string;
  tone: "dark" | "gradient";
  imageFirst?: boolean;
};

type FeaturedCard = {
  image: string;
  label: string;
  title: string;
};

type ImpactItem = {
  label: string;
  title: string;
  button: string;
};

type PricingPlan = {
  name: string;
  price: string;
  period: string;
  isPrimary: boolean;
  features: string[];
};

type BlogPost = {
  image: string;
  category: string;
  title: string;
  date: string;
  description: string;
};

const trendCards: TrendCard[] = [
  {
    title: "Build a High-Income Design Career",
    description:
      "Learn how to master UI/UX design through real-world projects, case studies, and client workflows that prepare you for industry-level work.",
    image: "/assets/images/Frame 2147243551.png",
    tone: "dark",
  },
  {
    title: "Create and Sell Digital Courses",
    description:
      "Turn your knowledge into structured learning experiences. Build, launch, and scale your own courses with ease.",
    image: "/image-006.png",
    tone: "gradient",
    imageFirst: true,
  },
  {
    title: "Monetize Your Audience Effectively",
    description:
      "Unlock multiple income streams through subscriptions, coaching, premium content, and community engagement.",
    image: "/image-007.png",
    tone: "dark",
  },
];

const featuredCards: FeaturedCard[] = [
  {
    image: "/assets/images/Frame 2147243604.png",
    label: "Fitness • Coaching Program",
    title: "FITFORM PRO FITNESS TRANSFORMATION PROGRAM",
  },
  {
    image: "/assets/images/Frame 2147243604-1.png",
    label: "Technology • Online Course",
    title: "DEVSTACK HUB FULL STACK DEVELOPMENT COURSE",
  },
  {
    image: "/assets/images/Frame 2147243604-2.png",
    label: "Content • Strategy",
    title: "CREATORFLOW CONTENT GROWTH SYSTEM",
  },
  {
    image: "/assets/images/Frame 2147243604-3.png",
    label: "Marketing • Social Media",
    title: "BRANDLAB SOCIAL MEDIA CAMPAIGN KIT",
  },
  {
    image: "/assets/images/Frame 2147243604-4.png",
    label: "Education • Digital Products",
    title: "KNOWLEDGE PACK DIGITAL RESOURCE BUNDLE",
  },
];

const impactItems: ImpactItem[] = [
  {
    label: "CREATOR SUCCESS MILESTONE",
    title: "10,000+ Creators Successfully Launched Their Digital Businesses",
    button: "Explore Creator",
  },
  {
    label: "PLATFORM GROWTH",
    title: "₹1 Crore+ Earned by Creators Through Subscriptions and Content",
    button: "Join as Creator",
  },
  {
    label: "COMMUNITY IMPACT",
    title: "120,000+ Active Learners Engaging With Premium Content",
    button: "Join as Creator",
  },
  {
    label: "PRODUCT INNOVATION",
    title: "All-in-One Platform for Content, Community, and Monetization",
    button: "Join as Creator",
  },
];

const pricingPlans: PricingPlan[] = [
  {
    name: "Basic Plan",
    price: "$12",
    period: "/Month",
    isPrimary: false,
    features: [
      "Create your creator profile",
      "Upload limited content",
      "Basic audience insights",
      "Community access",
      "Email support",
    ],
  },
  {
    name: "Business Plan",
    price: "$39",
    period: "/Month",
    isPrimary: true,
    features: [
      "Unlimited content uploads",
      "Monetization tools (subscriptions & products)",
      "Advanced analytics & insights",
      "Priority support",
      "Custom branding options",
    ],
  },
  {
    name: "Enterprise Plan",
    price: "$59",
    period: "/Month",
    isPrimary: false,
    features: [
      "Everything in Pro plan",
      "1:1 coaching & consultation tools",
      "Advanced audience segmentation",
      "Dedicated account support",
      "Early access to new features",
    ],
  },
];

const blogPosts: BlogPost[] = [
  {
    image: "/assets/images/Frame 2147243547.png",
    category: "Creator Growth",
    title: "How to Build a Personal Brand That Attracts Opportunities",
    date: "January 15, 2026",
    description:
      "Learn how to position yourself, grow your audience, and stand out in a competitive creator economy.",
  },
  {
    image: "/assets/images/Frame 2147243550.png",
    category: "Design & Creativity",
    title: "The Impact of Creative Content on Audience Engagement",
    date: "February 2, 2026",
    description:
      "Discover how high-quality design and storytelling can significantly improve your reach and conversions.",
  },
  {
    image: "/image-011.png",
    category: "Monetization",
    title: "Future-Proof Strategies to Monetize Your Content in 2026",
    date: "February 18, 2026",
    description:
      "Explore proven monetization models that help creators generate consistent income online.",
  },
];

const NEWSLETTER_ASSETS = {
  model: "/assets/mobile-landing/newsletter/newsletter-model.png",
  glowPolygon: "/assets/mobile-landing/newsletter/newsletter-glow-polygon.svg",
};

function ArrowCircle() {
  return (
    <div className="flex size-[42px] items-center justify-center rounded-full border border-white/70">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" stroke="#F6F4F1" strokeWidth="2" />
        <path
          d="M9 15L15 9M15 9H10M15 9V14"
          stroke="#F6F4F1"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function HeroArrowIcon() {
  return (
    <div
      className="inline-flex size-[24px] items-center justify-center overflow-hidden rounded-full"
      style={{
        boxShadow:
          "0px 0px 250px 0px #dc3f1a, 0px 0px 180px 0px #dc3f1a, 0px 0px 105px 0px #dc3f1a, 0px 0px 52px 0px #dc3f1a, 0px 0px 15px 0px #dc3f1a, 0px 0px 7.5px 0px #dc3f1a",
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" stroke="#F6F4F1" strokeWidth="1.5" />
        <path
          d="M9 15L15 9M15 9H10M15 9V14"
          stroke="#F6F4F1"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function Rocket() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5 8.5L8.5 3.5M8.5 3.5H5M8.5 3.5V7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SmallButton({
  children,
  href,
  dark,
}: {
  children: React.ReactNode;
  href: string;
  dark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1 rounded-[42px] border border-[#ff9465] px-3 py-2 text-[12px] shadow-[8px_8px_20px_rgba(69,9,0,0.16)] ${
        dark
          ? "bg-[#121212] text-[#f2f2f2]"
          : "bg-[#f6f4f1] text-[#1a1a1a]"
      }`}
      style={{ fontFamily: "var(--font-lexend), 'Lexend', sans-serif" }}
    >
      <span>{children}</span>
      <Rocket />
    </Link>
  );
}

function SectionLabel({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={`text-[16px] tracking-[0.32px] ${dark ? "text-[#d6d6d6]" : "text-[#3a3a3a]"}`}
      style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "25.8px" }}
    >
      {children}
    </p>
  );
}

function MobileHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        height: "669px",
        background:
          "linear-gradient(180deg, rgba(58,58,58,0.2) 13.9%, rgba(228,222,210,0.2) 48.5%, rgba(246,244,241,0.2) 86.6%), linear-gradient(90deg, #e14f40 0%, #e14f40 100%)",
      }}
    >
      {/* Background image — absolutely positioned at bottom, matching Figma */}
      <img
        src="/image-001.png"
        alt=""
        className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-[385px] w-[620px] -translate-x-1/2 object-cover mix-blend-hard-light"
      />

      {/* Creator avatars + tagline */}
      <div className="absolute left-6 top-[60px] z-10 w-[178px]">
        <div className="flex items-center border-b border-[#e4ded2] pb-2 pr-2">
          <img
            src="/image-002.png"
            alt="Creator 1"
            className="-mr-2 size-[44px] rounded-full border border-[#f6f4f1] object-cover"
          />
          <img
            src="/image-003.png"
            alt="Creator 2"
            className="-mr-2 size-[44px] rounded-full border border-[#f6f4f1] object-cover"
          />
          <img
            src="/image-004.png"
            alt="Creator 3"
            className="size-[44px] rounded-full border border-[#f6f4f1] object-cover"
          />
        </div>
        <p
          className="pt-2 text-center text-[16px] tracking-[0.32px] text-white"
          style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "25.8px" }}
        >
          FOR THE NEXT GEN CREATORS
        </p>
      </div>

      {/* Stats — 3 evenly spaced columns */}
      <div
        className="absolute left-1/2 z-10 flex items-start text-center text-[#faf8f5]"
        style={{ top: "172px", transform: "translateX(-50%)", width: "364px", gap: "4px" }}
      >
        <div className="flex-1 pb-2">
          <p
            className="text-[19px] tracking-[0.19px]"
            style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "30.5px" }}
          >
            500+
          </p>
          <p
            className="text-[17px] tracking-[0.34px]"
            style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif", lineHeight: "27px", fontWeight: 600 }}
          >
            Active Creators
          </p>
        </div>

        <div className="flex-1 pb-2">
          <p
            className="text-[19px] tracking-[0.19px]"
            style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "30.5px" }}
          >
            120K+
          </p>
          <p
            className="text-[17px] tracking-[0.34px]"
            style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif", lineHeight: "27px", fontWeight: 600 }}
          >
            Subscriber
          </p>
        </div>

        <div className="flex-1 pb-2">
          <p
            className="text-[19px] tracking-[0.19px]"
            style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "30.5px" }}
          >
            1M+
          </p>
          <p
            className="text-[17px] tracking-[0.34px]"
            style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif", lineHeight: "27px", fontWeight: 600 }}
          >
            Content Views
          </p>
        </div>
      </div>

      {/* Description paragraph */}
      <p
        className="absolute left-6 z-10 text-[13px] tracking-[0.26px] text-[#f6f4f1]"
        style={{
          top: "268px",
          width: "364px",
          fontFamily: "var(--font-figtree), 'Figtree', sans-serif",
          lineHeight: "18.3px",
          fontWeight: 500,
        }}
      >
        Join a new wave of creators building income, influence, and impact. Unlock exclusive content, connect
        with your audience, and turn your passion into profit.
      </p>

      {/* CREATOR + MONETIZE text overlaid on image with backdrop blur */}
      <div
        className="absolute inset-x-0 z-20 flex flex-col items-center justify-center text-center"
        style={{
          top: "calc(50% + 105px)",
          transform: "translateY(-50%)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          padding: "4px 16px",
        }}
      >
        <div className="relative w-full">
          <p
            style={{
              fontFamily: "'Fjalla One', sans-serif",
              fontSize: "clamp(3rem, 19vw, 5rem)",
              lineHeight: "1",
              letterSpacing: "1.6px",
              color: "#f6f4f1",
              mixBlendMode: "overlay",
            }}
          >
            CREATOR
          </p>
          {/* Arrow icon inline to top-right of CREATOR */}
          <div
            className="absolute z-30"
            style={{
              top: "2px",
              right: "2px",
              transform: "rotate(44deg)",
            }}
          >
            <HeroArrowIcon />
          </div>
        </div>
        <p
          style={{
            fontFamily: "'Fjalla One', sans-serif",
            fontSize: "clamp(3rem, 19vw, 5rem)",
            lineHeight: "1",
            letterSpacing: "1.6px",
            color: "#f6f4f1",
          }}
        >
          MONETIZE
        </p>
      </div>

      {/* Explore Creators CTA button */}
      <Link
        href="/marketplace"
        className="absolute left-1/2 z-30 inline-flex -translate-x-1/2 items-center justify-center gap-2 rounded-[42px] border border-[#ff9465] px-3 py-2 text-[12px] text-[#f6f4f1] shadow-[8px_8px_20px_rgba(69,9,0,0.35)]"
        style={{
          top: "578px",
          fontFamily: "var(--font-lexend), 'Lexend', sans-serif",
          backgroundImage:
            "linear-gradient(147deg, rgb(225,69,23) 57.5%, rgb(214,54,31) 100%)",
        }}
      >
        <span>Explore Creators</span>
        <Rocket />
      </Link>

    </section>
  );
}

export default function MobileLandingExact() {
  return (
    <div className="mx-auto w-full max-w-[412px] bg-[#f6f4f1]">
      <MobileLandingNavbar />
      <MobileHero />
      <Marquee animate />

      <section className="bg-[#121212] px-6 py-8">
        <SectionLabel dark>WHAT&apos;S TRENDING</SectionLabel>
        <h2
          className="mt-2 text-center text-[22px] tracking-[0.22px] text-[#f2f2f2]"
          style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "34.4px" }}
        >
          Discover High-Value Content Designed to Help You Learn, Grow, and Succeed
        </h2>
        <div className="mt-3">
          <SmallButton href="/marketplace" dark>
            View All
          </SmallButton>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {trendCards.map((card) => (
            <article
              key={card.title}
              className={`overflow-hidden rounded-2xl p-3 ${
                card.tone === "gradient"
                  ? "bg-[linear-gradient(103deg,_rgb(225,69,23)_57.525%,_rgb(214,54,31)_100%)]"
                  : "bg-[#2f2f2f]"
              }`}
            >
              {card.imageFirst ? (
                <>
                  <div className="mb-3 h-[320px] overflow-hidden rounded-xl">
                    <img src={card.image} alt={card.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <h3
                      className="text-[19px] tracking-[0.19px] text-[#f2f2f2]"
                      style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "30.5px" }}
                    >
                      {card.title}
                    </h3>
                    <div className="shrink-0 rotate-45">
                      <ArrowCircle />
                    </div>
                  </div>
                  <p
                    className="mt-2 text-[16px] tracking-[0.32px] text-[#d6d6d6]"
                    style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif", lineHeight: "25.8px" }}
                  >
                    {card.description}
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <h3
                      className="text-[19px] tracking-[0.19px] text-[#f2f2f2]"
                      style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "30.5px" }}
                    >
                      {card.title}
                    </h3>
                    <div className="shrink-0 rotate-45">
                      <ArrowCircle />
                    </div>
                  </div>
                  <p
                    className="mt-2 text-[16px] tracking-[0.32px] text-[#b8b8b8]"
                    style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif", lineHeight: "25.8px" }}
                  >
                    {card.description}
                  </p>
                  <div className="mt-3 h-[320px] overflow-hidden rounded-xl">
                    <img src={card.image} alt={card.title} className="h-full w-full object-cover" />
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f6f4f1]">
        <div className="relative h-[412px] w-full overflow-hidden">
          <img
            src="/assets/images/unsplash_A3radfdQtJo.png"
            alt="Skateboard creator"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="px-6 py-6">
          <SectionLabel>WHY CREATORHUB</SectionLabel>
          <h2
            className="mt-1 text-[22px] tracking-[0.22px] text-[#1a1a1a]"
            style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "34.4px" }}
          >
            Where Creativity Meets Opportunity and Growth Becomes Scalable
          </h2>
          <p
            className="mt-2 text-[12px] tracking-[0.12px] text-[#5a5a5a]"
            style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif", lineHeight: "17.4px" }}
          >
            We provide everything you need to transform your skills into a sustainable creator business from
            content tools to monetization systems.
          </p>

          <div className="mt-6 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="flex size-11 items-center justify-center rounded-full bg-[#f95c4b] shadow-[-1px_2px_4px_rgba(0,0,0,0.25)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 5H19V19H5V5Z" stroke="white" strokeWidth="1.6" />
                  <circle cx="9" cy="9" r="1.4" fill="white" />
                </svg>
              </div>
              <p
                className="text-[16px] tracking-[0.32px] text-[#5a5a5a]"
                style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "25.8px" }}
              >
                OVER 10+ YEAR OF EXPERIENCE
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex size-11 items-center justify-center rounded-full bg-[#e4ded2] shadow-[-1px_2px_4px_rgba(0,0,0,0.25)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 5H19V19H5V5Z" stroke="#5a5a5a" strokeWidth="1.6" />
                  <circle cx="9" cy="9" r="1.4" fill="#5a5a5a" />
                </svg>
              </div>
              <p
                className="text-[16px] tracking-[0.32px] text-[#5a5a5a]"
                style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "25.8px" }}
              >
                ALL-IN PLATFORM
              </p>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl">
            <img
              src="/assets/images/Frame 2147243567.png"
              alt="Creator success"
              className="h-[160px] w-full object-cover"
            />
          </div>

          <div className="mt-4 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <p
                  className="text-[16px] text-black tracking-[0.32px]"
                  style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "25.8px" }}
                >
                  Successful Creator Launches
                </p>
                <p
                  className="text-[16px] text-black tracking-[0.32px]"
                  style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "25.8px" }}
                >
                  86%
                </p>
              </div>
              <div className="mt-1 rounded-full bg-white p-px">
                <div className="h-[5px] w-[86%] rounded-full bg-[#f95c4b]" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <p
                  className="text-[16px] text-black tracking-[0.32px]"
                  style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "25.8px" }}
                >
                  Monetization Success Rate
                </p>
                <p
                  className="text-[16px] text-black tracking-[0.32px]"
                  style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "25.8px" }}
                >
                  76%
                </p>
              </div>
              <div className="mt-1 rounded-full bg-white p-px">
                <div className="h-[5px] w-[76%] rounded-full bg-[#d8d1c7]" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <p
                  className="text-[16px] text-black tracking-[0.32px]"
                  style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "25.8px" }}
                >
                  Monetization Success Rate
                </p>
                <p
                  className="text-[16px] text-black tracking-[0.32px]"
                  style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "25.8px" }}
                >
                  88%
                </p>
              </div>
              <div className="mt-1 rounded-full bg-white p-px">
                <div className="h-[5px] w-[88%] rounded-full bg-[#9a9a9a]" />
              </div>
            </div>
          </div>

          <p
            className="mt-4 text-[16px] tracking-[0.32px] text-[#5a5a5a]"
            style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif", lineHeight: "25.8px" }}
          >
            Our platform empowers creators to launch, grow, and monetize their content effectively. With high
            engagement rates and proven success metrics, CreatorHub ensures both creators and learners achieve
            real, measurable results.
          </p>
        </div>
      </section>

      <section className="bg-[#121212] px-6 py-6">
        <div className="flex justify-end">
          <div className="rotate-45">
            <ArrowCircle />
          </div>
        </div>
        <p
          className="mt-3 text-center text-[22px] tracking-[0.22px] text-[#f2f2f2]"
          style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "34.4px" }}
        >
          WE EMPOWER <span className="text-[#ff7a6c]">CREATORS</span> TO TURN IDEAS INTO INCOME AND PASSION INTO
          PROFITS FROM ASPIRING BEGINNERS TO EXPERIENCED PROFESSIONALS, OUR PLATFORM IS
          <span className="text-[#ff7a6c]"> DESIGNED</span> TO SUPPORT EVERY STAGE OF YOUR JOURNEY HELPING YOU
          GROW FASTER AND SMARTER.
        </p>
      </section>

      <section className="px-6 py-6">
        <SectionLabel>FEATURED CREATORS</SectionLabel>
        <h2
          className="mt-1 text-[22px] tracking-[0.22px] text-[#1a1a1a]"
          style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "34.4px" }}
        >
          Meet the Creators Who Are Redefining the Digital Economy
        </h2>
        <p
          className="mt-2 text-[12px] tracking-[0.12px] text-[#5a5a5a]"
          style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif", lineHeight: "17.4px" }}
        >
          Learn from industry experts, discover new perspectives, and gain access to high-quality content designed
          to help you succeed.
        </p>
        <div className="mt-2 flex justify-end">
          <SmallButton href="/signup">SUBSCRIBE</SmallButton>
        </div>

        <div className="mt-5 flex flex-col gap-6">
          {featuredCards.map((card) => (
            <article key={card.title} className="flex flex-col gap-4">
              <div className="h-[320px] overflow-hidden rounded-2xl bg-white">
                <img src={card.image} alt={card.title} className="h-full w-full object-cover" />
              </div>
              <div>
                <p
                  className="text-[13px] tracking-[0.26px] text-[#9a9a9a]"
                  style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif", lineHeight: "18.3px" }}
                >
                  {card.label}
                </p>
                <h3
                  className="text-[16px] tracking-[0.32px] text-[#3a3a3a]"
                  style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "25.8px" }}
                >
                  {card.title}
                </h3>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-[linear-gradient(116deg,_rgb(225,69,23)_57.525%,_rgb(214,54,31)_100%)] p-4 text-white">
          <h3
            className="text-[26px] tracking-[0.26px]"
            style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "39.5px" }}
          >
            OUR CREATORS ARE BUILDING REAL BUSINESSES
          </h3>
          <p
            className="mt-2 text-[13px] tracking-[0.26px] text-[#e4ded2]"
            style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif", lineHeight: "18.3px" }}
          >
            From courses to coaching programs, creators on our platform are generating income, building
            communities, and scaling their impact globally.
          </p>
          <div className="mt-3">
            <SmallButton href="/marketplace">Explore All Creators</SmallButton>
          </div>
          <p
            className="mt-2 text-[13px] tracking-[0.26px] text-[#e4ded2]"
            style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif", lineHeight: "18.3px" }}
          >
            Join 10,000+ learners growing every day
          </p>
        </div>
      </section>

      <section className="bg-[#121212] px-6 py-6">
        <SectionLabel dark>OUR IMPACT</SectionLabel>
        <h2
          className="mt-1 text-[22px] tracking-[0.22px] text-[#d6d6d6]"
          style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "34.4px" }}
        >
          Celebrating Excellence in the Creator Economy.
        </h2>
        <p
          className="mt-2 text-[12px] tracking-[0.12px] text-[#b8b8b8]"
          style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif", lineHeight: "17.4px" }}
        >
          We are proud to empower creators and learners worldwide by building a platform that drives real growth,
          income, and impact across industries.
        </p>

        <div className="mt-6 space-y-4">
          {impactItems.map((item) => (
            <article key={item.label} className="border-b border-[#3a3a3a] pb-2">
              <p
                className="text-[12px] tracking-[0.12px] text-[#f95c4b]"
                style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif", lineHeight: "17.4px" }}
              >
                {item.label}
              </p>
              <h3
                className="mt-1 text-[19px] tracking-[0.19px] text-[#d6d6d6]"
                style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "30.5px" }}
              >
                {item.title}
              </h3>
              <div className="mt-2">
                <SmallButton href="/signup" dark>
                  {item.button}
                </SmallButton>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 py-6">
        <SectionLabel>PRICING</SectionLabel>
        <h2
          className="mt-1 text-[22px] tracking-[0.22px] text-[#1a1a1a]"
          style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "34.4px" }}
        >
          Pricing That Grows as You Grow
        </h2>
        <p
          className="mt-2 text-[12px] tracking-[0.12px] text-[#5a5a5a]"
          style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif", lineHeight: "17.4px" }}
        >
          Choose a plan that fits your creator journey. Start for free and upgrade anytime as your audience and
          income grow.
        </p>

        <div className="mt-5 space-y-6">
          {pricingPlans.map((plan) => (
            <article key={plan.name} className="overflow-hidden rounded-2xl border border-[#e4ded2] bg-[#f6f4f1]">
              <div className={`p-5 ${plan.isPrimary ? "bg-[#fb6503]" : "bg-[#e4ded2]"}`}>
                <div className="flex items-center gap-2">
                  <div className={`rounded-full p-[10px] ${plan.isPrimary ? "bg-[#fffefd]" : "bg-[#fb6503]"}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="7" height="7" rx="1" stroke={plan.isPrimary ? "#fb6503" : "#fffefd"} strokeWidth="2" />
                      <rect x="14" y="3" width="7" height="7" rx="1" stroke={plan.isPrimary ? "#fb6503" : "#fffefd"} strokeWidth="2" />
                      <rect x="14" y="14" width="7" height="7" rx="1" stroke={plan.isPrimary ? "#fb6503" : "#fffefd"} strokeWidth="2" />
                      <rect x="3" y="14" width="7" height="7" rx="1" stroke={plan.isPrimary ? "#fb6503" : "#fffefd"} strokeWidth="2" />
                    </svg>
                  </div>
                  <p
                    className={`text-[16px] tracking-[0.32px] ${plan.isPrimary ? "text-[#fffefd]" : "text-[#1e1e1e]"}`}
                    style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif", fontWeight: 700, lineHeight: "25.8px" }}
                  >
                    {plan.name}
                  </p>
                </div>

                <p className={`mt-4 ${plan.isPrimary ? "text-[#fffefd]" : "text-[#1e1e1e]"}`}>
                  <span
                    className={`tracking-[0.56px] ${plan.isPrimary ? "text-[33px] leading-[48.6px] tracking-[0.66px]" : "text-[28px] leading-[42.1px]"}`}
                    style={{ fontFamily: "'Fjalla One', sans-serif" }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-[13px]">{plan.period}</span>
                </p>

                <div className="mt-4">
                  <Link
                    href="/signup"
                    className="flex w-full items-center justify-center gap-1 rounded-[42px] border border-[#ff9465] bg-[#f6f4f1] px-3 py-2 text-[12px] text-[#1a1a1a] shadow-[8px_8px_20px_rgba(69,9,0,0.16)]"
                    style={{ fontFamily: "var(--font-lexend), 'Lexend', sans-serif" }}
                  >
                    <span>Get Started</span>
                    <Rocket />
                  </Link>
                </div>
              </div>

              <div className="bg-[#fffbf7] p-5">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6 9 17l-5-5" stroke="#5a5a5a" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span
                        className="text-[16px] text-[#5a5a5a]"
                        style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif", lineHeight: "22px" }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="my-3 h-px w-full bg-[#e9e9e9]" />
                <p
                  className="text-[16px] text-[#3a3a3a]"
                  style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif", fontWeight: 700, lineHeight: "24px" }}
                >
                  Perfect for Individuals.
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 py-6">
        <div className="flex h-[250px] gap-3 overflow-hidden">
          <div className="flex-1 overflow-hidden rounded-2xl">
            <img src="/assets/images/Frame 2147243634.png" alt="Creator portrait 1" className="h-full w-full object-cover" />
          </div>
          <div className="flex-1 overflow-hidden rounded-2xl">
            <img src="/assets/images/Frame 2147243635.png" alt="Creator portrait 2" className="h-full w-full object-cover" />
          </div>
          <div className="relative w-[144px] overflow-hidden rounded-2xl">
            <img src="/assets/images/Frame 2147243636.png" alt="Aarav Sharma" className="h-full w-full object-cover" />
            <div className="absolute inset-x-2 bottom-2 rounded-md bg-[rgba(145,145,145,0.3)] p-1 backdrop-blur-[12px]">
              <p
                className="text-[16px] tracking-[0.32px] text-[#f6f4f1]"
                style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "25.8px" }}
              >
                Aarav Sharma
              </p>
              <p
                className="text-[16px] tracking-[0.32px] text-[#f6f4f1]"
                style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif", lineHeight: "25.8px" }}
              >
                UI/UX Designer
              </p>
              <p
                className="text-[14px] tracking-[0.28px] text-[#f6f4f1]"
                style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif", lineHeight: "18.3px" }}
              >
                Helping aspiring designers build real-world skills through practical projects and case studies.
              </p>
            </div>
          </div>
          <div className="flex-1 overflow-hidden rounded-2xl">
            <img src="/assets/images/Frame 2147243637.png" alt="Creator portrait 4" className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="mt-6">
          <SectionLabel>MEET THE CREATORS</SectionLabel>
          <h2
            className="mt-1 text-[22px] tracking-[0.22px] text-[#1a1a1a]"
            style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "34.4px" }}
          >
            A Community of Creators, Innovators, and Industry Experts
          </h2>
          <p
            className="mt-2 text-[16px] tracking-[0.16px] text-[#5a5a5a]"
            style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif", lineHeight: "25.8px" }}
          >
            Our platform brings together passionate creators from across the globe designers, developers, fitness
            coaches, educators, and more all dedicated to sharing knowledge, building communities, and creating
            meaningful impact.
          </p>

          <div className="mt-3 grid grid-cols-2 gap-6">
            <div>
              <p
                className="text-[22px] tracking-[0.22px] text-[#1a1a1a] [text-shadow:0px_4px_4px_#e4ded2]"
                style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "34.4px" }}
              >
                300+
              </p>
              <p
                className="text-[16px] tracking-[0.32px] text-[#5a5a5a]"
                style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "25.8px" }}
              >
                Active Creators Across Multiple Categories
              </p>
            </div>
            <div>
              <p
                className="text-[22px] tracking-[0.22px] text-[#1a1a1a] [text-shadow:0px_4px_4px_#e4ded2]"
                style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "34.4px" }}
              >
                200+
              </p>
              <p
                className="text-[16px] tracking-[0.32px] text-[#5a5a5a]"
                style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "25.8px" }}
              >
                Premium Courses & Programs Created
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-8">
        <SectionLabel>OUR PROCESS</SectionLabel>
        <h2
          className="mt-1 text-[22px] tracking-[0.22px] text-[#1a1a1a]"
          style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "34.4px" }}
        >
          From Passion to Profitable Creator Journey
        </h2>
        <p
          className="mt-2 text-[13px] tracking-[0.26px] text-[#5a5a5a]"
          style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif", lineHeight: "18.3px" }}
        >
          We simplify the entire creator journey from setting up your profile to building an audience and generating
          income all in one seamless platform.
        </p>

        <div className="mt-5 space-y-4">
          <article className="rounded-2xl bg-[#d8d1c7] p-6">
            <p className="text-[60px] tracking-[1.2px] text-transparent [text-stroke:1px_#fff] [-webkit-text-stroke:1px_#fff]" style={{ fontFamily: "'Fjalla One', sans-serif" }}>01</p>
            <p className="text-[22px] tracking-[0.22px] text-[#f95c4b]" style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "34.4px" }}>DISCOVER</p>
            <p className="mt-3 text-[21px] tracking-[0.21px] text-[#faf8f5]" style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "33.1px" }}>
              Define your niche and creator identity
            </p>
          </article>

          <article className="rounded-2xl bg-[#1a1a1a] p-6">
            <p className="text-[60px] tracking-[1.2px] text-transparent [text-stroke:1px_#fff] [-webkit-text-stroke:1px_#fff]" style={{ fontFamily: "'Fjalla One', sans-serif" }}>02</p>
            <p className="text-[22px] tracking-[0.22px] text-[#f95c4b]" style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "34.4px" }}>CREATE</p>
            <p className="mt-3 text-[21px] tracking-[0.21px] text-[#f6f4f1]" style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "33.1px" }}>
              Build content that delivers real value
            </p>
          </article>

          <article className="rounded-2xl bg-[#d8d1c7] p-6">
            <p className="text-[60px] tracking-[1.2px] text-transparent [text-stroke:1px_#fff] [-webkit-text-stroke:1px_#fff]" style={{ fontFamily: "'Fjalla One', sans-serif" }}>03</p>
            <p className="text-[22px] tracking-[0.22px] text-[#f95c4b]" style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "34.4px" }}>GROW</p>
            <p className="mt-3 text-[21px] tracking-[0.21px] text-[#faf8f5]" style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "33.1px" }}>
              Engage your audience and build community
            </p>
          </article>
        </div>
      </section>

      <section className="bg-[#121212] px-6 py-6">
        <SectionLabel dark>TESTIMONIALS</SectionLabel>
        <h2
          className="mt-1 text-center text-[22px] tracking-[0.22px] text-[#f2f2f2]"
          style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "34.4px" }}
        >
          What Creators and Learners Are Saying
        </h2>

        <article className="mt-5 rounded-2xl bg-[#2f2f2f] p-8">
          <p className="text-[18px] tracking-[2px] text-[#ffbf3b]">★★★★★</p>
          <p
            className="mt-6 text-[16px] tracking-[0.32px] text-[#b8b8b8]"
            style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif", lineHeight: "25.8px" }}
          >
            “CreatorHub completely changed how I approach my career. Within just two months, I was able to launch
            my first course and start earning consistently. The platform made everything simple and accessible.”
          </p>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/image-002.png" alt="Rahul Mehta" className="size-11 rounded-full object-cover" />
              <div>
                <p
                  className="text-[16px] tracking-[0.32px] text-[#f2f2f2]"
                  style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "25.8px" }}
                >
                  Rahul Mehta
                </p>
                <p
                  className="text-[14px] tracking-[0.28px] text-[#d6d6d6]"
                  style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif", lineHeight: "18.3px" }}
                >
                  Full Stack Developer
                </p>
              </div>
            </div>
            <p className="text-[64px] leading-none text-[#f95c4b]">“</p>
          </div>
        </article>

        <div className="mt-5 flex justify-center gap-2">
          <span className="size-2.5 rounded-full bg-[#f95c4b]" />
          <span className="size-2.5 rounded-full bg-[#3a3a3a]" />
          <span className="size-2.5 rounded-full bg-[#3a3a3a]" />
          <span className="size-2.5 rounded-full bg-[#3a3a3a]" />
          <span className="size-2.5 rounded-full bg-[#3a3a3a]" />
        </div>
      </section>

      <section className="px-6 py-6">
        <SectionLabel>OUR BLOG</SectionLabel>
        <h2
          className="mt-1 text-[22px] tracking-[0.22px] text-[#1a1a1a]"
          style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "34.4px" }}
        >
          Stay Inspired with Insights from Top Creators
        </h2>
        <p
          className="mt-2 text-[13px] tracking-[0.26px] text-[#5a5a5a]"
          style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif", lineHeight: "18.3px" }}
        >
          Explore expert tips, growth strategies, and industry trends to help you succeed as a creator and learner.
        </p>
        <div className="mt-2">
          <SmallButton href="/blogs">View All Articles</SmallButton>
        </div>

        <div className="mt-5 space-y-6">
          {blogPosts.map((post) => (
            <article key={post.title} className="space-y-2">
              <div className="h-[420px] overflow-hidden rounded-2xl">
                <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
              </div>
              <p
                className="text-[13px] tracking-[0.26px] text-[#3a3a3a]"
                style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif", lineHeight: "18.3px" }}
              >
                {post.category}
              </p>
              <h3
                className="text-[16px] tracking-[0.32px] text-[#3a3a3a]"
                style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "25.8px" }}
              >
                {post.title}
              </h3>
              <p
                className="text-[13px] tracking-[0.26px] text-[#9a9a9a]"
                style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif", lineHeight: "18.3px" }}
              >
                {post.date}
              </p>
              <p
                className="text-[16px] tracking-[0.32px] text-[#9a9a9a]"
                style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif", lineHeight: "25.8px" }}
              >
                {post.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 pb-8 pt-3">
        <div className="relative h-[664px] overflow-hidden rounded-2xl bg-[#121212] p-6">
          <div className="relative z-10 flex flex-col gap-4">
            <h2
              className="text-[22px] tracking-[0.22px] text-[#f2f2f2]"
              style={{ fontFamily: "'Fjalla One', sans-serif", lineHeight: "34.4px" }}
            >
              Join Our Creator Community & Get Exclusive Insights, Growth Strategies, and Updates Straight to Your Inbox
            </h2>
            <p
              className="text-[16px] tracking-[0.32px] text-[#b8b8b8]"
              style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif", lineHeight: "25.8px" }}
            >
              Stay ahead in the creator economy with expert tips, monetization strategies, platform updates, and
              curated content designed to help you grow faster and smarter.
            </p>

            <div className="flex h-[54px] items-center justify-between border-b border-[#f95c4b] pl-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="h-full min-w-0 flex-1 bg-transparent text-center text-[12px] tracking-[0.12px] text-[#8a8a8a] placeholder:text-[#8a8a8a] outline-none"
                style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif", lineHeight: "17.4px" }}
              />
              <button
                type="button"
                className="-mb-px inline-flex h-[36px] items-center gap-1 rounded-[42px] border border-[#ff9465] bg-[#121212] px-3 py-2 text-[12px] text-[#f2f2f2] shadow-[8px_8px_20px_rgba(69,9,0,0.16)]"
                style={{ fontFamily: "var(--font-lexend), 'Lexend', sans-serif" }}
              >
                <span>Subscribe Now</span>
                <Rocket />
              </button>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-0 left-[-49px] h-[342px] w-[326px]">
            <img
              src={NEWSLETTER_ASSETS.glowPolygon}
              alt=""
              aria-hidden="true"
              className="absolute left-[-70px] top-[36px] h-[326px] w-[326px] mix-blend-lighten"
            />
            <img
              src={NEWSLETTER_ASSETS.model}
              alt="Newsletter creator"
              className="absolute bottom-0 left-0 h-[267px] w-[178px] object-cover"
            />
          </div>

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_78%,rgba(249,92,75,0.24),transparent_36%)]" />
        </div>
      </section>
    </div>
  );
}
