"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

// ─────────────────────────────────────────────
// ZOD SCHEMAS  (Razorpay / Juspay-style rules)
// ─────────────────────────────────────────────

/** Luhn algorithm check */
function luhn(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  let sum = 0;
  let alternate = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}

function detectNetwork(raw: string): CardNetwork {
  const n = raw.replace(/\D/g, "");
  if (/^4/.test(n)) return "visa";
  if (/^5[1-5]/.test(n) || /^2[2-7]/.test(n)) return "mastercard";
  if (/^3[47]/.test(n)) return "amex";
  if (/^6(?:011|22126|22925|4[4-9]|5)/.test(n)) return "discover";
  if (/^35(2[89]|[3-8])/.test(n)) return "jcb";
  if (/^3(?:0[0-5]|[68])/.test(n)) return "diners";
  if (/^(?:508[5-9]|6069|607|608|6521|652[2-5]|6526|817|817[2-9]|818[01]|979[2-9])/.test(n)) return "rupay";
  return "unknown";
}

const amountSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((v) => !isNaN(Number(v)), "Must be a valid number")
    .refine((v) => Number(v) >= 5, "Minimum top-up is ₹5")
    .refine((v) => Number(v) <= 10000, "Maximum top-up is ₹10,000"),
});

const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Enter a valid email address");

const cardNumberSchema = z
  .string()
  .min(1, "Card number is required")
  .transform((v) => v.replace(/\D/g, ""))
  .refine((v) => v.length >= 13 && v.length <= 19, "Card number must be 13–19 digits")
  .refine(luhn, "Card number is invalid");

const expirySchema = z
  .string()
  .min(1, "Expiry is required")
  .regex(/^\d{2}\s*\/\s*\d{2}$/, "Use MM / YY format")
  .refine((v) => {
    const [mm, yy] = v.split("/").map((x) => x.trim());
    const month = parseInt(mm, 10);
    const year = 2000 + parseInt(yy, 10);
    if (month < 1 || month > 12) return false;
    const exp = new Date(year, month, 1);
    return exp > new Date();
  }, "Card has expired or date is invalid");

const cvcSchema = z
  .string()
  .min(1, "CVC is required")
  .regex(/^\d{3,4}$/, "CVC must be 3–4 digits");

const holderNameSchema = z
  .string()
  .min(2, "Cardholder name is required")
  .max(60, "Name too long")
  .regex(/^[a-zA-Z\s'-]+$/, "Name must contain only letters");

const address1Schema = z.string().min(3, "Address is required").max(100, "Address too long");
const citySchema = z.string().min(2, "City is required");
const pinSchema = z.string().regex(/^\d{6}$/, "PIN must be 6 digits");
const stateSchema = z.string().min(1, "Select a state");

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
type CardNetwork = "visa" | "mastercard" | "amex" | "discover" | "jcb" | "diners" | "rupay" | "unknown";
type PaymentMethod = "card" | "upi" | null;

type FormFields = {
  amount: string;
  email: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  holderName: string;
  country: string;
  address1: string;
  address2: string;
  city: string;
  pinCode: string;
  state: string;
};

type FieldErrors = Partial<Record<keyof FormFields, string>>;

const formatINR = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function formatCardNumber(raw: string, network: CardNetwork): string {
  const digits = raw.replace(/\D/g, "").slice(0, network === "amex" ? 15 : 16);
  if (network === "amex") {
    return digits.replace(/(\d{4})(\d{6})(\d{0,5})/, (_, a, b, c) =>
      [a, b, c].filter(Boolean).join(" ")
    );
  }
  return digits.replace(/(\d{4})/g, "$1 ").trim();
}

function formatExpiry(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
  return digits;
}

function validateField<T>(schema: z.ZodType<T>, value: string): string | undefined {
  const result = schema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

// ─────────────────────────────────────────────
// NETWORK SVG ICONS
// ─────────────────────────────────────────────
function NetworkIcon({ network }: { network: CardNetwork }) {
  const icons: Record<CardNetwork, React.ReactNode> = {
    visa: (
      <svg viewBox="0 0 38 24" className="h-6 w-auto">
        <rect width="38" height="24" rx="4" fill="#1A1F71" />
        <text x="50%" y="16" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="serif" letterSpacing="1">VISA</text>
      </svg>
    ),
    mastercard: (
      <svg viewBox="0 0 38 24" className="h-6 w-auto">
        <rect width="38" height="24" rx="4" fill="#252525" />
        <circle cx="14" cy="12" r="8" fill="#EB001B" />
        <circle cx="24" cy="12" r="8" fill="#F79E1B" />
        <path d="M19 6.8a8 8 0 0 1 0 10.4A8 8 0 0 1 19 6.8z" fill="#FF5F00" />
      </svg>
    ),
    amex: (
      <svg viewBox="0 0 38 24" className="h-6 w-auto">
        <rect width="38" height="24" rx="4" fill="#2E77BC" />
        <text x="50%" y="16" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">AMEX</text>
      </svg>
    ),
    rupay: (
      <svg viewBox="0 0 38 24" className="h-6 w-auto">
        <rect width="38" height="24" rx="4" fill="#006A4E" />
        <text x="50%" y="16" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">RuPay</text>
      </svg>
    ),
    discover: (
      <svg viewBox="0 0 38 24" className="h-6 w-auto">
        <rect width="38" height="24" rx="4" fill="#F76F20" />
        <text x="50%" y="16" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">DISCOVER</text>
      </svg>
    ),
    jcb: (
      <svg viewBox="0 0 38 24" className="h-6 w-auto">
        <rect width="38" height="24" rx="4" fill="#003087" />
        <text x="50%" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="sans-serif">JCB</text>
      </svg>
    ),
    diners: (
      <svg viewBox="0 0 38 24" className="h-6 w-auto">
        <rect width="38" height="24" rx="4" fill="#004B87" />
        <text x="50%" y="16" textAnchor="middle" fill="white" fontSize="8" fontFamily="sans-serif">DINERS</text>
      </svg>
    ),
    unknown: null,
  };
  return <>{icons[network]}</>;
}

function CvcIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#9a9a9a]" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <rect x="14" y="13" width="4" height="2" rx="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor">
      <path d="M11 7V5A3 3 0 0 0 5 5v2H4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-1zm-5 0V5a2 2 0 0 1 4 0v2H6z" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// FIELD COMPONENTS
// ─────────────────────────────────────────────
function InputField({
  label, type = "text", value, placeholder, error, touched,
  onChange, onBlur, suffix, prefix, inputMode,
}: {
  label: string; type?: string; value: string; placeholder: string;
  error?: string; touched?: boolean; onChange: (v: string) => void;
  onBlur?: () => void; suffix?: React.ReactNode; prefix?: React.ReactNode;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  const isError = touched && error;
  const isValid = touched && !error && value;

  return (
    <div className="flex flex-col gap-[5px] w-full">
      <label className="font-[family-name:var(--font-figtree)] font-semibold text-[12px] text-[#555] uppercase tracking-[0.6px]">
        {label}
      </label>
      <div className={`relative flex items-center border rounded-[8px] px-[12px] h-[46px] bg-white transition-all duration-150
        ${isError ? "border-[#d7382f] bg-[#fff8f7]" : isValid ? "border-[#22a06b]" : "border-[#d9d9d9] focus-within:border-[#1a1a1a] focus-within:shadow-[0_0_0_3px_rgba(26,26,26,0.06)]"}`}>
        {prefix && <div className="mr-2 flex items-center shrink-0">{prefix}</div>}
        <input
          type={type}
          inputMode={inputMode}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className="flex-1 bg-transparent outline-none font-[family-name:var(--font-figtree)] text-[14px] text-[#1a1a1a] placeholder:text-[#b5b5b5]"
        />
        {suffix && <div className="ml-2 flex items-center shrink-0">{suffix}</div>}
        {isValid && (
          <svg className="ml-2 h-4 w-4 text-[#22a06b] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
        {isError && (
          <svg className="ml-2 h-4 w-4 text-[#d7382f] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
          </svg>
        )}
      </div>
      {isError && (
        <p className="text-[11.5px] text-[#d7382f] font-[family-name:var(--font-figtree)] font-medium flex items-center gap-1">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
  label, value, options, error, touched, onChange, onBlur, placeholder,
}: {
  label: string; value: string; options: { value: string; label: string }[];
  error?: string; touched?: boolean; onChange: (v: string) => void;
  onBlur?: () => void; placeholder?: string;
}) {
  const isError = touched && error;
  return (
    <div className="flex flex-col gap-[5px] w-full">
      <label className="font-[family-name:var(--font-figtree)] font-semibold text-[12px] text-[#555] uppercase tracking-[0.6px]">
        {label}
      </label>
      <div className={`relative border rounded-[8px] bg-white transition-all duration-150
        ${isError ? "border-[#d7382f] bg-[#fff8f7]" : "border-[#d9d9d9] focus-within:border-[#1a1a1a] focus-within:shadow-[0_0_0_3px_rgba(26,26,26,0.06)]"}`}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className="w-full h-[46px] px-[12px] bg-transparent text-[14px] font-[family-name:var(--font-figtree)] text-[#1a1a1a] appearance-none outline-none"
        >
          {placeholder && <option value="" disabled hidden>{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <svg className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#808080] pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {isError && <p className="text-[11.5px] text-[#d7382f] font-[family-name:var(--font-figtree)] font-medium">{error}</p>}
    </div>
  );
}

function Checkbox({
  checked, onChange, label, sub,
}: { checked: boolean; onChange: () => void; label: string; sub?: string }) {
  return (
    <button type="button" onClick={onChange} className="flex items-start gap-[10px] text-left group">
      <div className={`mt-[2px] h-[16px] w-[16px] rounded-[4px] border-[1.5px] shrink-0 flex items-center justify-center transition-all
        ${checked ? "border-[#f95c4b] bg-[#f95c4b]" : "border-[#c2c2c6] bg-white group-hover:border-[#999]"}`}>
        {checked && (
          <svg className="h-[10px] w-[10px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <div>
        <span className="font-[family-name:var(--font-figtree)] font-medium text-[13px] text-[#1a1a1a]">{label}</span>
        {sub && <p className="font-[family-name:var(--font-figtree)] text-[12px] text-[#9a9a9a] mt-[2px]">{sub}</p>}
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function AddCreditsForm() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [isBusiness, setIsBusiness] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [network, setNetwork] = useState<CardNetwork>("unknown");

  const [form, setForm] = useState<FormFields>({
    amount: "", email: "", cardNumber: "", expiry: "", cvc: "",
    holderName: "", country: "India", address1: "", address2: "",
    city: "", pinCode: "", state: "",
  });

  // touched tracks which fields the user has interacted with
  const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({});
  const [errors, setErrors] = useState<FieldErrors>({});

  // ── per-field validation map ──
  const fieldValidators: Partial<Record<keyof FormFields, (v: string) => string | undefined>> = {
    amount: (v) => validateField(amountSchema.shape.amount, v),
    email: (v) => validateField(emailSchema, v),
    cardNumber: (v) => validateField(cardNumberSchema, v),
    expiry: (v) => validateField(expirySchema, v),
    cvc: (v) => validateField(cvcSchema, v),
    holderName: (v) => validateField(holderNameSchema, v),
    address1: (v) => validateField(address1Schema, v),
    city: (v) => validateField(citySchema, v),
    pinCode: (v) => validateField(pinSchema, v),
    state: (v) => validateField(stateSchema, v),
  };

  const setField = useCallback((key: keyof FormFields, raw: string) => {
    let value = raw;

    if (key === "cardNumber") {
      const det = detectNetwork(raw);
      setNetwork(det);
      value = formatCardNumber(raw, det);
    }
    if (key === "expiry") value = formatExpiry(raw);
    if (key === "cvc") value = raw.replace(/\D/g, "").slice(0, network === "amex" ? 4 : 3);

    setForm((p) => ({ ...p, [key]: value }));

    // live validate if already touched
    if (touched[key]) {
      const err = fieldValidators[key]?.(value);
      setErrors((p) => ({ ...p, [key]: err }));
    }
  }, [touched, network]);

  const touchField = useCallback((key: keyof FormFields) => {
    setTouched((p) => ({ ...p, [key]: true }));
    const err = fieldValidators[key]?.(form[key]);
    setErrors((p) => ({ ...p, [key]: err }));
  }, [form]);

  // validate all card fields and return true if clean
  const validateAll = (): boolean => {
    const cardFields: (keyof FormFields)[] = [
      "amount", "email", "cardNumber", "expiry", "cvc",
      "holderName", "address1", "city", "pinCode", "state",
    ];
    const newTouched: Partial<Record<keyof FormFields, boolean>> = {};
    const newErrors: FieldErrors = {};
    let ok = true;
    for (const key of cardFields) {
      newTouched[key] = true;
      const err = fieldValidators[key]?.(form[key]);
      if (err) { newErrors[key] = err; ok = false; }
    }
    setTouched((p) => ({ ...p, ...newTouched }));
    setErrors((p) => ({ ...p, ...newErrors }));
    return ok;
  };

  const parseExpiry = () => {
    const [mm = "", yy = ""] = form.expiry.split("/").map((x) => x.trim());
    return { expiryMonth: mm, expiryYear: yy.length === 2 ? `20${yy}` : yy };
  };

  const handlePay = async () => {
    setServerError("");

    if (paymentMethod !== "card") {
      setServerError("Please select Card. UPI coming soon.");
      return;
    }

    if (!validateAll()) return;

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const { expiryMonth, expiryYear } = parseExpiry();

    setLoading(true);
    try {
      const res = await fetch("/api/wallet/add-funds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          amount: Number(form.amount),
          paymentMethod: "card",
          saveInfo,
          card: {
            number: form.cardNumber.replace(/\D/g, ""),
            expiryMonth,
            expiryYear,
            cvc: form.cvc,
            holderName: form.holderName,
            email: form.email,
            country: form.country,
            address1: form.address1,
            address2: form.address2,
            city: form.city,
            pinCode: form.pinCode,
            state: form.state,
            isBusiness,
            network,
          },
        }),
      });

      const ct = res.headers.get("content-type") || "";
      const payload = ct.includes("application/json") ? await res.json() : null;

      if (!res.ok) throw new Error(payload?.message || "Payment failed. Try again.");

      const tax = 2;
      const total = Number(form.amount) + tax;
      router.push(`/user/wallet/add-credits/success?amount=${form.amount}&tax=${tax}&total=${total}`);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const amountNum = Number(form.amount);
  const tax = 2;
  const total = Number.isFinite(amountNum) && amountNum >= 5 ? amountNum + tax : null;

  const STATES = [
    { value: "AP", label: "Andhra Pradesh" }, { value: "AR", label: "Arunachal Pradesh" },
    { value: "AS", label: "Assam" }, { value: "BR", label: "Bihar" },
    { value: "CG", label: "Chhattisgarh" }, { value: "GA", label: "Goa" },
    { value: "GJ", label: "Gujarat" }, { value: "HR", label: "Haryana" },
    { value: "HP", label: "Himachal Pradesh" }, { value: "JH", label: "Jharkhand" },
    { value: "KA", label: "Karnataka" }, { value: "KL", label: "Kerala" },
    { value: "MP", label: "Madhya Pradesh" }, { value: "MH", label: "Maharashtra" },
    { value: "MN", label: "Manipur" }, { value: "ML", label: "Meghalaya" },
    { value: "MZ", label: "Mizoram" }, { value: "NL", label: "Nagaland" },
    { value: "OD", label: "Odisha" }, { value: "PB", label: "Punjab" },
    { value: "RJ", label: "Rajasthan" }, { value: "SK", label: "Sikkim" },
    { value: "TN", label: "Tamil Nadu" }, { value: "TG", label: "Telangana" },
    { value: "TR", label: "Tripura" }, { value: "UP", label: "Uttar Pradesh" },
    { value: "UK", label: "Uttarakhand" }, { value: "WB", label: "West Bengal" },
    { value: "DL", label: "Delhi" }, { value: "PY", label: "Puducherry" },
  ];

  return (
    <div className="min-h-screen bg-[#f6f4f1] flex items-center justify-center p-4">
      <div className="flex flex-col gap-6 w-full max-w-[560px] bg-white rounded-[20px] shadow-[0_4px_32px_rgba(0,0,0,0.08)] p-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-[family-name:var(--font-fjalla)] font-normal text-[26px] text-[#1a1a1a] leading-tight">
              Add Credits
            </h1>
            <p className="font-[family-name:var(--font-figtree)] text-[13px] text-[#9a9a9a] mt-1">
              Minimum top-up: ₹5 · Max: ₹10,000
            </p>
          </div>
          <div className="flex items-center gap-[6px] bg-[#f6f4f1] rounded-[8px] px-3 py-2">
            <LockIcon />
            <span className="font-[family-name:var(--font-figtree)] text-[12px] font-semibold text-[#555]">
              Secured
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#eeebe6]" />

        {/* Amount */}
        <div className="relative">
          <InputField
            label="Amount (INR)"
            type="number"
            inputMode="decimal"
            value={form.amount}
            placeholder="0.00"
            error={errors.amount}
            touched={touched.amount}
            prefix={<span className="text-[#9a9a9a] font-semibold text-[15px]">₹</span>}
            onChange={(v) => setField("amount", v)}
            onBlur={() => touchField("amount")}
          />
        </div>

        {/* Order summary pill */}
        {total !== null && (
          <div className="bg-[#f6f4f1] rounded-[10px] px-4 py-3 flex items-center justify-between">
            <div className="font-[family-name:var(--font-figtree)] text-[13px] text-[#808080]">
              <span>Credits: <strong className="text-[#1a1a1a]">{formatINR(amountNum)}</strong></span>
              <span className="mx-2">·</span>
              <span>Processing fee: <strong className="text-[#1a1a1a]">{formatINR(tax)}</strong></span>
            </div>
            <span className="font-[family-name:var(--font-figtree)] font-bold text-[14px] text-[#1a1a1a]">
              Total {formatINR(total)}
            </span>
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-[#eeebe6]" />

        {/* Payment Method */}
        <div className="flex flex-col gap-3">
          <p className="font-[family-name:var(--font-figtree)] font-semibold text-[12px] text-[#555] uppercase tracking-[0.6px]">
            Payment Method
          </p>

          <div className="flex gap-3">
            {/* Card option */}
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`flex-1 border rounded-[10px] px-4 py-3 flex items-center gap-3 transition-all duration-150
                ${paymentMethod === "card"
                  ? "border-[#1a1a1a] bg-white shadow-[0_0_0_2px_rgba(26,26,26,0.08)]"
                  : "border-[#e0ddd9] bg-[#fafaf8] hover:border-[#bbb]"}`}
            >
              <div className={`h-[18px] w-[18px] rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                ${paymentMethod === "card" ? "border-[#f95c4b]" : "border-[#c2c2c6]"}`}>
                {paymentMethod === "card" && <div className="h-[9px] w-[9px] bg-[#f95c4b] rounded-full" />}
              </div>
              <div className="text-left">
                <p className="font-[family-name:var(--font-figtree)] font-semibold text-[13px] text-[#1a1a1a]">Card</p>
                <p className="font-[family-name:var(--font-figtree)] text-[11px] text-[#9a9a9a]">Visa, Mastercard, RuPay…</p>
              </div>
            </button>

            {/* UPI option */}
            <button
              type="button"
              onClick={() => setPaymentMethod("upi")}
              className={`flex-1 border rounded-[10px] px-4 py-3 flex items-center gap-3 transition-all duration-150 relative overflow-hidden
                ${paymentMethod === "upi"
                  ? "border-[#1a1a1a] bg-white"
                  : "border-[#e0ddd9] bg-[#fafaf8] hover:border-[#bbb]"}`}
            >
              <div className={`h-[18px] w-[18px] rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                ${paymentMethod === "upi" ? "border-[#f95c4b]" : "border-[#c2c2c6]"}`}>
                {paymentMethod === "upi" && <div className="h-[9px] w-[9px] bg-[#f95c4b] rounded-full" />}
              </div>
              <div className="text-left">
                <p className="font-[family-name:var(--font-figtree)] font-semibold text-[13px] text-[#1a1a1a]">UPI</p>
                <p className="font-[family-name:var(--font-figtree)] text-[11px] text-[#9a9a9a]">Coming soon</p>
              </div>
              <div className="absolute top-0 right-0 bg-[#f0ede9] text-[10px] font-bold text-[#999] px-2 py-[2px] rounded-bl-[8px]">
                SOON
              </div>
            </button>
          </div>

          {paymentMethod === "upi" && (
            <div className="rounded-[10px] border border-[#e4ded2] bg-[#fdf9f5] px-4 py-3 text-[13px] text-[#8a8a8a] font-[family-name:var(--font-figtree)]">
              UPI checkout is in development. Please use Card to proceed.
            </div>
          )}
        </div>

        {/* ── Card Form ── */}
        {paymentMethod === "card" && (
          <div className="flex flex-col gap-5 animate-in slide-in-from-top-2 fade-in duration-200">

            {/* Contact */}
            <div className="flex flex-col gap-4">
              <p className="font-[family-name:var(--font-figtree)] font-semibold text-[12px] text-[#555] uppercase tracking-[0.6px] border-b border-[#eeebe6] pb-2">
                Contact
              </p>
              <InputField
                label="Email"
                type="email"
                value={form.email}
                placeholder="you@example.com"
                error={errors.email}
                touched={touched.email}
                onChange={(v) => setField("email", v)}
                onBlur={() => touchField("email")}
              />
            </div>

            {/* Card details */}
            <div className="flex flex-col gap-4">
              <p className="font-[family-name:var(--font-figtree)] font-semibold text-[12px] text-[#555] uppercase tracking-[0.6px] border-b border-[#eeebe6] pb-2">
                Card Details
              </p>

              <InputField
                label="Card Number"
                inputMode="numeric"
                value={form.cardNumber}
                placeholder="1234  5678  9012  3456"
                error={errors.cardNumber}
                touched={touched.cardNumber}
                onChange={(v) => setField("cardNumber", v)}
                onBlur={() => touchField("cardNumber")}
                suffix={network !== "unknown" ? <NetworkIcon network={network} /> : undefined}
              />

              <div className="flex gap-3">
                <InputField
                  label="Expiry"
                  inputMode="numeric"
                  value={form.expiry}
                  placeholder="MM / YY"
                  error={errors.expiry}
                  touched={touched.expiry}
                  onChange={(v) => setField("expiry", v)}
                  onBlur={() => touchField("expiry")}
                />
                <InputField
                  label="CVC"
                  inputMode="numeric"
                  value={form.cvc}
                  placeholder={network === "amex" ? "4 digits" : "3 digits"}
                  error={errors.cvc}
                  touched={touched.cvc}
                  onChange={(v) => setField("cvc", v)}
                  onBlur={() => touchField("cvc")}
                  suffix={<CvcIcon />}
                />
              </div>

              <InputField
                label="Cardholder Name"
                value={form.holderName}
                placeholder="Full name as on card"
                error={errors.holderName}
                touched={touched.holderName}
                onChange={(v) => setField("holderName", v)}
                onBlur={() => touchField("holderName")}
              />
            </div>

            {/* Billing address */}
            <div className="flex flex-col gap-4">
              <p className="font-[family-name:var(--font-figtree)] font-semibold text-[12px] text-[#555] uppercase tracking-[0.6px] border-b border-[#eeebe6] pb-2">
                Billing Address
              </p>

              <SelectField
                label="Country"
                value={form.country}
                options={[
                  { value: "India", label: "🇮🇳  India" },
                  { value: "US", label: "🇺🇸  United States" },
                  { value: "GB", label: "🇬🇧  United Kingdom" },
                  { value: "SG", label: "🇸🇬  Singapore" },
                ]}
                onChange={(v) => setField("country", v)}
              />

              <InputField
                label="Address Line 1"
                value={form.address1}
                placeholder="Street, building, area"
                error={errors.address1}
                touched={touched.address1}
                onChange={(v) => setField("address1", v)}
                onBlur={() => touchField("address1")}
              />
              <InputField
                label="Address Line 2 (optional)"
                value={form.address2}
                placeholder="Apartment, floor, landmark"
                onChange={(v) => setField("address2", v)}
              />

              <div className="flex gap-3">
                <InputField
                  label="City"
                  value={form.city}
                  placeholder="City"
                  error={errors.city}
                  touched={touched.city}
                  onChange={(v) => setField("city", v)}
                  onBlur={() => touchField("city")}
                />
                <InputField
                  label="PIN Code"
                  inputMode="numeric"
                  value={form.pinCode}
                  placeholder="6 digits"
                  error={errors.pinCode}
                  touched={touched.pinCode}
                  onChange={(v) => setField("pinCode", v.replace(/\D/g, "").slice(0, 6))}
                  onBlur={() => touchField("pinCode")}
                />
              </div>

              <SelectField
                label="State"
                value={form.state}
                placeholder="Select state"
                options={STATES}
                error={errors.state}
                touched={touched.state}
                onChange={(v) => setField("state", v)}
                onBlur={() => touchField("state")}
              />

              <Checkbox
                checked={isBusiness}
                onChange={() => setIsBusiness((p) => !p)}
                label="I'm purchasing as a business"
              />
            </div>

            {/* Save info */}
            <div className="bg-[#f6f4f1] border border-[#e4ded2] rounded-[12px] px-4 py-4">
              <Checkbox
                checked={saveInfo}
                onChange={() => setSaveInfo((p) => !p)}
                label="Save my information for faster checkout"
                sub="Pay securely everywhere Link is accepted."
              />
            </div>
          </div>
        )}

        {/* Server error */}
        {serverError && (
          <div className="flex items-start gap-2 bg-[#fff4f3] border border-[#fac8c4] rounded-[10px] px-4 py-3">
            <svg className="h-4 w-4 text-[#d7382f] shrink-0 mt-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
            </svg>
            <p className="font-[family-name:var(--font-figtree)] text-[13px] text-[#d7382f]">{serverError}</p>
          </div>
        )}

        {/* CTA */}
        <button
          type="button"
          onClick={handlePay}
          disabled={loading || !paymentMethod}
          className="w-full h-[48px] rounded-[12px] bg-[#f95c4b] hover:bg-[#e0503f] active:scale-[0.99] transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_2px_12px_rgba(249,92,75,0.35)]"
        >
          {loading ? (
            <>
              <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span className="font-[family-name:var(--font-figtree)] font-bold text-[15px] text-white">Processing…</span>
            </>
          ) : (
            <>
              <LockIcon />
              <span className="font-[family-name:var(--font-figtree)] font-bold text-[15px] text-white">
                {total ? `Pay ${formatINR(total)}` : "Pay Securely"}
              </span>
            </>
          )}
        </button>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-4 pt-1">
          {["256-bit SSL", "PCI DSS", "Stripe Secured"].map((badge) => (
            <span key={badge} className="font-[family-name:var(--font-figtree)] text-[11px] text-[#b0b0b0] flex items-center gap-[5px]">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L4 6v6c0 5.25 3.4 10.15 8 11.5C16.6 22.15 20 17.25 20 12V6l-8-4z" />
              </svg>
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}