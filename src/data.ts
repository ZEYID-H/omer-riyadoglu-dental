import { Branch, Testimonial, Treatment } from "./types";
import { clinic } from "./clinicInfo";

export const branches: Branch[] = [
  {
    id: "basaksehir",
    name: clinic.name,
    city: clinic.city,
    country: clinic.region,
    address: clinic.addressFull,
    googleMapsUrl: clinic.googleMapsUrl,
    yandexMapsUrl: clinic.yandexMapsUrl,
    rating: 5.0,
    image:
      "/clinic/interior-1.webp",
    altText:
      "Interior of Diş Hekimi Ömer Riyadoğlu dental clinic in Avcılar, İstanbul. A calm, modern treatment space with warm gold accent lighting and premium finishes.",
    description:
      "Our dental clinic in Avcılar, İstanbul, offering attentive, modern dental care in a calm and comfortable setting.",
    type: "Dental Clinic",
    phone: clinic.phoneDisplay,
    whatsapp: clinic.whatsapp,
    email: clinic.email,
    latitude: clinic.latitude,
    longitude: clinic.longitude,
  },
];

export const treatments: Treatment[] = [
  {
    id: "smile-design",
    name: "Smile Design",
    description:
      "A personalized aesthetic plan tailoring tooth proportions, shade, and alignment to your facial features using digital smile mapping.",
    duration: "Multi-session",
    costEstimate: "On Consultation",
  },
  {
    id: "dental-implants",
    name: "Dental Implants",
    description:
      "Durable titanium root implants restored with custom crowns to recover natural bite function and a confident smile.",
    duration: "2+ Sessions",
    costEstimate: "On Consultation",
  },
  {
    id: "veneers",
    name: "Veneers",
    description:
      "Thin, natural-looking porcelain shells bonded to the front teeth to create a balanced, bright, and symmetrical smile.",
    duration: "Multi-session",
    costEstimate: "On Consultation",
  },
  {
    id: "teeth-whitening",
    name: "Teeth Whitening",
    description:
      "Professional whitening to safely lift everyday stains and brighten your smile under careful clinical supervision.",
    duration: "60 Mins",
    costEstimate: "On Consultation",
  },
  {
    id: "orthodontics",
    name: "Orthodontics (Braces)",
    description:
      "Braces and clear aligners to gradually straighten teeth and correct your bite — improving both the function and the appearance of your smile.",
    duration: "Ongoing",
    costEstimate: "On Consultation",
  },
];

// Placeholder reviews with Turkish names. Replace with verified patient
// testimonials once collected with consent.
export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Elif Yılmaz",
    treatment: "General Check-up",
    rating: 5,
    text: "Placeholder review — to be replaced with a verified patient testimonial. Friendly, professional, and reassuring care from start to finish.",
    branch: "basaksehir",
  },
  {
    id: "test-2",
    name: "Mehmet Demir",
    treatment: "Dental Implant",
    rating: 5,
    text: "Placeholder review — to be replaced with a verified patient testimonial. Everything was clearly explained and the treatment was comfortable.",
    branch: "basaksehir",
  },
  {
    id: "test-3",
    name: "Zeynep Kaya",
    treatment: "Smile Design",
    rating: 5,
    text: "Placeholder review — to be replaced with a verified patient testimonial. A calm clinic and a careful, patient-focused approach.",
    branch: "basaksehir",
  },
];
