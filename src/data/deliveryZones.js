export const DELIVERY_ZONES = [
  {
    id: 'nerul',
    nameEn: 'Nerul & Seawoods',
    nameMr: 'नेरूळ आणि सीवूड्स',
    nameHi: 'नेरूल और सीवुड्स',
    freeAbove: 199,
    minOrder: 0,
    baseDeliveryFee: 30,
    ruleEn: 'Free delivery on orders above ₹199',
    ruleMr: '₹१९९ पेक्षा जास्त ऑर्डरवर मोफत डिलिव्हरी',
    ruleHi: '₹199 से अधिक के ऑर्डर पर मुफ्त डिलीवरी',
    shortBadge: 'Free > ₹199',
  },
  {
    id: 'belapur-ulwe',
    nameEn: 'CBD Belapur & Ulwe',
    nameMr: 'सीबीडी बेलापूर आणि उलवे',
    nameHi: 'सीबीडी बेलापूर और उलवे',
    freeAbove: 299,
    minOrder: 0,
    baseDeliveryFee: 40,
    ruleEn: 'Free delivery on orders above ₹299',
    ruleMr: '₹२९९ पेक्षा जास्त ऑर्डरवर मोफत डिलिव्हरी',
    ruleHi: '₹299 से अधिक के ऑर्डर पर मुफ्त डिलीवरी',
    shortBadge: 'Free > ₹299',
  },
  {
    id: 'other-navi-mumbai',
    nameEn: 'Other Navi Mumbai Areas',
    nameMr: 'नवी मुंबईतील इतर भाग',
    nameHi: 'नवी मुंबई के अन्य इलाके',
    freeAbove: null, // always +₹50 delivery charge
    minOrder: 399,
    baseDeliveryFee: 50,
    ruleEn: 'Minimum order ₹399 + ₹50 delivery charges',
    ruleMr: 'किमान ऑर्डर ₹३९९ + ₹५० डिलिव्हरी शुल्क',
    ruleHi: 'न्यूनतम ऑर्डर ₹399 + ₹50 डिलीवरी शुल्क',
    shortBadge: 'Min ₹399 + ₹50',
  },
  {
    id: 'pickup',
    nameEn: 'Self-Pickup (Seawoods Station East)',
    nameMr: 'स्वतः पिकअप (सीवूड्स स्टेशन ईस्ट)',
    nameHi: 'सेल्फ पिकअप (सीवुड्स स्टेशन ईस्ट)',
    freeAbove: 0,
    minOrder: 0,
    baseDeliveryFee: 0,
    ruleEn: 'Zero delivery fee • Pickup 5:00 PM – 9:00 PM',
    ruleMr: 'डिलिव्हरी शुल्क नाही • वेळ सायं. ५ ते रात्री ९',
    ruleHi: 'कोई डिलीवरी शुल्क नहीं • समय शाम 5:00 से रात 9:00',
    shortBadge: 'Free Pickup',
  },
];

export function calculateDeliverySummary(zoneId, subtotal) {
  const zone = DELIVERY_ZONES.find((z) => z.id === zoneId) || DELIVERY_ZONES[0];

  if (zone.id === 'pickup') {
    return {
      zone,
      deliveryFee: 0,
      isFree: true,
      meetsMinOrder: subtotal > 0,
      amountForFree: 0,
      amountForMin: 0,
      total: subtotal,
    };
  }

  if (zone.id === 'other-navi-mumbai') {
    const meetsMin = subtotal >= zone.minOrder;
    return {
      zone,
      deliveryFee: subtotal > 0 ? zone.baseDeliveryFee : 0,
      isFree: false,
      meetsMinOrder: meetsMin,
      amountForFree: 0,
      amountForMin: Math.max(0, zone.minOrder - subtotal),
      total: subtotal + (subtotal > 0 ? zone.baseDeliveryFee : 0),
    };
  }

  const isFree = subtotal >= zone.freeAbove;
  const deliveryFee = subtotal === 0 ? 0 : isFree ? 0 : zone.baseDeliveryFee;

  return {
    zone,
    deliveryFee,
    isFree,
    meetsMinOrder: subtotal > 0,
    amountForFree: Math.max(0, zone.freeAbove - subtotal),
    amountForMin: 0,
    total: subtotal + deliveryFee,
  };
}

export function getTomorrowDateISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

export function formatReadableDate(isoDate) {
  if (!isoDate) return '';
  const [y, m, d] = isoDate.split('-').map(Number);
  const dateObj = new Date(y, m - 1, d);
  return dateObj.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}
