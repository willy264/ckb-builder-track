import React from "react";
import ConnectWallet from "./components/ConnectWallet";
import NetworkSelector from "./components/NetworkSelector";
import TransferCkb from "./components/TransferCkb";

const highlights = [
  "One-stop solution for CKB JavaScript and TypeScript development.",
  "Unified APIs to analyze chain data, compose transactions, and sign securely.",
  "Interoperable wallet connection flow for smoother dApp onboarding.",
  "A practical toolkit for moving from tutorials into production-ready apps.",
];

const cardClass =
  "rounded-3xl border border-slate-200/80 bg-white/75 shadow-[0_20px_55px_rgba(27,47,84,0.14)] backdrop-blur-md";

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(140deg,#f4f8f3_0%,#eef4ff_100%)] px-4 py-8 text-slate-900 sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-28 h-96 w-96 rounded-full bg-[radial-gradient(circle,#b7e3ff_0%,transparent_70%)] opacity-70 blur-sm" />
        <div className="absolute -bottom-28 -left-24 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,#ffe6a8_0%,transparent_66%)] opacity-70 blur-sm" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(59,92,146,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,92,146,0.06)_1px,transparent_1px)] [background-size:30px_30px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className={`${cardClass} p-6 sm:p-8`}>
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5">
              <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
                Common Chain Connector
              </span>
              <h1 className="font-['Sora'] text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Build CKB apps with cleaner transactions and better wallet UX.
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                This interface showcases a practical CCC transfer workflow with
                automatic input completion, dynamic fee handling, and transaction
                tracking.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <NetworkSelector />
                <ConnectWallet />
                <a
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/90 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white"
                  href="https://docs.ckbccc.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read CCC Docs
                </a>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.09em] text-slate-500">
                Transfer panel below uses the selected network.
              </p>
            </div>

            <div className="relative flex min-h-[220px] items-center justify-center">
              <div className="flex h-48 w-48 animate-pulse items-center justify-center rounded-full border border-emerald-100 bg-[radial-gradient(circle_at_30%_30%,#fff_0%,rgba(255,255,255,0.65)_60%),linear-gradient(140deg,#dcfff8_0%,#f8f1d7_100%)] shadow-[inset_0_0_25px_rgba(255,255,255,0.95),0_18px_40px_rgba(25,54,98,0.2)] [animation-duration:4.2s]">
                <img
                  className="h-32 w-32 animate-spin [animation-duration:18s]"
                  src="/images/ccc-logo.svg"
                  alt="CCC logo"
                  width={130}
                  height={130}
                />
              </div>
              <p className="absolute bottom-0 rounded-full bg-white/75 px-4 py-2 text-xs font-semibold text-slate-600 backdrop-blur">
                CKB JS/TS Toolkit
              </p>
            </div>
          </div>
        </header>

        <main className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className={`${cardClass} p-6 sm:p-7`}>
            <h2 className="font-['Sora'] text-2xl font-bold text-slate-900">
              Why CCC?
            </h2>
            <ul className="mt-4 space-y-3">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[15px] leading-relaxed text-slate-700"
                >
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-br from-emerald-500 to-amber-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white"
                href="https://app.ckbccc.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-sm font-semibold text-slate-800">
                  Examples
                </span>
                <span className="text-xs text-slate-600">
                  Explore ready-to-run demos
                </span>
              </a>
              <a
                className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white"
                href="https://github.com/ckb-devrel/ccc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-sm font-semibold text-slate-800">
                  GitHub
                </span>
                <span className="text-xs text-slate-600">
                  Inspect source and contribute
                </span>
              </a>
            </div>
          </section>

          <TransferCkb />
        </main>

        <footer className={`${cardClass} flex flex-col gap-3 px-5 py-4 text-sm sm:flex-row sm:items-center sm:justify-between`}>
          <span className="font-semibold text-slate-600">Powered by Nervos CKB</span>
          <div className="flex flex-wrap items-center gap-3">
            <a
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/65 px-3 py-1.5 font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white"
              href="https://github.com/ckb-devrel/ccc"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                aria-hidden
                src="/images/github.svg"
                alt="github icon"
                width={14}
                height={14}
              />
              GitHub
            </a>
            <a
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/65 px-3 py-1.5 font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white"
              href="https://x.com/CKBDevrel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                aria-hidden
                src="/images/x-logo.svg"
                alt="x icon"
                width={14}
                height={14}
              />
              Follow Updates
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
