import SEOHead from '@/components/SEOHead';
import Header from '@/components/ui/Header';
import HeroSection from '@/components/sections/HeroSection';
import Advanced3DHero from '@/components/3d/Advanced3DHero';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import TechnicalSkillsVisualization from '@/components/sections/TechnicalSkillsVisualization';
import BlockchainDashboard from '@/components/sections/BlockchainDashboard';
import InteractiveCodeEditor from '@/components/sections/InteractiveCodeEditor';
import AlgorithmVisualization from '@/components/sections/AlgorithmVisualization';
import WebGLParticleSystem from '@/components/sections/WebGLParticleSystem';
import PerformanceDashboard from '@/components/sections/PerformanceDashboard';
import ExperienceSection from '@/components/sections/ExperienceSection';
import MatrixTerminal from '@/components/sections/MatrixTerminal';
import CreativeFrontendPlayground from '@/components/sections/CreativeFrontendPlayground';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/ui/Footer';

export default function Home() {
  return (
    <>
      <SEOHead />
      <Header />
      <main>
        <HeroSection />
        <Advanced3DHero />
        <AboutSection />
        <SkillsSection />
        <TechnicalSkillsVisualization />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
