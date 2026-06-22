/** Single source of truth for GetSeen content, links and contact details. */

export const COMPANY = "GetSeen UG (haftungsbeschränkt)";

export const EXTERNAL = {
  liveDemo: "https://www.getseen.shop/live-demo",
  cloud: "https://www.getseen.cloud",
  paypal: "https://paypal.me/getseenug",
  instagram: "https://www.instagram.com/getseen.shop",
  tiktok: "https://www.tiktok.com/@getseen.shop",
  facebook: "https://www.facebook.com/",
  linkedin: "https://www.linkedin.com/",
} as const;

export const CONTACT = {
  email: "info@getseen.shop",
  phoneFixed: "+49 8062 7014761",
  phoneMobile: "+49 172 5238999",
  street: "Gewerbepark Bwb 2",
  city: "83052 Bruckmühl",
} as const;

export const NAV_LINKS = [
  { label: "Über uns", href: "/#ueber-uns" },
  { label: "Leistungen", href: "/leistungen" },
  { label: "GetSeen Cloud", href: "/#cloud" },
  { label: "Anfrage", href: "/anfrage" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

export const LEGAL_LINKS = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "AGB", href: "/agb" },
  { label: "Widerruf", href: "/widerruf" },
] as const;
