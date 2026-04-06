"use client";

const testimonials = [
  {
    quote:
      "CreatorHub completely changed how I approach my career. Within just two months, I was able to launch my first course and start earning consistently. The platform made everything simple and accessible.",
    name: "Rahul Mehta",
    role: "Full Stack Developer",
    avatar: "/assets/images/Frame 2147243329.png",
  },
  {
    quote:
      "I've tried multiple platforms before, but nothing comes close to CreatorHub. The tools, audience reach, and ease of monetization helped me grow my fitness business faster than I expected.",
    name: "Sneha Kapoor",
    role: "Fitness Coach",
    avatar: "/assets/images/Frame 2147243330.png",
  },
];

function StarRating() {
  return (
    <div className="text-[18px] leading-none tracking-[2px] text-[#f95c4b]">★★★★★</div>
  );
}

export default function Testimonials() {
  return (
    <section className="w-full bg-[#121212] px-5 py-[42px] md:px-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-8 flex flex-col gap-3 text-center md:mb-12 md:text-left">
          <p
            className="text-[16px] leading-[25.8px] tracking-[0.32px] text-[#d6d6d6]"
            style={{ fontFamily: "'Fjalla One', sans-serif" }}
          >
            TESTIMONIALS
          </p>
          <h2
            className="text-[32px] leading-[1.3] tracking-[0.8px] text-[#f2f2f2] md:text-[40px] md:leading-[57.6px]"
            style={{ fontFamily: "'Fjalla One', sans-serif" }}
          >
            What Creators and Learners Are Saying
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="rounded-[24px] bg-[#2f2f2f] p-6 md:p-9"
            >
              <StarRating />
              <p className="mt-7 text-[16px] leading-[25.8px] tracking-[0.32px] text-[#b8b8b8] font-[var(--font-figtree)]">
                "{item.quote}"
              </p>
              <div className="mt-7 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="size-[44px] rounded-full object-cover"
                  />
                  <div>
                    <p
                      className="text-[16px] leading-[25.8px] tracking-[0.32px] text-[#f2f2f2]"
                      style={{ fontFamily: "'Fjalla One', sans-serif" }}
                    >
                      {item.name}
                    </p>
                    <p className="text-[13px] leading-[18.3px] tracking-[0.26px] text-[#d6d6d6] font-[var(--font-figtree)]">
                      {item.role}
                    </p>
                  </div>
                </div>
                <p
                  className="text-[56px] leading-none text-[#f95c4b]"
                  style={{ fontFamily: "'Fjalla One', sans-serif" }}
                >
                  “
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-9 flex items-center justify-center gap-2">
          <span className="size-[10px] rounded-full bg-[#f95c4b]" />
          <span className="size-[10px] rounded-full bg-[#3a3a3a]" />
          <span className="size-[10px] rounded-full bg-[#3a3a3a]" />
          <span className="size-[10px] rounded-full bg-[#3a3a3a]" />
          <span className="size-[10px] rounded-full bg-[#3a3a3a]" />
        </div>
      </div>
    </section>
  );
}
