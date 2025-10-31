import Header from "@/app/components/header/Header";
import StickySubnav from "@/app/components/nav/StickySubnav";
import Hero from "@/app/components/hero/Hero";
import Section from "@/app/components/sections/Section";
import StepCard from "@/app/components/cards/StepCard";
import FeatureCard from "@/app/components/cards/FeatureCard";
import {
  HOW_IT_WORKS_STEPS,
  WHY_BRIDGE_FEATURES,
  SECTIONS,
  FOOTER,
} from "@/app/constants/landing-content";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-dvh">
        <StickySubnav />
        <Hero />

        {/* Keep "How it works" below the fold */}
        <Section
          id={SECTIONS.HOW.id}
          title={SECTIONS.HOW.title}
          description={SECTIONS.HOW.description}
        >
          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS_STEPS.map((step) => (
              <StepCard key={step.num} step={step} />
            ))}
          </div>
        </Section>

        <Section
          id={SECTIONS.WHY.id}
          title={SECTIONS.WHY.title}
          description={SECTIONS.WHY.description}
        >
          <div className="grid md:grid-cols-3 gap-6">
            {WHY_BRIDGE_FEATURES.map((feature, idx) => (
              <FeatureCard key={idx} feature={feature} />
            ))}
          </div>
        </Section>

        <Section
          id={SECTIONS.WAITLIST.id}
          title={SECTIONS.WAITLIST.title}
          description={SECTIONS.WAITLIST.description}
          className="text-center"
        >
          <div className="max-w-md mx-auto bg-bridge-surface border border-bridge-border rounded-2xl p-6 shadow-bridge">
            <p className="text-bridge-text mb-4">
              Simple email form placeholder
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="flex-1 rounded-xl border border-bridge-border bg-white/90 px-4 py-3 outline-none focus:ring-2 focus:ring-bridge-blue-light"
              />
              <button
                type="submit"
                className="rounded-xl bg-bridge-blue text-white px-5 py-3 shadow-bridge transition-[opacity,box-shadow,transform] duration-300 ease-out hover:shadow-bridge-hover hover:opacity-95 hover:translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-bridge-blue-light focus:ring-offset-2"
              >
                Join waitlist
              </button>
            </form>
          </div>
        </Section>

        {/* Footer */}
        <footer
          className="border-t border-bridge-border bg-bridge-background px-6 py-16"
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
