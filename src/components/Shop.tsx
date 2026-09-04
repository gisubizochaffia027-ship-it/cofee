import { useMemo, useState } from "react";
import {
  CATEGORIES,
  CATEGORY_LABEL,
  PRODUCTS,
  formatPrice,
  type CategoryId,
  type Product,
} from "../data/products";
import { IconChevronDown, IconCup, IconPlus, IconSearch, IconX } from "./Icons";
import Reveal from "./Reveal";

type SortId = "featured" | "price-asc" | "price-desc" | "az";

interface ShopProps {
  onAdd: (p: Product) => void;
  onOpen: (p: Product) => void;
}

function RoastDots({ level }: { level: number }) {
  return (
    <span className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${i <= level ? "bg-copper" : "bg-ink/15"}`}
        />
      ))}
    </span>
  );
}

export default function Shop({ onAdd, onOpen }: ShopProps) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<CategoryId | "all">("all");
  const [sort, setSort] = useState<SortId>("featured");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => cat === "all" || p.category === cat);
    if (q) {
      list = list.filter((p) =>
        [p.name, p.origin, p.lot, p.process, p.roast, ...p.notes]
          .join(" ")
          .toLowerCase()
          .includes(q),
      );
    }
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "az") sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [query, cat, sort]);

  const countFor = (id: CategoryId | "all") =>
    id === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === id).length;

  return (
    <section id="shelf" className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-20 sm:px-8 lg:py-28">
      {/* heading row */}
      <Reveal>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-copper">
              <span className="h-px w-8 bg-copper" />
              The shelf — roasted this week
            </p>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Choose your bag<span className="text-copper">.</span>
            </h2>
          </div>

          <div className="relative w-full lg:w-80">
            <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink-faint" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search origin, notes, roast…"
              aria-label="Search coffees"
              className="w-full rounded-full border border-ink/20 bg-parchment py-3 pl-11 pr-10 text-sm text-ink placeholder:text-ink-faint transition-colors focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/25"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-ink-soft transition-colors hover:bg-ink/10 hover:text-ink"
              >
                <IconX className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </Reveal>

      {/* filter + sort row */}
      <Reveal delay={80}>
        <div className="mt-8 flex flex-col gap-4 border-y border-ink/10 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((c) => {
              const active = cat === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setCat(c.id)}
                  className={`rounded-full border px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.16em] transition-all duration-300 active:scale-95 ${
                    active
                      ? "border-espresso bg-espresso text-cream shadow-[0_8px_20px_-10px_rgba(30,18,10,0.7)]"
                      : "border-ink/20 bg-transparent text-ink-soft hover:border-copper hover:text-copper"
                  }`}
                >
                  {c.label}
                  <span className={`ml-1.5 ${active ? "text-amber" : "text-ink-faint"}`}>
                    {countFor(c.id)}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
              {filtered.length} of {PRODUCTS.length} coffees
            </span>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortId)}
                aria-label="Sort coffees"
                className="appearance-none rounded-full border border-ink/20 bg-parchment py-2.5 pl-4 pr-10 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink transition-colors focus:border-copper focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price · low to high</option>
                <option value="price-desc">Price · high to low</option>
                <option value="az">Name · A–Z</option>
              </select>
              <IconChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
            </div>
          </div>
        </div>
      </Reveal>

      {/* grid */}
      {filtered.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 90}>
              <article
                onClick={() => onOpen(p)}
                className="group cursor-pointer overflow-hidden rounded-xl border border-ink/12 bg-parchment transition-all duration-500 hover:-translate-y-1.5 hover:border-ink/25 hover:shadow-[0_28px_50px_-28px_rgba(38,23,14,0.5)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                  <img
                    src={p.image}
                    alt={`${p.name} coffee bag`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  {p.badge && (
                    <span
                      className={`absolute left-3.5 top-3.5 rounded-full px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-cream shadow-sm ${
                        p.badge === "Bestseller" ? "bg-copper" : "bg-espresso/90"
                      }`}
                    >
                      {p.badge}
                    </span>
                  )}
                  <div className="absolute inset-x-3.5 bottom-3.5 translate-y-3 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="block rounded-lg border border-ink/10 bg-parchment/95 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-ink backdrop-blur-sm">
                      Quick view
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink-faint">
                      {CATEGORY_LABEL[p.category]} · {p.roast} roast
                    </span>
                    <RoastDots level={p.roastLevel} />
                  </div>
                  <h3 className="mt-2.5 font-display text-[22px] font-semibold leading-tight tracking-tight text-ink transition-colors group-hover:text-copper">
                    {p.name}
                  </h3>
                  <p className="mt-0.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-faint">
                    {p.lot}
                  </p>

                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {p.notes.map((n) => (
                      <span
                        key={n}
                        className="rounded-full border border-ink/15 px-2.5 py-1 text-[11px] font-medium text-ink-soft"
                      >
                        {n}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4">
                    <p className="font-display text-xl font-semibold text-ink">
                      {formatPrice(p.price)}
                      <span className="ml-1.5 font-mono text-[9.5px] font-normal uppercase tracking-widest text-ink-faint">
                        / {p.weight}
                      </span>
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAdd(p);
                      }}
                      aria-label={`Add ${p.name} to cart`}
                      className="grid h-10.5 w-10.5 place-items-center rounded-full bg-espresso text-cream transition-all duration-300 hover:bg-copper hover:shadow-[0_10px_22px_-10px_rgba(188,87,30,0.8)] active:scale-90"
                    >
                      <IconPlus className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center rounded-xl border border-dashed border-ink/25 bg-parchment/60 px-6 py-20 text-center">
          <IconCup className="h-12 w-12 text-ink-faint" />
          <h3 className="mt-5 font-display text-2xl font-semibold text-ink">
            Nothing in the bin matches that
          </h3>
          <p className="mt-2 max-w-sm text-sm text-ink-soft">
            Try a different origin, a tasting note like "caramel", or clear your filters to
            see the whole shelf.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setCat("all");
            }}
            className="mt-6 rounded-full bg-espresso px-6 py-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-cream transition-all hover:bg-copper active:scale-95"
          >
            Clear search & filters
          </button>
        </div>
      )}
    </section>
  );
}
