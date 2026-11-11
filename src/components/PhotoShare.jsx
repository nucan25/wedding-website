import { Camera, Sparkles, Smartphone } from 'lucide-react';
import weddingConfig from '../config';

function PhotoShare() {
  return (
    <section id="photo-share" className="section-shell">
      <div className="mx-auto max-w-6xl rounded-[2.3rem] border border-[#ebdcca] bg-[#fefaf6] p-6 shadow-[0_18px_40px_rgba(86,74,62,0.05)] sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#685d58]">Fotoğraf paylaşımı</p>
            <h2 className="mt-4 font-display text-4xl text-[#2d2420] sm:text-5xl">Düğün anlarını birlikte saklayalım</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#4d4540]">
              Google Drive klasörünü açıp fotoğraflarınızı doğrudan yükleyebilirsiniz. Böylece düğün sonrası tüm anılar tek yerde toplanır.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={weddingConfig.driveFolderUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2f2a27] px-6 py-3 text-sm font-medium text-[#f8f3ee] transition hover:-translate-y-0.5 hover:bg-[#1c1817] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#b8cfc0]"
              >
                <Camera size={18} />
                Google Drive’da yükle
              </a>
              <a
                href={weddingConfig.driveFolderUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#cbb7a3] bg-white px-6 py-3 text-sm font-medium text-[#352d29] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#d7e0d6]"
              >
                <Sparkles size={18} />
                Albümü gör
              </a>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-[#ebdcca] bg-[#fffaf5] p-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[#635b58]">iPhone</p>
                <ol className="space-y-2 text-sm leading-6 text-[#463f3d]">
                  <li>1. Google Drive uygulamasını açın.</li>
                  <li>2. “Fotoğraf Yükle” seçeneğine dokunun.</li>
                </ol>
              </div>
              <div className="rounded-[1.5rem] border border-[#ebdcca] bg-[#fffaf5] p-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[#635b58]">Android</p>
                <ol className="space-y-2 text-sm leading-6 text-[#463f3d]">
                  <li>1. Drive klasörüne girin.</li>
                  <li>2. Üstteki ekle simgesine basın.</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-[2rem] border border-[#ebdcca] bg-white p-6 text-center shadow-[0_18px_40px_rgba(86,74,62,0.04)]">
            <div className="rounded-[1.5rem] border border-[#d7cec4] bg-[#f7f1ed] p-4 shadow-inner">
              <img src="/qr/drive.png" alt="Google Drive QR kodu" width="180" height="180" className="h-[180px] w-[180px] object-cover" />
            </div>
            <div className="mt-5 flex items-center gap-2 text-[#463f3d]">
              <Smartphone size={18} className="text-[#7a9280]" />
              <span className="text-sm font-medium">QR kodu taratın</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PhotoShare;
