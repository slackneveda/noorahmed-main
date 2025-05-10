import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Education from "@/components/education"
import Certificates from "@/components/certificates"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { TracingBeam } from "@/components/ui/tracing-beam"
import ScrollToTop from "@/components/scroll-to-top"
import { SmoothCursor } from "@/components/ui/smooth-cursor";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <SmoothCursor />

      <Navbar />
      <TracingBeam className="px-6">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Certificates />
        <Contact />
      </TracingBeam>
      <ScrollToTop />
      <Footer />
    </main>
  )
}
