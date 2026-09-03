import { useEffect, useMemo, useRef, useState } from "react";
import CartDrawer, { type CartLine, type CartStep } from "./components/CartDrawer";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { IconCheck } from "./components/Icons";
import ProductModal from "./components/ProductModal";
import RoastSection from "./components/RoastSection";
import Shop from "./components/Shop";
import Ticker from "./components/Ticker";
import { PRODUCTS, type Grind, type Product } from "./data/products";

interface CartItem {
  productId: string;
  grind: Grind;
  qty: number;
}

interface Toast {
  id: number;
  msg: string;
}

const CART_KEY = "cinder-cart-v1";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (i): i is CartItem =>
        !!i &&
        typeof i === "object" &&
        PRODUCTS.some((p) => p.id === (i as CartItem).productId) &&
        typeof (i as CartItem).qty === "number" &&
        (i as CartItem).qty > 0,
    );
  } catch {
    return [];
  }
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(loadCart);
  const [selected, setSelected] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [step, setStep] = useState<CartStep>("cart");
  const [placing, setPlacing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  /* persist cart */
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* private mode — ignore */
    }
  }, [cart]);

  /* lock body scroll while an overlay is open */
  const overlayOpen = cartOpen || selected !== null;
  useEffect(() => {
    document.body.style.overflow = overlayOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlayOpen]);

  /* global Escape: drawer first, then product modal */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (cartOpen) setCartOpen(false);
      else if (selected) setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen, selected]);

  const lines: CartLine[] = useMemo(
    () =>
      cart
        .map((item) => {
          const product = PRODUCTS.find((p) => p.id === item.productId);
          if (!product) return null;
          return {
            key: `${item.productId}__${item.grind}`,
            product,
            grind: item.grind,
            qty: item.qty,
          };
        })
        .filter((l): l is CartLine => l !== null),
    [cart],
  );

  const count = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines]);
  const subtotal = useMemo(
    () => lines.reduce((n, l) => n + l.product.price * l.qty, 0),
    [lines],
  );

  const pushToast = (msg: string) => {
    toastId.current += 1;
    const id = toastId.current;
    setToasts((t) => [...t, { id, msg }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2400);
  };

  const addToCart = (product: Product, grind: Grind = "Whole bean", qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === product.id && i.grind === grind);
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, qty: Math.min(12, i.qty + qty) } : i,
        );
      }
      return [...prev, { productId: product.id, grind, qty }];
    });
    pushToast(`${product.name} added to your bag`);
  };

  const updateQty = (key: string, delta: number) => {
    setCart((prev) =>
      prev.map((i) =>
        `${i.productId}__${i.grind}` === key
          ? { ...i, qty: Math.max(1, Math.min(12, i.qty + delta)) }
          : i,
      ),
    );
  };

  const removeLine = (key: string) => {
    setCart((prev) => prev.filter((i) => `${i.productId}__${i.grind}` !== key));
  };

  const placeOrder = () => {
    if (lines.length === 0 || placing) return;
    setPlacing(true);
    window.setTimeout(() => {
      setOrderId(`EMB-${Math.floor(1000 + Math.random() * 9000)}`);
      setCart([]);
      setStep("done");
      setPlacing(false);
    }, 1600);
  };

  const closeAndReset = () => {
    setCartOpen(false);
    window.setTimeout(() => setStep("cart"), 450);
  };

  const browseShelf = () => {
    setCartOpen(false);
    window.setTimeout(() => {
      document.getElementById("shelf")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <div className="grain min-h-screen">
      <Header cartCount={count} onCartOpen={() => setCartOpen(true)} />

      <main>
        <Hero />
        <Ticker />
        <Shop onAdd={(p) => addToCart(p)} onOpen={(p) => setSelected(p)} />
        <RoastSection />
      </main>

      <Footer />

      <ProductModal
        product={selected}
        onClose={() => setSelected(null)}
        onAdd={(p, g, q) => addToCart(p, g, q)}
      />

      <CartDrawer
        open={cartOpen}
        step={step}
        lines={lines}
        subtotal={subtotal}
        placing={placing}
        orderId={orderId}
        onClose={() => setCartOpen(false)}
        onUpdateQty={updateQty}
        onRemove={removeLine}
        onToDetails={() => setStep("details")}
        onBackToCart={() => setStep("cart")}
        onPlaceOrder={placeOrder}
        onBrowse={browseShelf}
        onDone={closeAndReset}
      />

      {/* toasts */}
      <div className="pointer-events-none fixed bottom-6 left-1/2 z-[70] flex w-max max-w-[92vw] -translate-x-1/2 flex-col items-center gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="toast-in flex items-center gap-2.5 rounded-full border border-cream/10 bg-espresso px-5 py-3 text-[13px] font-medium text-cream shadow-[0_18px_40px_-16px_rgba(20,10,4,0.75)]"
          >
            <IconCheck className="h-4 w-4 shrink-0 text-amber" />
            <span className="truncate">{t.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
