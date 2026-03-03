import React, { useEffect, useState } from "react";
import { ccc } from "@ckb-ccc/connector-react";
import { truncateAddress } from "../utils/stringUtils";

const connectButtonClass =
  "inline-flex items-center justify-center rounded-full border border-transparent bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_22px_rgba(15,157,141,0.28)]";

const walletChipClass =
  "inline-flex items-center gap-2.5 rounded-full border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 px-3 py-2 text-emerald-900 transition hover:-translate-y-0.5 hover:shadow-[0_10px_18px_rgba(11,127,115,0.16)]";

const ConnectWallet: React.FC = () => {
  const { open, wallet } = ccc.useCcc();
  const signer = ccc.useSigner();

  const [balance, setBalance] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    let cancelled = false;

    if (!signer) {
      setBalance("");
      setAddress("");
      return () => {
        cancelled = true;
      };
    }

    (async () => {
      try {
        const [addr, capacity] = await Promise.all([
          signer.getRecommendedAddress(),
          signer.getBalance(),
        ]);

        if (cancelled) return;
        setAddress(addr);
        setBalance(ccc.fixedPointToString(capacity));
      } catch {
        if (cancelled) return;
        setAddress("");
        setBalance("");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [signer]);

  if (!wallet) {
    return (
      <button type="button" className={connectButtonClass} onClick={open}>
        Connect Wallet
      </button>
    );
  }

  return (
    <button type="button" className={walletChipClass} onClick={open}>
      <span className="inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-emerald-100 bg-white text-xs font-bold text-emerald-700">
        {wallet.icon ? (
          <img
            src={wallet.icon}
            alt={`${wallet.name ?? "wallet"} icon`}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>W</span>
        )}
      </span>

      <span className="flex flex-col items-start leading-tight">
        <span className="text-xs font-bold">
          {balance !== "" ? `${balance} CKB` : "Loading balance..."}
        </span>
        <span className="text-[11px] text-emerald-800/80">
          {address ? truncateAddress(address, 10, 6) : "Loading address..."}
        </span>
      </span>
    </button>
  );
};

export default ConnectWallet;
