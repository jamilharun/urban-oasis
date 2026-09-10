import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AvailableSuites from './components/AvailableSuites';
import Privileges from './components/Privileges';
import FloorStack from './components/FloorStack';
import Hosts from './components/Hosts';
import Testimonials from './components/Testimonials';
import History from './components/History';
import Footer from './components/Footer';
import StaySummary from './components/StaySummary';

function App() {
  return (
    <BookingProvider>
      <div className="relative min-h-screen font-sans selection:bg-condo-accent selection:text-condo-dark">
        {/* The ground — see index.css. Fixed layers, so scrolling never repaints them. */}
        <div aria-hidden className="ground-ambient" />
        <div aria-hidden className="ground-structure" />
        <div aria-hidden className="ground-grain" />
        <a
          href="#suites"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:top-4 focus:left-4 focus:bg-condo-accent focus:text-condo-dark focus:px-4 focus:py-2 focus:rounded-control"
        >
          Skip to available suites
        </a>
        <Navbar />
        <main className="pb-40">
          <Hero />
          <AvailableSuites />
          <Privileges />
          <FloorStack />
          <Hosts />
          <Testimonials />
          <History />
        </main>
        <Footer />
        <StaySummary />
      </div>
    </BookingProvider>
  );
}

export default App;
