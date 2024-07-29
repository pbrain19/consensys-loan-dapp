import { BasicNFT, Usdc, TokenType } from "../../contracts/constant";
import { NftBalanceItem } from "./NftBalanceItem";
import { TokenBalanceItem } from "./TokenBalanceItem";

export function TokenList() {
  const tokens = [BasicNFT, Usdc];

  return (
    <div>
      {tokens.map((token) => {
        if (token.type === TokenType.NFT)
          return (
            <NftBalanceItem
              key={token.address}
              address={token.address}
              name={token.name}
            />
          );
        if (token.type === TokenType.TOKEN)
          return (
            <TokenBalanceItem
              key={token.address}
              address={token.address}
              name={token.name}
            />
          );
      })}
    </div>
  );
}
