import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import {
  useReadBasicNftBalanceOf,
  useWriteBasicNftSafeMint,
} from "../../generated";
import { getAddress } from "viem";
import { BasicNFT } from "../../contracts/constant";
import { useEffect } from "react";

type Props = { address: string; name: string };

export function NftBalanceItem(props: Props) {
  const account = useAccount();
  const address = getAddress(account.address!);
  const { data, refetch } = useReadBasicNftBalanceOf({
    address: getAddress(props.address),
    args: [getAddress(account.address!)],
  });

  const {
    writeContract,
    isSuccess,
    isPending,
    data: hash,
  } = useWriteBasicNftSafeMint();

  const { data: transactionData, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isConfirmed) {
      refetch();
    }
  }, [isConfirmed, transactionData]);

  return (
    <div>
      <div>{props.name} - </div>
      <div>{data?.toString()}</div>
      <div>
        {isSuccess ? (
          <div>you minted a token - tx : {hash}</div>
        ) : (
          <button
            onClick={() => {
              writeContract({
                address: getAddress(BasicNFT.address),
                args: [address, BigInt(1)],
              });
            }}
            disabled={isPending}
          >
            mint token
          </button>
        )}
      </div>
    </div>
  );
}
