import { HERO_IMAGE } from "../data/products";
import { IconArrowRight, IconChevronDown, IconFlame } from "./Icons";

const TITLE_LINES = [
  { text: "Fire, patience,", italic: false },
  { text: "and the perfect", italic: false },
  { text: "first crack.", italic: true },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      {/* faint oversized wordmark behind everything */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-6 top-16 select-none font-display text-[34vw] font-black leading-none text-ink/[0.035] lg:text-[22rem]"
      >
        Roast
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-8 lg:pb-24">
        {/* ------ copy column ------ */}
        <div className="lg:col-span-7">
          <p className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-copper sm:text-[11px]">
            <span className="h-px w-8 bg-copper" />
            Portland, Oregon — small-batch roastery, est. 2017
          </p>

          <h1 className="font-display text-[13.5vw] font-semibold leading-[0.95] tracking-[-0.02em] text-ink sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
            {TITLE_LINES.map((line, i) => (
              <span key={line.text} className="mask-line">
                <span
                  style={{ animationDelay: `${120 + i * 130}ms` }}
                  className={line.italic ? "font-light italic text-copper" : undefined}
                >
                  {line.text}
                </span>
              </span>
            ))}
          </h1>

          <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-ink-soft sm:text-base">
            Six coffees on the shelf, twelve kilos in the drum, and your bag on a truck
            within <strong className="font-semibold text-ink">48 hours of roast</strong>. No
            warehouses, no stale bins — just this week's roast log, and your name written
            on the bag.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <a
              href="#shelf"
              className="group inline-flex items-center gap-3 rounded-full bg-copper px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-cream shadow-[0_10px_30px_-12px_rgba(188,87,30,0.7)] transition-all duration-300 hover:bg-copper-deep hover:shadow-[0_14px_34px_-10px_rgba(150,67,20,0.75)] active:scale-95"
            >
              Shop the shelf
              <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#roast"
              className="group inline-flex items-center gap-2 border-b border-ink/30 pb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-copper hover:text-copper"
            >
              Read the roast log
              <IconChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-ink/15 pt-6">
            {[
              ["Mon + Thu", "Roast days"],
              ["48 h", "Drum to door"],
              ["12 kg", "Batch size"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-display text-xl font-semibold text-ink sm:text-2xl">{value}</dt>
                <dd className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink-faint">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ------ image column ------ */}
        <div className="relative lg:col-span-5">
          <div className="relative overflow-hidden rounded-t-[10rem] rounded-b-xl border border-ink/15 shadow-[0_30px_60px_-30px_rgba(38,23,14,0.55)]">
            <img
              src={HERO_IMAGE}
              alt="Freshly roasted beans cascading from the copper drum"
              className="kenburns h-[26rem] w-full object-cover sm:h-[30rem] lg:h-[34rem]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/55 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-5 font-mono text-[10px] uppercase tracking-[0.25em] text-cream/85">
              Drum No. 2 — Tuesday, 6:40 am
            </p>
          </div>

          {/* rotating stamp */}
          <div className="absolute -bottom-8 -left-4 h-28 w-28 sm:-left-8 sm:h-32 sm:w-32">
            <svg viewBox="0 0 120 120" className="spin-slow h-full w-full drop-shadow-md">
              <circle cx="60" cy="60" r="58" className="fill-espresso" />
              <defs>
                <path id="stamp-circle" d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
              </defs>
              <text className="fill-cream font-mono" fontSize="9.2" letterSpacing="2.6">
                <textPath href="#stamp-circle">
                  ROASTED FRESH · SMALL BATCH · PORTLAND OR ·
                </textPath>
              </text>
            </svg>
            <span className="absolute inset-0 grid place-items-center">
              <IconFlame className="h-8 w-8 text-copper" />
            </span>
          </div>

          {/* floating tasting chip */}
          <div className="float-y absolute -right-2 top-8 rounded-lg border border-ink/10 bg-parchment/95 px-4 py-3 shadow-[0_16px_36px_-18px_rgba(38,23,14,0.5)] backdrop-blur-sm sm:right-6">
            <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-ink-faint">
              On the drum today
            </p>
            <p className="mt-1 font-display text-[15px] font-semibold italic text-ink">
              Jasmine · Bergamot · Peach
            </p>
            <div className="mt-2 flex items-center gap-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full ${i < 2 ? "bg-copper" : "bg-ink/15"}`}
                />
              ))}
              <span className="ml-1 font-mono text-[9px] uppercase tracking-widest text-ink-soft">
                Light
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
