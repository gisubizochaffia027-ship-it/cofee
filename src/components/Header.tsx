import { useEffect, useState } from "react";
import { IconBag, IconFlame } from "./Icons";

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
}

export default function Header({ cartCount, onCartOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-paper/90 shadow-[0_1px_0_0_var(--color-line),0_12px_32px_-20px_rgba(38,23,14,0.35)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-espresso text-amber transition-transform duration-300 group-hover:rotate-12">
            <IconFlame className="h-5 w-5 text-copper" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-[22px] font-semibold tracking-tight text-ink">
              Cinder
            </span>
            <span className="block font-mono text-[9px] uppercase tracking-[0.34em] text-ink-soft">
              Roasters
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft md:flex">
          <a href="#shelf" className="relative py-1 transition-colors hover:text-copper after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-copper after:transition-transform after:duration-300 hover:after:scale-x-100">
            The shelf
          </a>
          <a href="#roast" className="relative py-1 transition-colors hover:text-copper after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-copper after:transition-transform after:duration-300 hover:after:scale-x-100">
            Roast log
          </a>
          <a href="#visit" className="relative py-1 transition-colors hover:text-copper after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-copper after:transition-transform after:duration-300 hover:after:scale-x-100">
            Visit
          </a>
        </nav>

        <button
          onClick={onCartOpen}
          className="group relative flex items-center gap-2.5 rounded-full border border-ink/20 bg-parchment px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:border-copper hover:bg-copper hover:text-cream active:scale-95"
          aria-label={`Open cart, ${cartCount} items`}
        >
          <IconBag className="h-4.5 w-4.5" />
          <span className="hidden sm:inline">Cart</span>
          {cartCount > 0 && (
            <span
              key={cartCount}
              className="badge-pop absolute -right-1.5 -top-1.5 grid h-5.5 min-w-5.5 place-items-center rounded-full bg-copper px-1 font-mono text-[10px] font-semibold text-cream shadow-sm group-hover:bg-espresso"
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
