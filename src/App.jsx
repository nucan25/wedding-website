import { useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero.jsx';
import Countdown from './components/Countdown.jsx';
import Story from './components/Story.jsx';
import Program from './components/Program.jsx';
import Venue from './components/Venue.jsx';
import PhotoShare from './components/PhotoShare.jsx';
import Faq from './components/Faq.jsx';
import Footer from './components/Footer.jsx';
import { getWeddingConfig } from './config.js';
import { getProgramEvents } from './eventData.js';
import AdminPage from './AdminPage.jsx';

function App() {
  const [configVersion, setConfigVersion] = useState(0);

  useEffect(() => {
    const handleConfigUpdate = () => setConfigVersion((current) => current + 1);
    window.addEventListener('wedding-config-updated', handleConfigUpdate);

    const loadProjectConfig = async () => {
      try {
        const response = await fetch('/admin-content.json', { cache: 'no-store' });
        if (!response.ok) return;

        const data = await response.json();
        if (data && Object.keys(data).length > 0) {
          window.__weddingProjectConfig = data;
          setConfigVersion((current) => current + 1);
        }
      } catch {
        // Ignore missing or invalid project config file. Keep default config.
      }
    };

    loadProjectConfig();
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
      <Faq activeEventId={activeEvent.id} />
      <Footer />
    </div>
  );
}

export default App;
