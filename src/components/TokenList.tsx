import { BasicNFT, Usdc, TokenType } from "../contracts/constant";
import { NftItem } from "./common/NftItem";
import { TokenItem } from "./common/TokenItem";

export function TokenList() {
  const tokens = [BasicNFT, Usdc];

  return (
    <div>
      {tokens.map((token) => {
        if (token.type === TokenType.NFT)
          return (
            <NftItem
              key={token.address}
              address={token.address}
              name={token.name}
            />
          );
        if (token.type === TokenType.TOKEN)
          return (
            <TokenItem
              key={token.address}
              address={token.address}
              name={token.name}
            />
          );
      })}
    </div>
  );
}
