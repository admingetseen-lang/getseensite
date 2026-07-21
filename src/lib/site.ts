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
  phoneFixed: "+49 8062 7014760",
  street: "Gewerbepark Bwb 2",
  city: "83052 Bruckmühl",
} as const;

/** Referenzkunden — Logo-Wall auf der Startseite. `logo` optional (Pfad unter
 *  public/), sonst wird der Name als Wortmarke gezeigt. */
export const CLIENTS = [
  { name: "Seegraserie", url: "https://www.seegraerie.de" },
  { name: "Gartenbau Mazza", url: "https://gartenbau-mazza.de" },
  { name: "Claudia Stranghöner", url: "https://www.stranghöner.com" },
  { name: "Montageteam Oberbayern", url: "https://montageteam-oberbayern.de" },
  { name: "Rosenheimer Handwerker", url: "https://rosenheimer-handwerker.de" },
  { name: "GetSeen Cloud", url: "https://www.getseen.cloud", logo: "brand/getseen-cloud.png" },
] as const;

/** Partner & Förderer — Logo-Wall auf der Startseite. */
export const PARTNERS = [
  { name: "GetSeen Cloud", url: "https://www.getseen.cloud", logo: "brand/getseen-cloud.png" },
  { name: "Stellwerk18", url: "https://www.stellwerk18.de" },
  { name: "BayStartUP", url: "https://www.baystartup.de" },
  {
    name: "StMWi Bayern",
    fullName: "Bayerisches Staatsministerium für Wirtschaft, Landesentwicklung und Energie",
    url: "https://www.stmwi.bayern.de",
  },
  { name: "Gründerland Bayern", url: "https://www.gruenderland.bayern" },
] as const;

export const NAV_LINKS = [
  { label: "Über uns", href: "/#ueber-uns" },
  { label: "Leistungen", href: "/leistungen" },
  { label: "Live-Demo", href: "/demo" },
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
