import { motion } from 'framer-motion';
import weddingConfig from '../config';

function Story({ activeEventId = weddingConfig.defaultEventId }) {
  const currentStory = weddingConfig.storyByEvent?.[activeEventId] ?? {
    intro: weddingConfig.storyIntro,
    items: weddingConfig.story,
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
          {currentStory.items.map((item, index) => (
            <motion.article
              key={`${activeEventId}-${item.year}-${item.title}-${index}`}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="grid items-center gap-5 overflow-hidden rounded-[2rem] border border-[#ebdcca] bg-white/70 p-4 shadow-[0_18px_40px_rgba(86,74,62,0.04)] sm:grid-cols-[1.15fr_1.85fr] sm:p-5"
            >
              <div className="overflow-hidden rounded-[1.5rem] bg-[#f1ece7]">
                <img
                  src={item.image}
                  alt={item.title}
                  width="720"
                  height="540"
                  loading="lazy"
                  className="h-56 w-full object-cover sm:h-64"
                />
              </div>
              <div className="px-1 sm:px-4">
                <span className="text-xs font-medium uppercase tracking-[0.24em] text-[#7a9280]">{item.year}</span>
                <h3 className="mt-3 font-display text-3xl text-[#2d2420]">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-[#4d4642]">{item.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Story;
