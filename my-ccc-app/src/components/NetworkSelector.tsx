import React, { ChangeEvent, useMemo } from "react";
import { ccc } from "@ckb-ccc/connector-react";

const TESTNET_CLIENT = new ccc.ClientPublicTestnet();
const MAINNET_CLIENT = new ccc.ClientPublicMainnet();

type NetworkKey = "testnet" | "mainnet";

const selectClass =
  "rounded-full border border-slate-300 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 outline-none transition hover:border-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-100";

const NetworkSelector: React.FC = () => {
  const { client, setClient, disconnect } = ccc.useCcc();

  const activeNetwork = useMemo<NetworkKey>(() => {
    return client.addressPrefix === "ckb" ? "mainnet" : "testnet";
  }, [client]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const network = event.target.value as NetworkKey;
    const nextClient = network === "mainnet" ? MAINNET_CLIENT : TESTNET_CLIENT;

    if (nextClient.addressPrefix === client.addressPrefix) {
      return;
    }

    disconnect();
    setClient(nextClient);
  };

  return (
    <div className="inline-flex items-center gap-2">
      <span className="text-xs font-bold uppercase tracking-[0.09em] text-slate-600">
        Network
      </span>
      <select className={selectClass} value={activeNetwork} onChange={handleChange}>
        <option value="testnet">Testnet</option>
        <option value="mainnet">Mainnet</option>
      </select>
    </div>
  );
};

export default NetworkSelector;
