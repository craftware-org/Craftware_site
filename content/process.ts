export type ProcessStep = {
  id: string;
  name: string;
  body: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "01",
    name: "Discover",
    body: "We understand your business, audience and goals.",
  },
  {
    id: "02",
    name: "Strategy",
    body: "We build a digital roadmap around measurable outcomes.",
  },
  {
    id: "03",
    name: "Craft",
    body: "Design, development, content and campaigns come together.",
  },
  {
    id: "04",
    name: "Launch",
    body: "We launch your digital presence to the world.",
  },
  {
    id: "05",
    name: "Grow",
    body: "We optimize, advertise and continuously improve.",
  },
];
