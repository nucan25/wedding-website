import heroImage from './assets/images/ChatGPT Image Sep 9, 2026, 08_49_21 PM.png';
import story1 from './assets/images/story-1.svg';
import story2 from './assets/images/story-2.svg';
import story3 from './assets/images/story-3.svg';
import story4 from './assets/images/IMG_8484.JPG';

const buildEvent = ({
  id,
  title,
  date,
  venueName,
  venueAddress,
  directionsUrl,
  googleMapsEmbedUrl,
  description,
  heroImage: eventHeroImage,
  coverAlt,
  buttonLabel,
}) => ({
  id,
  title,
  date,
  venueName,
  venueAddress,
  directionsUrl,
  googleMapsEmbedUrl,
  description,
  heroImage: eventHeroImage,
  coverAlt,
  buttonLabel,
});

export const weddingConfig = {
  couple: ['Sümeyye', 'Nurullah'],
  eventName: 'Düğün Davetiyesi',
  date: '2027-01-30T18:00:00+03:00',
  venueName: 'Armada Düğün ve Kongre Salonu',
  venueAddress: 'Harput Mahallesi, 5. Sk. No:17, 25070 Palandöken/Erzurum',
  directionsUrl:
    'https://www.google.com/maps/dir/Armada+D%C3%BC%C4%9F%C3%BCn+Ve+Kongre+Salonu,+Harput+Mahallesi,+5.+Sk.+No:17,+25070+Paland%C3%B6ken%2FErzurum/Armada+D%C3%BC%C4%9F%C3%BCn+Ve+Kongre+Salonu,+Harput+Mahallesi,+5.+Sk.+No:17,+25070+Paland%C3%B6ken%2FErzurum/@39.9373297,41.3578315,11.7z/data=!4m13!4m12!1m5!1m1!1s0x406e5ef3a39d4aff:0x32d2fe29f04edc56!2m2!1d41.2448973!2d39.8877113!1m5!1m1!1s0x406e5ef3a39d4aff:0x32d2fe29f04edc56!2m2!1d41.2448973!2d39.8877113?entry=ttu&g_ep=EgoyMDI2MTEwOS4wIKXMDSoASAFQAw%3D%3D',
  googleMapsEmbedUrl:
    'https://www.google.com/maps?q=Armada%20D%C3%BC%C4%9F%C3%BCn%20Ve%20Kongre%20Salonu%2C%20Harput%20Mahallesi%2C%205.%20Sk.%20No%3A17%2C%2025070%20Paland%C3%B6ken%2FErzurum&output=embed',
  driveFolderUrl: 'https://drive.google.com/drive/folders/17LQjoeVtZhgtTUG-sh0-sXznDqeFZrBB?usp=sharing',
  siteUrl: 'TODO: https://www.ornekdugun.com',
  musicTitle: 'Aşkın Mevsimi Olmaz Ki',
  musicUrl: '/audio/dugun.mp3',
  musicByEvent: {
    'event-wedding': {
      title: 'Düğün Teması',
      url: '/audio/dugun.mp3',
    },
    'event-kina': {
      title: 'Kına Teması',
      url: '/audio/kina.mp3',
    },
    'event-gelin-cikarma': {
      title: 'Gelin Çıkarma Teması',
      url: '/audio/gelin-cikarma.mp3',
    },
  },
  defaultEventId: 'event-wedding',
  events: {
    'event-wedding': buildEvent({
      id: 'event-wedding',
      title: 'Düğün',
      date: '2027-01-30T18:00:00+03:00',
      venueName: 'Armada Düğün ve Kongre Salonu',
      venueAddress: 'Harput Mahallesi, 5. Sk. No:17, 25070 Palandöken/Erzurum',
      directionsUrl:
        'https://www.google.com/maps/dir/Armada+D%C3%BC%C4%9F%C3%BCn+Ve+Kongre+Salonu,+Harput+Mahallesi,+5.+Sk.+No:17,+25070+Paland%C3%B6ken%2FErzurum/Armada+D%C3%BC%C4%9F%C3%BCn+Ve+Kongre+Salonu,+Harput+Mahallesi,+5.+Sk.+No:17,+25070+Paland%C3%B6ken%2FErzurum/@39.9373297,41.3578315,11.7z/data=!4m13!4m12!1m5!1m1!1s0x406e5ef3a39d4aff:0x32d2fe29f04edc56!2m2!1d41.2448973!2d39.8877113!1m5!1m1!1s0x406e5ef3a39d4aff:0x32d2fe29f04edc56!2m2!1d41.2448973!2d39.8877113?entry=ttu&g_ep=EgoyMDI2MTEwOS4wIKXMDSoASAFQAw%3D%3D',
      googleMapsEmbedUrl:
        'https://www.google.com/maps?q=Armada%20D%C3%BC%C4%9F%C3%BCn%20Ve%20Kongre%20Salonu%2C%20Harput%20Mahallesi%2C%205.%20Sk.%20No%3A17%2C%2025070%20Paland%C3%B6ken%2FErzurum&output=embed',
      description: 'TODO: Düğün gününün akışı, kucaklaşma anları ve özel anlara dair kısa açıklama.',
      heroImage,
      coverAlt: 'Düğün kapak görseli',
      buttonLabel: 'Düğün',
    }),
    'event-kina': buildEvent({
      id: 'event-kina',
      title: 'Kına Gecesi',
      date: '2027-01-28T19:30:00+03:00',
      venueName: 'Kına Gecesi',
      venueAddress: 'Erzurum / Kına gecesi mekânı',
      directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Erzurum+K%C4%B1na+Gecesi',
      googleMapsEmbedUrl:
        'https://www.google.com/maps?q=Erzurum%20K%C4%B1na%20Gecesi&output=embed',
      description: 'Kına gecesi için özel karşılama, aile sıcaklığı ve kısa programa ait açıklama.',
      heroImage: story2,
      coverAlt: 'Kına gecesi kapak görseli',
      buttonLabel: 'Kına',
    }),
    'event-gelin-cikarma': buildEvent({
      id: 'event-gelin-cikarma',
      title: 'Gelin Çıkarma',
      date: '2027-01-30T10:00:00+03:00',
      venueName: 'Yunus Emre Mah. Hürmet Sok. Doğuşehir Sitesi A Blok, Kayakyolu, Erzurum',
      venueAddress: 'Yunus Emre Mah. Hürmet Sok. Doğuşehir Sitesi A Blok, Kayakyolu, Erzurum',
      directionsUrl: 'https://www.google.com/maps?q=39.881035,41.275146',
      googleMapsEmbedUrl: 'https://www.google.com/maps?q=39.881035,41.275146&output=embed',
      description: 'Sabah gelin çıkarma için hazırlık, yolculuk ve aile coşkusunu anlatan özel metin.',
      heroImage: story3,
      coverAlt: 'Gelin çıkarma kapak görseli',
      buttonLabel: 'Gelin Çıkarma',
    }),
  },
  kınaEvent: {
    title: 'Kına Gecesi',
    date: '2027-01-28T19:30:00+03:00',
    venueName: 'Kına Gecesi',
    venueAddress: 'Erzurum / Kına gecesi mekânı',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Erzurum+K%C4%B1na+Gecesi',
    description: 'Kına gecesi için özel bir karşılama ve aile toplantısı.',
  },
  gelinCikarmaEvent: {
    title: 'Sabah Gelin Çıkarma',
    date: '2027-01-30T10:00:00+03:00',
    venueName: 'Yunus Emre Mah. Hürmet Sok. Doğuşehir Sitesi A Blok, Kayakyolu, Erzurum',
    venueAddress: 'Yunus Emre Mah. Hürmet Sok. Doğuşehir Sitesi A Blok, Kayakyolu, Erzurum',
    directionsUrl: 'https://www.google.com/maps?q=39.881035,41.275146',
    description: 'Sabah gelin çıkarma için hazırlık ve yolculuk detayları.',
  },
  palette: 'romantik, sıcak krem + adaçayı yeşili, serif başlık',
  storyIntro:
    'TODO: Hikâyemiz kısa bir metin. Bu alanı özel anılarınızla doldurun.',
  story: [
    {
      year: '2018',
      title: 'İlk Tanışma',
      text: 'Karımı çokkkk seviyorummmm.',
      image: story1,
    },
    {
      year: '2021',
      title: 'İlk Yolculuk',
      text: 'Karımı çokkkk seviyorummmm.',
      image: story2,
    },
    {
      year: '2024',
      title: 'Teklif',
      text: 'Karımı çokkkk seviyorummmm.',
      image: story3,
    },
    {
      year: '2027',
      title: 'Düğün Günü',
      text: 'Karımı çokkkk seviyorummmm.',
      image: story4,
    },
  ],
  storyByEvent: {
    'event-wedding': {
      intro: 'Karımı çokkkk seviyorummmm.',
      items: [
        {
          year: '2018',
          title: 'İlk Tanışma',
          text: 'Karımı çokkkk seviyorummmm.',
          image: story1,
        },
        {
          year: '2021',
          title: 'İlk Yolculuk',
          text: 'Karımı çokkkk seviyorummmm.',
          image: story2,
        },
        {
          year: '2024',
          title: 'Teklif',
          text: 'Karımı çokkkk seviyorummmm.',
          image: story3,
        },
        {
          year: '2027',
          title: 'Düğün Günü',
          text: 'Karımı çokkkk seviyorummmm.',
          image: story4,
        },
      ],
    },
    'event-kina': {
      intro: 'Karımı çokkkk seviyorummmm.',
      items: [
        {
          year: '2027',
          title: 'Kına Öncesi',
          text: 'Karımı çokkkk seviyorummmm.',
          image: story1,
        },
        {
          year: '2027',
          title: 'Aile Sıcaklığı',
          text: 'Karımı çokkkk seviyorummmm.',
          image: story2,
        },
        {
          year: '2027',
          title: 'Kına Anı',
          text: 'Karımı çokkkk seviyorummmm.',
          image: story3,
        },
      ],
    },
    'event-gelin-cikarma': {
      intro: 'Karımı çokkkk seviyorummmm.',
      items: [
        {
          year: '2027',
          title: 'Hazırlık',
          text: 'Karımı çokkkk seviyorummmm.',
          image: story2,
        },
        {
          year: '2027',
          title: 'Yolculuk',
          text: 'Karımı çokkkk seviyorummmm.',
          image: story3,
        },
        {
          year: '2027',
          title: 'Ayrılık ve Başlangıç',
          text: 'Karımı çokkkk seviyorummmm.',
          image: story4,
        },
      ],
    },
  },
  program: [
    { time: '16:00', title: 'Karşılama', description: 'TODO: Misafirlerimize sıcak bir karşılama ve kokteyl.' },
    { time: '17:00', title: 'Tören', description: 'TODO: Nikâh ve söz töreni detayları.' },
    { time: '18:30', title: 'Yemek', description: 'TODO: Akşam yemeği ve kutlamanın başlangıcı.' },
    { time: '20:00', title: 'Dans', description: 'TODO: Eğlence, dans ve sonradan başlayan coşku.' },
  ],
  faqs: [
    { question: 'Kıyafet kodu nedir?', answer: 'TODO: Kıyafet kodu açıklaması; örn. “Resmî / şık ve rahat.”' },
    { question: 'Çocuklar katılabilir mi?', answer: 'TODO: Çocuk kabulü bilgisi ve uygunluk notu.' },
    { question: 'Otopark var mı?', answer: 'TODO: Otopark, ulaşım ve park etme boşluğu bilgisi.' },
    { question: 'Hava durumu için ne bilmeliyim?', answer: 'TODO: Hava koşullarına göre öneriler; örn. akşamda hafif bir hırka.' },
    { question: 'Konaklama önerisi var mı?', answer: 'TODO: Yakın otel veya konaklama önerileri.' },
  ],
  imageGallery: [story1, story2, story3],
  heroImage,
};

export default weddingConfig;
