import React, { useMemo, useState } from "react";
import { ccc } from "@ckb-ccc/connector-react";

const DEFAULT_FEE_RATE = "2000";
const cardClass =
  "rounded-3xl border border-slate-200/80 bg-white/75 p-6 shadow-[0_20px_55px_rgba(27,47,84,0.14)] backdrop-blur-md sm:p-7";
const labelClass = "flex flex-col gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-600";
const inputClass =
  "rounded-2xl border border-slate-200 bg-white/90 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100";
const ghostButtonClass =
  "inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/90 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60";
const primaryButtonClass =
  "inline-flex items-center justify-center rounded-full border border-transparent bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_22px_rgba(15,157,141,0.28)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none";

function parseFeeRate(value: string): number {
  const trimmed = value.trim();
  if (trimmed === "") return 2000;
  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed) || parsed <= 0) return 2000;
  return Math.floor(parsed);
}

const TransferCkb: React.FC = () => {
  const signer = ccc.useSigner();

  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [feeRate, setFeeRate] = useState(DEFAULT_FEE_RATE);
  const [status, setStatus] = useState("");
  const [txHash, setTxHash] = useState("");
  const [busy, setBusy] = useState(false);

  const canSend = useMemo(() => {
    return !!signer && toAddress.trim() !== "" && amount.trim() !== "" && !busy;
  }, [signer, toAddress, amount, busy]);

  const statusTone = useMemo(() => {
    const base =
      "inline-flex items-center justify-center rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em]";
    const lowered = status.toLowerCase();
    if (lowered.includes("failed")) return `${base} border-rose-200 bg-rose-100 text-rose-700`;
    if (busy) return `${base} border-amber-200 bg-amber-100 text-amber-700`;
    if (lowered.includes("committed")) return `${base} border-emerald-200 bg-emerald-100 text-emerald-700`;
    return `${base} border-slate-200 bg-slate-100 text-slate-600`;
  }, [busy, status]);

  const txExplorerLink = useMemo(() => {
    if (!txHash || !signer) return "";
    const base =
      signer.client.addressPrefix === "ckb"
        ? "https://explorer.nervos.org/transaction/"
        : "https://testnet.explorer.nervos.org/transaction/";
    return `${base}${txHash}`;
  }, [txHash, signer]);

  const handleMaxAmount = async () => {
    if (!signer || busy || toAddress.trim() === "") return;

    try {
      setBusy(true);
      setStatus("Calculating max transferable amount...");

      const { script: toLock } = await ccc.Address.fromString(
        toAddress.trim(),
        signer.client
      );

      const tx = ccc.Transaction.from({
        outputs: [{ lock: toLock }],
      });

      await tx.completeInputsAll(signer);
      await tx.completeFeeChangeToOutput(signer, 0, parseFeeRate(feeRate));

      const firstOutput = tx.outputs[0];
      if (!firstOutput) {
        throw new Error("Unable to calculate max amount from empty outputs.");
      }

      const maxAmount = ccc.fixedPointToString(firstOutput.capacity);
      setAmount(maxAmount);
      setStatus(`Max amount ready: ${maxAmount} CKB`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setStatus(`Max amount failed: ${message}`);
    } finally {
      setBusy(false);
    }
  };

  const handleTransfer = async () => {
    if (!signer || !canSend) return;

    try {
      setBusy(true);
      setTxHash("");
      setStatus("Composing transaction...");

      const { script: toLock } = await ccc.Address.fromString(
        toAddress.trim(),
        signer.client
      );

      const tx = ccc.Transaction.from({
        outputs: [{ lock: toLock, capacity: ccc.fixedPointFrom(amount.trim()) }],
      });

      await tx.completeInputsByCapacity(signer);
      await tx.completeFeeBy(signer, parseFeeRate(feeRate));

      setStatus("Signing and sending transaction...");
      const hash = await signer.sendTransaction(tx);
      setTxHash(hash);
      setStatus("Transaction sent. Waiting for confirmation...");

      await signer.client.waitTransaction(hash);
      setStatus("Transaction committed.");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setStatus(`Transfer failed: ${message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className={cardClass}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-['Sora'] text-2xl font-bold text-slate-900">
            Transfer CKB
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Compose, fund, sign, submit, and confirm in one flow with CCC.
          </p>
        </div>
        <span className={statusTone}>{busy ? "Processing" : "Ready"}</span>
      </div>

      <div className="mt-5 grid gap-4">
        <label className={labelClass}>
          <span>Recipient Address</span>
          <input
            className={inputClass}
            placeholder="ckt1..."
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            <span>Amount (CKB)</span>
            <input
              className={inputClass}
              inputMode="decimal"
              placeholder="100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
          <label className={labelClass}>
            <span>Fee Rate (Shannons/KB)</span>
            <input
              className={inputClass}
              inputMode="numeric"
              placeholder={DEFAULT_FEE_RATE}
              value={feeRate}
              onChange={(e) => setFeeRate(e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          className={ghostButtonClass}
          disabled={!signer || busy || toAddress.trim() === ""}
          onClick={handleMaxAmount}
        >
          Max Amount
        </button>
        <button
          type="button"
          className={primaryButtonClass}
          disabled={!canSend}
          onClick={handleTransfer}
        >
          {busy ? "Working..." : "Send Transfer"}
        </button>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white/75 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-600">
          Transaction Status
        </p>
        <p className="mt-1 break-words text-sm text-slate-800">
          {status || "Connect wallet and provide transfer details to begin."}
        </p>
        {txHash ? (
          <div className="mt-3 space-y-1 text-sm text-slate-800">
            <p className="break-all">
              <span className="font-semibold">Tx Hash:</span> {txHash}
            </p>
            {txExplorerLink ? (
              <a
                className="inline-flex font-semibold text-teal-700 hover:underline"
                href={txExplorerLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Explorer
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default TransferCkb;
