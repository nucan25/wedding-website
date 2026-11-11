import { useMemo, useState } from 'react';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import Story from './components/Story';
import Program from './components/Program';
import Venue from './components/Venue';
import PhotoShare from './components/PhotoShare';
import Faq from './components/Faq';
import Footer from './components/Footer';
import weddingConfig from './config';
import { getProgramEvents } from './eventData';

function App() {
  const programEvents = useMemo(() => getProgramEvents(), []);
  const [activeEventId, setActiveEventId] = useState(weddingConfig.defaultEventId);

  const activeEvent =
    programEvents.find((event) => event.id === activeEventId) ??
    programEvents.find((event) => event.id === weddingConfig.defaultEventId) ??
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
