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
    <section className="py-28 bg-condo-light text-condo-dark relative overflow-hidden">
      {/* Decorative dot pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#0f172a 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="reveal text-center mb-16 max-w-measure mx-auto">
          <p className="text-condo-ink eyebrow mb-4">Word of Mouth</p>
          <h2 className="text-balance text-display-sm md:text-display-md font-display font-light mb-6">Guest Experiences</h2>
        </div>

        <div className="reveal-group grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="reveal bg-white p-8 rounded-card shadow-sm border border-gray-100 flex flex-col justify-between transition-shadow duration-300 hover:shadow-md">
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-condo-ink text-condo-ink" />
                  ))}
                </div>
                <p className="text-pretty [hanging-punctuation:first] text-gray-600 font-light leading-relaxed mb-8 italic text-lg">
                  "{review.text}"
                </p>
              </div>
              <div>
                <h3 className="text-balance font-medium text-lg font-display">{review.name}</h3>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">{review.source}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
