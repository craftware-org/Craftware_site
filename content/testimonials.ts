export type Testimonial = {
  quote: string;
  name: string;
  company: string;
  role: string;
};

/**
 * Fictional placeholders — replace with real, attributed quotes before launch.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "They didn't just build us a website. They built the machine that books our tours.",
    name: "A. Rahman",
    company: "Quba International",
    role: "Founder",
  },
  {
    quote:
      "Our onboarding used to lose people. Now it doesn't. The difference showed up in the numbers within weeks.",
    name: "S. Iyer",
    company: "Orbit Care",
    role: "Head of Product",
  },
  {
    quote:
      "The brand finally looks like the coffee tastes. Our weekends are full.",
    name: "M. Fernandes",
    company: "No Name Café",
    role: "Owner",
  },
  {
    quote:
      "Midweek used to be dead. The site and the ads fixed that in a month.",
    name: "H. Sheikh",
    company: "Al Madina Restaurant",
    role: "Managing Partner",
  },
  {
    quote:
      "One team for design, build and ads. No hand-offs, no finger-pointing, just growth.",
    name: "P. Nair",
    company: "Retail client",
    role: "Marketing Lead",
  },
];
