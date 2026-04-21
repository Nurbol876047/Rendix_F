import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ErrorBoundary from './components/ErrorBoundary';
import FinalComputerScene from './components/FinalComputerScene';
import Process from './components/Process';
import Preloader from './components/Preloader';
import Proof from './components/Proof';
import SeoManager from './components/SeoManager';
import WhyUs from './components/WhyUs';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <SeoManager />
      <Preloader />
      <div className="app-container">
        <Navbar />
        <main>
          <Hero />
          <Skills />
          <WhyUs />
          <Process />
          <ErrorBoundary
            fallback={
              <section className="final-computer">
                <div className="container">
                  <div className="final-computer-shell glass-panel" />
                </div>
              </section>
            }
          >
            <FinalComputerScene />
          </ErrorBoundary>
          <Projects />
          <Proof />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
