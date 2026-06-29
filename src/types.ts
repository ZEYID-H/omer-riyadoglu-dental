export interface Branch {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  googleMapsUrl: string;
  yandexMapsUrl: string;
  rating: number;
  image: string;
  altText: string;
  description: string;
  type: string; // e.g. "Main Hub", "Aesthetic Boutique", "Consultation Center"
  phone: string;
  whatsapp: string;
  email: string;
  latitude: number; // For map positioning (simulated coordinates)
  longitude: number; // For map positioning
}

export interface Testimonial {
  id: string;
  name: string;
  treatment: string;
  rating: number;
  text: string;
  image?: string;
  branch: string;
}

export interface Treatment {
  id: string;
  name: string;
  description: string;
  duration: string;
  costEstimate?: string;
}
