import { Layout } from "@/components/layout/Layout";
import { 
  HeroSection, 
  StatsCounterSection,
  HowItWorksSection,
  CommunitySection,
  RecentMediaSection,
  WhyChooseUsSection, 
  AboutCharitiesSection,
  PartnersSection,
  CTASection 
} from "@/components/home/HomeSections";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <HowItWorksSection />
      <CommunitySection />
      <StatsCounterSection />
      <RecentMediaSection />
      <WhyChooseUsSection />
      <AboutCharitiesSection />
      <PartnersSection />
      <CTASection />
    </Layout>
  );
};

export default Index;