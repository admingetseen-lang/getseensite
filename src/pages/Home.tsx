import { Hero } from "../sections/Hero";
import { About } from "../sections/About";
import { Services } from "../sections/Services";
import { Benefits } from "../sections/Benefits";
import { CloudShowcase } from "../sections/CloudShowcase";
import { DemoCTA } from "../sections/DemoCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Benefits />
      <CloudShowcase />
      <DemoCTA />
    </>
  );
}
