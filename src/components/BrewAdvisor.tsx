import { useEffect, useRef, useState, type FormEvent } from "react";
import { PRODUCTS, formatPrice } from "../data/products";
import { IconArrowRight, IconCup, IconX } from "./Icons";

type ChatMessage = { role: "user" | "assistant"; content: string };

const SYSTEM_PROMPT = `Tu es le barista de la torréfaction artisanale Cinder Roasters (Portland, Oregon).
Tu conseilles les clients en français, avec chaleur et précision, en 2 à 3 phrases maximum.
Quand c'est pertinent, recommande un café précis du catalogue ci-dessous et indique son prix.
Ne recommande JAMAIS un café absent du catalogue.

Catalogue :
${PRODUCTS.map(
  (p) =>
    `- ${p.name} (${formatPrice(p.price)}) — origine : ${p.origin}, torréfaction ${p.roast.toLowerCase()}, notes : ${p.notes.join(", ")}, catégorie : ${p.category}.`,
).join("\n")}`;

const SUGGESTIONS = [
  "Un café fruité pour ma V60 ?",
  "Quel espresso bien corsé ?",
  "Un décaf qui a du goût ?",
];

export default function BrewAdvisor() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading, open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    setError(null);
    const nextHistory = [...messages, { role: "user" as const, content }];
    setMessages(nextHistory);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/qwen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "qwen-plus",
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...nextHistory],
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || `Erreur ${res.status}`);
      }
      const reply =
        data?.choices?.[0]?.message?.content ||
        "Hmm, le moulin s'est enrayé. Réessayez ?";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      const msg = String(err instanceof Error ? err.message : err);
      setError(
        msg.includes("DASHSCOPE_API_KEY") || msg.includes("404") || msg.includes("Failed")
          ? "Le barista dort encore : ajoutez DASHSCOPE_API_KEY dans les variables Vercel puis redéployez."
          : `Le barista n'a pas répondu (${msg}).`,
      );
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <div className="fixed bottom-5 left-5 z-40 sm:bottom-7 sm:left-7">
      {/* panneau de conversation */}
      <div
        className={`absolute bottom-[4.6rem] left-0 flex w-[min(23rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-xl border border-espresso-3 bg-espresso text-cream shadow-[0_30px_70px_-25px_rgba(20,10,4,0.85)] transition-all duration-400 ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-[0.96] opacity-0"
        }`}
        role="dialog"
        aria-label="Conseil du barista"
      >
        <div className="flex items-center justify-between border-b border-cream/10 bg-espresso-2 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-copper">
              <IconCup className="steam h-5 w-5 text-cream" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold italic leading-none">Le barista</p>
              <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.22em] text-cream/50">
                Conseil IA · Qwen
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Fermer le barista"
            className="grid h-8 w-8 place-items-center rounded-full text-cream/60 transition-all hover:rotate-90 hover:bg-cream/10 hover:text-cream active:scale-90"
          >
            <IconX className="h-4 w-4" />
          </button>
        </div>

        <div ref={bodyRef} className="nice-scroll h-72 overflow-y-auto px-4 py-4 sm:h-80">
          {messages.length === 0 && !loading && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="max-w-[16rem] font-display text-lg italic leading-snug text-cream/90">
                « Dites-moi ce que vous aimez, je vous dis quoi moudre. »
              </p>
              <div className="mt-5 flex flex-col gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-cream/20 px-4 py-2 text-[12.5px] font-medium text-cream/80 transition-all duration-300 hover:border-copper hover:bg-copper hover:text-cream active:scale-95"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`toast-in max-w-[85%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto rounded-br-md bg-copper text-cream"
                    : "mr-auto rounded-bl-md bg-cream text-ink"
                }`}
              >
                {m.content}
              </div>
            ))}

            {loading && (
              <div className="mr-auto flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-cream px-4 py-3.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-copper"
                    style={{ animationDelay: `${i * 140}ms` }}
                  />
                ))}
              </div>
            )}

            {error && (
              <p className="toast-in mx-auto max-w-[90%] rounded-lg border border-copper/40 bg-copper/15 px-3.5 py-2.5 text-center text-[12px] leading-relaxed text-amber">
                {error}
              </p>
            )}
          </div>
        </div>

        <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-cream/10 bg-espresso-2 p-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Votre question café…"
            aria-label="Votre question café"
            className="min-w-0 flex-1 rounded-full border border-cream/15 bg-espresso px-4 py-2.5 text-[13px] text-cream placeholder:text-cream/40 transition-colors focus:border-copper focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Envoyer"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-copper text-cream transition-all duration-300 hover:bg-copper-deep active:scale-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <IconArrowRight className="h-4.5 w-4.5" />
          </button>
        </form>
      </div>

      {/* bouton flottant */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Fermer le conseil du barista" : "Ouvrir le conseil du barista"}
        className={`grid h-15 w-15 place-items-center rounded-full shadow-[0_16px_38px_-12px_rgba(30,18,10,0.75)] transition-all duration-300 active:scale-90 ${
          open
            ? "rotate-90 bg-espresso-3 text-cream"
            : "bg-copper text-cream hover:bg-copper-deep hover:shadow-[0_20px_44px_-12px_rgba(188,87,30,0.8)]"
        }`}
        style={{ height: "3.75rem", width: "3.75rem" }}
      >
        {open ? <IconX className="h-6 w-6" /> : <IconCup className="steam h-7 w-7" />}
      </button>
    </div>
  );
}
