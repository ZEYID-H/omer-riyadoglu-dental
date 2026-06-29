import { Branch, Testimonial, Treatment } from "./types";

export const branches: Branch[] = [
  {
    id: "basaksehir",
    name: "Başakşehir Clinic",
    city: "Başakşehir",
    country: "Istanbul",
    address: "Başakşehir Mah. Atatürk Bulvarı, No: 88, 34480 Başakşehir/İstanbul",
    googleMapsUrl: "https://maps.google.com/?q=Basaksehir+Mah.+Ataturk+Bulvari+No+88+Basaksehir+Istanbul",
    yandexMapsUrl: "https://yandex.com/maps/?text=Basaksehir+Mah.+Ataturk+Bulvari+No+88+Basaksehir+Istanbul",
    rating: 5.0,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFpDH94uAYJMV6lY136ydRJebLX_6raH3kL2kYNrVIcPkds6vZ5duf5vsDpDq1Dvai2aAExkoo4Vb81tEGua59AAADkFAw1SKjU4pNEM66mMYJRM3LRNtLTREdCJ15KIWMm-TtSbCGHd3fpia0CwPZj8XEaEQ-y79I4yGcOCoQHqL6C1fBdzW7TMSRfEU_yrC8rXiKy8Cc4LWH0sYYHNwgEkg7FZ5tgpjHRK-8SUR2M0ol4tTz7kigri1GpluxJE1zTUuayijg6ms",
    altText: "A professional architectural photograph of the Lema Dental Başakşehir clinic interior. The space is expansive with ultra-modern design, high ceilings, marble floors, and warm gold ambient lighting. Elegant lounge seating and a futuristic reception desk create a five-star hotel atmosphere.",
    description: "Istanbul, Main Hub. Spanning 4000m² of state-of-the-art medical dental technologies and premium hospitality suites.",
    type: "Main Hub",
    phone: "+90 212 555 0000",
    whatsapp: "+90 533 123 4567",
    email: "info@lemadental.com",
    latitude: 41.1158,
    longitude: 28.7954
  },
  {
    id: "halkali",
    name: "Halkalı Branch",
    city: "Halkalı",
    country: "Istanbul",
    address: "Halkalı Merkez Mah. Turgut Özal Bulvarı, No: 12, 34303 Küçükçekmece/İstanbul",
    googleMapsUrl: "https://maps.google.com/?q=Halkali+Merkez+Mah.+Turgut+Ozal+Bulvari+No+12+Kucukcekmece+Istanbul",
    yandexMapsUrl: "https://yandex.com/maps/?text=Halkali+Merkez+Mah.+Turgut+Ozal+Bulvari+No+12+Kucukcekmece+Istanbul",
    rating: 4.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7ehCi0aOf2BlKSZu8gXzZLmZlO-Pf0TN3BDTeW6NyOlIhpeZXswoFlVVH6s0c1iP0jQhsC3XwVcXJ3G02HllC7kiCQUPEGGaNcWSxB2q9tGWDaSA0XuW7dxLQfjeb6JZggDoUz2ap_4ubcRw3WzGmjGSYnfssAyckMbyBPwfj_4xEH6NTzLYWKbgXKiZClonsboty5QJLuOpetw_HLR9wwkCvWDYafXJHrUWwdEAAdrX2DnuO7c3NOtiKZOMApWAN845zF0b4U4s",
    altText: "Interior of the Halkalı Istanbul branch, focusing on a premium treatment suite. The room is equipped with state-of-the-art dental technology, ergonomic black leather patient chairs, and soft integrated gold lighting.",
    description: "Istanbul, Aesthetic Boutique. Boutique environment tailoring advanced cosmetic veneers and customized Hollywood smiles.",
    type: "Aesthetic Boutique",
    phone: "+90 212 555 0011",
    whatsapp: "+90 533 123 4568",
    email: "halkali@lemadental.com",
    latitude: 41.0267,
    longitude: 28.7842
  },
  {
    id: "toronto",
    name: "Toronto Center",
    city: "Toronto",
    country: "Canada",
    address: "150 King St West, Suite 200, Toronto, ON M5H 1J9, Canada",
    googleMapsUrl: "https://maps.google.com/?q=150+King+St+West+Suite+200+Toronto+ON+Canada",
    yandexMapsUrl: "https://yandex.com/maps/?text=150+King+St+West+Suite+200+Toronto+ON+Canada",
    rating: 4.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcuAedxIVmHoWM9-CagbC-qcappjgwttfJ_hJVZi-yJ_DnapS7R5C7fNhbhbBQXBv-tPxmJRleX6MTdkOvJ85OP1KWmuCBDlEdHC2jBK06F740BZaUFBaxbdXHXI6MuyI64KQOkjFXtv8XYQ8bsU20FCC2tD3w596CsVcGZ9B1T5ko_frf8-xWPVNONy1gEaeGx2hnvwNhvT2X8l62Rw20wyPNVWKXA1UBaVMAUOqRZsAEno4OuekP_mKnynHi1m3VOqJK6mc-spY",
    altText: "The exterior facade of Lema Dental Toronto, a sleek glass building in a modern Canadian urban setting. The clinic features large windows revealing a warm, lit interior.",
    description: "Canada, Consultation Center. Premium consultation facility for Canadian guests planning overseas treatment journeys.",
    type: "Consultation Center",
    phone: "+1 416 555 0199",
    whatsapp: "+1 416 555 0199",
    email: "toronto@lemadental.com",
    latitude: 43.6479,
    longitude: -79.3857
  },
  {
    id: "milano",
    name: "Milano Center",
    city: "Milano",
    country: "Italy",
    address: "Via della Spiga, 26, 20121 Milano MI, Italy",
    googleMapsUrl: "https://maps.google.com/?q=Via+della+Spiga+26+Milano+Italy",
    yandexMapsUrl: "https://yandex.com/maps/?text=Via+della+Spiga+26+Milano+Italy",
    rating: 5.0,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFpDH94uAYJMV6lY136ydRJebLX_6raH3kL2kYNrVIcPkds6vZ5duf5vsDpDq1Dvai2aAExkoo4Vb81tEGua59AAADkFAw1SKjU4pNEM66mMYJRM3LRNtLTREdCJ15KIWMm-TtSbCGHd3fpia0CwPZj8XEaEQ-y79I4yGcOCoQHqL6C1fBdzW7TMSRfEU_yrC8rXiKy8Cc4LWH0sYYHNwgEkg7FZ5tgpjHRK-8SUR2M0ol4tTz7kigri1GpluxJE1zTUuayijg6ms", // Use Başakşehir interior since we don't have separate milano interior, but styled
    altText: "A luxury consultation lounge in Milan with golden elements, leather seating, and discrete diagnostic spaces.",
    description: "Italy, Consultation & Design Hub. Direct collaboration with top Italian dental labs for custom crowns.",
    type: "Consultation Center",
    phone: "+39 02 5550 1234",
    whatsapp: "+39 333 123 4567",
    email: "milano@lemadental.com",
    latitude: 45.4704,
    longitude: 9.1963
  },
  {
    id: "latvia",
    name: "Riga Consultation",
    city: "Riga",
    country: "Latvia",
    address: "Elizabetes iela 45, Centra rajons, Rīga, LV-1010, Latvia",
    googleMapsUrl: "https://maps.google.com/?q=Elizabetes+iela+45+Riga+Latvia",
    yandexMapsUrl: "https://yandex.com/maps/?text=Elizabetes+iela+45+Riga+Latvia",
    rating: 4.8,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcuAedxIVmHoWM9-CagbC-qcappjgwttfJ_hJVZi-yJ_DnapS7R5C7fNhbhbBQXBv-tPxmJRleX6MTdkOvJ85OP1KWmuCBDlEdHC2jBK06F740BZaUFBaxbdXHXI6MuyI64KQOkjFXtv8XYQ8bsU20FCC2tD3w596CsVcGZ9B1T5ko_frf8-xWPVNONy1gEaeGx2hnvwNhvT2X8l62Rw20wyPNVWKXA1UBaVMAUOqRZsAEno4OuekP_mKnynHi1m3VOqJK6mc-spY",
    altText: "Lema Dental Baltic consultation clinic, modern design with custom accent lighting.",
    description: "Latvia, Baltic Regional Hub. Standardized diagnostics and pre-op mapping for Northern European clientele.",
    type: "Consultation Center",
    phone: "+371 67 555 123",
    whatsapp: "+371 29 555 456",
    email: "riga@lemadental.com",
    latitude: 56.9587,
    longitude: 24.1165
  },
  {
    id: "germany",
    name: "Frankfurt Center",
    city: "Frankfurt",
    country: "Germany",
    address: "Kaiserstraße 12, 60311 Frankfurt am Main, Germany",
    googleMapsUrl: "https://maps.google.com/?q=Kaiserstrasse+12+Frankfurt+Germany",
    yandexMapsUrl: "https://yandex.com/maps/?text=Kaiserstrasse+12+Frankfurt+Germany",
    rating: 4.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7ehCi0aOf2BlKSZu8gXzZLmZlO-Pf0TN3BDTeW6NyOlIhpeZXswoFlVVH6s0c1iP0jQhsC3XwVcXJ3G02HllC7kiCQUPEGGaNcWSxB2q9tGWDaSA0XuW7dxLQfjeb6JZggDoUz2ap_4ubcRw3WzGmjGSYnfssAyckMbyBPwfj_4xEH6NTzLYWKbgXKiZClonsboty5QJLuOpetw_HLR9wwkCvWDYafXJHrUWwdEAAdrX2DnuO7c3NOtiKZOMApWAN845zF0b4U4s",
    altText: "Sophisticated German branch offering consultation and smile digital design previews.",
    description: "Germany, European Financial Center. Digital 3D smile modeling and direct flight coordination with Istanbul.",
    type: "Consultation Center",
    phone: "+49 69 5550 4321",
    whatsapp: "+49 172 555 6789",
    email: "frankfurt@lemadental.com",
    latitude: 50.1102,
    longitude: 8.6744
  },
  {
    id: "poland",
    name: "Warsaw Clinic",
    city: "Warsaw",
    country: "Poland",
    address: "Nowy Świat 35, 00-029 Warszawa, Poland",
    googleMapsUrl: "https://maps.google.com/?q=Nowy+Swiat+35+Warsaw+Poland",
    yandexMapsUrl: "https://yandex.com/maps/?text=Nowy+Swiat+35+Warsaw+Poland",
    rating: 4.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFpDH94uAYJMV6lY136ydRJebLX_6raH3kL2kYNrVIcPkds6vZ5duf5vsDpDq1Dvai2aAExkoo4Vb81tEGua59AAADkFAw1SKjU4pNEM66mMYJRM3LRNtLTREdCJ15KIWMm-TtSbCGHd3fpia0CwPZj8XEaEQ-y79I4yGcOCoQHqL6C1fBdzW7TMSRfEU_yrC8rXiKy8Cc4LWH0sYYHNwgEkg7FZ5tgpjHRK-8SUR2M0ol4tTz7kigri1GpluxJE1zTUuayijg6ms",
    altText: "Elegantly finished clinic lounge in Warsaw with ambient backlighting and consultation rooms.",
    description: "Poland, Eastern European Hub. Advanced diagnostic screenings, virtual consulting, and premium post-op follow-ups.",
    type: "Consultation Center",
    phone: "+48 22 555 9876",
    whatsapp: "+48 501 555 432",
    email: "warszawa@lemadental.com",
    latitude: 52.2335,
    longitude: 21.0183
  }
];

export const treatments: Treatment[] = [
  {
    id: "smile-design",
    name: "Smile Design",
    description: "A complete aesthetic reconfiguration tailoring custom proportions, shade, and alignment to your exact facial features using 3D digital smile mapping.",
    duration: "3-5 Days",
    costEstimate: "Luxury Plan"
  },
  {
    id: "dental-implants",
    name: "Dental Implants",
    description: "High-grade titanium and zirconia root implants capped with handcrafted porcelain crowns, restoring bite force and jaw structural integrity.",
    duration: "2 Sessions",
    costEstimate: "Premium Grade"
  },
  {
    id: "veneers",
    name: "Premium Veneers",
    description: "Razor-thin, highly translucent custom shells bonded to the front teeth to create an instantly symmetrical, naturally luminous smile.",
    duration: "3-4 Days",
    costEstimate: "Exclusive Grade"
  },
  {
    id: "teeth-whitening",
    name: "Teeth Whitening",
    description: "Advanced laser-activated whitening combined with therapeutic enamel-restoring sealers to lift deep stains and brighten safely.",
    duration: "60 Mins",
    costEstimate: "Signature Session"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Charlotte Laurent",
    treatment: "Full Arch Veneers",
    rating: 5,
    text: "The concierge team took care of everything from the moment I landed in Istanbul. The Başakşehir facility is more like a 5-star hotel than a dental clinic. My smile design is absolutely breathtaking, I couldn't be happier!",
    branch: "basaksehir"
  },
  {
    id: "test-2",
    name: "Oliver Peterson",
    treatment: "Zirconia Implants",
    rating: 5,
    text: "Outstanding expertise and absolute precision. The consultation in Toronto gave me full confidence, and the treatment in Istanbul was incredibly smooth and pain-free.",
    branch: "toronto"
  },
  {
    id: "test-3",
    name: "Amara Moretti",
    treatment: "Hollywood Smile",
    rating: 5,
    text: "Absolute perfectionists. The digital smile preview matched my final results perfectly. Every single staff member treats you like royalty.",
    branch: "halkali"
  }
];
