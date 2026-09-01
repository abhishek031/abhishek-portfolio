import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import GithubActivity from "./components/GithubActivity";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AIAssistant from "./components/AIAssistant";

function App() {
  return (
    <main className="min-h-screen bg-ink text-text selection:bg-signal selection:text-ink">
      <Navbar />
      <Hero />
      <GithubActivity />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
      <AIAssistant />
    </main>
  );
}

export default App;