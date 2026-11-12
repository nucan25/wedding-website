import { useEffect, useRef, useState } from 'react';
import { CalendarHeart, ArrowDown, Music2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import weddingConfig from '../config';

function Hero({ activeEvent, activeEventId, onSelectEvent }) {
  const [partnerOne, partnerTwo] = weddingConfig.couple;
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const heroImage = activeEvent?.heroImage || weddingConfig.heroImage;
  const heroAlt = activeEvent?.coverAlt || 'Düğün kapak görseli';
  const activeMusic = weddingConfig.musicByEvent?.[activeEventId] || weddingConfig.musicByEvent?.['event-wedding'];
  const audioSource = activeMusic?.url || weddingConfig.musicUrl || '';
  const hasMusic = Boolean(audioSource);

  const eventButtons = [
    { id: 'event-wedding', label: weddingConfig.events['event-wedding']?.buttonLabel || 'Düğün' },
    { id: 'event-kina', label: weddingConfig.events['event-kina']?.buttonLabel || 'Kına' },
    { id: 'event-gelin-cikarma', label: weddingConfig.events['event-gelin-cikarma']?.buttonLabel || 'Gelin Çıkarma' },
  ];

  useEffect(() => {
    if (!audioRef.current || !audioSource) return;

    const audio = audioRef.current;
    audio.src = audioSource;
    audio.loop = true;
    audio.preload = 'auto';
    audio.load();
    setIsPlaying(false);
  }, [audioSource]);

  const toggleMusic = async () => {
    if (!audioRef.current || !audioSource) return;

    if (audioRef.current.paused) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Müzik çalma hatası:', error);
      }
      return;
    }

    audioRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#f7f3ee] text-[#2f2a27]">
      <audio ref={audioRef} loop />

      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt={heroAlt}
          className="h-full w-full object-cover"
          width="1440"
          height="960"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7f3ee]/30 via-[#f7f3ee]/50 to-[#f7f3ee]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 pb-10 pt-16 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mx-auto w-full max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d9c9b9] bg-white/60 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#5c4b3b] backdrop-blur-sm sm:mb-6 sm:px-4 sm:text-[11px]">
            <CalendarHeart size={14} className="sm:h-4 sm:w-4" />
            {activeEvent.title}
          </div>

          <h1 className="font-display text-4xl leading-none text-[#2a211d] sm:text-5xl lg:text-8xl">
            {partnerOne}
            <span className="mx-2 text-[#7a9280] sm:mx-3">&</span>
            {partnerTwo}
          </h1>

          <p className="mt-4 text-[11px] tracking-[0.2em] text-[#5a514c] uppercase sm:mt-5 sm:text-sm sm:tracking-[0.24em]">
            {new Date(activeEvent.date).toLocaleDateString('tr-TR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>

          <div className="mt-5 flex flex-col items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[#4f433d] sm:mt-6 sm:flex-row sm:gap-3 sm:text-[11px] sm:tracking-[0.22em]">
            <span className="w-full rounded-full border border-[#d9c9b9] bg-white/60 px-3 py-2 backdrop-blur-sm sm:w-auto">
              {new Date(activeEvent.date).toLocaleTimeString('tr-TR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
            <span className="hidden text-[#7a9280] sm:inline">•</span>
            <span className="w-full rounded-full border border-[#d9c9b9] bg-white/60 px-3 py-2 backdrop-blur-sm sm:w-auto">
              {activeEvent.venueName === 'TODO: Mekân adı' || activeEvent.venueName === 'TODO: Kına mekânı' || activeEvent.venueName === 'TODO: Sabah gelin çıkarma yeri'
                ? 'Mekan TBD'
                : activeEvent.venueName}
            </span>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2 sm:mt-8 sm:gap-3">
            {eventButtons.map((button) => {
              const isActive = activeEventId === button.id;

              return (
                <button
                  key={button.id}
                  type="button"
                  onClick={() => onSelectEvent(button.id)}
                  className={`w-full rounded-full border px-3 py-2.5 text-[10px] font-medium uppercase tracking-[0.16em] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#b8cfc0] sm:w-auto sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.18em] ${
                    isActive
                      ? 'border-[#2f2a27] bg-[#2f2a27] text-[#f5f0ea]'
                      : 'border-[#2f2a27] bg-[#fffaf5]/80 text-[#2f2a27]'
                  }`}
                >
                  {button.label}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 sm:mt-8 sm:flex-row sm:justify-center">
            <a
              href="/takvim.ics"
              download
              className="inline-flex w-full max-w-[220px] items-center justify-center gap-2 rounded-full border border-[#2f2a27] bg-[#2f2a27] px-5 py-3 text-sm font-medium text-[#f5f0ea] shadow-lg shadow-[#2f2a27]/10 transition hover:-translate-y-0.5 hover:bg-[#1f1a18] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#b8cfc0] sm:w-auto"
            >
              Takvime ekle
            </a>

            <a
              href="#program"
              className="inline-flex items-center justify-center gap-2 text-sm font-medium text-[#3d332f] underline decoration-[#7a9280] underline-offset-8"
            >
              Etkinlik detayları <ArrowDown size={16} />
            </a>
          </div>
        </motion.div>
      </div>

      {hasMusic && (
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={isPlaying ? 'Müziği kapat' : 'Müziği aç'}
          className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full border border-[#2f2a27] bg-[#fffaf5]/90 px-3 py-2.5 text-xs font-medium text-[#2f2a27] shadow-[0_12px_25px_rgba(47,42,39,0.12)] backdrop-blur-sm transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#b8cfc0] sm:bottom-5 sm:right-5 sm:px-4 sm:py-3 sm:text-sm"
        >
          {isPlaying ? <VolumeX size={16} className="sm:h-[18px] sm:w-[18px]" /> : <Music2 size={16} className="sm:h-[18px] sm:w-[18px]" />}
          {isPlaying ? 'Müzik kapat' : 'Müzik aç'}
        </button>
      )}
    </section>
  );
}

export default Hero;
