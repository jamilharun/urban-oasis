import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import ScrollManager from './components/ScrollManager';
import Footer from './components/Footer';
import Home from './pages/Home';
import SuiteDetails from './pages/SuiteDetails';
import Reserve from './pages/Reserve';

function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <ScrollManager />
        <div className="relative min-h-screen font-sans selection:bg-condo-accent selection:text-condo-dark">
          {/* The ground — see index.css. Fixed layers, so scrolling never repaints them. */}
          <div aria-hidden className="ground-ambient" />
          <div aria-hidden className="ground-structure" />
          <div aria-hidden className="ground-grain" />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:top-4 focus:left-4 focus:bg-condo-accent focus:text-condo-dark focus:px-4 focus:py-2 focus:rounded-control"
          >
            Skip to main content
          </a>
          <Navbar />
          <RoutedPages />
          <Footer />
        </div>
      </BrowserRouter>
    </BookingProvider>
  );
}

/**
 * Keyed on pathname so each page animates in. Remounting also clears any
 * page-local state, which is correct here — a reservation's privileges belong
 * to the suite you were on, not the next one. The hash is deliberately not
 * part of the key, so in-page anchors don't retrigger the fade.
 */
function RoutedPages() {
  const { pathname } = useLocation();
  return (
    <div key={pathname} className="route-fade">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/suite/:id" element={<SuiteDetails />} />
        <Route path="/suite/:id/reserve" element={<Reserve />} />
      </Routes>
    </div>
  );
}

export default App;
