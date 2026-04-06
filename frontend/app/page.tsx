import Navbar from "../src/components/Navbar";
import Hero from "../src/components/Hero";
import Marquee from "../src/components/Marquee";
import WhatsTrending from "../src/components/WhatsTrending";
import WhyCreatorHub from "../src/components/WhyCreatorHub";
import EmpowerBanner from "../src/components/EmpowerBanner";
import FeaturedCreatorsHeader from "../src/components/FeaturedCreatorsHeader";
import FeaturedCreatorsCarousel from "../src/components/FeaturedCreatorsCarousel";
import CreatorsBanner from "../src/components/CreatorsBanner";
import OurImpact from "../src/components/OurImpact";
import Pricing from "../src/components/Pricing";
import MeetTheCreators from "../src/components/MeetTheCreators";
import OurProcess from "../src/components/OurProcess";
import Testimonials from "../src/components/Testimonials";
import OurBlog from "../src/components/OurBlog";
import DesktopNewsletter from "../src/components/DesktopNewsletter";
import MobileLandingExact from "../src/components/MobileLandingExact";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-390px)] overflow-x-hidden">
      <div className="md:hidden">
        <MobileLandingExact />
      </div>

      <div className="hidden md:block">
        <Navbar />
        <Hero />
        <Marquee />
        <WhatsTrending />
        <WhyCreatorHub />
        <EmpowerBanner />
        <FeaturedCreatorsHeader />
        <FeaturedCreatorsCarousel />
        <CreatorsBanner />
        <OurImpact />
        <Pricing />
        <MeetTheCreators />
        <OurProcess />
        <Testimonials />
        <OurBlog />
        <DesktopNewsletter />
      </div>
    </main>
  );
}
