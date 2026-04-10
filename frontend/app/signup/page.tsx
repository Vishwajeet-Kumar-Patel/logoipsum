"use client";

import React, { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import api from "@/src/lib/api";
import toast from "react-hot-toast";
import CaptchaChallenge from "@/src/components/common/CaptchaChallenge";

type EmailCheckStatus = "idle" | "invalid" | "checking" | "allowed" | "disposable";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DISPOSABLE_EMAIL_WARNING =
  "Disposable email addresses are not allowed. Please use a permanent email address.";

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'user';
  
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [minPasswordLength, setMinPasswordLength] = useState(12);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaRequired, setCaptchaRequired] = useState(false);
  const [captchaRefreshNonce, setCaptchaRefreshNonce] = useState(0);
  const [emailCheckStatus, setEmailCheckStatus] = useState<EmailCheckStatus>("idle");
  const [emailWarning, setEmailWarning] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchSecurityConfig = async () => {
      try {
        const { data } = await api.get('/auth/security-config');
        const nextMin = Number.parseInt(String(data?.minPasswordLength), 10);
        if (mounted && Number.isFinite(nextMin) && nextMin >= 6) {
          setMinPasswordLength(nextMin);
        }
      } catch {
        // Keep default requirement when settings cannot be fetched.
      }
    };

    fetchSecurityConfig();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setEmailCheckStatus("idle");
      setEmailWarning("");
      return;
    }

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      setEmailCheckStatus("invalid");
      setEmailWarning("");
      return;
    }

    let isActive = true;
    setEmailCheckStatus("checking");
    setEmailWarning("");

    const timer = setTimeout(async () => {
      try {
        const { data } = await api.post('/auth/email/check', { email: normalizedEmail });

        if (!isActive) {
          return;
        }

        if (data?.disposable) {
          setEmailCheckStatus("disposable");
          setEmailWarning(data?.message || DISPOSABLE_EMAIL_WARNING);
          return;
        }

        setEmailCheckStatus("allowed");
        setEmailWarning("");
      } catch {
        if (!isActive) {
          return;
        }

        // Backend still enforces this check on submit; this keeps UX resilient on transient API failures.
        setEmailCheckStatus("allowed");
        setEmailWarning("");
      }
    }, 350);

    return () => {
      isActive = false;
      clearTimeout(timer);
    };
  }, [email]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedName = name.trim();
    const normalizedPhone = phone.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim().toLowerCase();

    if (!normalizedName) {
      toast.error("Please enter your full name");
      return;
    }

    if (!normalizedPhone) {
      toast.error("Please enter your phone number");
      return;
    }

    if (!normalizedUsername) {
      toast.error("Please enter a user name");
      return;
    }

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (emailCheckStatus === "checking") {
      toast.error("Please wait while we verify your email address");
      return;
    }

    if (emailCheckStatus === "disposable") {
      toast.error(emailWarning || DISPOSABLE_EMAIL_WARNING);
      return;
    }

    if (password.length < minPasswordLength) {
      toast.error(`Password must be at least ${minPasswordLength} characters`);
      return;
    }

    if (captchaRequired && !captchaToken) {
      toast.error("Please complete the security check");
      return;
    }

    setLoading(true);
    try {
      let deviceFingerprint = '';
      try {
        const FingerprintJS = (await import('@fingerprintjs/fingerprintjs')).default;
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        deviceFingerprint = result.visitorId;
      } catch {
        deviceFingerprint = '';
      }

      // Pass the role from searchParams if needed, or handle it in role selection later
      const res = await api.post('/auth/register', {
        name: normalizedName,
        username: normalizedUsername,
        phone: normalizedPhone,
        email: normalizedEmail,
        password,
        role,
        deviceFingerprint,
        captchaToken,
      });
      if (res.data.success) {
        toast.success("Account created! Check your email for OTP.");
        setCaptchaToken("");
        setCaptchaRefreshNonce((prev) => prev + 1);
        // Redirect to verify-email page with the email
        router.push(`/login/verify-email?email=${encodeURIComponent(normalizedEmail)}`);
      }
    } catch (err: unknown) {
      const axiosError = err as {
        response?: { data?: { message?: string; code?: string } };
      };
      const message = axiosError.response?.data?.message || "Registration failed";
      const code = axiosError.response?.data?.code;

      if (code === 'DISPOSABLE_EMAIL_NOT_ALLOWED') {
        setEmailCheckStatus("disposable");
        setEmailWarning(message || DISPOSABLE_EMAIL_WARNING);
      }

      if (String(message).toLowerCase().includes('captcha')) {
        setCaptchaToken("");
        setCaptchaRefreshNonce((prev) => prev + 1);
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full max-w-[500px] flex flex-col gap-7 py-8 lg:py-10">
      <div className="flex flex-col text-center items-center justify-center gap-1">
        <h1
          className="text-[#1a1a1a] text-[33px] tracking-[0.66px]"
          style={{ fontFamily: "'Fjalla One', sans-serif" }}
        >
          Create Your Account
        </h1>
        <p
          className="text-[#3a3a3a] text-[16px] font-medium tracking-[0.32px]"
          style={{ fontFamily: "'Figtree', sans-serif" }}
        >
          Join Creator Hub
        </p>
      </div>

      <form className="flex flex-col gap-4 w-full" onSubmit={handleRegister}>
        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <label
            className="text-[#1a1a1a] text-[20px] tracking-[0.4px] leading-tight"
            style={{ fontFamily: "'Fjalla One', sans-serif" }}
          >
            Full Name*
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            autoComplete="name"
            required
            className="w-full bg-[#faf8f5] border border-[#d8d1c7] rounded-full px-6 py-4 outline-none focus:border-[#ff9465] transition-colors text-base text-[#1a1a1a] font-medium placeholder:text-[#9a9a9a]"
            style={{ fontFamily: "'Figtree', sans-serif" }}
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-2">
          <label 
            className="text-[#1a1a1a] text-[20px] tracking-[0.4px] leading-tight"
            style={{ fontFamily: "'Fjalla One', sans-serif" }}
          >
            Phone Number*
          </label>
          <input 
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            autoComplete="tel"
            inputMode="tel"
            required
            className="w-full bg-[#faf8f5] border border-[#d8d1c7] rounded-full px-6 py-4 outline-none focus:border-[#ff9465] transition-colors text-base text-[#1a1a1a] font-medium placeholder:text-[#9a9a9a]"
            style={{ fontFamily: "'Figtree', sans-serif" }}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label 
            className="text-[#1a1a1a] text-[20px] tracking-[0.4px] leading-tight"
            style={{ fontFamily: "'Fjalla One', sans-serif" }}
          >
            Email*
          </label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="hello@chainex.co"
            autoComplete="email"
            required
            className={`w-full bg-[#faf8f5] border rounded-full px-6 py-4 outline-none transition-colors text-base text-[#1a1a1a] font-medium placeholder:text-[#9a9a9a] ${
              emailCheckStatus === "disposable"
                ? "border-red-500 focus:border-red-500"
                : "border-[#d8d1c7] focus:border-[#ff9465]"
            }`}
            style={{ fontFamily: "'Figtree', sans-serif" }}
          />
          {emailCheckStatus === "checking" && (
            <p className="text-xs text-[#8a8173] ml-1">Checking email provider...</p>
          )}
          {emailCheckStatus === "disposable" && (
            <p className="text-xs text-[#c62828] ml-1">{emailWarning || DISPOSABLE_EMAIL_WARNING}</p>
          )}
        </div>

        {/* User Name */}
        <div className="flex flex-col gap-2">
          <label 
            className="text-[#1a1a1a] text-[20px] tracking-[0.4px] leading-tight"
            style={{ fontFamily: "'Fjalla One', sans-serif" }}
          >
            User Name*
          </label>
          <input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
            placeholder="Choose a username"
            autoComplete="username"
            required
            className="w-full bg-[#faf8f5] border border-[#d8d1c7] rounded-full px-6 py-4 outline-none focus:border-[#ff9465] transition-colors text-base text-[#1a1a1a] font-medium placeholder:text-[#9a9a9a]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2 relative">
          <label 
            className="text-[#1a1a1a] text-[20px] tracking-[0.4px] leading-tight"
            style={{ fontFamily: "'Fjalla One', sans-serif" }}
          >
            Password*
          </label>
          <div className="relative w-full">
            <input 
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              autoComplete="new-password"
              required
              minLength={minPasswordLength}
              className="w-full bg-[#faf8f5] border border-[#d8d1c7] rounded-full pl-6 pr-12 py-4 outline-none focus:border-[#ff9465] transition-colors text-base text-[#1a1a1a] font-medium placeholder:text-[#9a9a9a]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <CaptchaChallenge
          onTokenChange={setCaptchaToken}
          onRequirementChange={setCaptchaRequired}
          refreshNonce={captchaRefreshNonce}
          className="mt-1"
        />

        <div className="flex justify-center mt-2">
          <button
            type="submit"
            disabled={
              loading || emailCheckStatus === "checking" || emailCheckStatus === "disposable"
            }
            className="px-7 py-2.5 rounded-full border border-[#ff9465] text-[#f6f4f1] shadow-[8px_8px_20px_0px_rgba(69,9,0,0.35)] transition-transform hover:scale-105 active:scale-95 whitespace-nowrap disabled:opacity-50"
            style={{
              background: "linear-gradient(131.5deg, #e14517 57.5%, #d6361f 100%)",
              fontFamily: "'Lexend', sans-serif",
            }}
          >
            {loading
              ? "Creating..."
              : emailCheckStatus === "checking"
                ? "Checking email..."
                : "Create Account"}
          </button>
        </div>

        {/* Already have account */}
        <p className="text-center text-[#3a3a3a] text-[15px] mt-1" style={{ fontFamily: "'Figtree', sans-serif" }}>
          Already have an account?{" "}
          <Link href="/login/sign-in" className="text-[#1a1a1a] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#f6f4f1] p-4 sm:p-8 lg:p-12 w-full flex items-center justify-center">
      <div className="w-full max-w-[1280px] rounded-[14px] border border-[#d9d9d9] bg-white p-4 sm:p-6 md:p-8 shadow-[0_6px_28px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start justify-center">

          {/* Left Form Area */}
          <Suspense fallback={<div>Loading form...</div>}>
            <SignUpForm />
          </Suspense>

          {/* Right Image Area */}
          <div className="w-full lg:w-[460px] lg:flex-none h-[360px] sm:h-[460px] lg:h-[640px] rounded-[16px] border border-[#e4ded2] overflow-hidden relative shadow-sm">
            <Image
              src="/assets/images/Frame 2121453719-10.png"
              alt="Join Creators"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

        </div>
      </div>
    </div>
  );
}
