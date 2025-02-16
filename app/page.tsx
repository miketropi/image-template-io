import HeroSection from './components/HeroSection';
import ClientReviews from './components/ClientReviews';
import PricingTable from './components/PricingTable';
import CallToAction from './components/CallToAction';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection /> 
      <ClientReviews />
      <PricingTable />
      <CallToAction />
    </main>
  );
}
