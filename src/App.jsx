import { useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import Story from './components/Story';
import Program from './components/Program';
import Venue from './components/Venue';
import PhotoShare from './components/PhotoShare';
import Faq from './components/Faq';
import Footer from './components/Footer';
import { getWeddingConfig } from './config';
import { getProgramEvents } from './eventData';
import AdminPage from './AdminPage';

function App() {
  const [configVersion, setConfigVersion] = useState(0);

  useEffect(() => {
    const handleConfigUpdate = () => setConfigVersion((current) => current + 1);
    window.addEventListener('wedding-config-updated', handleConfigUpdate);
    return () => {
      window.removeEventListener('wedding-config-updated', handleConfigUpdate);
    };
  }, []);

  const config = useMemo(() => getWeddingConfig(), [configVersion]);
  const isAdminRoute = typeof window !== 'undefined' && window.location.pathname === '/admin';

  if (isAdminRoute) {
    return <AdminPage />;
  }

  const programEvents = useMemo(() => getProgramEvents(config), [config]);
  const [activeEventId, setActiveEventId] = useState(config.defaultEventId);

  useEffect(() => {
    setActiveEventId((current) => {
      if (config.events[current]) return current;
      return config.defaultEventId;
    });
  }, [config]);

  const activeEvent =
    programEvents.find((event) => event.id === activeEventId) ??
    programEvents.find((event) => event.id === config.defaultEventId) ??
    programEvents[0];

  return (
    <div className="min-h-screen bg-[#f7f3ee] text-[#2f2a27] selection:bg-[#dfe7dc] selection:text-[#1d1b1a]">
      <Hero
        activeEvent={activeEvent}
        activeEventId={activeEventId}
        onSelectEvent={setActiveEventId}
      />
      <div className="section-shell pb-6 pt-10 sm:pb-8 lg:pt-16">
        <div className="mx-auto max-w-5xl">
          <Countdown
            key={activeEvent.id}
            id={`countdown-${activeEvent.id}`}
            targetDate={activeEvent.date.getTime()}
            eventTitle={activeEvent.title}
          />
        </div>
      </div>
      <Story activeEventId={activeEvent.id} />
      <Program activeEvent={activeEvent} />
      <Venue activeEvent={activeEvent} />
      <PhotoShare />
      <Faq />
      <Footer />
    </div>
  );
}

export default App;
