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
  venueName: 'TODO: Mekân adı',
  venueAddress: 'TODO: Mekân adresi',
  directionsUrl: 'TODO: Google Maps yol tarifi bağlantısı',
  googleMapsEmbedUrl:
    'https://www.google.com/maps?q=TODO%20Mek%C3%A2n%20Ad%C4%B1&output=embed',
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
      venueName: 'TODO: Mekân adı',
      venueAddress: 'TODO: Mekân adresi',
      directionsUrl: 'TODO: Google Maps yol tarifi bağlantısı',
      googleMapsEmbedUrl:
        'https://www.google.com/maps?q=TODO%20Mek%C3%A2n%20Ad%C4%B1&output=embed',
      description: 'TODO: Düğün gününün akışı, kucaklaşma anları ve özel anlara dair kısa açıklama.',
      heroImage,
      coverAlt: 'Düğün kapak görseli',
      buttonLabel: 'Düğün',
    }),
    'event-kina': buildEvent({
      id: 'event-kina',
      title: 'Kına Gecesi',
      date: '2027-01-28T19:30:00+03:00',
      venueName: 'TODO: Kına mekânı',
      venueAddress: 'TODO: Kına mekân adresi',
      directionsUrl: 'https://www.google.com/maps/search/?api=1&query=K%C4%B1na+Mek%C3%A2n%C4%B1',
      googleMapsEmbedUrl:
        'https://www.google.com/maps?q=K%C4%B1na%20Mek%C3%A2n%C4%B1&output=embed',
      description: 'TODO: Kına gecesi için özel karşılama, aile sıcaklığı ve kısa programa ait açıklama.',
      heroImage: story2,
      coverAlt: 'Kına gecesi kapak görseli',
      buttonLabel: 'Kına',
    }),
    'event-gelin-cikarma': buildEvent({
      id: 'event-gelin-cikarma',
      title: 'Gelin Çıkarma',
      date: '2027-01-30T10:00:00+03:00',
      venueName: 'TODO: Sabah gelin çıkarma yeri',
      venueAddress: 'TODO: Sabah gelin çıkarma adresi',
      directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Sabah+Gelin+%C3%87%C4%B1karma+Yeri',
      googleMapsEmbedUrl:
        'https://www.google.com/maps?q=Sabah%20Gelin%20%C3%87%C4%B1karma%20Yeri&output=embed',
      description: 'TODO: Sabah gelin çıkarma için hazırlık, yolculuk ve aile coşkusunu anlatan özel metin.',
      heroImage: story3,
      coverAlt: 'Gelin çıkarma kapak görseli',
      buttonLabel: 'Gelin Çıkarma',
    }),
  },
  kınaEvent: {
    title: 'Kına Gecesi',
    date: '2027-01-28T19:30:00+03:00',
    venueName: 'TODO: Kına mekânı',
    venueAddress: 'TODO: Kına mekân adresi',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=K%C4%B1na+Mek%C3%A2n%C4%B1',
    description: 'TODO: Kına gecesi için özel bir karşılama ve aile toplantısı.',
  },
  gelinCikarmaEvent: {
    title: 'Sabah Gelin Çıkarma',
    date: '2027-01-30T10:00:00+03:00',
    venueName: 'TODO: Sabah gelin çıkarma yeri',
    venueAddress: 'TODO: Sabah gelin çıkarma adresi',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Sabah+Gelin+%C3%87%C4%B1karma+Yeri',
    description: 'TODO: Sabah gelin çıkarma için hazırlık ve yolculuk detayları.',
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
