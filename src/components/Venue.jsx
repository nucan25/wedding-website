import { MapPin, CarFront, Hotel, Navigation } from 'lucide-react';

function Venue({ activeEvent }) {
  return (
    <section id="venue" className="section-shell">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#685d58]">Mekan</p>
          <h2 className="mt-4 font-display text-4xl text-[#2d2420] sm:text-5xl">Buluşma yeri</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="overflow-hidden rounded-[2rem] border border-[#ebdcca] bg-white shadow-[0_18px_40px_rgba(86,74,62,0.05)]">
            <div className="h-[340px] w-full overflow-hidden sm:h-[420px]">
              <iframe
                title="Mekan haritası"
                src={activeEvent.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="space-y-5 rounded-[2rem] border border-[#ebdcca] bg-[#fffaf5] p-5 shadow-[0_18px_40px_rgba(86,74,62,0.04)] sm:p-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#685d58]">Mekan adı</p>
              <h3 className="mt-3 font-display text-3xl text-[#2d2420]">
                {activeEvent.venueName === 'TODO: Mekân adı' || activeEvent.venueName === 'TODO: Kına mekânı' || activeEvent.venueName === 'TODO: Sabah gelin çıkarma yeri'
                  ? 'Mekan TBD'
                  : activeEvent.venueName}
              </h3>
            </div>

            <div className="flex items-start gap-3 text-[#463d39]">
              <MapPin className="mt-1 shrink-0 text-[#7a9280]" size={18} />
              <p>
                {activeEvent.venueAddress === 'TODO: Mekân adresi' || activeEvent.venueAddress === 'TODO: Kına mekân adresi' || activeEvent.venueAddress === 'TODO: Sabah gelin çıkarma adresi'
                  ? 'Adres TBD'
                  : activeEvent.venueAddress}
              </p>
            </div>

            <a
              href={activeEvent.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#2f2a27] bg-[#2f2a27] px-5 py-3 text-sm font-medium text-[#f8f3ee] transition hover:-translate-y-0.5 hover:bg-[#1f1b1a] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#b8cfc0]"
            >
              <Navigation size={16} />
              Yol tarifi al
            </a>

            <div className="space-y-4 pt-3 text-sm text-[#473f3b]">
              <div className="flex items-start gap-3">
                <CarFront className="mt-0.5 text-[#7a9280]" size={18} />
                <p>TODO: Ulaşım bilgisi ve otopark notu. </p>
              </div>
              <div className="flex items-start gap-3">
                <Hotel className="mt-0.5 text-[#7a9280]" size={18} />
                <p>TODO: Yakın konaklama önerileri veya rehber.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Venue;
