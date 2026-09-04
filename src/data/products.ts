export type CategoryId = "single-origin" | "blend" | "decaf";

export interface Product {
  id: string;
  name: string;
  lot: string;
  origin: string;
  category: CategoryId;
  roast: "Light" | "Medium" | "Dark";
  roastLevel: number; // 1–5
  process: string;
  altitude: string;
  varietal: string;
  notes: string[];
  price: number;
  weight: string;
  badge?: string;
  accent: string; // swatch hex used for tags / roast meter
  image: string;
  description: string;
}

export const HERO_IMAGE =
  "https://image.qwenlm.ai/generated-images/9b07563e-b785-4fd8-a345-34426022034a/_result.png";

export const PRODUCTS: Product[] = [
  {
    id: "guji",
    name: "Ethiopia Guji",
    lot: "Highlands · Lot 14",
    origin: "Oromia, Ethiopia",
    category: "single-origin",
    roast: "Light",
    roastLevel: 2,
    process: "Washed",
    altitude: "2,100 masl",
    varietal: "Heirloom",
    notes: ["Jasmine", "Bergamot", "White Peach"],
    price: 21,
    weight: "250 g",
    badge: "New crop",
    accent: "#D98E5F",
    image:
      "https://image.qwenlm.ai/generated-images/dc882808-63e3-484c-acd7-38e2a2bbb465/_result.png",
    description:
      "Grown by smallholder farmers on the red-soil plateaus above Hagere Mariam, this heirloom lot was floated, hand-sorted twice, and washed in spring-fed channels. We roast it gently to just past first crack so the florals stay loud — a tea-like cup that opens up as it cools.",
  },
  {
    id: "huila",
    name: "Colombia Huila",
    lot: "Finca La Ceiba",
    origin: "San Agustín, Colombia",
    category: "single-origin",
    roast: "Medium",
    roastLevel: 3,
    process: "Washed",
    altitude: "1,750 masl",
    varietal: "Caturra · Castillo",
    notes: ["Caramel", "Red Apple", "Cacao Nib"],
    price: 19,
    weight: "250 g",
    accent: "#C27A3B",
    image:
      "https://image.qwenlm.ai/generated-images/c6b56a97-6dab-4b3e-906d-eadac16cdfca/_result.png",
    description:
      "Third-generation grower Doña Miriam Rojas ferments this lot for 36 hours in open tanks before sun-drying it on parabolic beds. The result is the coffee we reach for when someone asks what a 'classic' should taste like: round, sweet, and impossibly balanced.",
  },
  {
    id: "kerinci",
    name: "Sumatra Kerinci",
    lot: "Mount Kunyit Co-op",
    origin: "West Sumatra, Indonesia",
    category: "single-origin",
    roast: "Dark",
    roastLevel: 5,
    process: "Wet-hulled",
    altitude: "1,500 masl",
    varietal: "Sigararutang",
    notes: ["Molasses", "Cedar", "Dark Chocolate"],
    price: 20,
    weight: "250 g",
    badge: "Small lot",
    accent: "#5F6F52",
    image:
      "https://image.qwenlm.ai/generated-images/503f1c95-757d-4f30-8e94-62645faa2647/_result.png",
    description:
      "From the volcanic slopes of Mount Kunyit, ginned fresh and hulled while still moist — the traditional Sumatran method that gives this cup its signature weight. Pushed deep into second-crack territory, it brews syrupy and smoldering, built for milk or a stubborn moka pot.",
  },
  {
    id: "ember",
    name: "Ember House Blend",
    lot: "Roasted every Monday",
    origin: "Brazil · Guatemala",
    category: "blend",
    roast: "Medium",
    roastLevel: 3,
    process: "Natural + Washed",
    altitude: "1,200–1,800 masl",
    varietal: "Bourbon · Caturra",
    notes: ["Hazelnut", "Brown Sugar", "Orange Zest"],
    price: 18,
    weight: "250 g",
    badge: "Bestseller",
    accent: "#BC571E",
    image:
      "https://image.qwenlm.ai/generated-images/81d368d7-2d05-4aab-bd1f-5d0f5b0ab20c/_result.png",
    description:
      "Our doorstep staple: a honey-processed Brazilian base for body, with a washed Guatemalan high-grown for sparkle. Roasted to sit perfectly in the middle of the drum's curve, it's the bag we judge every other blend against — and the one our neighbors steal.",
  },
  {
    id: "midnight",
    name: "Midnight Drum",
    lot: "Espresso blend",
    origin: "Colombia · Uganda",
    category: "blend",
    roast: "Dark",
    roastLevel: 4,
    process: "Washed + Natural",
    altitude: "1,400–1,900 masl",
    varietal: "Regional blend",
    notes: ["Bittersweet Cacao", "Toasted Walnut", "Soft Smoke"],
    price: 18.5,
    weight: "250 g",
    accent: "#3A2517",
    image:
      "https://image.qwenlm.ai/generated-images/101e1849-d15e-48ed-aaa6-f7f3c6415958/_result.png",
    description:
      "Named for the last roast of the day, when the drum still ticks as it cools. A Ugandan natural lends dried-fruit depth under a washed Colombian structure; pulled as espresso it pours heavy crema with a long bittersweet finish that cuts straight through oat milk.",
  },
  {
    id: "decaf",
    name: "Sugarcane Decaf",
    lot: "EA processed in Manizales",
    origin: "Caldas, Colombia",
    category: "decaf",
    roast: "Medium",
    roastLevel: 3,
    process: "Sugarcane E.A.",
    altitude: "1,600 masl",
    varietal: "Caturra · Colombia",
    notes: ["Toffee", "Marzipan", "Gentle Citrus"],
    price: 19.5,
    weight: "250 g",
    badge: "Sleep-friendly",
    accent: "#7A7440",
    image:
      "https://image.qwenlm.ai/generated-images/89d5d6ad-d2f0-4ab9-ada9-f440471572a4/_result.png",
    description:
      "Decaffeinated with ethyl acetate derived from Colombian sugarcane — the gentlest rinse in the business, done hours from the mill that grew it. Cupped blind against our caffeinated lots, it fooled three of our five roasters. Your 9 p.m. cup just got an upgrade.",
  },
];

export const CATEGORIES: { id: CategoryId | "all"; label: string }[] = [
  { id: "all", label: "All beans" },
  { id: "single-origin", label: "Single origin" },
  { id: "blend", label: "Blends" },
  { id: "decaf", label: "Decaf" },
];

export const CATEGORY_LABEL: Record<CategoryId, string> = {
  "single-origin": "Single origin",
  blend: "Blend",
  decaf: "Decaf",
};

export const GRINDS = ["Whole bean", "Filter", "Espresso"] as const;
export type Grind = (typeof GRINDS)[number];

export const FREE_SHIPPING_THRESHOLD = 45;

export function formatPrice(n: number): string {
  return `$${n.toFixed(2)}`;
}
