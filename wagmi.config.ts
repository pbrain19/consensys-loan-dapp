import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";

import { abi as UsdcAbi } from "./src/contracts/artifacts/BankerModule#Usdc.json";
import { abi as NftAbi } from "./src/contracts/artifacts/BankerModule#BasicNFT.json";
import { abi as BankerAbi } from "./src/contracts/artifacts/BankerModule#Banker.json";

export default defineConfig({
  out: "src/generated.ts",
  contracts: [
    {
      name: "Usdc",
      abi: UsdcAbi,
    },
    {
      name: "BasicNft",
      abi: NftAbi,
    },
    {
      name: "Banker",
      abi: BankerAbi,
    },
  ],
  plugins: [react()],
});
