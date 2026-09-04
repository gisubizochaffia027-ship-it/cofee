import { useEffect, useState } from "react";
import {
  CATEGORY_LABEL,
  GRINDS,
  formatPrice,
  type Grind,
  type Product,
} from "../data/products";
import { IconCheck, IconMinus, IconPlus, IconX } from "./Icons";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAdd: (p: Product, grind: Grind, qty: number) => void;
}

export default function ProductModal({ product, onClose, onAdd }: ProductModalProps) {
  const [grind, setGrind] = useState<Grind>("Whole bean");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setGrind("Whole bean");
      setQty(1);
      setAdded(false);
    }
  }, [product]);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1700);
    return () => clearTimeout(t);
  }, [added]);

  const open = product !== null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center p-0 transition-all duration-400 sm:items-center sm:p-6 ${
        open ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={product ? `${product.name} details` : "Product details"}
    >
      <div
        className="absolute inset-0 bg-espresso/70 backdrop-blur-[3px]"
        onClick={onClose}
      />

      <div
        className={`relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl bg-parchment shadow-[0_40px_90px_-30px_rgba(20,10,4,0.8)] transition-all duration-500 sm:rounded-xl md:flex-row ${
          open ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-[0.97] opacity-0"
        }`}
      >
        {product && (
          <>
            {/* image side */}
            <div className="relative h-56 shrink-0 overflow-hidden bg-cream sm:h-72 md:h-auto md:min-h-[34rem] md:w-1/2">
              <img
                src={product.image}
                alt={`${product.name} coffee bag`}
                className="kenburns h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 to-transparent md:bg-gradient-to-r" />
              {product.badge && (
                <span className="absolute left-4 top-4 rounded-full bg-copper px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-cream">
                  {product.badge}
                </span>
              )}
            </div>

            {/* info side */}
            <div className="nice-scroll min-h-0 flex-1 overflow-y-auto p-6 sm:p-8 md:w-1/2 md:flex-none">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-copper">
                    {CATEGORY_LABEL[product.category]} · {product.origin}
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
                    {product.name}
                  </h3>
                  <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-faint">
                    {product.lot}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close details"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/20 text-ink-soft transition-all hover:rotate-90 hover:border-copper hover:text-copper active:scale-90"
                >
                  <IconX className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {product.notes.map((n) => (
                  <span
                    key={n}
                    className="rounded-full border border-ink/15 bg-cream px-3 py-1 text-[11.5px] font-medium text-ink-soft"
                  >
                    {n}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-ink-soft">{product.description}</p>

              {/* spec grid */}
              <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3.5 border-y border-ink/12 py-5">
                {[
                  ["Origin", product.origin],
                  ["Process", product.process],
                  ["Altitude", product.altitude],
                  ["Varietal", product.varietal],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-faint">
                      {label}
                    </dt>
                    <dd className="mt-1 text-[13px] font-semibold text-ink">{value}</dd>
                  </div>
                ))}
              </dl>

              {/* roast meter */}
              <div className="mt-5 flex items-center gap-3">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink-faint">
                  Roast
                </span>
                <span className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span
                      key={i}
                      className={`h-2.5 w-2.5 rounded-full transition-colors ${
                        i <= product.roastLevel ? "bg-copper" : "bg-ink/12"
                      }`}
                    />
                  ))}
                </span>
                <span className="text-[12px] font-semibold italic text-ink-soft">
                  {product.roast}
                </span>
              </div>

              {/* grind selector */}
              <div className="mt-6">
                <p className="mb-2.5 font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink-faint">
                  Grind
                </p>
                <div className="flex flex-wrap gap-2">
                  {GRINDS.map((g) => (
                    <button
                      key={g}
                      onClick={() => setGrind(g)}
                      className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-300 active:scale-95 ${
                        grind === g
                          ? "border-espresso bg-espresso text-cream"
                          : "border-ink/20 text-ink-soft hover:border-copper hover:text-copper"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* qty + add */}
              <div className="mt-6 flex items-stretch gap-3">
                <div className="flex items-center rounded-full border border-ink/20">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="grid h-11 w-10 place-items-center rounded-l-full text-ink-soft transition-colors hover:bg-ink/8 hover:text-ink active:scale-90"
                  >
                    <IconMinus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-mono text-sm font-semibold text-ink">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => Math.min(9, q + 1))}
                    aria-label="Increase quantity"
                    className="grid h-11 w-10 place-items-center rounded-r-full text-ink-soft transition-colors hover:bg-ink/8 hover:text-ink active:scale-90"
                  >
                    <IconPlus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  onClick={() => {
                    onAdd(product, grind, qty);
                    setAdded(true);
                  }}
                  className={`flex flex-1 items-center justify-center gap-2.5 rounded-full px-5 font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-300 active:scale-[0.97] ${
                    added
                      ? "bg-espresso text-cream"
                      : "bg-copper text-cream shadow-[0_12px_28px_-12px_rgba(188,87,30,0.8)] hover:bg-copper-deep"
                  }`}
                >
                  {added ? (
                    <>
                      <IconCheck className="h-4 w-4 text-amber" /> Added to cart
                    </>
                  ) : (
                    <>Add to cart — {formatPrice(product.price * qty)}</>
                  )}
                </button>
              </div>

              <p className="mt-4 flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-faint">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-olive" />
                Roasted this week · ships Mon or Thu · {product.weight} bag
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
