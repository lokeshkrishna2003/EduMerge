import React from 'react';
import HeroSection from './Herosection/HeroSection';
import AboutSection from './AboutSection';
import FeaturesSection from './FeaturesSection';
import TestimonialsSection from './TestimonialsSection';
import CallToActionSection from './CallToActionSection';
import VisitorStatsSection from './visitors and registrations/VisitorStatsSection';
import FooterSection from './FooterSection';
import HeaderSection from './HeaderSection';


const LandingPage = () => {
  return (
    <div>

    <HeaderSection/>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CallToActionSection />
      <VisitorStatsSection />
      <FooterSection />
    </div>
  );
};

export default LandingPage;
