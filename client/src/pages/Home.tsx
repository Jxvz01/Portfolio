import React, { useEffect } from 'react';
import Hero from '../components/Hero/Hero';
import About from '../components/Sections/About';
import Skills from '../components/Sections/Skills';
import Projects from '../components/Sections/Projects';
import Contact from '../components/Sections/Contact';
import Footer from '../components/UI/Footer';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-[#0D0D0D] scroll-smooth">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />

      {/* Global Grain/Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.02] mix-blend-overlay bg-black/40" />
    </div>
  );
};

export default Home;
