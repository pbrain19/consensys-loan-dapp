import { useWaitForTransactionReceipt } from "wagmi";
import {
  useReadBasicNftGetApproved,
  useWriteBankerBorrow,
  useWriteBasicNftApprove,
} from "../../generated";
import { getAddress } from "viem";
import { Banker, BasicNFT } from "../../contracts/constant";
import { useEffect } from "react";

type Props = { tokenId: BigInt; cb?: () => void };

export function StakableNftItem(props: Props) {
  const { data, refetch } = useReadBasicNftGetApproved({
    address: getAddress(BasicNFT.address),
    args: [props.tokenId.valueOf()],
  });

  return (
    <div>
      <div>{props.tokenId.toString()} - </div>
      <div>
        {data?.toString().toLowerCase() === Banker.address.toLowerCase() ? (
          <StakeButton tokenId={props.tokenId} cb={refetch} />
        ) : (
          <ApproveButton tokenId={props.tokenId} cb={refetch} />
        )}
      </div>
    </div>
  );
}

function ApproveButton(props: Props) {
  const address = getAddress(Banker.address);

  const {
    writeContract: approveToken,
    isSuccess,
    isPending,
    data: hash,
  } = useWriteBasicNftApprove();

  const { data: transactionData, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isConfirmed) {
      props.cb?.();
    }
  }, [isConfirmed, transactionData]);

  return isSuccess ? (
    <div>you approved the token - tx : {hash}</div>
  ) : (
    <button
      onClick={() => {
        approveToken({
          address: getAddress(BasicNFT.address),
          args: [address, props.tokenId.valueOf()],
        });
      }}
      disabled={isPending}
    >
      approve to borrow
    </button>
  );
}

function StakeButton(props: Props) {
  const {
    writeContract: stakeToken,
    isSuccess,
    isPending,
    data: hash,
  } = useWriteBankerBorrow();

  const { data: transactionData, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isConfirmed) {
      props.cb?.();
    }
  }, [isConfirmed, transactionData]);

  return isSuccess ? (
    <div>you borrowed money - tx : {hash}</div>
  ) : (
    <button
      onClick={() => {
        stakeToken({
          address: getAddress(Banker.address),
          args: [props.tokenId.valueOf()],
        });
      }}
      disabled={isPending}
    >
      Lock to borrow
    </button>
  );
}
