export const profile = {
  name: "Vishwajeet Thakur",
  first: "Vishwajeet",
  last: "Thakur",
  role: "Designer & Developer",
  intro:
    "I design and develop websites that look sharp, load fast and work on every screen — on WordPress, Next.js and Shopify.",
  email: "vishavjeetthakur103@gmail.com",
  phone: "+91 82192 95571",
  phoneHref: "+918219295571",
  location: "Chandigarh, India",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export const stats = [
  { value: "30+", label: "Websites designed & built" },
  { value: "3+", label: "Years of experience" },
  { value: "90+", label: "PageSpeed scores achieved" },
  { value: "11", label: "Live projects featured here" },
];

export const marquee = ["Design", "Develop", "WordPress", "Next.js", "Shopify", "Elementor", "Divi", "PageSpeed 90+"];

export type Service = { title: string; desc: string; tags: string[]; points?: string[] };

export const designServices: Service[] = [
  {
    title: "UI / UX Design",
    desc: "Clean, user-friendly layouts designed mobile-first and pixel-perfect on every screen size.",
    tags: ["Figma", "Canva", "Responsive"],
    points: ["Wireframes & page structure", "Visual design & typography", "Mobile & desktop layouts", "Design handoff to build"],
  },
  {
    title: "Landing Pages",
    desc: "High-converting pages with modern layouts and purposeful animation that guide visitors to act.",
    tags: ["Conversion", "Motion", "Layout"],
    points: ["Clear hierarchy & CTAs", "Scroll & hover animations", "A/B-ready sections", "Fast-loading assets"],
  },
  {
    title: "Visual Systems",
    desc: "Consistent type, colour and components so every page feels like one brand.",
    tags: ["Typography", "Colour", "Components"],
    points: ["Reusable section library", "Brand colours & type scale", "Iconography & imagery", "Consistent spacing"],
  },
];

export const devServices: Service[] = [
  {
    title: "WordPress Development",
    desc: "Custom builds with Elementor and Divi, extended with hand-written HTML, CSS and JavaScript beyond the builder's limits.",
    tags: ["Elementor", "Divi", "Plugins"],
    points: ["Custom sliders & testimonials", "Forms, SMTP & integrations", "Easy-to-edit for clients", "Cross-browser fixes"],
  },
  {
    title: "Next.js & React",
    desc: "Fast, modern frontends with component-driven architecture and smooth interactions.",
    tags: ["Next.js", "React", "Tailwind"],
    points: ["App Router & static pages", "Reusable components", "Animations & interactions", "SEO-friendly markup"],
  },
  {
    title: "Shopify Stores",
    desc: "Store setup, theme customisation and custom sections built to sell.",
    tags: ["Shopify", "Liquid", "Themes"],
    points: ["Theme setup & styling", "Custom sections", "Product & collection pages", "Mobile-first checkout flow"],
  },
  {
    title: "Performance & SEO",
    desc: "PageSpeed scores of 90+, optimised assets, on-page SEO and tracking set up right.",
    tags: ["PageSpeed", "Rank Math", "Yoast", "GTM"],
    points: ["Image & asset optimisation", "Core Web Vitals tuning", "Rank Math / Yoast setup", "Google Tag Manager & tracking"],
  },
];

export const toolbox = [
  "WordPress", "Elementor", "Divi", "Next.js", "React", "Shopify", "Webflow", "Wix", "HTML", "CSS", "JavaScript",
  "Figma", "Canva", "Rank Math", "Yoast SEO", "Google Tag Manager",
];

export const strengths = [
  { title: "Creative thinking", desc: "Every site gets its own idea, not a template with the logo swapped." },
  { title: "Fast learner", desc: "From Elementor to Next.js to Shopify — new tools become working sites quickly." },
  { title: "Problem solving", desc: "Responsive bugs, slow pages, broken layouts — I enjoy fixing what others give up on." },
  { title: "Attention to detail", desc: "Spacing, alignment and every breakpoint checked before anything goes live." },
];

export const process = [
  { title: "Discover", desc: "Understanding your goals, audience and content before a single pixel is placed." },
  { title: "Design", desc: "Layouts, type and interactions shaped until they look right and feel right." },
  { title: "Develop", desc: "Built on WordPress, Next.js or Shopify — responsive, clean and easy to manage." },
  { title: "Launch & optimise", desc: "Speed, SEO and tracking tuned so the site performs from day one." },
];

export const faqs = [
  {
    q: "Which platform should my website use?",
    a: "WordPress is ideal when you want to edit content yourself, Shopify when you sell products online, and Next.js when you need maximum speed and custom interactions. I'll recommend the right fit for your goals.",
  },
  {
    q: "Do you only design, or also develop?",
    a: "Both. I design the layout and visual style, then build it myself — so nothing gets lost between the design and the live site.",
  },
  {
    q: "Will my website work on mobile?",
    a: "Yes. Every layout is designed and tested for mobile, tablet and desktop, and checked across browsers before launch.",
  },
  {
    q: "Can you make my existing website faster?",
    a: "Yes. I've taken sites to 90+ PageSpeed scores by optimising images, scripts, fonts and plugins without changing how the site looks.",
  },
  {
    q: "Do you help with SEO?",
    a: "I set up on-page SEO with Rank Math or Yoast, clean headings and metadata, fast load times, and Google Tag Manager for tracking.",
  },
];

export const experience = [
  {
    period: "2023 — Present",
    role: "WordPress Designer & Developer",
    company: "Caresort Solutions Pvt. Ltd.",
    points: [
      "Designed and built 30+ websites using Elementor & Divi, from healthcare brands to industrial manufacturers.",
      "Developed modern, high-performance frontends with Next.js and React.",
      "Built and customised Shopify stores — theme setup, custom sections and product page design.",
      "Pushed PageSpeed scores to 90+ through image, asset and performance optimisation.",
      "Integrated forms, SMTP, Google Tag Manager and tracking tools across client sites.",
    ],
    stack: ["WordPress", "Elementor", "Divi", "Next.js", "React", "Shopify", "HTML / CSS / JS", "SEO"],
  },
];

export const education = [
  { period: "—", title: "Bachelor of Arts (B.A.)", place: "Indira Gandhi National Open University (IGNOU)" },
  { period: "2018", title: "Senior Secondary (+2)", place: "GSSS Chauntra" },
  { period: "2016", title: "Matriculation", place: "GSSS Chauntra" },
];

export type Project = {
  slug: string;
  name: string;
  url: string;
  domain: string;
  category: string;
  industry: string;
  platform: "WordPress" | "Shopify" | "Web";
  stack: string[];
  summary: string;
  overview: string;
  scope: string[];
  colors: [string, string];
  /** Screenshots live at /public/projects/{slug}-desktop|full|mobile.jpg */
  shots: boolean;
  fullHeight: number;
};

const wpScope = ["UI design", "Elementor build", "Responsive layouts", "Speed optimisation", "On-page SEO"];
const shopScope = ["Theme customisation", "Custom sections", "Product pages", "Mobile-first layout"];

export const projects: Project[] = [
  {
    slug: "liquid-carbon",
    name: "Liquid Carbon",
    url: "https://liquidcarbon.ai/",
    domain: "liquidcarbon.ai",
    category: "Corporate website",
    industry: "Climate tech",
    platform: "WordPress",
    stack: ["WordPress", "Elementor"],
    summary: "A clean-tech brand turning wastewater into resource.",
    overview:
      "Liquid Carbon works on turning wastewater into a resource. The website needed to explain a technical process simply and give a young climate-tech brand a confident, modern presence.",
    scope: wpScope,
    colors: ["#00c48c", "#0b6bff"],
    shots: true,
    fullHeight: 7200,
  },
  {
    slug: "anglome",
    name: "Anglome",
    url: "https://anglome.com/",
    domain: "anglome.com",
    category: "Corporate website",
    industry: "Global trading · UAE",
    platform: "WordPress",
    stack: ["WordPress", "Elementor"],
    summary: "Global trading & supply partner based in the UAE.",
    overview:
      "Anglome (Anglo Middle East LLC) is a UAE-based service provider supplying customised products and solutions to the hospitality, healthcare, aviation, oil & gas and chemicals sectors. The site presents a wide range of industries in a clear, trustworthy way.",
    scope: wpScope,
    colors: ["#ff7a3d", "#ffd23f"],
    shots: true,
    fullHeight: 3663,
  },
  {
    slug: "arvid-lindblad",
    name: "Arvid Lindblad",
    url: "https://arvidlindblad.com/",
    domain: "arvidlindblad.com",
    category: "Personal brand",
    industry: "Motorsport",
    platform: "WordPress",
    stack: ["WordPress", "Elementor"],
    summary: "The official website of Formula 1 driver Arvid Lindblad.",
    overview:
      "The official website of Arvid Lindblad, Formula 1 driver No. 41 competing with Racing Bulls. A personal brand site that needed to feel fast, bold and premium, available in English, Hindi and Swedish.",
    scope: wpScope,
    colors: ["#2b3cff", "#ff2b4f"],
    shots: true,
    fullHeight: 7200,
  },
  {
    slug: "wirehn",
    name: "Wiréhn",
    url: "https://wirehn.myshopify.com/en",
    domain: "wirehn.myshopify.com",
    category: "E-commerce store",
    industry: "Art & prints",
    platform: "Shopify",
    stack: ["Shopify", "Liquid"],
    summary: "Original artworks and fine art prints by Klas Wiréhn.",
    overview:
      "An online store for original artworks and fine art prints by Klas Wiréhn — character-driven pieces inspired by storytelling and modern culture. The store lets the artwork lead while keeping browsing and buying simple.",
    scope: shopScope,
    colors: ["#f2e6d0", "#ff7a3d"],
    shots: true,
    fullHeight: 5493,
  },
  {
    slug: "sbppl",
    name: "SBPPL Industries",
    url: "https://sbpplindustries.com/",
    domain: "sbpplindustries.com",
    category: "Corporate website",
    industry: "Manufacturing",
    platform: "WordPress",
    stack: ["WordPress", "Elementor"],
    summary: "Manufacturing partner for recycled polymer solutions.",
    overview:
      "Shree Balaji Plastochem Pvt. Ltd. manufactures high-quality recycled polypropylene (PP), LD and HD granules. The site positions them as a reliable manufacturing partner and makes their product range easy to explore.",
    scope: wpScope,
    colors: ["#00d1ff", "#00c48c"],
    shots: true,
    fullHeight: 5628,
  },
  {
    slug: "carefit",
    name: "Carefit",
    url: "https://carefit-0n4gunap.myshopify.com/",
    domain: "carefit.myshopify.com",
    category: "E-commerce store",
    industry: "Retail",
    platform: "Shopify",
    stack: ["Shopify", "Liquid"],
    summary: "A Shopify storefront built for easy shopping on any device.",
    overview:
      "Carefit is a Shopify storefront designed to make browsing and buying effortless — clean product presentation, clear navigation and a layout that works just as well on mobile as on desktop.",
    scope: shopScope,
    colors: ["#5bd6ff", "#9b7bff"],
    shots: false,
    fullHeight: 0,
  },
  {
    slug: "codech",
    name: "Codech Solutions",
    url: "https://codech.tech/",
    domain: "codech.tech",
    category: "Agency website",
    industry: "Design agency",
    platform: "WordPress",
    stack: ["WordPress", "Elementor"],
    summary: "Presentation design and website design agency in India.",
    overview:
      "Codech Solutions is a presentation design and website design agency in India. As a creative agency, the site itself had to be a showcase — polished visuals, clear services and strong calls to action.",
    scope: wpScope,
    colors: ["#9b7bff", "#00c48c"],
    shots: true,
    fullHeight: 7200,
  },
  {
    slug: "ss-alliance",
    name: "Strategic Sourcing",
    url: "https://ss-alliance.com/",
    domain: "ss-alliance.com",
    category: "Corporate website",
    industry: "B2B sourcing",
    platform: "WordPress",
    stack: ["WordPress", "Elementor"],
    summary: "A corporate presence for a strategic sourcing alliance.",
    overview:
      "Strategic Sourcing needed a corporate website that communicates trust and capability to B2B buyers — structured services, clear messaging and a professional visual language.",
    scope: wpScope,
    colors: ["#3b5bff", "#00d1ff"],
    shots: true,
    fullHeight: 7200,
  },
  {
    slug: "techsparrow",
    name: "TechSparrow",
    url: "https://techsparrow.co.in/",
    domain: "techsparrow.co.in",
    category: "Company website",
    industry: "Technology",
    platform: "WordPress",
    stack: ["WordPress", "Elementor"],
    summary: "Technology with wings — a modern IT company website.",
    overview:
      "TechSparrow — “Technology with Wings” — needed a modern company website that presents its technology services clearly and feels as forward-looking as the brand.",
    scope: wpScope,
    colors: ["#8b6cff", "#ff4fd8"],
    shots: true,
    fullHeight: 4792,
  },
  {
    slug: "innovious",
    name: "Innovious Designs",
    url: "https://innoviousdesigns.com/presentation-designer-india/",
    domain: "innoviousdesigns.com",
    category: "Landing page",
    industry: "Presentation design",
    platform: "WordPress",
    stack: ["WordPress", "Elementor"],
    summary: "A high-converting landing page for presentation design services.",
    overview:
      "A dedicated landing page for Innovious Designs' presentation design services in India — built to convert, with a focused message, social proof and clear calls to action.",
    scope: ["Landing page design", "Elementor build", "Conversion-focused layout", "Responsive", "Speed optimisation"],
    colors: ["#ff3d6e", "#8b6cff"],
    shots: true,
    fullHeight: 6044,
  },
  {
    slug: "fappl",
    name: "FAPPL",
    url: "https://fappl.in/",
    domain: "fappl.in",
    category: "Corporate website",
    industry: "Investment · SMEs",
    platform: "Web",
    stack: ["Web design"],
    summary: "Backing high-quality SMEs with capital, governance & execution.",
    overview:
      "FAPPL invests in and operates scalable SME businesses across agri and non-agri sectors. The website presents their approach and portfolio with a bold, confident layout that builds trust with founders and partners.",
    scope: ["UI design", "Responsive layouts", "Speed optimisation"],
    colors: ["#ffb13d", "#ff3d6e"],
    shots: true,
    fullHeight: 6703,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const shot = (p: Project, kind: "desktop" | "full" | "mobile") => `/projects/${p.slug}-${kind}.jpg`;
