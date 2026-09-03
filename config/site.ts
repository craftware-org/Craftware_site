/**
 * Single source of truth for brand-level constants.
 * Everything here is a one-line swap when the real assets arrive.
 * Placeholders are marked TODO.
 */

export const site = {
  name: "CraftWare",
  tagline: "We craft digital experiences that grow businesses.",
  description:
    "CraftWare builds high-performance websites, manages social media, runs Meta & Google Ads, and grows brands through SEO and complete digital marketing.",
  url: "https://craftware.studio", // TODO real domain
  locale: "en_IN",
  founded: "EST. 2026 — MUMBAI",
  ethos: "DESIGN × TECHNOLOGY × MARKETING",

  // TODO — real values before launch
  contact: {
    email: "hello@craftware.studio",
    phone: "+91 00000 00000",
    whatsapp: "910000000000", // digits only, for wa.me/<number>
    location: "Mumbai, India",
  },

  socials: [
    { label: "Instagram", href: "https://instagram.com/" }, // TODO
    { label: "Facebook", href: "https://facebook.com/" }, // TODO
    { label: "LinkedIn", href: "https://linkedin.com/" }, // TODO
  ],

  nav: [
    { label: "Home", href: "/#top" },
    { label: "Services", href: "/#services" },
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Process", href: "/#process" },
    { label: "Contact", href: "/#contact" },
  ],
} as const;

export const whatsappHref = (message = "Hi CraftWare, I'd like to start a project.") =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;

export const mailtoHref = (subject = "New project enquiry") =>
  `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}`;
