import { MapPin, CarFront, Navigation } from 'lucide-react';

function Venue({ activeEvent }) {
  return (
    <section id="venue" className="section-shell">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#685d58]">Mekan</p>
          <h2 className="mt-4 font-display text-4xl text-[#2d2420] sm:text-5xl">Buluşma yeri</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="overflow-hidden rounded-[2rem] border border-[#ebdcca] bg-[#f3efe9] p-4 shadow-[0_18px_40px_rgba(86,74,62,0.05)]">
            <div className="flex h-[340px] w-full flex-col items-center justify-center rounded-[1.5rem] border border-[#d8c9b5] bg-[radial-gradient(circle_at_top,_#f7f2ee,_#e9e0d7_55%,_#d8cfc5)] p-6 text-center sm:h-[420px]">
              <div className="rounded-full bg-[#2f2a27] p-3 text-[#f8f3ee]">
                <MapPin size={28} />
              </div>
              <p className="mt-5 text-xs font-medium uppercase tracking-[0.28em] text-[#685d58]">Konum</p>
              <h3 className="mt-3 max-w-md font-display text-3xl text-[#2d2420] sm:text-4xl">
                {activeEvent.venueName === 'TODO: Mekân adı' || activeEvent.venueName === 'TODO: Kına mekânı' || activeEvent.venueName === 'TODO: Sabah gelin çıkarma yeri'
                  ? 'Mekan TBD'
                  : activeEvent.venueName}
              </h3>
              <p className="mt-4 max-w-md text-sm leading-6 text-[#4d4540]">
                {activeEvent.venueAddress === 'TODO: Mekân adresi' || activeEvent.venueAddress === 'TODO: Kına mekân adresi' || activeEvent.venueAddress === 'TODO: Sabah gelin çıkarma adresi'
                  ? 'Adres TBD'
                  : activeEvent.venueAddress}
              </p>
              <a
                href={activeEvent.directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2f2a27] px-5 py-3 text-sm font-medium text-[#f8f3ee] transition hover:-translate-y-0.5 hover:bg-[#1f1b1a] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#b8cfc0]"
              >
                <Navigation size={16} />
                Haritada aç
              </a>
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
                <p>Yakınlarda kolay ulaşım için Google Haritalar yönlendirmesini kullanabilirsiniz.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Venue;
