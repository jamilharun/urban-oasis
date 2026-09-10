import { MapPin } from 'lucide-react';

export default function MapSection() {
  return (
    <section id="location" className="relative h-[70vh] w-full bg-condo-dark flex items-center justify-center overflow-hidden">
      <img 
        src="/images/map.png" 
        alt="Forest Location Map" 
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-condo-dark via-condo-dark/20 to-condo-dark/80"></div>
      
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-condo-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(192,160,98,0.5)]">
          <MapPin className="w-8 h-8 text-condo-dark" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Escape to the Forest</h2>
        <p className="text-lg text-gray-300 font-light mb-8">
          Conceptually nestled in the heart of a lush, untouched reserve. Experience the ultimate retreat from the city noise.
        </p>
        <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold tracking-widest uppercase hover:bg-condo-accent hover:text-condo-dark transition-all duration-300">
          Get Directions
        </button>
      </div>
    </section>
  );
}
