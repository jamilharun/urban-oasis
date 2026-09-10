import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Eleanor Vance',
    source: 'Architectural Digest',
    text: 'A masterclass in modern hospitality. Urban Oasis manages to provide the intimacy of a private residence with the flawless execution of a 5-star hotel.',
    rating: 5,
  },
  {
    id: 2,
    name: 'James & Clara Bow',
    source: 'Verified Guests',
    text: 'The Crown Penthouse exceeded every expectation. Waking up to the panoramic skyline views while having our morning coffee prepared by the concierge was unforgettable.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Marcus Sterling',
    source: 'Condé Nast Traveler',
    text: 'The definitive answer to luxury short-term stays. The bespoke materials, the silence of the suites, and the exclusive spa access make it peerless in the city.',
    rating: 5,
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-condo-light text-condo-dark relative overflow-hidden">
      {/* Decorative dot pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#0f172a 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-condo-ink uppercase tracking-[0.2em] text-sm font-semibold mb-4">Word of Mouth</p>
          <h2 className="text-4xl md:text-5xl font-display font-light mb-6">Guest Experiences</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300">
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-condo-ink text-condo-ink" />
                  ))}
                </div>
                <p className="text-gray-600 font-light leading-relaxed mb-8 italic text-lg">
                  "{review.text}"
                </p>
              </div>
              <div>
                <h3 className="font-medium text-lg font-display">{review.name}</h3>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">{review.source}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
