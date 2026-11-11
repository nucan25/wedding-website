import { useEffect, useState } from 'react';
import { HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

function getTimeLeft(targetDate) {
  const difference = new Date(targetDate).getTime() - Date.now();

  if (difference <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    total: difference,
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function Countdown({ targetDate, eventTitle = 'Etkinlik', id = 'countdown' }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const completed = timeLeft.total <= 0;

  return (
    <section id={id} className="section-shell pb-6 pt-10 sm:pb-8 lg:pt-16">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-[#e5d9cc] bg-[#fffaf5] p-6 shadow-[0_18px_40px_rgba(86,74,62,0.05)] sm:p-10">
        {completed ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center"
          >
            <HeartHandshake className="mx-auto text-[#7a9280]" size={40} />
            <p className="mt-4 font-display text-4xl text-[#2d2420] sm:text-5xl">Bizimle olduğunuz için teşekkürler</p>
          </motion.div>
        ) : (
          <>
            <p className="text-center text-xs font-medium uppercase tracking-[0.24em] text-[#685d58]">
              {eventTitle} için kalan süre
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
              {[
                { label: 'Gün', value: timeLeft.days },
                { label: 'Saat', value: timeLeft.hours },
                { label: 'Dakika', value: timeLeft.minutes },
                { label: 'Saniye', value: timeLeft.seconds },
              ].map((unit) => (
                <div key={unit.label} className="rounded-[1.5rem] border border-[#eadfce] bg-[#f9f5f1] p-5">
                  <div className="font-display text-4xl text-[#2d2420] sm:text-5xl">
                    {String(unit.value).padStart(2, '0')}
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.24em] text-[#6b625d]">
                    {unit.label}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Countdown;
