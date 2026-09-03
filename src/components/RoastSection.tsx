import { IconArrowRight, IconFlame } from "./Icons";
import Reveal from "./Reveal";

const STAGES = [
  {
    time: "0:00",
    temp: "200°C",
    title: "Charge",
    body: "The drum is searing-hot. Green beans hit the steel and the temperature plunges — the whole roast is decided in this first minute.",
  },
  {
    time: "1:32",
    temp: "96°C",
    title: "Turning point",
    body: "The curve bottoms out and reverses. From here it's momentum, airflow, and listening for the beans to loosen.",
  },
  {
    time: "4:45",
    temp: "150°C",
    title: "Drying end",
    body: "Grass turns to bread. Moisture leaves the seed and the first sugars begin to brown at the edges.",
  },
  {
    time: "8:10",
    temp: "196°C",
    title: "First crack",
    body: "The moment we roast for — an audible pop like distant popcorn. Acids lock in place and the aromatics bloom.",
  },
  {
    time: "9:35",
    temp: "204°C",
    title: "Development & drop",
    body: "We ride an 18% development for sweetness, then dump to the cooling tray before the beans overstay their welcome.",
  },
];

export default function RoastSection() {
  return (
    <section id="roast" className="relative scroll-mt-20 overflow-hidden bg-espresso py-20 text-cream lg:py-28">
      {/* ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-[34rem] w-[34rem] rounded-full bg-copper/14 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-amber/10 blur-[100px]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        {/* sticky intro column */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-amber">
                <span className="h-px w-8 bg-amber" />
                The roast log
              </p>
              <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-[3.4rem]">
                Roasted by ear,
                <br />
                <span className="font-light italic text-amber">verified by curve.</span>
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-cream/70">
                Every batch on this week's shelf was logged from charge to drop on drum
                number two — a 1974 Probat we rebuilt bolt by bolt. Here's the shape of an
                average Tuesday roast, the one your bag came off of.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <dl className="mt-9 grid grid-cols-3 gap-4 border-t border-cream/15 pt-7">
                {[
                  ["12 kg", "per batch"],
                  ["204°C", "drop temp"],
                  ["18%", "development"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <dt className="font-display text-2xl font-semibold text-cream">{value}</dt>
                    <dd className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-cream/50">
                      {label}
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                href="#shelf"
                className="group mt-9 inline-flex items-center gap-3 rounded-full border border-cream/25 px-6 py-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-cream transition-all duration-300 hover:border-copper hover:bg-copper active:scale-95"
              >
                Taste this week's curve
                <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>
        </div>

        {/* timeline column */}
        <div className="lg:col-span-7">
          <ol className="relative border-l border-cream/15 pl-7 sm:pl-10">
            {STAGES.map((stage, i) => (
              <li key={stage.title} className={i === STAGES.length - 1 ? "" : "pb-9"}>
                <Reveal delay={i * 90}>
                  <div className="relative">
                    <span
                      className={`absolute -left-7 top-1.5 grid h-3.5 w-3.5 -translate-x-1/2 place-items-center sm:-left-10 ${
                        stage.title === "First crack" ? "h-5 w-5" : ""
                      }`}
                    >
                      <span
                        className={`rounded-full ${
                          stage.title === "First crack"
                            ? "h-5 w-5 rounded-full bg-copper shadow-[0_0_0_6px_rgba(188,87,30,0.25)]"
                            : "h-3 w-3 border-2 border-amber bg-espresso"
                        }`}
                      />
                    </span>

                    <div className="group rounded-xl border border-cream/12 bg-espresso-2/80 p-5 transition-all duration-400 hover:-translate-y-1 hover:border-copper/50 hover:bg-espresso-2 sm:p-6">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-cream/10 px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-amber">
                          {stage.time}
                        </span>
                        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/50">
                          <IconFlame className="h-3.5 w-3.5 text-copper" />
                          {stage.temp}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-cream transition-colors group-hover:text-amber">
                        {stage.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-cream/65">{stage.body}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
