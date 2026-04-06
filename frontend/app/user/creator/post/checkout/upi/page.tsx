import React from "react";
import { Fjalla_One, Figtree, Bricolage_Grotesque } from "next/font/google";
import Link from "next/link";

const fjallaOne = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const figtree = Figtree({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const bricolageGrotesque = Bricolage_Grotesque({
  weight: ["300"],
  subsets: ["latin"],
  display: "swap",
});

export default function PaymentSuccessfull() {
  return (
    <div className="bg-[#f6f4f1] min-h-screen relative w-full overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[775px] px-6 lg:px-0 flex flex-col gap-[42px] items-center">
        {/* Header and Messaging */}
        <div className="flex flex-col gap-4 items-center w-full">
          <div className="flex gap-2 items-center justify-center w-full">
            {/* Verify Icon */}
            <div className="w-[60px] h-[60px] shrink-0 text-[#06C270] flex items-center justify-center">
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M33.7915 2.12658C30.9575 0.547146 27.5422 0.547146 24.7082 2.12658L16.2974 6.81434C14.8877 7.5996 13.2307 7.91746 11.6063 7.71268L1.93603 6.49354C-1.30906 6.08453 -4.38721 8.35163 -4.84755 11.637L-6.21319 21.385C-6.44211 23.0182 -7.14925 24.5204 -8.24647 25.6669L-14.7779 32.493C-16.9691 34.7831 -16.9691 38.3073 -14.7779 40.5973L-8.24647 47.4234C-7.14925 48.5699 -6.44211 50.0722 -6.21319 51.7054L-4.84755 61.4533C-4.38721 64.7387 -1.30906 67.0058 1.93603 66.5968L11.6063 65.3777C13.2307 65.1729 14.8877 65.4907 16.2974 66.276L24.7082 70.9638C27.5422 72.5432 30.9575 72.5432 33.7915 70.9638L42.2023 66.276C43.6119 65.4907 45.269 65.1729 46.8934 65.3777L56.5637 66.5968C59.8087 67.0058 62.8869 64.7387 63.3472 61.4533L64.7129 51.7054C64.9418 50.0722 65.6489 48.5699 66.7461 47.4234L73.2776 40.5973C75.4688 38.3073 75.4688 34.7831 73.2776 32.493L66.7461 25.6669C65.6489 24.5204 64.9418 23.0182 64.7129 21.385L63.3472 11.637C62.8869 8.35163 59.8087 6.08453 56.5637 6.49354L46.8934 7.71268C45.269 7.91746 43.6119 7.5996 42.2023 6.81434L33.7915 2.12658Z"
                  fill="#00C853"
                  transform="scale(0.82) translate(7, 7)"
                />
                <path
                  d="M24 38L16 30L19 27L24 32L38 18L41 21L24 38Z"
                  fill="white"
                />
              </svg>
            </div>
            <h1
              className={`${fjallaOne.className} text-[#1a1a1a] text-[48px] leading-[67.9px] tracking-[0.96px] text-center`}
            >
              Payment Successful
            </h1>
          </div>
          <p
            className={`${figtree.className} font-medium text-[#3a3a3a] text-[16px] leading-[25.8px] tracking-[0.32px] text-center max-w-[932px]`}
          >
            Your subscription has been activated and your access has been
            upgraded. You can now explore the full content library and premium
            features without limits. A payment confirmation and invoice have
            been sent to your registered email address.
          </p>
          <p
            className={`${figtree.className} font-medium text-[16px] leading-[25.8px] tracking-[0.32px] text-[#3a3a3a] text-center`}
          >
            If you notice any billing issues or access problems, our support
            team is ready to help you quickly. Contact Support:{" "}
            <a
              href="mailto:support@yourdomain.com"
              className="text-[#f95c4b] hover:underline"
            >
              support@yourdomain.com
            </a>
          </p>
        </div>

        {/* Invoice Summary */}
        <div className="flex flex-col gap-4 items-start w-full max-w-[775px]">
          <div className="flex flex-col gap-3 items-start w-[324px]">
            <p
              className={`${figtree.className} font-semibold text-[#404040] text-[19px] leading-[29.2px] tracking-[0.38px]`}
            >
              Subscribe to membership of Andrea Nelson
            </p>
            <p className="flex items-baseline leading-none text-[#121212]">
              <span
                className={`${fjallaOne.className} text-[33px] leading-[48.6px] tracking-[0.66px]`}
              >
                ₹80
              </span>
              <span
                className={`${bricolageGrotesque.className} font-light text-[32px] text-[#8a8a8a] px-1`}
              >
                /
              </span>
              <span
                className={`${figtree.className} font-medium text-[16px] leading-[25.8px] tracking-[0.32px] text-[#8a8a8a]`}
              >
                month
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-4 items-start w-full">
            <div className="border-b-[0.7px] border-[#ccc] flex flex-col gap-2 items-start pb-5 w-full">
              <div className="flex flex-col gap-2 items-start w-full">
                <div
                  className={`flex items-center justify-between w-full text-[16px] leading-[25.8px] tracking-[0.32px] text-[#3a3a3a] ${figtree.className}`}
                >
                  <p className="font-medium">Content name / event name</p>
                  <p className="font-bold">₹80</p>
                </div>
                <div
                  className={`flex items-center justify-between w-full text-[13px] leading-[18.3px] tracking-[0.26px] text-[#9a9a9a] ${figtree.className} font-medium`}
                >
                  <p>Billed monthly</p>
                  <p>₹80</p>
                </div>
              </div>
              <div
                className={`flex items-center justify-between w-full text-[16px] leading-[25.8px] tracking-[0.32px] ${figtree.className}`}
              >
                <p className="font-medium text-[#3a3a3a]">Tax</p>
                <p className="font-bold text-[#272727]">₹2</p>
              </div>
            </div>
            <div
              className={`flex items-center justify-between w-full text-[19px] leading-[29.2px] tracking-[0.38px] text-[#1a1a1a] ${figtree.className} font-bold`}
            >
              <p>Total</p>
              <p>₹100</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href="/"
          className="bg-[#f95c4b] w-full h-[40px] px-4 py-2 flex items-center justify-center rounded-[40px] hover:bg-[#e04e3e] transition-colors duration-200"
        >
          <span
            className={`${figtree.className} font-bold text-[16px] leading-[25.8px] tracking-[0.32px] text-white`}
          >
            Continue exploring creators
          </span>
        </Link>
      </div>
    </div>
  );
}
