import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getWeddingConfig } from '../config';

function StoryImage({ src, alt, className, fullPortrait = false }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  return (
    <div className="relative overflow-hidden rounded-[1.5rem] bg-[#f1ece7]">
      {!isLoaded && <div className="absolute inset-0 animate-pulse bg-[#efe7df]" />}
      <img
        key={src}
        src={src}
        alt={alt}
        width="720"
        height="540"
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={`${className} object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ objectPosition: fullPortrait ? '50% 20%' : '50% 52%' }}
      />
    </div>
  );
}

function Story({ activeEventId }) {
  const config = getWeddingConfig();
  const currentEventId = activeEventId ?? config.defaultEventId;
  const currentStory = config.storyByEvent?.[currentEventId] ?? {
    intro: config.storyIntro,
    items: config.story,
  };

  return (
    <section id="story" className="section-shell">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#685d58]">Hikâyemiz</p>
          <h2 className="mt-4 font-display text-4xl text-[#2d2420] sm:text-5xl">
            {activeEventId === 'event-kina'
              ? 'Kına gecemizin sıcak anları'
              : activeEventId === 'event-gelin-cikarma'
                ? 'Gelin çıkarma anılarımız'
                : 'Birlikte başladık, birlikte büyüdük'}
          </h2>
        </div>

        <div className="mb-12 rounded-[2rem] border border-[#ebdcca] bg-[#fffaf5] p-6 shadow-[0_18px_40px_rgba(86,74,62,0.04)] sm:p-8">
          <p className="mx-auto max-w-3xl text-base leading-8 text-[#4a403d] sm:text-lg">
            {currentStory.intro}
          </p>
        </div>

        <div className="space-y-6">
          {currentStory.items.map((item, index) => {
            const isFullPortrait = item.title === 'İsteme Merasimi';

            return (
            <motion.article
              key={`${currentEventId}-${item.year}-${item.title}-${index}`}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="grid items-center gap-5 overflow-hidden rounded-[2rem] border border-[#ebdcca] bg-white/70 p-4 shadow-[0_18px_40px_rgba(86,74,62,0.04)] sm:grid-cols-[1.15fr_1.85fr] sm:p-5"
            >
              <StoryImage
                src={item.image}
                alt={item.title}
                className="h-56 w-full sm:h-64"
                fullPortrait={isFullPortrait}
              />
              <div className="px-1 sm:px-4">
                <span className="text-xs font-medium uppercase tracking-[0.24em] text-[#7a9280]">{item.year}</span>
                <h3 className="mt-3 font-display text-3xl text-[#2d2420]">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-[#4d4642]">{item.text}</p>
              </div>
            </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Story;
