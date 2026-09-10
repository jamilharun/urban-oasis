import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Check, Star, Maximize, MoveVertical, Bath, Compass, Sofa, Droplets,
} from 'lucide-react';
import { suites, standingPrivileges, reviewSummary } from '../data/building';
import { currency } from '../lib/format';
import HostCard from '../components/HostCard';
import SuiteNotFound from '../components/SuiteNotFound';
import Plate from '../components/Plate';

export default function SuiteDetails() {
  const { id } = useParams();
  const suite = suites.find((s) => s.id === id);

  if (!suite) return <SuiteNotFound id={id} />;

  const { count, average } = reviewSummary(suite);
  const specs = [
    { icon: Maximize, label: 'Size', value: suite.specs.size },
    { icon: MoveVertical, label: 'Ceiling', value: suite.specs.ceiling },
    { icon: Bath, label: 'Bathrooms', value: suite.specs.baths },
    { icon: Compass, label: 'Aspect', value: suite.specs.aspect },
  ];

  return (
    <main id="main" className="scroll-mt-24 pb-24 pt-28 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/#suites"
          className="inline-flex items-center gap-2 text-condo-accent hover:text-white transition-colors mb-8 text-sm uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> All suites
        </Link>

        {/* ---- Title ---------------------------------------------------- */}
        <header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <p className="text-condo-accent eyebrow mb-3">
              Floor {suite.floor} · {suite.type}
            </p>
            <h1 className="text-balance text-display-sm md:text-display-lg font-display font-light">{suite.name}</h1>
            {count > 0 && (
              <p className="flex items-center gap-2 mt-4 text-sm text-gray-300">
                <Star className="w-4 h-4 fill-condo-accent text-condo-accent" />
                <span className="text-white">{average}</span>
                <span className="text-gray-500">·</span>
                <a href="#suite-reviews" className="hover:text-condo-accent transition-colors">
                  {count} guest {count === 1 ? 'review' : 'reviews'} for this suite
                </a>
              </p>
            )}
          </div>

          <div className="shrink-0 lg:text-right">
            <p className="font-sans tabular-font-sans tabular-nums text-3xl text-white">
              {currency(suite.price)}
              <span className="text-sm text-gray-400 font-sans"> / night</span>
            </p>
            <Link
              to={`/suite/${suite.id}/reserve`}
              className="mt-4 inline-flex items-center gap-2 bg-condo-accent text-condo-dark px-7 py-3.5 rounded-control font-semibold tracking-widest uppercase text-sm hover:bg-[#d4b878] transition-colors"
            >
              Check dates & reserve <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* ---- Lead image ---------------------------------------------- */}
        <Plate
          src={suite.image}
          alt={suite.name}
          loading="eager"
          className="w-full h-[58vh] min-h-80 object-cover rounded-card border border-white/10 shadow-2xl mb-6"
        />

        {/* ---- Specs strip --------------------------------------------- */}
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-card overflow-hidden mb-20">
          {specs.map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-condo-panel p-5">
              <dt className="flex items-center gap-2 text-[0.7rem] uppercase tracking-widest text-condo-accent mb-2">
                <Icon className="w-3.5 h-3.5" /> {label}
              </dt>
              <dd className="text-sm text-white">{value}</dd>
            </div>
          ))}
        </dl>

        {/* ---- Room by room -------------------------------------------- */}
        <section className="mb-20">
          <h2 className="text-balance text-3xl font-display font-light mb-10">Room by room</h2>
          <div className="space-y-16">
            {suite.rooms.map((room, i) => (
              <article
                key={room.name}
                className={`reveal flex flex-col lg:flex-row gap-10 items-center ${
                  i % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="w-full lg:w-3/5">
                  <Plate
                    src={room.image}
                    alt={room.name}
                    className="w-full h-80 lg:h-[28rem] object-cover rounded-card border border-white/10"
                  />
                </div>
                <div className="w-full lg:w-2/5 space-y-5">
                  <h3 className="text-balance text-2xl font-display font-light">{room.name}</h3>
                  <p className="text-pretty text-gray-400 font-light leading-relaxed">{room.copy}</p>
                  <ul className="space-y-2 pt-2 border-t border-white/10">
                    {room.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-condo-accent shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---- Furnishings and bath ------------------------------------ */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <div className="rounded-card border border-white/10 bg-white/5 p-8">
            <h2 className="text-balance flex items-center gap-3 text-2xl font-display font-light mb-6">
              <Sofa className="w-5 h-5 text-condo-accent" /> What is in the rooms
            </h2>
            <ul className="space-y-3">
              {suite.furnishings.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-300 font-light">
                  <span aria-hidden className="mt-2 w-1 h-1 rounded-full bg-condo-accent shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-card border border-white/10 bg-white/5 p-8">
            <h2 className="text-balance flex items-center gap-3 text-2xl font-display font-light mb-4">
              <Droplets className="w-5 h-5 text-condo-accent" /> The bathrooms
            </h2>
            <p className="text-pretty text-gray-400 font-light leading-relaxed mb-6">{suite.bath.copy}</p>
            <ul className="space-y-3">
              {suite.bath.fittings.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-300 font-light">
                  <span aria-hidden className="mt-2 w-1 h-1 rounded-full bg-condo-accent shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---- Plan ---------------------------------------------------- */}
        <section className="mb-20">
          <h2 className="text-balance text-3xl font-display font-light mb-8">The plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suite.gallery.map((shot) => (
              <Plate
                key={shot.src}
                src={shot.src}
                alt={shot.alt}
                className="w-full h-72 object-cover rounded-card border border-white/10"
              />
            ))}
          </div>
        </section>

        {/* ---- Reviews for THIS suite ---------------------------------- */}
        {count > 0 && (
          <section id="suite-reviews" className="scroll-mt-24 mb-20">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <h2 className="text-balance text-3xl font-display font-light">
                Guests who stayed in this suite
              </h2>
              <p className="flex items-center gap-2 text-sm text-gray-400">
                <span className="flex" aria-hidden>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(average)
                          ? 'fill-condo-accent text-condo-accent'
                          : 'text-white/25'
                      }`}
                    />
                  ))}
                </span>
                <span className="text-white">{average}</span> from {count} verified{' '}
                {count === 1 ? 'stay' : 'stays'}
              </p>
            </div>

            <div className="reveal-group grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suite.reviews.map((review) => (
                <blockquote
                  key={review.name}
                  className="rounded-card border border-white/10 bg-white/5 p-7 flex flex-col"
                >
                  <div className="flex gap-1 mb-5" aria-label={`${review.rating} out of 5`}>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star
                        key={i}
                        aria-hidden
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-condo-accent text-condo-accent'
                            : 'text-white/25'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-pretty [hanging-punctuation:first] text-gray-300 font-light leading-relaxed italic flex-grow">
                    “{review.text}”
                  </p>
                  <footer className="mt-6 pt-5 border-t border-white/10">
                    <p className="text-white text-sm">{review.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Verified stay · {review.stay}
                    </p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </section>
        )}

        {/* ---- Included, host, and the way out ------------------------- */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-balance text-2xl font-display font-light mb-6">Included with this suite</h2>
            <ul className="space-y-3">
              {standingPrivileges.map((privilege) => (
                <li key={privilege.id} className="flex items-start gap-3 text-gray-300 font-light">
                  <Check className="w-5 h-5 text-condo-accent shrink-0 mt-0.5" />
                  <span>
                    {privilege.name}
                    <span className="block text-xs text-gray-500 mt-0.5">
                      Floor {privilege.floor} · {privilege.hours}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 font-light mt-5">
              The spa, the chef’s table and the sky lounge attach at the next step.
            </p>
          </div>

          <div>
            <h2 className="text-balance text-2xl font-display font-light mb-6">Your resident host</h2>
            <HostCard host={suite.host} suiteFloor={suite.floor} variant="full" />
          </div>
        </section>

        <div className="rounded-card border border-condo-accent/30 bg-condo-accent/[0.07] p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-xl font-display font-light text-white">
              Reserve {suite.name}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Choose your dates and attach privileges on the next step.
            </p>
          </div>
          <Link
            to={`/suite/${suite.id}/reserve`}
            className="shrink-0 inline-flex items-center gap-2 bg-condo-accent text-condo-dark px-7 py-3.5 rounded-control font-semibold tracking-widest uppercase text-sm hover:bg-[#d4b878] transition-colors"
          >
            Continue <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
