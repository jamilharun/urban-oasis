export default function Amenities() {
  return (
    <section id="amenities" className="py-24 bg-condo-dark text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <p className="text-condo-accent uppercase tracking-[0.2em] text-sm font-semibold mb-4">Exclusive Access</p>
          <h2 className="text-4xl md:text-5xl font-display font-light mb-6">Guest Privileges</h2>
          <p className="text-gray-400 font-light">As a guest of Urban Oasis, you enjoy full access to the building's private 5-star amenities, elevating your stay beyond a standard hotel experience.</p>
        </div>

        <div className="space-y-12">
          {/* Amenity 1 */}
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2">
              <img src="/images/pool.png" alt="Infinity Pool" className="w-full h-80 object-cover rounded-xl shadow-2xl border border-white/10" />
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <h3 className="text-3xl font-display font-light">The Infinity Pool</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Float above the city in our temperature-controlled infinity edge pool. Towel service and poolside cabanas are complimentary for all booked guests.
              </p>
            </div>
          </div>
          
          {/* Amenity 2 */}
          <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
            <div className="w-full md:w-1/2">
              <img src="/images/fitness.png" alt="Fitness Center" className="w-full h-80 object-cover rounded-xl shadow-2xl border border-white/10" />
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <h3 className="text-3xl font-display font-light">Wellness & Fitness</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Maintain your routine in our state-of-the-art facility featuring Technogym equipment, yoga studios, and a full-service spa available by appointment.
              </p>
            </div>
          </div>

          {/* Amenity 3 */}
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2">
              <img src="/images/lounge.png" alt="Resident Lounge" className="w-full h-80 object-cover rounded-xl shadow-2xl border border-white/10" />
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <h3 className="text-3xl font-display font-light">The Sky Lounge</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Enjoy evening cocktails or a quiet workspace in the 40th-floor lounge. Features a private chef, barista service, and panoramic city views.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
