import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Apps from './sections/Apps';
import About from './sections/About';
import Blog from './sections/Blog';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-background">
      {/* Global Grid Background */}
      <div className="fixed inset-0 grid-bg opacity-50 pointer-events-none" />
      
      {/* Noise Overlay */}
      <div className="fixed inset-0 noise pointer-events-none" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Services />
        <Apps />
        <About />
        <Blog />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
