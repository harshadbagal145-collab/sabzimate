import { Clock, MapPin, MessageCircle, PhoneCall } from 'lucide-react';
import { BUSINESS_INFO, UI_COPY } from '../data/translations';

function InstagramIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function HowItWorksSection({ lang }) {
  const copy = UI_COPY[lang];

  return (
    <>
      {/* How It Works */}
      <section id="how-it-works" className="border-t border-[#E3DEC9] bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold tracking-widest text-[#1B5E32] uppercase">
              {lang === 'en'
                ? '1-Day Prior Freshness Model'
                : lang === 'hi'
                ? '1 दिन पहले ऑर्डर करने का ताज़ा मॉडल'
                : '१ दिवस आधी ऑर्डर करण्याची पद्धत'}
            </p>
            <h2 className="font-display mt-2 text-2xl font-bold text-[#14281D] sm:text-3xl">
              {copy.howTitle}
            </h2>
          </div>

          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-3">
            {copy.howSteps.map((s) => (
              <div
                key={s.step}
                className="relative rounded-3xl border border-[#E3DEC9] bg-[#FAF8F2] p-6"
              >
                <span className="font-display text-4xl font-bold text-[#1B5E32]/20">
                  {s.step}
                </span>
                <h3 className="mt-2 text-lg font-bold text-[#14281D]">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#435B4D]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Direct Contact */}
      <section id="location" className="border-t border-[#E3DEC9] bg-[#14281D] py-10 text-white sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-block rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">
                {BUSINESS_INFO.parentCompany}
              </span>
              <h2 className="font-display mt-3 text-2xl font-bold sm:text-4xl">
                {lang === 'en'
                  ? 'Eat Fresh, Live Healthy — Every Day in Navi Mumbai'
                  : lang === 'hi'
                  ? 'ताज़ी सब्ज़ियाँ खाएं, स्वस्थ रहें — नवी मुंबई में हर दिन!'
                  : 'ताज्या भाज्या खा, निरोगी रहा — नवी मुंबईत दररोज!'}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-emerald-100/80">
                {lang === 'en'
                  ? 'Visit our Seawoods pickup point near Railway Station East Entry or order online and confirm directly on WhatsApp.'
                  : lang === 'hi'
                  ? 'सीवुड्स रेलवे स्टेशन ईस्ट एंट्री के पास हमारे पिकअप पॉइंट पर आएं या ऑनलाइन ऑर्डर करके सीधे व्हाट्सएप पर कन्फर्म करें।'
                  : 'सीवूड्स रेल्वे स्टेशन ईस्ट एंट्री जवळील आमच्या केंद्रावर भेट द्या किंवा ऑनलाइन व व्हॉट्सॲपद्वारे ऑर्डर नोंदवा.'}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#E8A317]" />
                  <div>
                    <p className="text-xs font-bold tracking-wide text-emerald-200 uppercase">
                      {lang === 'en' ? 'Our Location' : lang === 'hi' ? 'हमारा पता' : 'आमचा पत्ता'}
                    </p>
                    <p className="mt-1 text-sm font-medium text-white">
                      {lang === 'en'
                        ? BUSINESS_INFO.locationEn
                        : lang === 'hi'
                        ? BUSINESS_INFO.locationHi
                        : BUSINESS_INFO.locationMr}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#E8A317]" />
                  <div>
                    <p className="text-xs font-bold tracking-wide text-emerald-200 uppercase">
                      {lang === 'en' ? 'Timings' : lang === 'hi' ? 'समय' : 'वेळ'}
                    </p>
                    <p className="mt-1 text-sm font-medium text-white">
                      {lang === 'en'
                        ? `Delivery: ${BUSINESS_INFO.deliveryTiming} | Pickup: ${BUSINESS_INFO.pickupTiming}`
                        : lang === 'hi'
                        ? `होम डिलीवरी: ${BUSINESS_INFO.deliveryTiming} | सेल्फ पिकअप: ${BUSINESS_INFO.pickupTiming}`
                        : `डिलिव्हरी: ${BUSINESS_INFO.deliveryTiming} | पिकअप: ${BUSINESS_INFO.pickupTiming}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-white/15 bg-white/8 p-6 backdrop-blur-xs">
                <h3 className="text-lg font-bold">
                  {lang === 'en'
                    ? 'Quick Order & Follow Us'
                    : lang === 'hi'
                    ? 'सीधा संपर्क व ऑर्डर'
                    : 'थेट संपर्क व ऑर्डर'}
                </h3>
                <p className="mt-1 text-xs text-emerald-100/75">
                  {lang === 'en'
                    ? 'Have custom cutting instructions or bulk party orders? Reach us directly.'
                    : lang === 'hi'
                    ? 'विशेष कटिंग निर्देश या बड़ी पार्टी ऑर्डर के लिए सीधे व्हाट्सएप पर संपर्क करें।'
                    : 'समारंभ किंवा विशेष कटिंगसाठी थेट व्हॉट्सॲपवर मेसेज करा.'}
                </p>

                <div className="mt-5 space-y-3">
                  <a
                    href={`https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(
                      'Hello SabziMate! I would like to place an order for tomorrow.'
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-between rounded-2xl bg-[#25D366] px-5 py-3.5 text-sm font-bold text-[#0F2617] transition hover:brightness-105"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <MessageCircle className="h-5 w-5" />
                      <span>WhatsApp: {BUSINESS_INFO.whatsappDisplay}</span>
                    </span>
                    <span>→</span>
                  </a>

                  <a
                    href={`tel:+91${BUSINESS_INFO.whatsappDisplay}`}
                    className="flex w-full items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/15"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <PhoneCall className="h-4 w-4 text-[#E8A317]" />
                      <span>Call: +91 {BUSINESS_INFO.whatsappDisplay}</span>
                    </span>
                    <span>→</span>
                  </a>

                  <a
                    href={BUSINESS_INFO.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/15"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <InstagramIcon className="h-4 w-4 text-pink-300" />
                      <span>Instagram {BUSINESS_INFO.instagramHandle}</span>
                    </span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
