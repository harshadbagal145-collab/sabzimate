import { useState } from 'react';
import { Globe, Leaf, Menu, ShieldCheck, ShoppingBag, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/translations';

export default function Navbar({
  lang,
  onChangeLang,
  onToggleLang,
  cartCount,
  cartSubtotal,
  onOpenCart,
  onOpenAdmin,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelectLang = (newLang) => {
    if (onChangeLang) {
      onChangeLang(newLang);
    } else if (onToggleLang) {
      onToggleLang();
    }
  };

  const navItems = [
    { href: '#menu', labelEn: '31-Item Menu', labelMr: 'मेनू (३१ भाज्या)', labelHi: 'मेनू (31 सब्ज़ियाँ)' },
    { href: '#mixes', labelEn: 'Ready Mixes', labelMr: 'तयार मिक्स', labelHi: 'रेडी मिक्स' },
    { href: '#how-it-works', labelEn: 'How It Works', labelMr: 'प्रक्रिया', labelHi: 'प्रक्रिया' },
    { href: '#location', labelEn: 'Seawoods Pickup', labelMr: 'पिकअप व संपर्क', labelHi: 'पिकअप व संपर्क' },
  ];

  const getNavLabel = (item) => {
    if (lang === 'hi') return item.labelHi;
    if (lang === 'mr') return item.labelMr;
    return item.labelEn;
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#E3DEC9] bg-[#FAF8F2]/95 backdrop-blur-md">
      {/* Top announcement bar */}
      <div className="bg-[#1B5E32] px-3 py-1.5 text-center text-[11px] font-medium text-white sm:px-4 sm:text-xs">
        <span className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5">
          <span>
            🌿{' '}
            {lang === 'en'
              ? 'Order 1 Day Prior for Morning-Fresh Harvest'
              : lang === 'hi'
              ? 'ताज़ी सब्ज़ियों के लिए 1 दिन पहले ऑर्डर करें'
              : 'ताज्या भाज्यांसाठी १ दिवस आधी ऑर्डर करा'}
          </span>
          <span className="hidden text-emerald-200 sm:inline">•</span>
          <span className="hidden sm:inline">
            {lang === 'en'
              ? 'Free Delivery: Nerul > ₹199 | CBD Belapur & Ulwe > ₹299'
              : lang === 'hi'
              ? 'मुफ्त डिलीवरी: नेरूल > ₹199 | बेलापूर और उलवे > ₹299'
              : 'मोफत डिलिव्हरी: नेरूळ > ₹१९९ | बेलापूर व उलवे > ₹२९९'}
          </span>
        </span>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-3 sm:px-6 sm:py-3 lg:px-8">
        {/* Brand */}
        <a href="#top" className="group flex min-w-0 shrink-0 items-center gap-2 sm:gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1B5E32] text-white shadow-sm transition-transform group-hover:scale-105 sm:h-10 sm:w-10">
            <Leaf className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-baseline gap-1">
              <span className="font-display whitespace-nowrap text-base font-bold tracking-tight text-[#14281D] sm:text-xl">
                {BUSINESS_INFO.brandName}
              </span>
            </div>
            <p className="hidden truncate text-[9px] font-medium tracking-wide text-[#526B5C] uppercase min-[400px]:block sm:text-[10px]">
              {BUSINESS_INFO.parentCompany}
            </p>
          </div>
        </a>

        {/* Desktop Navigation links */}
        <nav className="hidden items-center gap-5 whitespace-nowrap text-sm font-semibold text-[#2E4738] lg:flex xl:gap-7">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-[#1B5E32]">
              {getNavLabel(item)}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1.5 whitespace-nowrap sm:gap-2.5">
          {/* 3-Language Segmented Switcher (EN | मराठी | हिंदी) */}
          <div
            className="inline-flex items-center rounded-full border border-[#D4CEB8] bg-white p-0.5 shadow-xs"
            role="group"
            aria-label="Language selection"
          >
            <Globe className="ml-1.5 mr-0.5 hidden h-3.5 w-3.5 text-[#1B5E32] sm:inline" />
            <button
              type="button"
              onClick={() => handleSelectLang('en')}
              className={`rounded-full px-2 py-1 text-[11px] font-bold transition sm:px-2.5 sm:text-xs ${
                lang === 'en'
                  ? 'bg-[#1B5E32] text-white shadow-xs'
                  : 'text-[#435B4D] hover:text-[#1B5E32]'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => handleSelectLang('mr')}
              className={`rounded-full px-2 py-1 text-[11px] font-bold transition sm:px-2.5 sm:text-xs ${
                lang === 'mr'
                  ? 'bg-[#1B5E32] text-white shadow-xs'
                  : 'text-[#435B4D] hover:text-[#1B5E32]'
              }`}
              title="मराठी"
            >
              मराठी
            </button>
            <button
              type="button"
              onClick={() => handleSelectLang('hi')}
              className={`rounded-full px-2 py-1 text-[11px] font-bold transition sm:px-2.5 sm:text-xs ${
                lang === 'hi'
                  ? 'bg-[#1B5E32] text-white shadow-xs'
                  : 'text-[#435B4D] hover:text-[#1B5E32]'
              }`}
              title="हिंदी"
            >
              हिंदी
            </button>
          </div>

          {/* Owner Admin Demo (tablet/desktop) */}
          <button
            type="button"
            onClick={onOpenAdmin}
            className="hidden min-h-[38px] items-center gap-1.5 rounded-full border border-[#D4CEB8] bg-[#F3EFE2] px-3 py-1.5 text-xs font-semibold text-[#2E4738] transition hover:border-[#1B5E32] hover:bg-white md:inline-flex"
            title="Preview Owner Admin & Daily Batch Database Demo"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-[#1B5E32]" />
            <span>
              {lang === 'en' ? 'Owner Demo' : lang === 'hi' ? 'ओनर डेमो' : 'ओनर डेमो'}
            </span>
          </button>

          {/* Cart CTA */}
          <button
            type="button"
            onClick={onOpenCart}
            className="relative inline-flex min-h-[38px] items-center gap-1.5 whitespace-nowrap rounded-full bg-[#1B5E32] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#154A27] active:scale-[0.98] sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
            aria-label="Open basket"
          >
            <ShoppingBag className="h-4 w-4 shrink-0" />
            <span className="hidden xs:inline sm:inline">
              {lang === 'en' ? 'Basket' : lang === 'hi' ? 'टोकरी' : 'बॅग'}
            </span>
            {cartCount > 0 && (
              <span className="inline-flex items-center whitespace-nowrap rounded-full bg-[#E8A317] px-1.5 py-0.5 text-[11px] font-bold text-[#14281D] sm:px-2 sm:text-xs">
                {cartCount}
                <span className="hidden sm:inline">&nbsp;• ₹{cartSubtotal}</span>
              </span>
            )}
          </button>

          {/* Mobile Drawer Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D4CEB8] bg-white text-[#14281D] transition hover:border-[#1B5E32] lg:hidden"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Slide-down Nav */}
      {mobileMenuOpen && (
        <div className="border-t border-[#E3DEC9] bg-white px-4 py-3 shadow-md lg:hidden">
          <nav className="flex flex-col gap-1">
            {/* Language Selector in Mobile Drawer */}
            <div className="mb-2 flex items-center justify-between rounded-xl bg-[#FAF8F2] p-2 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-[#526B5C]">
                <Globe className="h-3.5 w-3.5 text-[#1B5E32]" />
                Language / भाषा:
              </span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => handleSelectLang('en')}
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                    lang === 'en' ? 'bg-[#1B5E32] text-white' : 'bg-white text-[#14281D] border border-[#D4CEB8]'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectLang('mr')}
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                    lang === 'mr' ? 'bg-[#1B5E32] text-white' : 'bg-white text-[#14281D] border border-[#D4CEB8]'
                  }`}
                >
                  मराठी
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectLang('hi')}
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                    lang === 'hi' ? 'bg-[#1B5E32] text-white' : 'bg-white text-[#14281D] border border-[#D4CEB8]'
                  }`}
                >
                  हिंदी
                </button>
              </div>
            </div>

            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[44px] items-center rounded-xl px-3 text-sm font-semibold text-[#14281D] hover:bg-[#FAF8F2]"
              >
                {getNavLabel(item)}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="mt-1 flex min-h-[44px] items-center gap-2 rounded-xl bg-[#F3EFE2] px-3 text-left text-sm font-semibold text-[#1B5E32]"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>
                {lang === 'en'
                  ? 'Owner Admin & Database Demo'
                  : lang === 'hi'
                  ? 'ओनर एडमिन डेमो देखें'
                  : 'ओनर ॲडमिन डेमो पहा'}
              </span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
