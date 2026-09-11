import Plate from './Plate';

export default function Footer() {
  return (
    /* `isolate` matters: it gives the footer its own stacking context, so the
       -z-10 backdrop sits behind the footer's text but still above the page
       ground, whose three layers are fixed at z-index -1 to -3. */
    <footer
      id="contact"
      className="scroll-mt-24 relative isolate overflow-hidden pt-24 pb-10 border-t border-white/10 text-white"
    >
      {/* The building again, to close on what the page opened with. Cropped to
          the top so the podium — and the other brands on its signage — stay out
          of frame, then buried under a scrim: this is atmosphere, not a photo
          competing with the contact details. */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Plate
          src="/images/building/hero"
          alt=""
          className="w-full h-full object-cover object-top scale-105 blur-[1.5px] brightness-[0.8] saturate-[0.9]"
        />
        <div className="absolute inset-0 bg-condo-dark/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-condo-dark via-condo-dark/40 to-condo-dark/85" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-2">
            <span className="text-3xl font-display font-bold tracking-widest uppercase mb-6 inline-block">Urban Oasis</span>
            <p className="text-gray-400 max-w-md font-light leading-relaxed">
              A single building, thirty-two floors, six resident-hosted suites. Book the room and the building together — spa, pool, chef and concierge attached to the stay.
            </p>
          </div>
          
          <div>
            <h4 className="text-balance font-display text-condo-accent tracking-widest uppercase text-sm font-semibold mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400 font-light">
              {/* Deliberately unmistakable placeholders. example.com is reserved
                  by RFC 2606 for exactly this, so it cannot collide with a real
                  domain the way urbanoasis.com might. */}
              <li>123 Example Street</li>
              <li>Anytown, 12345</li>
              <li>1234567890</li>
              <li>abcd@example.com</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-balance font-display text-condo-accent tracking-widest uppercase text-sm font-semibold mb-6">Follow Us</h4>
            <ul className="space-y-4 text-gray-400 font-light">
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center md:text-left text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Urban Oasis. A UX concept, not a real property.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
