import { http, createConfig } from "wagmi";
import { optimism } from "wagmi/chains";

export const config = createConfig({
  chains: [optimism],
  transports: {
    [optimism.id]: http(
      `https://optimism-mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_PROJECT_ID}`
    ),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
