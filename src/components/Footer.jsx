export default function Footer() {
  return (
    <footer id="contact" className="bg-condo-dark pt-20 pb-10 border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-2">
            <span className="text-3xl font-display font-bold tracking-widest uppercase mb-6 inline-block">Urban Oasis</span>
            <p className="text-gray-400 max-w-md font-light leading-relaxed">
              A single building, thirty-two floors, six resident-hosted suites. Book the room and the building together — spa, pool, chef and concierge attached to the stay.
            </p>
          </div>
          
          <div>
            <h4 className="text-condo-accent tracking-widest uppercase text-sm font-semibold mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400 font-light">
              <li>123 Luxury Avenue</li>
              <li>Metropolis, NY 10001</li>
              <li>+1 (555) 123-4567</li>
              <li>inquiries@urbanoasis.com</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-condo-accent tracking-widest uppercase text-sm font-semibold mb-6">Follow Us</h4>
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
