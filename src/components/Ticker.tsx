import { IconFlame } from "./Icons";

const ITEMS = [
  "Roast days — Mon + Thu",
  "Ethiopia Guji · jasmine & peach",
  "Free shipping over $45",
  "Colombia Huila · caramel & red apple",
  "Twelve kilos at a time",
  "Sumatra Kerinci · molasses & cedar",
  "Ships within 48 h of the drum",
  "Sugarcane decaf that fools roasters",
];

export default function Ticker() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee overflow-hidden border-y border-espresso-3 bg-espresso py-3.5 text-cream">
      <div className="marquee-track items-center">
        {row.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center">
            <span className="whitespace-nowrap px-6 font-mono text-[10.5px] uppercase tracking-[0.24em] text-cream/85">
              {item}
            </span>
            <IconFlame className="h-3 w-3 shrink-0 text-copper" />
          </span>
        ))}
      </div>
    </div>
  );
}
