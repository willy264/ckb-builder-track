import React, { CSSProperties } from "react";
import { ccc } from "@ckb-ccc/connector-react";

const TESTNET_CLIENT = new ccc.ClientPublicTestnet();
const MAINNET_CLIENT = new ccc.ClientPublicMainnet();

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const defaultClient = React.useMemo(() => {
    return process.env.REACT_APP_IS_MAINNET === "true"
      ? MAINNET_CLIENT
      : TESTNET_CLIENT;
  }, []);

  return (
    <ccc.Provider
      connectorProps={{
        style: {
          "--background": "#232323",
          "--divider": "rgba(255, 255, 255, 0.1)",
          "--btn-primary": "#2D2F2F",
          "--btn-primary-hover": "#515151",
          "--btn-secondary": "#2D2F2F",
          "--btn-secondary-hover": "#515151",
          "--icon-primary": "#FFFFFF",
          "--icon-secondary": "rgba(255, 255, 255, 0.6)",
          color: "#ffffff",
          "--tip-color": "#666",
        } as CSSProperties,
      }}
      defaultClient={defaultClient}
      clientOptions={[
        {
          name: "CKB Testnet",
          client: TESTNET_CLIENT,
        },
        {
          name: "CKB Mainnet",
          client: MAINNET_CLIENT,
        },
      ]}
    >
      {children}
    </ccc.Provider>
  );
}
