import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Ticker } from "@/components/ticker";
import { AgentLog } from "@/components/agent-log";
import { Projects } from "@/components/projects";
import { BananaBand } from "@/components/banana-band";
import { About } from "@/components/about";
import { Stack } from "@/components/skills";
import { Writing } from "@/components/writing";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";

export default function Portfolio() {
  return (
    <>
      <Header home />
      <main>
        <Hero />
        <Ticker />
        <AgentLog />
        <Projects />
        <BananaBand />
        <About />
        <Stack />
        <Writing />
        <Contact />
        <Reveal />
      </main>
      <Footer />
    </>
  );
}
