import { useState } from "react";
import {
  FREE_SHIPPING_THRESHOLD,
  formatPrice,
  type Grind,
  type Product,
} from "../data/products";
import {
  IconArrowLeft,
  IconBean,
  IconMinus,
  IconPlus,
  IconSpinner,
  IconTrash,
  IconTruck,
  IconX,
} from "./Icons";

export interface CartLine {
  key: string;
  product: Product;
  grind: Grind;
  qty: number;
}

export type CartStep = "cart" | "details" | "done";

const SHIPPING_FLAT = 6;

interface CartDrawerProps {
  open: boolean;
  step: CartStep;
  lines: CartLine[];
  subtotal: number;
  placing: boolean;
  orderId: string | null;
  onClose: () => void;
  onUpdateQty: (key: string, delta: number) => void;
  onRemove: (key: string) => void;
  onToDetails: () => void;
  onBackToCart: () => void;
  onPlaceOrder: () => void;
  onBrowse: () => void;
  onDone: () => void;
}

const inputCls =
  "w-full rounded-lg border border-ink/20 bg-parchment px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint transition-colors focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/25";
const labelCls =
  "mb-1.5 block font-mono text-[9px] uppercase tracking-[0.22em] text-ink-faint";

export default function CartDrawer({
  open,
  step,
  lines,
  subtotal,
  placing,
  orderId,
  onClose,
  onUpdateQty,
  onRemove,
  onToDetails,
  onBackToCart,
  onPlaceOrder,
  onBrowse,
  onDone,
}: CartDrawerProps) {
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FLAT;
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const titles: Record<CartStep, string> = {
    cart: `Your bag${count ? ` · ${count}` : ""}`,
    details: "Checkout",
    done: "Confirmed",
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "visible" : "invisible pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-espresso/60 backdrop-blur-[2px] transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper shadow-[-30px_0_70px_-30px_rgba(20,10,4,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-ink/12 px-5 py-4">
          <div className="flex items-center gap-3">
            {step === "details" && (
              <button
                onClick={onBackToCart}
                aria-label="Back to bag"
                className="grid h-8 w-8 place-items-center rounded-full border border-ink/20 text-ink-soft transition-colors hover:border-copper hover:text-copper"
              >
                <IconArrowLeft className="h-4 w-4" />
              </button>
            )}
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
              {titles[step]}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-full border border-ink/20 text-ink-soft transition-all hover:rotate-90 hover:border-copper hover:text-copper"
          >
            <IconX className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* ============ CART STEP ============ */}
        {step === "cart" && (
          <>
            <div className="nice-scroll flex-1 overflow-y-auto px-5 py-4">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <span className="grid h-20 w-20 place-items-center rounded-full border border-dashed border-ink/25 text-ink-faint">
                    <IconBean className="h-9 w-9" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-ink">
                    Your bag is empty
                  </h3>
                  <p className="mt-2 max-w-[16rem] text-sm text-ink-soft">
                    The drum is warm and this week's roast is on the shelf.
                  </p>
                  <button
                    onClick={onBrowse}
                    className="mt-6 rounded-full bg-copper px-6 py-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-cream transition-all hover:bg-copper-deep active:scale-95"
                  >
                    Browse the shelf
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {lines.map((line) => (
                    <li
                      key={line.key}
                      className="group flex gap-3.5 rounded-xl border border-ink/10 bg-parchment p-3 transition-all duration-300 hover:border-ink/25 hover:shadow-[0_14px_30px_-20px_rgba(38,23,14,0.5)]"
                    >
                      <img
                        src={line.product.image}
                        alt={line.product.name}
                        className="h-21 w-16 rounded-lg border border-ink/10 object-cover"
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-display text-[15px] font-semibold leading-tight text-ink">
                              {line.product.name}
                            </p>
                            <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                              {line.grind} · {line.product.weight}
                            </p>
                          </div>
                          <p className="font-display text-[15px] font-semibold text-ink">
                            {formatPrice(line.product.price * line.qty)}
                          </p>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center rounded-full border border-ink/15">
                            <button
                              onClick={() => onUpdateQty(line.key, -1)}
                              aria-label="Decrease quantity"
                              className={`grid h-8 w-8 place-items-center rounded-l-full text-ink-soft transition-colors hover:bg-ink/8 hover:text-ink active:scale-90 ${
                                line.qty <= 1 ? "opacity-35" : ""
                              }`}
                            >
                              <IconMinus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-7 text-center font-mono text-[12.5px] font-semibold text-ink">
                              {line.qty}
                            </span>
                            <button
                              onClick={() => onUpdateQty(line.key, 1)}
                              aria-label="Increase quantity"
                              className="grid h-8 w-8 place-items-center rounded-r-full text-ink-soft transition-colors hover:bg-ink/8 hover:text-ink active:scale-90"
                            >
                              <IconPlus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="font-mono text-[9.5px] uppercase tracking-widest text-ink-faint">
                            {formatPrice(line.product.price)} each
                          </p>
                          <button
                            onClick={() => onRemove(line.key)}
                            aria-label={`Remove ${line.product.name}`}
                            className="grid h-8 w-8 place-items-center rounded-full text-ink-faint transition-all hover:bg-copper/12 hover:text-copper active:scale-90"
                          >
                            <IconTrash className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-ink/12 bg-parchment px-5 py-5">
                {/* free shipping meter */}
                <div className="mb-4">
                  <div className="flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.18em]">
                    <span className="flex items-center gap-1.5 text-ink-soft">
                      <IconTruck className="h-4 w-4 text-copper" />
                      {remaining > 0 ? (
                        <>
                          Add <strong className="text-copper">{formatPrice(remaining)}</strong>{" "}
                          for free shipping
                        </>
                      ) : (
                        <span className="text-olive">Free shipping unlocked</span>
                      )}
                    </span>
                    <span className="text-ink-faint">{formatPrice(FREE_SHIPPING_THRESHOLD)}</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-copper to-amber transition-all duration-700 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-ink-soft">
                    <dt>Subtotal</dt>
                    <dd className="font-mono">{formatPrice(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between text-ink-soft">
                    <dt>Shipping</dt>
                    <dd className="font-mono">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
                  </div>
                  <div className="flex justify-between border-t border-ink/12 pt-2.5 font-display text-lg font-semibold text-ink">
                    <dt>Total</dt>
                    <dd>{formatPrice(subtotal + shipping)}</dd>
                  </div>
                </dl>

                <button
                  onClick={onToDetails}
                  className="mt-4 w-full rounded-full bg-espresso py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-cream transition-all duration-300 hover:bg-copper hover:shadow-[0_14px_30px_-12px_rgba(188,87,30,0.75)] active:scale-[0.98]"
                >
                  Checkout — {formatPrice(subtotal + shipping)}
                </button>
                <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
                  Roasted to order · ships Mon or Thu
                </p>
              </div>
            )}
          </>
        )}

        {/* ============ DETAILS STEP ============ */}
        {step === "details" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onPlaceOrder();
            }}
            className="nice-scroll flex-1 overflow-y-auto px-5 py-5"
          >
            <p className="rounded-lg border border-ink/12 bg-parchment px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
              {count} item{count === 1 ? "" : "s"} ·{" "}
              <span className="text-copper">{formatPrice(subtotal + shipping)}</span> incl.
              shipping
            </p>

            <fieldset className="mt-5">
              <legend className="mb-3 font-display text-lg font-semibold text-ink">
                Where it's headed
              </legend>
              <div className="space-y-3.5">
                <div>
                  <label htmlFor="co-email" className={labelCls}>
                    Email
                  </label>
                  <input id="co-email" type="email" required placeholder="you@example.com" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="co-name" className={labelCls}>
                    Full name
                  </label>
                  <input id="co-name" type="text" required placeholder="Ada Bloom" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="co-address" className={labelCls}>
                    Street address
                  </label>
                  <input id="co-address" type="text" required placeholder="1214 SE Ankeny St" className={inputCls} />
                </div>
                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="co-city" className={labelCls}>
                      City
                    </label>
                    <input id="co-city" type="text" required placeholder="Portland" className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="co-zip" className={labelCls}>
                      ZIP
                    </label>
                    <input id="co-zip" type="text" required placeholder="97214" className={inputCls} />
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset className="mt-6">
              <legend className="mb-3 font-display text-lg font-semibold text-ink">
                Payment <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-faint">(simulated)</span>
              </legend>
              <div className="space-y-3.5">
                <div>
                  <label htmlFor="co-card" className={labelCls}>
                    Card number
                  </label>
                  <input
                    id="co-card"
                    type="text"
                    required
                    inputMode="numeric"
                    maxLength={19}
                    placeholder="4242 4242 4242 4242"
                    className={inputCls}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="co-exp" className={labelCls}>
                      Expiry
                    </label>
                    <input id="co-exp" type="text" required placeholder="MM / YY" maxLength={7} className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="co-cvc" className={labelCls}>
                      CVC
                    </label>
                    <input id="co-cvc" type="text" required inputMode="numeric" maxLength={4} placeholder="123" className={inputCls} />
                  </div>
                </div>
              </div>
            </fieldset>

            <button
              type="submit"
              disabled={placing}
              className="mt-7 flex w-full items-center justify-center gap-2.5 rounded-full bg-copper py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-cream transition-all duration-300 hover:bg-copper-deep active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
            >
              {placing ? (
                <>
                  <IconSpinner className="h-4 w-4 animate-spin" /> Calling the roaster…
                </>
              ) : (
                <>Place order — {formatPrice(subtotal + shipping)}</>
              )}
            </button>
            <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
              Demo checkout · nothing is charged
            </p>
          </form>
        )}

        {/* ============ DONE STEP ============ */}
        {step === "done" && (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <svg viewBox="0 0 72 72" className="h-24 w-24">
              <circle
                cx="36"
                cy="36"
                r="30"
                fill="none"
                stroke="var(--color-copper)"
                strokeWidth="2.5"
                className="circle-draw"
              />
              <path
                d="M23 37.5 32 46l17-19"
                fill="none"
                stroke="var(--color-olive)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="check-draw"
              />
            </svg>
            <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight text-ink">
              Order <span className="italic text-copper">{orderId}</span> confirmed
            </h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
              Your beans join the next roast-day queue. A confirmation is on its way to your
              inbox — expect the bag within the week, roast date stamped on the back.
            </p>
            <p className="mt-4 rounded-full border border-ink/15 bg-parchment px-4 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
              Simulated checkout · no card was charged
            </p>
            <button
              onClick={onDone}
              className="mt-8 rounded-full bg-espresso px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-cream transition-all hover:bg-copper active:scale-95"
            >
              Keep browsing
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
