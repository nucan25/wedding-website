import weddingConfig from '../config';

function Footer() {
  return (
    <footer className="border-t border-[#eadbc8] bg-[#f7f1eb]">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-5 py-8 text-center text-[#4f4642] sm:flex-row sm:text-left">
        <div>
          <p className="font-display text-3xl text-[#2d2420]">
            {weddingConfig.couple[0]} <span className="mx-2 text-[#7a9280]">&</span> {weddingConfig.couple[1]}
          </p>
          <p className="mt-1 text-sm tracking-[0.18em] uppercase text-[#695f5b]">
            {new Date(weddingConfig.date).toLocaleDateString('tr-TR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        <p className="text-sm text-[#5d5551]">Sevgiyle, teşekkür ederiz.</p>
      </div>
    </footer>
  );
}

export default Footer;
