/**
 * Main Portfolio Homepage Component
 * 
 * This is the root page component that orchestrates all sections of the portfolio.
 * It imports and renders all major sections in a specific order to create a 
 * cohesive user experience flow from hero to contact.
 * 
 * @component
 * @returns {JSX.Element} The complete homepage with all sections
 */

// SEO and Meta Data
import SEOHead from '@/components/SEOHead';

// Layout Components
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

// Hero and Introduction Sections
import HeroSection from '@/components/sections/HeroSection';
// import Advanced3DHero from '@/components/3d/Advanced3DHero';
import AboutSection from '@/components/sections/AboutSection';

// Skills and Technical Showcase
import SkillsSection from '@/components/sections/SkillsSection';
import TechnicalSkillsVisualization from '@/components/sections/TechnicalSkillsVisualization';

// Project and Experience Sections
import ExperienceSection from '@/components/sections/ExperienceSection';
import BlockchainDashboard from '@/components/sections/BlockchainDashboard';
import CreativeFrontendPlayground from '@/components/sections/CreativeFrontendPlayground';
import InteractiveCodeEditor from '@/components/sections/InteractiveCodeEditor';
import AlgorithmVisualization from '@/components/sections/AlgorithmVisualization';

// Advanced Interactive Components (Currently Disabled for Performance)
// import WebGLParticleSystem from '@/components/sections/WebGLParticleSystem';
// import PerformanceDashboard from '@/components/sections/PerformanceDashboard';
// import MatrixTerminal from '@/components/sections/MatrixTerminal';

// Contact and Footer
import ContactSection from '@/components/sections/ContactSection';

/**
 * Home Page Component
 * 
 * Renders the complete portfolio homepage with all sections in optimized order:
 * 1. SEO Head - Meta tags and SEO optimization
 * 2. Header - Navigation and branding
 * 3. Hero Sections - Introduction and 3D showcase
 * 4. About - Personal information and story
 * 5. Skills - Technical skills with visualizations
 * 6. Experience - Professional background
 * 7. Projects - Interactive showcases (Blockchain, Code Editor, etc.)
 * 8. Contact - Contact form and information
 * 9. Footer - Links and additional information
 * 
 * @returns {JSX.Element} Complete homepage structure
 */
export default function Home() {
  return (
    <>
      {/* SEO Meta Tags and Head Configuration */}
      <SEOHead />
      
      {/* Fixed Navigation Header */}
      <Header />
      
      {/* Main Content Container with Responsive Optimization */}
      <main className="gpu-accelerated">
        {/* Hero and Introduction Sections */}
        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          <HeroSection />
          {/* <Advanced3DHero /> */}
          <AboutSection />
        </div>
        
        {/* Skills and Technical Capabilities */}
        <div className="space-y-8 sm:space-y-12 lg:space-y-16 mt-8 sm:mt-12 lg:mt-16">
          <SkillsSection />
          <TechnicalSkillsVisualization />
        </div>
        
        {/* Professional Experience */}
        <div className="mt-8 sm:mt-12 lg:mt-16">
          <ExperienceSection />
        </div>
        
        {/* Interactive Project Showcases - Temporarily disabled */}
        <div className="space-y-8 sm:space-y-12 lg:space-y-16 mt-8 sm:mt-12 lg:mt-16">
          {/* <BlockchainDashboard />
          <CreativeFrontendPlayground />
          <InteractiveCodeEditor />
          <AlgorithmVisualization /> */}
        </div>
        
        {/* Contact Section */}
        <div className="mt-8 sm:mt-12 lg:mt-16">
          <ContactSection />
        </div>
        
        {/* 
          Heavy Interactive Components - Currently Disabled for Performance
          These can be re-enabled when needed:
          - <WebGLParticleSystem />
          - <PerformanceDashboard />
          - <MatrixTerminal />
        */}
      </main>
      
      {/* Site Footer */}
      <Footer />
    </>
  );
}
