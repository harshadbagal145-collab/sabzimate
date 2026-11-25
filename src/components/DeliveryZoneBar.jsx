import { MapPin, Truck } from 'lucide-react';
import { calculateDeliverySummary, DELIVERY_ZONES } from '../data/deliveryZones';

export default function DeliveryZoneBar({ lang, selectedZoneId, onSelectZone, subtotal }) {
  const summary = calculateDeliverySummary(selectedZoneId, subtotal);

  const getZoneName = (zone) => {
    if (lang === 'hi') return zone.nameHi || zone.nameEn;
    if (lang === 'mr') return zone.nameMr;
    return zone.nameEn;
  };

  const getZoneRule = (zone) => {
    if (lang === 'hi') return zone.ruleHi || zone.ruleEn;
    if (lang === 'mr') return zone.ruleMr;
    return zone.ruleEn;
  };

  return (
    <section className="border-b border-[#E3DEC9] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#1B5E32] uppercase">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>
                {lang === 'en'
                  ? 'Select Your Navi Mumbai Delivery Area'
                  : lang === 'hi'
                  ? 'अपना नवी मुंबई डिलीवरी क्षेत्र चुनें'
                  : 'तुमचा नवी मुंबई परिसर निवडा'}
              </span>
            </div>
            <div className="mt-2.5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              {DELIVERY_ZONES.map((zone) => {
                const active = zone.id === selectedZoneId;
                return (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => onSelectZone(zone.id)}
                    className={`flex min-h-[44px] flex-col items-start justify-center rounded-2xl border px-3 py-2 text-left text-xs font-semibold transition sm:min-h-[38px] sm:flex-row sm:items-center sm:rounded-full sm:px-3.5 sm:py-1.5 ${
                      active
                        ? 'border-[#1B5E32] bg-[#1B5E32] text-white shadow-xs'
                        : 'border-[#D9D3BE] bg-[#FAF8F2] text-[#2E4738] hover:border-[#1B5E32]'
                    }`}
                  >
                    <span className="leading-snug">{getZoneName(zone)}</span>
                    <span
                      className={`mt-1 inline-block rounded-full px-1.5 py-0.5 text-[10px] sm:mt-0 sm:ml-1.5 ${
                        active ? 'bg-white/20 text-white' : 'bg-emerald-100 text-[#1B5E32]'
                      }`}
                    >
                      {zone.shortBadge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Delivery Progress */}
          <div className="rounded-2xl border border-[#E3DEC9] bg-[#FAF8F2] px-4 py-3 lg:min-w-[340px]">
            <div className="flex items-center justify-between gap-3 text-xs font-semibold">
              <span className="inline-flex items-center gap-1.5 text-[#14281D]">
                <Truck className="h-4 w-4 shrink-0 text-[#1B5E32]" />
                <span>{getZoneRule(summary.zone)}</span>
              </span>
            </div>

            {selectedZoneId === 'pickup' ? (
              <p className="mt-1.5 text-xs font-medium text-emerald-700">
                {lang === 'en'
                  ? '✓ Free self-pickup at Near Seawoods Station East Entry (5 PM – 9 PM)'
                  : lang === 'hi'
                  ? '✓ सीवुड्स स्टेशन ईस्ट एंट्री के पास मुफ्त पिकअप (शाम 5:00 से रात 9:00)'
                  : '✓ सीवूड्स स्टेशन ईस्ट एंट्री जवळ मोफत पिकअप (सायं. ५ ते रात्री ९)'}
              </p>
            ) : selectedZoneId === 'other-navi-mumbai' ? (
              <p className="mt-1.5 text-xs font-medium text-[#435B4D]">
                {summary.meetsMinOrder ? (
                  <span className="text-emerald-700">
                    ✓{' '}
                    {lang === 'en'
                      ? 'Minimum order ₹399 met (+₹50 delivery applies)'
                      : lang === 'hi'
                      ? 'न्यूनतम ₹399 ऑर्डर पूरी (+₹50 डिलीवरी लागू)'
                      : 'किमान ₹३९९ ऑर्डर पूर्ण (+₹५० डिलिव्हरी)'}
                  </span>
                ) : (
                  <span>
                    {lang === 'en'
                      ? `Add ₹${summary.amountForMin} more to reach ₹399 minimum order.`
                      : lang === 'hi'
                      ? `₹399 न्यूनतम ऑर्डर के लिए ₹${summary.amountForMin} और जोड़ें।`
                      : `₹३९९ किमान ऑर्डरसाठी आणखी ₹${summary.amountForMin} जोडा.`}
                  </span>
                )}
              </p>
            ) : (
              <div className="mt-2">
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#E3DEC9]">
                  <div
                    className="h-full rounded-full bg-[#1B5E32] transition-all duration-300"
                    style={{
                      width: `${Math.min(100, Math.round((subtotal / summary.zone.freeAbove) * 100))}%`,
                    }}
                  />
                </div>
                <p className="mt-1.5 text-xs font-medium text-[#435B4D]">
                  {summary.isFree && subtotal > 0 ? (
                    <span className="text-emerald-700">
                      ✓{' '}
                      {lang === 'en'
                        ? 'Unlocked FREE home delivery!'
                        : lang === 'hi'
                        ? 'मुफ्त होम डिलीवरी अनलॉक हो गई!'
                        : 'मोफत घरपोच डिलिव्हरी मिळाली!'}
                    </span>
                  ) : (
                    <span>
                      {lang === 'en'
                        ? `Add ₹${summary.amountForFree} more for FREE delivery (otherwise ₹${summary.zone.baseDeliveryFee} fee)`
                        : lang === 'hi'
                        ? `मुफ्त डिलीवरी के लिए ₹${summary.amountForFree} की और सब्ज़ियाँ जोड़ें`
                        : `मोफत डिलिव्हरीसाठी आणखी ₹${summary.amountForFree} चे पदार्थ जोडा`}
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
