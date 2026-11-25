import { useEffect, useMemo, useState } from 'react';
import AdminDemoPanel from './components/AdminDemoPanel';
import CartDrawer from './components/CartDrawer';
import CatalogSection from './components/CatalogSection';
import CombosShowcase from './components/CombosShowcase';
import DeliveryZoneBar from './components/DeliveryZoneBar';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import Navbar from './components/Navbar';
import { INITIAL_CATALOG } from './data/catalog';
import { getTomorrowDateISO } from './data/deliveryZones';
import { BUSINESS_INFO } from './data/translations';

const CURRENT_YEAR = new Date().getFullYear();

const SEED_DEMO_ORDERS = [
  {
    id: 'SM-4812',
    createdAt: '08:15 PM',
    customerName: 'Sneha Kulkarni',
    customerPhone: '98201XXXXX',
    zoneId: 'nerul',
    zoneName: 'Nerul & Seawoods',
    address: 'Palm Beach Residency, Sector 42, Nerul',
    deliveryDate: getTomorrowDateISO(),
    slot: '4:00 PM – 5:00 PM (Home Delivery)',
    prepNote: 'Please cut bhendi medium size',
    items: [
      { id: 'bhendi', srNo: 3, nameEn: 'Bhendi (Okra)', packSize: '250gms', cutStyle: 'Medium Sabzi Cut', qty: 2, price: 40 },
      { id: 'peeled-lasun', srNo: 22, nameEn: 'Peeled Lasun (Peeled Garlic)', packSize: '100gms', cutStyle: 'Whole Peeled Cloves', qty: 1, price: 40 },
      { id: 'sambar-mix', srNo: 29, nameEn: 'Sambar Mix', packSize: '200gms', cutStyle: 'Traditional Sambar Cut', qty: 2, price: 60 },
    ],
    subtotal: 240,
    deliveryFee: 0,
    total: 240,
    status: 'Scheduled for 5 AM Purchase',
  },
  {
    id: 'SM-4815',
    createdAt: '09:05 PM',
    customerName: 'Rohan Deshmukh',
    customerPhone: '98674XXXXX',
    zoneId: 'belapur-ulwe',
    zoneName: 'CBD Belapur & Ulwe',
    address: 'Sector 19, Ulwe, Navi Mumbai',
    deliveryDate: getTomorrowDateISO(),
    slot: '4:00 PM – 5:00 PM (Home Delivery)',
    prepNote: '',
    items: [
      { id: 'pulav-mix', srNo: 28, nameEn: 'Pulav Mix', packSize: '200gms', cutStyle: 'Standard Pulav Cut', qty: 2, price: 50 },
      { id: 'palak', srNo: 16, nameEn: 'Palak (Spinach)', packSize: '100gms', cutStyle: 'Whole Picked Leaves', qty: 2, price: 30 },
      { id: 'grated-coconut', srNo: 27, nameEn: 'Grated Coconut', packSize: '250gms', cutStyle: 'Fine Grated', qty: 1, price: 90 },
      { id: 'flower-cauliflower', srNo: 9, nameEn: 'Flower (Cauliflower)', packSize: '250gms', cutStyle: 'Medium Florets', qty: 2, price: 35 },
    ],
    subtotal: 320,
    deliveryFee: 0,
    total: 320,
    status: 'Scheduled for 5 AM Purchase',
  },
];

export default function App() {
  const [lang, setLang] = useState('en');
  const [catalog, setCatalog] = useState(INITIAL_CATALOG);
  const [selectedZoneId, setSelectedZoneId] = useState('nerul');
  const [cartMap, setCartMap] = useState({});
  const [selectedCuts, setSelectedCuts] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('sabzimate_demo_orders');
      return saved ? JSON.parse(saved) : SEED_DEMO_ORDERS;
    } catch {
      return SEED_DEMO_ORDERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sabzimate_demo_orders', JSON.stringify(orders));
    } catch {
      // ignore storage errors
    }
  }, [orders]);

  const cartItems = useMemo(() => {
    return Object.entries(cartMap)
      .filter(([, entry]) => entry.qty > 0)
      .map(([id, entry]) => {
        const liveItem = catalog.find((c) => c.id === id) || entry.item;
        return {
          item: liveItem,
          qty: entry.qty,
          cutStyle: selectedCuts[id] || liveItem.cutOptions[0],
        };
      });
  }, [cartMap, catalog, selectedCuts]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, entry) => sum + entry.qty, 0),
    [cartItems]
  );

  const cartSubtotal = useMemo(
    () => cartItems.reduce((sum, entry) => sum + entry.item.price * entry.qty, 0),
    [cartItems]
  );

  const handleAddItem = (item) => {
    setCartMap((prev) => {
      const existing = prev[item.id];
      return {
        ...prev,
        [item.id]: {
          item,
          qty: (existing?.qty || 0) + 1,
        },
      };
    });
  };

  const handleUpdateQty = (itemId, nextQty) => {
    setCartMap((prev) => {
      if (nextQty <= 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      const existing = prev[itemId];
      if (!existing) return prev;
      return {
        ...prev,
        [itemId]: { ...existing, qty: nextQty },
      };
    });
  };

  const handleChangeCut = (itemId, cutValue) => {
    setSelectedCuts((prev) => ({ ...prev, [itemId]: cutValue }));
  };

  const handleAddAllCombos = () => {
    const mixes = catalog.filter((c) => c.category === 'mixes');
    setCartMap((prev) => {
      const next = { ...prev };
      mixes.forEach((mix) => {
        next[mix.id] = {
          item: mix,
          qty: (next[mix.id]?.qty || 0) + 1,
        };
      });
      return next;
    });
    setIsCartOpen(true);
  };

  const handleUpdatePrice = (itemId, newPrice) => {
    setCatalog((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, price: newPrice } : item))
    );
  };

  const handlePlaceDemoOrder = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-[#FAF8F2] text-[#14281D]">
      <Navbar
        lang={lang}
        onChangeLang={setLang}
        onToggleLang={() => setLang((prev) => (prev === 'en' ? 'mr' : prev === 'mr' ? 'hi' : 'en'))}
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <main>
        <HeroSection lang={lang} />

        <DeliveryZoneBar
          lang={lang}
          selectedZoneId={selectedZoneId}
          onSelectZone={setSelectedZoneId}
          subtotal={cartSubtotal}
        />

        <CombosShowcase
          lang={lang}
          catalog={catalog}
          cartMap={cartMap}
          onAddItem={handleAddItem}
          onUpdateQty={handleUpdateQty}
          onAddAllCombos={handleAddAllCombos}
        />

        <CatalogSection
          lang={lang}
          catalog={catalog}
          cartMap={cartMap}
          onAddItem={handleAddItem}
          onUpdateQty={handleUpdateQty}
          selectedCuts={selectedCuts}
          onChangeCut={handleChangeCut}
        />

        <HowItWorksSection lang={lang} />
      </main>

      {/* Footer (extra bottom padding when floating mobile bar is visible) */}
      <footer
        className={`border-t border-[#1E3B2B] bg-[#0F2016] px-4 pt-6 text-xs text-emerald-100/70 md:pb-6 ${
          cartCount > 0 ? 'pb-24' : 'pb-6'
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p>
            © {CURRENT_YEAR} {BUSINESS_INFO.brandName} {BUSINESS_INFO.parentCompany}.
            All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setIsAdminOpen(true)}
              className="font-semibold text-[#E8A317] hover:underline"
            >
              {lang === 'en'
                ? 'Open Owner Admin & Database Demo'
                : lang === 'hi'
                ? 'ओनर एडमिन व डेटाबेस डेमो'
                : 'ओनर ॲडमिन व डेटाबेस डेमो'}
            </button>
            <a
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              {BUSINESS_INFO.instagramHandle}
            </a>
          </div>
        </div>
      </footer>

      {/* Floating mobile basket bar (safe-area aware) */}
      {cartCount > 0 && !isCartOpen && (
        <div className="fixed right-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] left-3 z-30 md:hidden">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex min-h-[52px] w-full items-center justify-between rounded-2xl bg-[#1B5E32] px-4 py-3 text-sm font-bold text-white shadow-2xl ring-1 ring-white/15"
          >
            <span>
              {cartCount}{' '}
              {cartCount === 1
                ? lang === 'en'
                  ? 'item'
                  : lang === 'hi'
                  ? 'सब्ज़ी'
                  : 'आयटम'
                : lang === 'en'
                ? 'items'
                : lang === 'hi'
                ? 'सब्ज़ियाँ'
                : 'आयटम'}{' '}
              {lang === 'en' ? 'in basket' : lang === 'hi' ? 'टोकरी में' : 'बॅगमध्ये'}
            </span>
            <span className="rounded-full bg-[#E8A317] px-3 py-1 text-xs font-extrabold text-[#14281D]">
              {lang === 'en' ? 'View Basket' : lang === 'hi' ? 'टोकरी देखें' : 'बॅग पहा'} • ₹{cartSubtotal} →
            </span>
          </button>
        </div>
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        lang={lang}
        cartItems={cartItems}
        selectedZoneId={selectedZoneId}
        onSelectZone={setSelectedZoneId}
        onUpdateQty={handleUpdateQty}
        onClearCart={() => setCartMap({})}
        onPlaceDemoOrder={handlePlaceDemoOrder}
      />

      <AdminDemoPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        catalog={catalog}
        onUpdatePrice={handleUpdatePrice}
        orders={orders}
      />
    </div>
  );
}
