import { CalendarPlus, Clock3, MapPin, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

function Program({ activeEvent }) {
  return (
    <section id="program" className="section-shell">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#685d58]">Program</p>
          <h2 className="mt-4 font-display text-4xl text-[#2d2420] sm:text-5xl">Etkinlik akışı</h2>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="rounded-[1.75rem] border border-[#ebdcca] bg-[#fffaf5] p-5 shadow-[0_18px_40px_rgba(86,74,62,0.04)] sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d9c4af] bg-[#f5ece5]">
                <Clock3 size={18} className="text-[#6e8b6f]" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#685d58]">
                  {activeEvent.date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <h3 className="mt-2 text-2xl font-display text-[#2d2420]">{activeEvent.title}</h3>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 self-start">
              <a
                href="/takvim.ics"
                download
                className="inline-flex items-center gap-2 rounded-full border border-[#2f2a27] bg-[#2f2a27] px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-[#f5f0ea] transition hover:-translate-y-0.5 hover:bg-[#1f1b1a] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#b8cfc0]"
              >
                <CalendarPlus size={16} />
                Takvime ekle
              </a>
              <a
                href={activeEvent.directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#d9c9b9] bg-white/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-[#2f2a27] transition hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#b8cfc0]"
              >
                <Navigation size={16} />
                Haritada aç
              </a>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-[180px_1fr]">
            <div className="rounded-[1.25rem] border border-[#eadfce] bg-[#f9f5f1] p-4">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#685d58]">Saat</p>
              <p className="mt-2 text-xl font-semibold text-[#2d2420]">{activeEvent.timeText}</p>
            </div>

            <div className="rounded-[1.25rem] border border-[#eadfce] bg-[#f9f5f1] p-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 shrink-0 text-[#7a9280]" size={18} />
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#685d58]">Yer</p>
                  <p className="mt-2 font-medium text-[#2d2420]">
                    {activeEvent.venueName === 'TODO: Mekân adı' || activeEvent.venueName === 'TODO: Kına mekânı' || activeEvent.venueName === 'TODO: Sabah gelin çıkarma yeri'
                      ? 'Mekan TBD'
                      : activeEvent.venueName}
                  </p>
                  <p className="mt-1 text-sm text-[#524b47]">
                    {activeEvent.venueAddress === 'TODO: Mekân adresi' || activeEvent.venueAddress === 'TODO: Kına mekân adresi' || activeEvent.venueAddress === 'TODO: Sabah gelin çıkarma adresi'
                      ? 'Adres TBD'
                      : activeEvent.venueAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-5 text-base leading-7 text-[#524b47]">{activeEvent.description}</p>
        </motion.article>

        <div className="mt-8 rounded-[1.75rem] border border-[#ebdcca] bg-[#fffaf5] p-5 text-center text-sm text-[#524b47] sm:p-6">
          <p className="font-medium uppercase tracking-[0.22em] text-[#685d58]">Not</p>
          <p className="mt-3 text-base leading-7">Bu bölüm, seçili etkinliğin özel tarihin, saatinin ve mekân detaylarının gösterildiği ayrı bir ekrandır.</p>
        </div>
      </div>
    </section>
  );
}

export default Program;
