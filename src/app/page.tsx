import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { SelectedWork } from "@/components/sections/selected-work";
import { WritingPreview } from "@/components/sections/writing-preview";
import { Talks } from "@/components/sections/talks";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { Technical } from "@/components/sections/technical";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <SelectedWork />
      <WritingPreview />
      <Talks />
      <Experience />
      <Education />
      <Technical />
      <Certifications />
      <Contact />
    </>
  );
}
