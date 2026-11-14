import { useMemo, useState } from 'react';
import {
  ADMIN_PASSWORD,
  ADMIN_STORAGE_KEY,
  getWeddingConfig,
  readAdminOverrides,
  saveAdminOverrides,
} from './config';
import {
  buildProjectAssetManifest,
  downloadProjectAssetManifest,
  exportProjectAssetsToSelectedDirectory,
  persistAssetToProjectDirectory,
} from './adminAssetExport';

const getDefaultDraft = () => {
  const config = getWeddingConfig();

  return {
    couple: [...config.couple],
    eventName: config.eventName,
    date: config.date,
    driveFolderUrl: config.driveFolderUrl,
    heroImage: config.heroImage,
    musicByEvent: { ...config.musicByEvent },
    program: JSON.parse(JSON.stringify(config.program ?? [])),
    events: Object.fromEntries(
      Object.entries(config.events).map(([eventId, event]) => [
        eventId,
        {
          ...event,
          heroImage: event.heroImage,
          title: event.title,
          venueName: event.venueName,
          venueAddress: event.venueAddress,
          directionsUrl: event.directionsUrl,
          googleMapsEmbedUrl: event.googleMapsEmbedUrl,
          description: event.description,
        },
      ]),
    ),
    storyIntro: config.storyIntro,
    storyByEvent: JSON.parse(JSON.stringify(config.storyByEvent ?? {})),
    imageGallery: [...(config.imageGallery ?? [])],
    faqs: JSON.parse(JSON.stringify(config.faqs ?? [])),
  };
};

function readSavedDraft() {
  if (typeof window === 'undefined') return getDefaultDraft();

  try {
    const saved = readAdminOverrides();
    if (!saved || Object.keys(saved).length === 0) return getDefaultDraft();

    const base = getDefaultDraft();

    return {
      couple: saved.couple || base.couple,
      eventName: saved.eventName || base.eventName,
      date: saved.date || base.date,
      driveFolderUrl: saved.driveFolderUrl || base.driveFolderUrl,
      heroImage: saved.heroImage || base.heroImage,
      musicByEvent: { ...base.musicByEvent, ...(saved.musicByEvent ?? {}) },
      program: saved.program || base.program,
      events: Object.fromEntries(
        Object.entries(base.events).map(([eventId, event]) => [
          eventId,
          {
            ...event,
            ...(saved.events?.[eventId] ?? {}),
            heroImage: saved.events?.[eventId]?.heroImage || event.heroImage,
          },
        ]),
      ),
      storyIntro: saved.storyIntro || base.storyIntro,
      storyByEvent: saved.storyByEvent || base.storyByEvent,
      imageGallery: saved.imageGallery || base.imageGallery,
      faqs: saved.faqs || base.faqs,
    };
  } catch {
    return getDefaultDraft();
  }
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const maxDimension = 1600;
        const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) {
          resolve(String(reader.result));
          return;
        }

        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      image.onerror = () => reject(new Error('Resim okunamadı'));
      image.src = String(reader.result);
    };
    reader.onerror = () => reject(new Error('Dosya okunamadı'));
    reader.readAsDataURL(file);
  });
}

function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [draft, setDraft] = useState(readSavedDraft());
  const [status, setStatus] = useState('');

  const eventList = useMemo(() => {
    const events = Object.entries(getWeddingConfig().events);
    const orderedIds = ['event-wedding', 'event-kina', 'event-gelin-cikarma'];
    return orderedIds
      .map((eventId) => [eventId, events.find(([id]) => id === eventId)?.[1]])
      .filter(([, event]) => Boolean(event));
  }, []);
  const orderedStoryEventIds = ['event-wedding', 'event-kina', 'event-gelin-cikarma'];
  const storyEventTitleMap = {
    'event-wedding': 'EVENT-WEDDING',
    'event-kina': 'EVENT-KINA',
    'event-gelin-cikarma': 'EVENT-GELİN-ÇIKARMA',
  };
  const orderedEventBlocks = orderedStoryEventIds
    .map((eventId) => {
      const event = eventList.find(([id]) => id === eventId)?.[1];
      const story = draft.storyByEvent?.[eventId] ?? { intro: '', items: [] };

      return {
        eventId,
        event,
        story,
      };
    })
    .filter(({ event }) => Boolean(event));

  const handleLogin = (event) => {
    event.preventDefault();

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setStatus('Giriş başarılı.');
      return;
    }

    setStatus('Şifre yanlış.');
  };

  const updateEventField = (eventId, field, value) => {
    setDraft((current) => ({
      ...current,
      events: {
        ...current.events,
        [eventId]: {
          ...current.events[eventId],
          [field]: value,
        },
      },
    }));
  };

  const updateStoryItem = (eventId, itemIndex, field, value) => {
    setDraft((current) => {
      const nextStories = { ...(current.storyByEvent ?? {}) };
      const items = [...((nextStories[eventId]?.items) ?? [])];
      items[itemIndex] = { ...items[itemIndex], [field]: value };
      nextStories[eventId] = { ...(nextStories[eventId] ?? {}), items };
      return { ...current, storyByEvent: nextStories };
    });
  };

  const updateFaq = (index, field, value) => {
    setDraft((current) => {
      const nextFaqs = [...(current.faqs ?? [])];
      nextFaqs[index] = { ...nextFaqs[index], [field]: value };
      return { ...current, faqs: nextFaqs };
    });
  };

  const handleHeroImageUpload = async (file) => {
    if (!file) return;

    try {
      const projectPath = await persistAssetToProjectDirectory(file, 'uploads', 'kapak-gorseli');
      setDraft((current) => ({ ...current, heroImage: projectPath }));
      setStatus('Kapak görseli proje klasörüne kaydedildi.');
      return;
    } catch {
      const dataUrl = await fileToDataUrl(file);
      setDraft((current) => ({ ...current, heroImage: dataUrl }));
      setStatus('Klasör erişimi yok; görsel geçici olarak tarayıcıda tutuldu. Proje klasörünü tekrar seçin.');
    }
  };

  const handleImageUpload = async (eventId, file) => {
    if (!file) return;

    try {
      const projectPath = await persistAssetToProjectDirectory(file, 'uploads', `${eventId}-hero`);
      setDraft((current) => ({
        ...current,
        events: {
          ...current.events,
          [eventId]: {
            ...current.events[eventId],
            heroImage: projectPath,
          },
        },
      }));
      setStatus('Etkinlik görseli proje klasörüne kaydedildi.');
      return;
    } catch {
      const dataUrl = await fileToDataUrl(file);
      setDraft((current) => ({
        ...current,
        events: {
          ...current.events,
          [eventId]: {
            ...current.events[eventId],
            heroImage: dataUrl,
          },
        },
      }));
      setStatus('Klasör erişimi yok; görsel geçici olarak tarayıcıda tutuldu. Proje klasörünü tekrar seçin.');
    }
  };

  const handleGalleryUpload = async (index, file) => {
    if (!file) return;

    try {
      const projectPath = await persistAssetToProjectDirectory(file, 'uploads', `gallery-${index + 1}`);
      setDraft((current) => {
        const nextGallery = [...(current.imageGallery ?? [])];
        nextGallery[index] = projectPath;
        return { ...current, imageGallery: nextGallery };
      });
      setStatus('Galeri görseli proje klasörüne kaydedildi.');
      return;
    } catch {
      const dataUrl = await fileToDataUrl(file);
      setDraft((current) => {
        const nextGallery = [...(current.imageGallery ?? [])];
        nextGallery[index] = dataUrl;
        return { ...current, imageGallery: nextGallery };
      });
      setStatus('Klasör erişimi yok; görsel geçici olarak tarayıcıda tutuldu. Proje klasörünü tekrar seçin.');
    }
  };

  const handleMusicUpload = async (eventId, file) => {
    if (!file) return;

    try {
      const projectPath = await persistAssetToProjectDirectory(file, 'audio', `${eventId}-music`);
      setDraft((current) => ({
        ...current,
        musicByEvent: {
          ...current.musicByEvent,
          [eventId]: {
            ...(current.musicByEvent[eventId] ?? {}),
            url: projectPath,
          },
        },
      }));
      setStatus('Müzik dosyası proje klasörüne kaydedildi.');
      return;
    } catch {
      const dataUrl = await fileToDataUrl(file);
      setDraft((current) => ({
        ...current,
        musicByEvent: {
          ...current.musicByEvent,
          [eventId]: {
            ...(current.musicByEvent[eventId] ?? {}),
            url: dataUrl,
          },
        },
      }));
      setStatus('Klasör erişimi yok; müzik geçici olarak tarayıcıda tutuldu. Proje klasörünü tekrar seçin.');
    }
  };

  const handleSave = () => {
    if (typeof window === 'undefined') return;

    const payload = {
      couple: draft.couple,
      eventName: draft.eventName,
      date: draft.date,
      driveFolderUrl: draft.driveFolderUrl,
      heroImage: draft.heroImage,
      musicByEvent: draft.musicByEvent,
      program: draft.program,
      events: draft.events,
      storyIntro: draft.storyIntro,
      storyByEvent: draft.storyByEvent,
      imageGallery: draft.imageGallery,
      faqs: draft.faqs,
    };

    const saved = saveAdminOverrides(payload);

    if (!saved) {
      setStatus('Tarayıcı depolama engellendi. Lütfen tarayıcı izinlerini kontrol edin.');
      return;
    }

    window.dispatchEvent(new Event('wedding-config-updated'));
    setStatus('Kaydedildi. Sayfa yenileniyor...');
    window.setTimeout(() => {
      window.location.assign('/');
    }, 250);
  };

  const handleExportProjectAssets = async () => {
    if (typeof window === 'undefined') return;

    const config = getWeddingConfig();
    const manifest = buildProjectAssetManifest(config);

    if (!('showDirectoryPicker' in window)) {
      downloadProjectAssetManifest(config, 'wedding-admin-assets.json');
      setStatus('Dosya indirildi. İndirdiğiniz JSON dosyasını projeye ekleyip ardından commit/push yapın.');
      return;
    }

    try {
      const projectRoot = await window.showDirectoryPicker({ mode: 'readwrite' });
      const exported = await exportProjectAssetsToSelectedDirectory(config, projectRoot);

      if (exported) {
        setStatus('Fotoğraflar proje klasörünün public/uploads içine kaydedildi. Şimdi commit/push yapın.');
        return;
      }

      setStatus('Klasör erişimi reddedildi. Lütfen yeniden deneyin veya JSON olarak indirip manuel ekleyin.');
    } catch {
      downloadProjectAssetManifest(config, 'wedding-admin-assets.json');
      setStatus('Klasör seçme özelliği desteklenmiyor. JSON dosyası indirildi; projeye ekleyip yayınlayın.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f3ee] px-4">
        <form onSubmit={handleLogin} className="w-full max-w-md rounded-[2rem] border border-[#ebdcca] bg-white/80 p-8 shadow-[0_24px_54px_rgba(86,67,54,0.08)] backdrop-blur-sm">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#685d58]">Admin girişi</p>
          <h1 className="mt-4 font-display text-4xl text-[#2d2420]">Yönetim</h1>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Şifre"
            className="mt-6 w-full rounded-full border border-[#d8c6b1] bg-[#fffaf5] px-4 py-3 text-sm outline-none focus:border-[#7a9280]"
          />
          <button type="submit" className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#2f2a27] px-5 py-3 text-sm font-medium text-[#f8f3ee] transition hover:bg-[#1d1918]">
            Giriş yap
          </button>
          {status && <p className="mt-4 text-sm text-[#5a514c]">{status}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f3ee] px-4 py-10 text-[#2f2a27]">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#ebdcca] bg-white/80 p-6 shadow-[0_24px_54px_rgba(86,67,54,0.08)] backdrop-blur-sm sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#685d58]">Admin</p>
            <h1 className="mt-2 font-display text-4xl text-[#2d2420]">Sayfa görünümüne göre düzenle</h1>
          </div>
          <button type="button" onClick={() => (window.location.href = '/')} className="inline-flex items-center justify-center rounded-full border border-[#cbb7a3] bg-[#fffaf5] px-4 py-2 text-sm font-medium text-[#352d29]">
            Ana sayfaya dön
          </button>
        </div>

        <div className="mt-8 space-y-8">
          <section className="rounded-[1.5rem] border border-[#ebdcca] bg-[#fffaf5] p-4 sm:p-5">
            <h2 className="font-display text-3xl text-[#2d2420]">Ana sayfa</h2>
            <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-[#463f3d]">
                  <span className="mb-2 block">İsim 1</span>
                  <input value={draft.couple[0]} onChange={(event) => setDraft((current) => ({ ...current, couple: [event.target.value, current.couple[1] || ''] }))} className="w-full rounded-full border border-[#d8c6b1] bg-white px-4 py-2.5 outline-none focus:border-[#7a9280]" />
                </label>
                <label className="block text-sm font-medium text-[#463f3d]">
                  <span className="mb-2 block">İsim 2</span>
                  <input value={draft.couple[1]} onChange={(event) => setDraft((current) => ({ ...current, couple: [current.couple[0] || '', event.target.value] }))} className="w-full rounded-full border border-[#d8c6b1] bg-white px-4 py-2.5 outline-none focus:border-[#7a9280]" />
                </label>
                <label className="block text-sm font-medium text-[#463f3d]">
                  <span className="mb-2 block">Etkinlik adı</span>
                  <input value={draft.eventName} onChange={(event) => setDraft((current) => ({ ...current, eventName: event.target.value }))} className="w-full rounded-full border border-[#d8c6b1] bg-white px-4 py-2.5 outline-none focus:border-[#7a9280]" />
                </label>
                <label className="block text-sm font-medium text-[#463f3d]">
                  <span className="mb-2 block">Tarih</span>
                  <input type="datetime-local" value={draft.date?.slice(0, 16) ?? ''} onChange={(event) => setDraft((current) => ({ ...current, date: new Date(event.target.value).toISOString() }))} className="w-full rounded-full border border-[#d8c6b1] bg-white px-4 py-2.5 outline-none focus:border-[#7a9280]" />
                </label>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[#635b58]">Kapak görseli</p>
                <div className="overflow-hidden rounded-[1.4rem] border border-[#d7cec4] bg-[#f5efe9] p-2">
                  <img src={draft.heroImage} alt="Kapak görseli" className="h-64 w-full rounded-[1rem] object-cover" />
                </div>
                <label className="mt-3 inline-flex cursor-pointer items-center justify-center rounded-full bg-[#2f2a27] px-4 py-2 text-sm font-medium text-[#f8f3ee]">
                  Kapak görseli seç
                  <input type="file" accept="image/*" className="hidden" onChange={(inputEvent) => handleHeroImageUpload(inputEvent.target.files?.[0])} />
                </label>
              </div>
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-[#ebdcca] bg-[#fffaf5] p-4 sm:p-5">
            <h2 className="font-display text-3xl text-[#2d2420]">Düğün akışı</h2>
            <div className="mt-5 space-y-6">
              {orderedEventBlocks.map(({ eventId, event, story }) => (
                <div key={eventId} className="rounded-[1.2rem] border border-[#d7cec4] bg-white p-4">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="font-display text-2xl text-[#2d2420]">{event.title}</h3>
                    <span className="rounded-full bg-[#e6efe3] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#405643]">{storyEventTitleMap[eventId] ?? eventId}</span>
                  </div>

                  <div className="space-y-4">
                    <div className="w-full max-w-[430px]">
                      <div className="overflow-hidden rounded-[1rem] border border-[#d7cec4] bg-[#f5efe9] p-2">
                        <div className="aspect-square overflow-hidden rounded-[0.8rem]">
                          <img
                            src={draft.events?.[eventId]?.heroImage || event.heroImage}
                            alt={event.coverAlt}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                      <label className="mt-3 inline-flex cursor-pointer items-center justify-center rounded-full bg-[#2f2a27] px-4 py-2 text-sm font-medium text-[#f8f3ee]">
                        Görsel seç
                        <input type="file" accept="image/*" className="hidden" onChange={(inputEvent) => handleImageUpload(eventId, inputEvent.target.files?.[0])} />
                      </label>
                    </div>

                    <div className="space-y-3">
                      <input value={draft.events?.[eventId]?.title ?? ''} onChange={(inputEvent) => updateEventField(eventId, 'title', inputEvent.target.value)} className="w-full rounded-full border border-[#d8c6b1] bg-white px-3 py-2 text-sm outline-none focus:border-[#7a9280]" />
                      <textarea value={draft.events?.[eventId]?.description ?? ''} onChange={(inputEvent) => updateEventField(eventId, 'description', inputEvent.target.value)} className="min-h-[96px] w-full rounded-[1rem] border border-[#d8c6b1] bg-white px-3 py-2 text-sm outline-none focus:border-[#7a9280]" />
                      <input value={draft.events?.[eventId]?.venueName ?? ''} onChange={(inputEvent) => updateEventField(eventId, 'venueName', inputEvent.target.value)} className="w-full rounded-full border border-[#d8c6b1] bg-white px-3 py-2 text-sm outline-none focus:border-[#7a9280]" />
                      <textarea value={draft.events?.[eventId]?.venueAddress ?? ''} onChange={(inputEvent) => updateEventField(eventId, 'venueAddress', inputEvent.target.value)} className="min-h-[72px] w-full rounded-[1rem] border border-[#d8c6b1] bg-white px-3 py-2 text-sm outline-none focus:border-[#7a9280]" />
                      <input value={draft.events?.[eventId]?.directionsUrl ?? ''} onChange={(inputEvent) => updateEventField(eventId, 'directionsUrl', inputEvent.target.value)} className="w-full rounded-full border border-[#d8c6b1] bg-white px-3 py-2 text-sm outline-none focus:border-[#7a9280]" />
                    </div>

                    <div className="rounded-[1rem] border border-[#d7cec4] bg-[#f5efe9] p-3">
                      <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#635b58]">Müzik</p>
                      {draft.musicByEvent?.[eventId]?.url ? (
                        <audio controls className="w-full">
                          <source src={draft.musicByEvent[eventId].url} />
                        </audio>
                      ) : (
                        <p className="text-sm text-[#5a514c]">Henüz müzik yüklenmemiş.</p>
                      )}
                      <label className="mt-3 inline-flex cursor-pointer items-center justify-center rounded-full border border-[#cbb7a3] bg-white px-4 py-2 text-sm font-medium text-[#352d29]">
                        Müzik seç
                        <input type="file" accept="audio/*" className="hidden" onChange={(inputEvent) => handleMusicUpload(eventId, inputEvent.target.files?.[0])} />
                      </label>
                    </div>
                  </div>

                  <div className="mt-5 rounded-[1rem] border border-[#d7cec4] bg-white p-3">
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[#635b58]">{storyEventTitleMap[eventId] ?? eventId} hikâyesi</p>
                    <label className="block text-sm font-medium text-[#463f3d]">
                      <span className="mb-2 block">Özet metni</span>
                      <textarea
                        value={story?.intro ?? ''}
                        onChange={(event) => setDraft((current) => ({
                          ...current,
                          storyByEvent: {
                            ...current.storyByEvent,
                            [eventId]: {
                              ...(current.storyByEvent?.[eventId] ?? {}),
                              intro: event.target.value,
                            },
                          },
                        }))}
                        className="min-h-[90px] w-full rounded-[1rem] border border-[#d8c6b1] bg-white px-3 py-2 text-sm outline-none focus:border-[#7a9280]"
                      />
                    </label>
                    <div className="mt-4 space-y-4">
                      {(story?.items ?? []).map((item, index) => (
                        <div key={`${eventId}-${index}`} className="rounded-[1rem] border border-[#ebdcca] bg-[#fffaf5] p-3">
                          <div className="w-full max-w-[320px]">
                            <div className="aspect-square overflow-hidden rounded-[0.9rem] border border-[#d7cec4] bg-[#f5efe9]">
                              <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                            </div>
                            <label className="mt-3 inline-flex cursor-pointer items-center justify-center rounded-full bg-[#2f2a27] px-4 py-2 text-sm font-medium text-[#f8f3ee]">
                              Fotoğraf seç
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={async (inputEvent) => {
                                  const file = inputEvent.target.files?.[0];
                                  if (!file) return;

                                  try {
                                    const projectPath = await persistAssetToProjectDirectory(file, 'uploads', `${eventId}-story-${index + 1}`);
                                    setDraft((current) => {
                                      const next = { ...(current.storyByEvent ?? {}) };
                                      const items = [...((next[eventId]?.items) ?? [])];
                                      items[index] = { ...items[index], image: projectPath };
                                      next[eventId] = { ...(next[eventId] ?? {}), items };
                                      return { ...current, storyByEvent: next };
                                    });
                                    setStatus('Hikâye görseli proje klasörüne kaydedildi.');
                                    return;
                                  } catch {
                                    const dataUrl = await fileToDataUrl(file);
                                    setDraft((current) => {
                                      const next = { ...(current.storyByEvent ?? {}) };
                                      const items = [...((next[eventId]?.items) ?? [])];
                                      items[index] = { ...items[index], image: dataUrl };
                                      next[eventId] = { ...(next[eventId] ?? {}), items };
                                      return { ...current, storyByEvent: next };
                                    });
                                    setStatus('Klasör erişimi yok; hikâye görseli geçici olarak tarayıcıda tutuldu.');
                                  }
                                }}
                              />
                            </label>
                          </div>

                          <div className="mt-3 space-y-2">
                            <input value={item.year} onChange={(event) => updateStoryItem(eventId, index, 'year', event.target.value)} className="w-full rounded-full border border-[#d8c6b1] bg-white px-3 py-2 text-sm outline-none focus:border-[#7a9280]" />
                            <input value={item.title} onChange={(event) => updateStoryItem(eventId, index, 'title', event.target.value)} className="w-full rounded-full border border-[#d8c6b1] bg-white px-3 py-2 text-sm outline-none focus:border-[#7a9280]" />
                            <textarea value={item.text} onChange={(event) => updateStoryItem(eventId, index, 'text', event.target.value)} className="min-h-[90px] w-full rounded-[1rem] border border-[#d8c6b1] bg-white px-3 py-2 text-sm outline-none focus:border-[#7a9280]" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-[#ebdcca] bg-[#fffaf5] p-4 sm:p-5">
            <h2 className="font-display text-3xl text-[#2d2420]">Program</h2>
            <div className="mt-5 space-y-4">
              {(draft.program ?? []).map((item, index) => (
                <div key={`${item.title}-${index}`} className="rounded-[1.2rem] border border-[#d7cec4] bg-white p-3">
                  <div className="grid gap-3 md:grid-cols-3">
                    <input value={item.time} onChange={(event) => setDraft((current) => ({ ...current, program: current.program.map((row, rowIndex) => rowIndex === index ? { ...row, time: event.target.value } : row) }))} className="w-full rounded-full border border-[#d8c6b1] bg-white px-3 py-2 text-sm outline-none focus:border-[#7a9280]" />
                    <input value={item.title} onChange={(event) => setDraft((current) => ({ ...current, program: current.program.map((row, rowIndex) => rowIndex === index ? { ...row, title: event.target.value } : row) }))} className="w-full rounded-full border border-[#d8c6b1] bg-white px-3 py-2 text-sm outline-none focus:border-[#7a9280]" />
                    <input value={item.description} onChange={(event) => setDraft((current) => ({ ...current, program: current.program.map((row, rowIndex) => rowIndex === index ? { ...row, description: event.target.value } : row) }))} className="w-full rounded-full border border-[#d8c6b1] bg-white px-3 py-2 text-sm outline-none focus:border-[#7a9280] md:col-span-3" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-[#ebdcca] bg-[#fffaf5] p-4 sm:p-5">
            <h2 className="font-display text-3xl text-[#2d2420]">Fotoğraf paylaşımı</h2>
            <div className="mt-5 rounded-[1.2rem] border border-[#d7cec4] bg-white p-4">
              <label className="block text-sm font-medium text-[#463f3d]">
                <span className="mb-2 block">Google Drive klasör linki</span>
                <input value={draft.driveFolderUrl ?? ''} onChange={(event) => setDraft((current) => ({ ...current, driveFolderUrl: event.target.value }))} className="w-full rounded-full border border-[#d8c6b1] bg-white px-4 py-2.5 outline-none focus:border-[#7a9280]" />
              </label>
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-[#ebdcca] bg-[#fffaf5] p-4 sm:p-5">
            <h2 className="font-display text-3xl text-[#2d2420]">Galeri</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {(draft.imageGallery ?? []).map((image, index) => (
                <div key={`${image}-${index}`} className="rounded-[1.2rem] border border-[#d7cec4] bg-white p-3">
                  <img src={image} alt={`Galeri görseli ${index + 1}`} className="h-40 w-full rounded-[1rem] object-cover" />
                  <label className="mt-3 inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-[#2f2a27] px-4 py-2 text-sm font-medium text-[#f8f3ee]">
                    Değiştir
                    <input type="file" accept="image/*" className="hidden" onChange={(inputEvent) => handleGalleryUpload(index, inputEvent.target.files?.[0])} />
                  </label>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-[#ebdcca] bg-[#fffaf5] p-4 sm:p-5">
            <h2 className="font-display text-3xl text-[#2d2420]">Sık sorulan sorular</h2>
            <div className="mt-5 space-y-4">
              {(draft.faqs ?? []).map((item, index) => (
                <div key={`${item.question}-${index}`} className="rounded-[1.2rem] border border-[#d7cec4] bg-white p-3">
                  <input value={item.question} onChange={(event) => updateFaq(index, 'question', event.target.value)} className="w-full rounded-full border border-[#d8c6b1] bg-white px-3 py-2 text-sm outline-none focus:border-[#7a9280]" />
                  <textarea value={item.answer} onChange={(event) => updateFaq(index, 'answer', event.target.value)} className="mt-3 min-h-[90px] w-full rounded-[1rem] border border-[#d8c6b1] bg-white px-3 py-2 text-sm outline-none focus:border-[#7a9280]" />
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={handleExportProjectAssets} className="inline-flex items-center justify-center rounded-full border border-[#cbb7a3] bg-[#fffaf5] px-6 py-3 text-sm font-medium text-[#352d29] transition hover:bg-[#f3e9df]">
            Projeye foto ekle
          </button>
          <button type="button" onClick={handleSave} className="inline-flex items-center justify-center rounded-full bg-[#2f2a27] px-6 py-3 text-sm font-medium text-[#f8f3ee] transition hover:bg-[#1d1918]">
            Değişiklikleri kaydet
          </button>
        </div>

        {status && <p className="mt-4 text-sm text-[#5a514c]">{status}</p>}
      </div>
    </div>
  );
}

export default AdminPage;
