import { Layout } from "@/components/layout/Layout";
import { Navigate, useParams } from "react-router-dom";
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
  const { location } = useParams();
  const validLocations = ["uppsala", "lund"];

  // If the URL is something like /stockholm, kick them back to Gateway
  if (location && !validLocations.includes(location.toLowerCase())) {
    return <Navigate to="/" replace />;
  }

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