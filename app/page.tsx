import Header from "@/app/components/header/Header";
import Hero from "@/app/components/hero/Hero";
import WhyBridgeSection from "@/app/components/sections/WhyBridgeSection";
import WaitlistSection from "@/app/components/sections/WaitlistSection";
import ScrollToTop from "@/app/components/ScrollToTop";
import {
  FOOTER,
} from "@/app/constants/landing-content";
import { IMAGE_PATHS } from "@/app/constants/image-paths";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="min-h-dvh">
        <Hero />

        <WhyBridgeSection />

        {/* Waitlist Section with Bench Image */}
        <div className="relative">
          <WaitlistSection />

          {/* Bench Image - positioned in bottom right corner (hidden on mobile) */}
          <div className="hidden md:block absolute bottom-0 right-6 w-48 md:w-64 lg:w-80 pointer-events-none">
            <Image
              src={IMAGE_PATHS.BENCH}
              alt="Park bench representing connection and meeting"
              width={400}
              height={300}
              className="object-contain w-full h-auto mix-blend-multiply opacity-90"
              priority={false}
            />
          </div>
        </div>

        {/* Footer */}
        <footer
          className="border-t border-bridge-border px-4 sm:px-6 py-12 sm:py-16"
          style={{ backgroundColor: "var(--color-bridge-gradient-5)" }}
          aria-label="Site footer"
        >
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-center gap-4 sm:gap-6">
              <div className="relative h-12 w-48 sm:h-16 sm:w-64">
                <Image
                  src="/images/BridgeLogo.png"
                  alt="Bridge"
                  fill
                  className="object-contain"
                  style={{
                    filter: 'brightness(1.2) contrast(1.1)',
                    mixBlendMode: 'darken'
                  }}
                  priority={false}
                />
              </div>
              <p className="text-bridge-text-muted text-center text-sm sm:text-base">
                {FOOTER.copyright}
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
