import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Skills from '@/components/Skills/Skills';
import Experience from '@/components/Experience/Experience';
import Contact from '@/components/Contact/Contact';
import Hobbies from '@/components/Hobbies/Hobbies';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Contact />
      <Hobbies />
    </main>
  );
}
