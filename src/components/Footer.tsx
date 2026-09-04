import { useState } from "react";
import { IconCheck, IconClock, IconFlame, IconMapPin } from "./Icons";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer id="visit" className="relative scroll-mt-20 overflow-hidden bg-espresso text-cream">
      {/* giant outlined wordmark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[24vw] font-black leading-[0.78] tracking-tight text-transparent lg:text-[19rem]"
        style={{ WebkitTextStroke: "1.5px rgba(247,239,223,0.14)" }}
      >
        Cinder
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-10 sm:px-8">
        <div className="grid gap-12 border-t border-cream/12 pt-14 md:grid-cols-12">
          {/* brand + newsletter */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-espresso-3">
                <IconFlame className="h-5 w-5 text-copper" />
              </span>
              <span className="leading-none">
                <span className="block font-display text-[22px] font-semibold tracking-tight">Cinder</span>
                <span className="block font-mono text-[9px] uppercase tracking-[0.34em] text-cream/50">
                  Roasters
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/60">
              Small-batch specialty coffee, roasted twice a week in Southeast Portland and
              shipped while it still smells like the drum.
            </p>

            {subscribed ? (
              <p className="mt-6 flex items-center gap-2.5 rounded-full border border-olive/50 bg-olive/15 px-5 py-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-cream">
                <IconCheck className="h-4 w-4 text-amber" />
                You're on the list — first pour's on us
              </p>
            ) : (
              <form
                className="mt-6 flex max-w-sm gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) setSubscribed(true);
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  aria-label="Email for the roast-day newsletter"
                  className="w-full rounded-full border border-cream/20 bg-espresso-2 px-4.5 py-3 text-sm text-cream placeholder:text-cream/35 transition-colors focus:border-copper focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-copper px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-cream transition-all hover:bg-copper-deep active:scale-95"
                >
                  Roast-day mail
                </button>
              </form>
            )}
          </div>

          {/* explore */}
          <div className="md:col-span-3">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.28em] text-amber">Explore</h3>
            <ul className="mt-5 space-y-3 text-sm text-cream/70">
              {[
                ["The shelf", "#shelf"],
                ["The roast log", "#roast"],
                ["Back to top", "#top"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="group inline-flex items-center gap-2 transition-colors hover:text-amber"
                  >
                    <span className="h-px w-3 bg-cream/25 transition-all duration-300 group-hover:w-5 group-hover:bg-amber" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* visit */}
          <div className="md:col-span-4">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.28em] text-amber">The roastery</h3>
            <ul className="mt-5 space-y-3.5 text-sm text-cream/70">
              <li className="flex items-start gap-3">
                <IconMapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-copper" />
                <span>
                  1214 SE Ankeny Street
                  <br />
                  Portland, Oregon 97214
                </span>
              </li>
              <li className="flex items-start gap-3">
                <IconClock className="mt-0.5 h-4.5 w-4.5 shrink-0 text-copper" />
                <span>
                  Mon–Fri · 7a–5p
                  <br />
                  Sat–Sun · 8a–4p
                </span>
              </li>
              <li className="flex items-start gap-3">
                <IconFlame className="mt-0.5 h-4.5 w-4.5 shrink-0 text-copper" />
                <span>
                  <a href="mailto:hello@cinderroasters.co" className="underline decoration-cream/25 underline-offset-4 transition-colors hover:text-amber hover:decoration-amber">
                    hello@cinderroasters.co
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-cream/12 pt-6 font-mono text-[9.5px] uppercase tracking-[0.18em] text-cream/40 sm:flex-row">
          <p>© 2026 Cinder Roasters — a simulated storefront</p>
          <p>Roast days Mon + Thu · free shipping over $45</p>
        </div>
      </div>
    </footer>
  );
}
