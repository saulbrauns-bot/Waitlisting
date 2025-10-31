import Header from "@/app/components/header/Header";
import StickySubnav from "@/app/components/nav/StickySubnav";
import Hero from "@/app/components/hero/Hero";
import Section from "@/app/components/sections/Section";
import WhyBridgeSection from "@/app/components/sections/WhyBridgeSection";
import PerksSection from "@/app/components/sections/PerksSection";
import FAQSection from "@/app/components/sections/FAQSection";
import WaitlistForm from "@/app/components/forms/WaitlistForm";
import ScrollToTop from "@/app/components/ScrollToTop";
import {
  SECTIONS,
  FOOTER,
} from "@/app/constants/landing-content";

export default function HomePage() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="min-h-dvh">
        <StickySubnav />
        <Hero />

        <WhyBridgeSection />

        {/* Founding Member Perks Section */}
        <PerksSection backgroundColor="var(--color-bridge-gradient-3)" />

        {/* FAQ Section */}
        <FAQSection backgroundColor="var(--color-bridge-gradient-4)" />

        <Section
          id={SECTIONS.WAITLIST.id}
          title={SECTIONS.WAITLIST.title}
          description={SECTIONS.WAITLIST.description}
          className="text-center"
          backgroundColor="var(--color-bridge-gradient-5)"
        >
          <WaitlistForm showSocialProof={false} />
          <p className="mt-6 text-sm text-bridge-text-muted">
            By joining, you'll secure your founding member benefits and priority matching.
          </p>
        </Section>

        {/* Footer */}
        <footer
          className="border-t border-bridge-border px-6 py-16"
          style={{ backgroundColor: "var(--color-bridge-gradient-5)" }}
          aria-label="Site footer"
        >
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-center gap-6">
              <div className="text-4xl font-bold text-bridge-blue">
                {FOOTER.brandName}
              </div>
              <p className="text-bridge-text-muted text-center">
                {FOOTER.copyright}
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
