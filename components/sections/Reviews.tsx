import Image from 'next/image'

export default function Reviews() {
  return (
    <section
      className="relative overflow-hidden py-20 lg:py-24"
      aria-labelledby="reviews-heading"
    >
      <Image
        src="/assets/diamo/recensioni-diamo-soluzioni-premium.webp"
        alt=""
        fill
        className="object-cover"
        style={{ objectPosition: '65% 50%' }}
        sizes="100vw"
      />
      <div
        className="absolute inset-0"
        aria-hidden
        style={{ background: 'linear-gradient(90deg,rgba(20,18,13,.92) 0%,rgba(20,18,13,.76) 42%,rgba(20,18,13,.42) 68%,rgba(20,18,13,.12) 100%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: '#F4BE12' }}>
          FIDUCIA COSTRUITA SUL CAMPO
        </p>
        <div className="w-10 h-0.5 mb-7" style={{ backgroundColor: '#B88A32' }} aria-hidden />
        <h2
          id="reviews-heading"
          className="font-extrabold text-white mb-4"
          style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)' }}
        >
          Lavori ben fatti.<br />Clienti che lo confermano.
        </h2>
        <p className="text-base max-w-xl leading-relaxed" style={{ color: 'rgba(248,248,245,0.65)' }}>
          Recensioni vere, raccolte dal profilo Google di Diamo Soluzioni.
        </p>
      </div>
    </section>
  )
}
