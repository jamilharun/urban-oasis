import Plate from './Plate';

export default function History() {
  return (
    <section id="history" className="py-36 text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            {/* The offset frame is inset rather than negative-inset: at -inset-4 it hung
                16px past the column and gave the whole page a horizontal scrollbar. */}
            <div className="relative pr-4 pb-4">
              <div className="absolute top-4 left-4 right-0 bottom-0 border border-condo-accent/30"></div>
              <Plate
                src="/images/founder"
                alt="Elias Sterling, the architect"
                className="relative w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <p className="text-condo-accent uppercase tracking-[0.2em] mb-2 text-sm font-semibold">The Vision</p>
              <h2 className="text-display-sm md:text-display-md font-display font-light">A New Era of <br/>Hospitality</h2>
            </div>
            <div className="space-y-6 text-gray-400 font-light leading-relaxed text-lg">
              <p>
                In 1998, renowned architect Elias Sterling envisioned a sanctuary that didn't just pierce the skyline, but embraced the serenity of nature within a concrete jungle.
              </p>
              <p>
                "A true retreat isn't found in a transient hotel," Sterling famously wrote. "It is forged from the silence we crave and the intimacy of a true home."
              </p>
              <p>
                Urban Oasis opens its doors to discerning travelers. Through our exclusive resident-hosted platform, guests can bypass traditional hotels and experience the pinnacle of architectural design, immersed in a community that values privacy, luxury, and serenity above all else.
              </p>
            </div>
            <div className="pt-6">
              <span className="font-display italic text-3xl text-condo-accent opacity-80">Elias Sterling</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
