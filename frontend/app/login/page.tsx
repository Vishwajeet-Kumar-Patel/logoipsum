import Image from "next/image";
import Link from "next/link";
import { LogIn, UserPlus } from "lucide-react";

type LoginEntryPageProps = {
  searchParams?: {
    next?: string;
  };
};

export default function LoginEntryPage({ searchParams }: LoginEntryPageProps) {
  const nextPath = typeof searchParams?.next === "string" ? searchParams.next : "";
  const loginHref = nextPath
    ? `/login/sign-in?next=${encodeURIComponent(nextPath)}`
    : "/login/sign-in";
  const signupHref = nextPath
    ? `/signup?next=${encodeURIComponent(nextPath)}`
    : "/signup";

  return (
    <main className="min-h-screen bg-[#f6f4f1] p-4 sm:p-8 lg:p-12 w-full flex items-center justify-center">
      <section className="w-full max-w-[1400px] rounded-[14px] border border-[#d9d9d9] bg-white p-4 sm:p-6 md:p-8 shadow-[0_6px_28px_rgba(0,0,0,0.04)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-10 items-stretch">
          <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 py-6 sm:py-10 lg:py-0">
            <div className="mb-8 sm:mb-10">
              <Image
                src="/assets/icons/logo ipsum logo.svg"
                alt="logoipsum"
                width={153}
                height={36}
                className="h-[36px] w-auto"
                priority
              />
            </div>

            <h1
              className="text-[#212121] text-[38px] sm:text-[52px] leading-[1.05] tracking-[0.2px]"
              style={{ fontFamily: "'Fjalla One', sans-serif" }}
            >
              Make your own Fan Base
            </h1>

            <p
              className="mt-4 text-[#4b4b4b] text-[15px] sm:text-[19px] leading-[1.55] max-w-[440px]"
              style={{ fontFamily: "var(--font-figtree), 'Figtree', sans-serif" }}
            >
              This website empowers creators and influencers to
              <br className="hidden sm:block" />
              turn their passion into career
            </p>

            <div className="mt-10 flex flex-col items-center gap-5">
              <Link
                href={loginHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#ff9465] px-8 py-3 text-[20px] text-[#f6f4f1] min-w-[200px] shadow-[8px_8px_20px_rgba(69,9,0,0.35)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "linear-gradient(131.5deg, #e14517 57.5%, #d6361f 100%)",
                  fontFamily: "var(--font-lexend), 'Lexend', sans-serif",
                }}
              >
                <span>Log in</span>
                <LogIn className="h-5 w-5" />
              </Link>

              <Link
                href={signupHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#ff9465] bg-white px-8 py-3 text-[20px] text-[#1a1a1a] min-w-[200px] shadow-[8px_8px_20px_rgba(69,9,0,0.16)] transition-colors hover:bg-[#fff8f3]"
                style={{ fontFamily: "var(--font-lexend), 'Lexend', sans-serif" }}
              >
                <span>Sign up</span>
                <UserPlus className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="relative min-h-[420px] sm:min-h-[540px] lg:min-h-[720px] overflow-hidden rounded-[10px] border border-[#d9d9d9]">
            <Image
              src="/assets/images/Frame 2121453719.png"
              alt="Fan base creators"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

