export type Service = {
  id: string;
  name: string;
  line: string;
  keywords: string[];
};

export const services: Service[] = [
  {
    id: "01",
    name: "Websites",
    line: "High-performance websites that turn visitors into customers.",
    keywords: ["Design", "Code", "Performance", "Conversion"],
  },
  {
    id: "02",
    name: "Social Media",
    line: "Strategy, content, design and management that builds your brand.",
    keywords: ["Content", "Strategy", "Community", "Growth"],
  },
  {
    id: "03",
    name: "Meta Ads",
    line: "Performance-focused Facebook & Instagram campaigns engineered for growth.",
    keywords: ["CTR", "ROAS", "Conversions", "Reach"],
  },
  {
    id: "04",
    name: "Google Ads",
    line: "Get your business in front of customers actively searching for you.",
    keywords: ["Intent", "CPC", "Quality Score", "Leads"],
  },
  {
    id: "05",
    name: "SEO",
    line: "Build sustainable organic visibility and dominate search results.",
    keywords: ["Keywords", "Rankings", "Traffic", "Organic Growth"],
  },
  {
    id: "06",
    name: "Creative & Branding",
    line: "Visual identities, creatives and content that make your brand memorable.",
    keywords: ["Identity", "System", "Creative", "Voice"],
  },
  {
    id: "07",
    name: "Complete Digital Marketing",
    line: "One team managing your entire digital presence.",
    keywords: ["Audit", "Plan", "Execute", "Optimise"],
  },
];
