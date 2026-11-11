import { ChevronDown } from 'lucide-react';
import weddingConfig from '../config';

function Faq() {
  return (
    <section id="faq" className="section-shell">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#685d58]">Sık sorulanlar</p>
          <h2 className="mt-4 font-display text-4xl text-[#2d2420] sm:text-5xl">Sorularınız için hazırladık</h2>
        </div>

        <div className="space-y-3">
          {weddingConfig.faqs.map((item) => (
            <details key={item.question} className="group overflow-hidden rounded-[1.4rem] border border-[#ebdcca] bg-white/80 p-2 shadow-[0_10px_30px_rgba(95,76,56,0.03)]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-3 text-left text-base font-medium text-[#2d2420] sm:p-4 sm:text-lg">
                {item.question}
                <ChevronDown className="transition group-open:rotate-180" size={18} />
              </summary>
              <div className="px-3 pb-4 pt-0 text-base leading-7 text-[#4c4340] sm:px-4">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
