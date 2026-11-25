import { useMemo, useState } from 'react';
import { Minus, Plus, Search, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import { CATEGORIES } from '../data/catalog';
import { UI_COPY } from '../data/translations';

export default function CatalogSection({
  lang,
  catalog,
  cartMap,
  onAddItem,
  onUpdateQty,
  selectedCuts,
  onChangeCut,
}) {
  const copy = UI_COPY[lang];
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickFilter, setQuickFilter] = useState('none'); // 'none' | 'under35' | 'popular'

  const filteredItems = useMemo(() => {
    return catalog.filter((item) => {
      if (activeCategory !== 'all' && item.category !== activeCategory) return false;
      if (quickFilter === 'under35' && item.price > 35) return false;
      if (quickFilter === 'popular' && !item.badge) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const hay = `${item.srNo} ${item.nameEn} ${item.nameMr} ${item.nameHi || ''} ${item.subtitleEn} ${item.subtitleHi || ''} ${item.prepStyle}`.toLowerCase();
        return hay.includes(q);
      }
      return true;
    });
  }, [catalog, activeCategory, searchQuery, quickFilter]);

  const getCategoryLabel = (cat) => {
    if (lang === 'hi') return cat.labelHi || cat.labelEn;
    if (lang === 'mr') return cat.labelMr;
    return cat.labelEn;
  };

  return (
    <section id="menu" className="py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading + Search */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[#14281D] sm:text-3xl">
              {copy.catalogHeading}
            </h2>
            <p className="mt-1 text-sm text-[#526B5C]">{copy.catalogSub}</p>
          </div>

          {/* Search box (16px font on mobile prevents iOS Safari zoom on focus) */}
          <div className="relative w-full md:w-80">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#6C8073]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={copy.searchPlaceholder}
              className="min-h-[44px] w-full rounded-full border border-[#D4CEB8] bg-white py-2 pr-10 pl-10 text-base text-[#14281D] placeholder:text-[#8A9B90] focus:border-[#1B5E32] focus:outline-none sm:text-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-[#6C8073] hover:bg-[#F3EFE2]"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills (horizontal swipe rail on mobile) & Quick Filters */}
        <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="no-scrollbar -mx-4 flex flex-nowrap gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`min-h-[40px] shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition ${
                    active
                      ? 'bg-[#1B5E32] text-white shadow-xs'
                      : 'border border-[#DDD7C3] bg-white text-[#2E4738] hover:border-[#1B5E32]'
                  }`}
                >
                  {getCategoryLabel(cat)}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-3.5 w-3.5 shrink-0 text-[#6C8073]" />
            <button
              type="button"
              onClick={() => setQuickFilter(quickFilter === 'popular' ? 'none' : 'popular')}
              className={`min-h-[36px] rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                quickFilter === 'popular'
                  ? 'border-amber-400 bg-amber-100 text-amber-950'
                  : 'border-[#DDD7C3] bg-white text-[#435B4D] hover:border-[#1B5E32]'
              }`}
            >
              <Sparkles className="mr-1 inline h-3 w-3" />
              {lang === 'en' ? 'Bestsellers' : lang === 'hi' ? 'बेस्टसेलर्स' : 'लोकप्रिय'}
            </button>
            <button
              type="button"
              onClick={() => setQuickFilter(quickFilter === 'under35' ? 'none' : 'under35')}
              className={`min-h-[36px] rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                quickFilter === 'under35'
                  ? 'border-emerald-500 bg-emerald-100 text-emerald-950'
                  : 'border-[#DDD7C3] bg-white text-[#435B4D] hover:border-[#1B5E32]'
              }`}
            >
              {lang === 'en' ? '₹35 & Under' : lang === 'hi' ? '₹35 तक' : '₹३५ पर्यंत'}
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {filteredItems.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-[#CFC8B0] bg-white p-8 text-center sm:mt-10 sm:p-10">
            <p className="text-base font-semibold text-[#14281D]">
              {lang === 'en'
                ? 'No vegetables match your search.'
                : lang === 'hi'
                ? 'आपकी खोज से मेल खाती कोई सब्ज़ी नहीं मिली।'
                : 'तुमच्या शोधाशी जुळणारी भाजी सापडली नाही.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setQuickFilter('none');
              }}
              className="mt-3 min-h-[40px] rounded-full bg-[#1B5E32] px-5 py-2 text-xs font-bold text-white"
            >
              {lang === 'en' ? 'Reset Filters' : lang === 'hi' ? 'फ़िल्टर हटाएं' : 'सर्व पहा'}
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-3.5 sm:mt-7 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => {
              const qty = cartMap[item.id]?.qty || 0;
              const currentCut = selectedCuts[item.id] || item.cutOptions[0];

              return (
                <article
                  key={item.id}
                  className={`group flex flex-col justify-between rounded-2xl border bg-white p-3.5 transition-all sm:p-4 ${
                    qty > 0
                      ? 'border-[#1B5E32] ring-1 ring-[#1B5E32]/20 shadow-md'
                      : 'border-[#E3DEC9] hover:border-[#B9CBBF] hover:shadow-sm'
                  }`}
                >
                  <div>
                    {/* Top bar: Sr No + Emoji + Badge */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-2xl ${item.accentBg}`}
                        >
                          {item.emoji}
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-[#6C8073]">
                            #{String(item.srNo).padStart(2, '0')} • {item.packSize}
                          </span>
                          <p className="text-[11px] font-semibold text-[#1B5E32]">
                            {item.prepStyle}
                          </p>
                        </div>
                      </div>

                      {item.badge && (
                        <span className="shrink-0 rounded-full bg-[#FEF3C7] px-2.5 py-0.5 text-[10px] font-bold text-[#92400E]">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Names */}
                    <h3 className="mt-3 text-base leading-snug font-bold text-[#14281D]">
                      {lang === 'en' ? item.nameEn : lang === 'hi' ? item.nameHi : item.nameMr}
                    </h3>
                    <p className="text-xs font-medium text-[#5C7365]">
                      {lang === 'en' ? item.nameMr : item.nameEn}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#526B5C]">
                      {lang === 'en'
                        ? item.subtitleEn
                        : lang === 'hi'
                        ? item.subtitleHi
                        : item.subtitleMr}
                    </p>

                    {/* Cut Preference Selector */}
                    {item.cutOptions.length > 1 && (
                      <div className="mt-3">
                        <label className="sr-only" htmlFor={`cut-${item.id}`}>
                          Cut style
                        </label>
                        <select
                          id={`cut-${item.id}`}
                          value={currentCut}
                          onChange={(e) => onChangeCut(item.id, e.target.value)}
                          className="min-h-[38px] w-full rounded-lg border border-[#E3DEC9] bg-[#FAF8F2] px-2.5 py-1.5 text-sm font-semibold text-[#2E4738] focus:border-[#1B5E32] focus:outline-none sm:min-h-[32px] sm:text-[11px]"
                        >
                          {item.cutOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              ✂️ {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Bottom Price + Stepper */}
                  <div className="mt-3.5 flex items-center justify-between border-t border-[#F0ECE0] pt-3 sm:mt-4">
                    <div>
                      <span className="text-lg font-extrabold text-[#14281D]">₹{item.price}</span>
                      <span className="ml-1 text-xs font-medium text-[#6C8073]">
                        / {item.packSize}
                      </span>
                    </div>

                    {qty === 0 ? (
                      <button
                        type="button"
                        onClick={() => onAddItem(item)}
                        className="inline-flex min-h-[40px] items-center gap-1 rounded-full border border-[#1B5E32] bg-white px-4 py-1.5 text-xs font-bold text-[#1B5E32] transition hover:bg-[#1B5E32] hover:text-white active:scale-95 sm:min-h-[34px]"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>{lang === 'en' ? 'Add' : lang === 'hi' ? 'जोड़ें' : 'जोडा'}</span>
                      </button>
                    ) : (
                      <div className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-[#1B5E32] px-2 py-1 text-white shadow-xs sm:min-h-[34px]">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, qty - 1)}
                          aria-label="Decrease quantity"
                          className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-white/20 sm:h-6 sm:w-6"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[18px] text-center text-xs font-bold">{qty}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, qty + 1)}
                          aria-label="Increase quantity"
                          className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-white/20 sm:h-6 sm:w-6"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
