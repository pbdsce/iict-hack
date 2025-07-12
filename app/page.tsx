import { Hero } from "@/components/landing/Hero";
import { Timeline } from "@/components/landing/Timeline";
import Themes from "@/components/landing/Themes";
import Brief from "@/components/landing/FAQ";
import { SectionDecorations } from "@/components/ui/section-decorations";

export default function Home() {
  return (
    <div className="font-inter pt-20 relative z-10">
      <section id="home" className="min-h-screen relative">
        <SectionDecorations variant="hero" />
        <Hero />
      </section>
      <section id="themes" className="min-h-screen relative">
        <SectionDecorations variant="themes" />
        <Themes/>
      </section>
      <section id="timeline" className="min-h-screen relative">
        <SectionDecorations variant="timeline" />
        <Timeline/>
      </section>
      <section id="faq" className="relative">
        <SectionDecorations variant="faq" />
        <Brief/>
      </section>
    </div>
  );
}
