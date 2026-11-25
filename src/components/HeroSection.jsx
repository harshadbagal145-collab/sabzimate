import { ArrowRight, CalendarClock, CheckCircle2, Droplets, Scissors, Sparkles, Utensils } from 'lucide-react';
import { formatReadableDate, getTomorrowDateISO } from '../data/deliveryZones';
import { UI_COPY } from '../data/translations';

export default function HeroSection({ lang }) {
  const copy = UI_COPY[lang];
  const tomorrowLabel = formatReadableDate(getTomorrowDateISO());

  const pillarIcons = [Sparkles, Droplets, Scissors, Utensils];

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-[#E3DEC9] bg-gradient-to-b from-[#F4F0E2] to-[#FAF8F2]"
    >
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Copy */}
          <div className="lg:col-span-6">
            <div className="mb-3.5 inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-[#1B5E32] sm:mb-4 sm:px-3.5 sm:text-xs">
              <CalendarClock className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">
                {copy.orderPriorPill} ({tomorrowLabel})
              </span>
            </div>

            <p className="mb-1.5 text-[11px] font-bold tracking-widest text-[#526B5C] uppercase sm:mb-2 sm:text-xs">
              {copy.heroEyebrow}
            </p>

            <h1 className="font-display text-[30px] leading-[1.15] font-bold tracking-tight text-[#14281D] sm:text-5xl lg:text-[54px]">
              {copy.heroTitle}
            </h1>

            <p className="mt-3.5 max-w-xl text-sm leading-relaxed text-[#435B4D] sm:mt-4 sm:text-lg">
              {copy.heroSubtitle}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5">
              <a
                href="#menu"
                className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[#1B5E32] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-900/10 transition hover:bg-[#144725] sm:w-auto"
              >
                <span>{copy.browseMenu}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full border border-[#CFC8B0] bg-white px-5 py-3 text-sm font-semibold text-[#14281D] transition hover:border-[#1B5E32] hover:text-[#1B5E32] sm:w-auto"
              >
                <span>{copy.howItWorksBtn}</span>
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-[#435B4D] sm:mt-7 sm:gap-x-5">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#1B5E32]" />
                {lang === 'en'
                  ? 'Zero Cold-Storage Stock'
                  : lang === 'hi'
                  ? 'कोई कोल्ड-स्टोरेज स्टॉक नहीं'
                  : 'जुना साठा नाही'}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#1B5E32]" />
                {lang === 'en'
                  ? 'Hygienic Food-Grade Packing'
                  : lang === 'hi'
                  ? 'स्वच्छ व सुरक्षित पैकिंग'
                  : 'स्वच्छ व सुरक्षित पॅकिंग'}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#1B5E32]" />
                {lang === 'en'
                  ? 'Seawoods • Nerul • Belapur • Ulwe'
                  : lang === 'hi'
                  ? 'सीवुड्स • नेरूल • बेलापूर • उलवे'
                  : 'सीवूड्स • नेरूळ • बेलापूर • उलवे'}
              </span>
            </div>
          </div>

          {/* Right Editorial Image */}
          <div className="relative lg:col-span-6">
            <div className="relative overflow-hidden rounded-2xl border border-[#DDD7C3] bg-white p-1.5 shadow-xl shadow-emerald-950/5 sm:rounded-3xl sm:p-2">
              <img
                src="/images/hero-sabzimate.jpg"
                alt="Freshly washed, peeled and pre-cut vegetables by SabziMate"
                className="aspect-[16/11] w-full rounded-xl object-cover sm:aspect-[4/3] sm:rounded-2xl"
              />
              {/* Freshness promise strip: attached below image on mobile so photo isn't covered; floating overlay on sm+ */}
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2.5 rounded-xl border border-[#E3DEC9] bg-[#FAF8F2] px-3.5 py-2.5 sm:mt-0 sm:absolute sm:bottom-5 sm:left-5 sm:right-5 sm:rounded-2xl sm:border-white/60 sm:bg-[#FAF8F2]/95 sm:px-4 sm:py-3 sm:backdrop-blur-md sm:shadow-lg">
                <div>
                  <p className="text-[10px] font-bold tracking-wider text-[#1B5E32] uppercase sm:text-[11px]">
                    {lang === 'en'
                      ? 'Daily Harvest Promise'
                      : lang === 'hi'
                      ? 'रोज़ाना ताज़ा खरीद का वादा'
                      : 'दररोजची ताजी खरेदी'}
                  </p>
                  <p className="text-xs font-bold text-[#14281D] sm:text-sm">
                    {lang === 'en'
                      ? 'Bought 5 AM → Cut Fresh → Delivered 4–5 PM'
                      : lang === 'hi'
                      ? 'सुबह 5 बजे खरीद → ताज़ी कटिंग → शाम 4–5 बजे डिलीवरी'
                      : 'सकाळी ५ खरेदी → ताजी कटिंग → सायं. ४–५ डिलिव्हरी'}
                  </p>
                </div>
                <span className="rounded-full bg-[#E8A317] px-2.5 py-1 text-[11px] font-bold text-[#14281D] sm:px-3 sm:text-xs">
                  {lang === 'en'
                    ? 'Save 45 mins/day'
                    : lang === 'hi'
                    ? 'रोज़ 45 मिनट बचाइए'
                    : 'रोज ४५ मिनिटे वाचवा'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Value Pillars from Poster 2 */}
        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {copy.pillars.map((pillar, idx) => {
            const Icon = pillarIcons[idx];
            return (
              <div
                key={pillar.title}
                className="flex items-start gap-3 rounded-2xl border border-[#E3DEC9] bg-white/90 p-3.5 shadow-xs sm:gap-3.5 sm:p-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#1B5E32] sm:h-10 sm:w-10">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#14281D]">{pillar.title}</h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-[#526B5C]">{pillar.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
