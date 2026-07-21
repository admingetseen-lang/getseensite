import { Hero } from "../sections/Hero";
import { ScrollVideo } from "../sections/ScrollVideo";
import { About } from "../sections/About";
import { Services } from "../sections/Services";
import { Benefits } from "../sections/Benefits";
import { WebsiteCheck } from "../sections/WebsiteCheck";
import { CloudShowcase } from "../sections/CloudShowcase";
import { Clients } from "../sections/Clients";
import { DemoCTA } from "../sections/DemoCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollVideo />
      <About />
      <Services />
      <Benefits />
      <WebsiteCheck />
      <CloudShowcase />
      <Clients />
      <DemoCTA />
    </>
  );
}
