"use client";

import Link from "next/link";

const blogPosts = [
  {
    category: "Creator Growth",
    title: "How to Build a Personal Brand That Attracts Opportunities",
    date: "January 15, 2026",
    excerpt:
      "Learn how to position yourself, grow your audience, and stand out in a competitive creator economy.",
    image: "/assets/images/Frame 2147243547.png",
  },
  {
    category: "Design & Creativity",
    title: "The Impact of Creative Content on Audience Engagement",
    date: "February 2, 2026",
    excerpt:
      "Discover how high-quality design and storytelling can significantly improve your reach and conversions.",
    image: "/assets/images/Frame 2147243550.png",
  },
  {
    category: "Monetization",
    title: "Future-Proof Strategies to Monetize Your Content in 2026",
    date: "February 18, 2026",
    excerpt:
      "Explore proven monetization models that help creators generate consistent income online.",
    image: "/assets/images/blogs/blog_4.png",
  },
];

export default function OurBlog() {
  return (
    <section className="w-full bg-[#f6f4f1] px-5 py-20 md:px-16 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[434px]">
            <p
              className="text-[16px] leading-[25.8px] tracking-[0.32px] text-[#1a1a1a]"
              style={{ fontFamily: "'Fjalla One', sans-serif" }}
            >
              OUR BLOG
            </p>
            <h2
              className="mt-4 text-[32px] leading-[1.3] tracking-[0.8px] text-[#1a1a1a] md:text-[40px] md:leading-[57.6px]"
              style={{ fontFamily: "'Fjalla One', sans-serif" }}
            >
              Stay Inspired with Insights from Top Creators
            </h2>
          </div>

          <div className="max-w-[618px] md:text-right">
            <p className="text-[19px] font-semibold leading-[29.2px] tracking-[0.38px] text-[#5a5a5a] font-[var(--font-figtree)]">
              Explore expert tips, growth strategies, and industry trends to help
              you succeed as a creator and learner.
            </p>
            <Link
              href="/blogs"
              className="mt-4 inline-flex items-center justify-center rounded-[42px] border border-[#ff9465] bg-[#f6f4f1] px-4 py-3 text-[16px] text-[#1a1a1a] shadow-[8px_8px_20px_rgba(69,9,0,0.16)]"
              style={{ fontFamily: "var(--font-lexend), 'Lexend', sans-serif" }}
            >
              View All Articles
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.title} className="flex flex-col gap-[10px]">
              <div className="overflow-hidden rounded-[24px]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-[320px] w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="space-y-1">
                <p className="text-[13px] leading-[18.3px] tracking-[0.26px] text-[#3a3a3a] font-[var(--font-figtree)]">
                  {post.category}
                </p>
                <h3
                  className="text-[16px] leading-[25.8px] tracking-[0.32px] text-[#3a3a3a]"
                  style={{ fontFamily: "'Fjalla One', sans-serif" }}
                >
                  {post.title}
                </h3>
                <p className="text-[13px] leading-[18.3px] tracking-[0.26px] text-[#9a9a9a] font-[var(--font-figtree)]">
                  {post.date}
                </p>
                <p className="text-[16px] leading-[25.8px] tracking-[0.32px] text-[#9a9a9a] font-[var(--font-figtree)]">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
