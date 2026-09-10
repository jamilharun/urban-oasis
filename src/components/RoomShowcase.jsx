import { ArrowRight, Maximize, BedDouble, Bath } from 'lucide-react';

const rooms = [
  {
    id: 'studio',
    name: 'The Minimalist',
    type: 'Studio Suite',
    description: 'Open-concept spaces designed for the modern individual. Features smart storage, integrated living areas, and floor-to-ceiling city views.',
    image: '/images/studio.png',
    size: '450 - 550 sq ft',
    bed: '1',
    bath: '1'
  },
  {
    id: '1bed',
    name: 'The Urbanite',
    type: '1-Bedroom Residence',
    description: 'Spacious layouts with distinct living and sleeping quarters. Perfect for young professionals seeking both comfort and style.',
    image: '/images/1bed.png',
    size: '700 - 850 sq ft',
    bed: '1',
    bath: '1.5'
  },
  {
    id: 'penthouse',
    name: 'The Executive',
    type: '2-Bedroom / Penthouse',
    description: 'Expansive luxury suites with premium finishes, panoramic skyline views, and double-height ceilings for ultimate grandeur.',
    image: '/images/penthouse.png',
    size: '1,200 - 2,500 sq ft',
    bed: '2-3',
    bath: '2.5+'
  }
];

export default function RoomShowcase() {
  return (
    <section id="residences" className="py-24 bg-condo-dark text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-condo-accent uppercase tracking-[0.2em] mb-2 text-sm">Curated Living Spaces</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Exceptional Residences</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Meticulously designed layouts tailored to elevate your daily experience.</p>
        </div>

        <div className="space-y-24">
          {rooms.map((room, index) => (
            <div key={room.id} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="w-full lg:w-3/5 group overflow-hidden relative">
                <img 
                  src={room.image} 
                  alt={room.name} 
                  className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              
              <div className="w-full lg:w-2/5 space-y-6">
                <div>
                  <span className="text-condo-accent tracking-widest uppercase text-xs font-semibold">{room.type}</span>
                  <h3 className="text-3xl font-display font-bold mt-2">{room.name}</h3>
                </div>
                <p className="text-gray-400 font-light leading-relaxed">
                  {room.description}
                </p>
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                  <div className="flex flex-col">
                    <Maximize className="w-5 h-5 text-condo-accent mb-2" />
                    <span className="text-sm font-semibold">{room.size}</span>
                  </div>
                  <div className="flex flex-col">
                    <BedDouble className="w-5 h-5 text-condo-accent mb-2" />
                    <span className="text-sm font-semibold">{room.bed}</span>
                  </div>
                  <div className="flex flex-col">
                    <Bath className="w-5 h-5 text-condo-accent mb-2" />
                    <span className="text-sm font-semibold">{room.bath}</span>
                  </div>
                </div>
                <button className="mt-8 flex items-center gap-2 text-white hover:text-condo-accent transition-colors group">
                  <span className="uppercase tracking-wider font-semibold text-sm">View Floor Plans</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
