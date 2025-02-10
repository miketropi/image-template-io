import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ClientReviews from './components/ClientReviews';
import PricingTable from './components/PricingTable';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

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
