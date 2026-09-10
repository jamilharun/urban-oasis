import Hero from '../components/Hero';
import AvailableSuites from '../components/AvailableSuites';
import Privileges from '../components/Privileges';
import FloorStack from '../components/FloorStack';
import Hosts from '../components/Hosts';
import Testimonials from '../components/Testimonials';
import History from '../components/History';

export default function Home() {
  return (
    <main id="main" className="pb-24">
      <Hero />
      <AvailableSuites />
      <Privileges />
      <FloorStack />
      <Hosts />
      <Testimonials />
      <History />
    </main>
  );
}
