export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  project: string;
  content: string;
  rating: number;
  date: string;
  verified: boolean;
  source: "Google Review" | "Verified Client";
  avatarBg: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "shri-hanuman",
    name: "Rajesh Patel",
    role: "Marketing Director",
    company: "Shri Hanuman Realty",
    project: "Dholera Smart City Trifold Brochure",
    content:
      "Amee designed our entire trifold sales brochure for the Dholera Smart City residential project. The layout hierarchy, print-ready bleeds, and color fidelity were flawless. Our sales team and property investors were genuinely impressed by the quality.",
    rating: 5,
    date: "Aug 2026",
    verified: true,
    source: "Google Review",
    avatarBg: "bg-amber-600",
    initials: "RP",
  },
  {
    id: "organic-amla",
    name: "Dr. K. Sharma",
    role: "Founder & Product Lead",
    company: "Organic Amla Remedies",
    project: "Herbal Box Packaging",
    content:
      "Finding a packaging designer who understands both premium organic aesthetics and strict dieline/label compliance was a challenge until we partnered with Amee. The herbal box design gave our product an immediate, standout shelf presence in retail stores.",
    rating: 5,
    date: "Jul 2026",
    verified: true,
    source: "Google Review",
    avatarBg: "bg-emerald-600",
    initials: "KS",
  },
  {
    id: "npmakeover",
    name: "Neha Patel",
    role: "Founder & Lead Artist",
    company: "NP's Makeover Studio",
    project: "Bridal Packages Catalog",
    content:
      "The bridal package catalog Amee crafted for my beauty studio is pure elegance. The typography, layout flow, and gold-accent styling elevated our brand image completely. Every file was delivered print-ready with zero back-and-forth delays.",
    rating: 5,
    date: "Jun 2026",
    verified: true,
    source: "Verified Client",
    avatarBg: "bg-rose-600",
    initials: "NP",
  },
  {
    id: "prio-tech",
    name: "Amit Mehta",
    role: "Operations Director",
    company: "Prio Technology",
    project: "Brand Identity & Logo Mark",
    content:
      "From our primary logo mark to corporate collaterals, Amee's attention to vector detail and dieline precision is top-notch. She brings studio-grade expertise with an approachable, reliable workflow. Highly recommended for any serious branding project.",
    rating: 5,
    date: "May 2026",
    verified: true,
    source: "Google Review",
    avatarBg: "bg-sky-600",
    initials: "AM",
  },
];
