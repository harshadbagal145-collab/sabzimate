import { Minus, Plus, Sparkles } from 'lucide-react';
import { UI_COPY } from '../data/translations';

export default function CombosShowcase({
  lang,
  catalog,
  cartMap,
  onAddItem,
  onUpdateQty,
  onAddAllCombos,
}) {
  const copy = UI_COPY[lang];
  const comboItems = catalog.filter((item) => item.category === 'mixes');

  return (
    <section id="mixes" className="border-b border-[#E3DEC9] bg-[#F3EFE2]/60 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Image Column */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-[#DDD7C3] bg-white p-1.5 shadow-lg sm:rounded-3xl sm:p-2">
              <img
                src="/images/combos-prep.jpg"
                alt="SabziMate Ready-to-Cook Pulav, Sambar, Chinese and Salad Mixes"
                className="aspect-[16/11] w-full rounded-xl object-cover sm:aspect-[4/3] sm:rounded-2xl"
              />
            </div>
          </div>

          {/* Content & 4 Combo Cards */}
          <div className="lg:col-span-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
                  <Sparkles className="h-3.5 w-3.5" />
                  {lang === 'en'
                    ? 'Items #28 – #31 • 200g Packs'
                    : lang === 'hi'
                    ? 'आइटम #28 – #31 • 200g पैक्स'
                    : 'आयटम #२८ – #३१ • २०० ग्रॅम पॅक्स'}
                </span>
                <h2 className="font-display mt-2.5 text-2xl font-bold text-[#14281D] sm:text-3xl">
                  {copy.combosTitle}
                </h2>
                <p className="mt-1.5 max-w-xl text-sm text-[#435B4D]">{copy.combosSub}</p>
              </div>

              <button
                type="button"
                onClick={onAddAllCombos}
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-[#14281D] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#1B5E32] sm:w-auto"
              >
                <Plus className="h-4 w-4" />
                <span>{copy.addAllCombos}</span>
              </button>
            </div>

            <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-3.5">
              {comboItems.map((item) => {
                const qty = cartMap?.[item.id]?.qty || 0;
                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between gap-3 rounded-2xl border bg-white p-3.5 shadow-xs transition sm:p-4 ${
                      qty > 0
                        ? 'border-[#1B5E32] ring-1 ring-[#1B5E32]/20'
                        : 'border-[#DFDAC5] hover:border-[#1B5E32]/50'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{item.emoji}</span>
                        <h3 className="truncate text-sm font-bold text-[#14281D]">
                          #{item.srNo}{' '}
                          {lang === 'en' ? item.nameEn : lang === 'hi' ? item.nameHi : item.nameMr}
                        </h3>
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs text-[#526B5C]">
                        {lang === 'en'
                          ? item.subtitleEn
                          : lang === 'hi'
                          ? item.subtitleHi
                          : item.subtitleMr}
                      </p>
                      <p className="mt-1.5 text-xs font-bold text-[#1B5E32]">
                        ₹{item.price}{' '}
                        <span className="font-medium text-[#6C8073]">/ {item.packSize}</span>
                      </p>
                    </div>

                    {qty === 0 ? (
                      <button
                        type="button"
                        onClick={() => onAddItem(item)}
                        className="inline-flex min-h-[40px] shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-3.5 text-xs font-bold text-[#1B5E32] transition hover:bg-[#1B5E32] hover:text-white active:scale-95"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>{lang === 'en' ? 'Add' : lang === 'hi' ? 'जोड़ें' : 'जोडा'}</span>
                      </button>
                    ) : (
                      <div className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-full bg-[#1B5E32] px-2 py-1 text-white shadow-xs">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, qty - 1)}
                          aria-label="Decrease quantity"
                          className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-white/20"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[16px] text-center text-xs font-bold">{qty}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, qty + 1)}
                          aria-label="Increase quantity"
                          className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-white/20"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
