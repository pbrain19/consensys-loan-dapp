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
    <div className="p-4 border border-gray-700 rounded-lg shadow-md bg-gray-800">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">
          {props.tokenId.toString()} -{" "}
        </div>
        <div>
          {data?.toString().toLowerCase() === Banker.address.toLowerCase() ? (
            <StakeButton tokenId={props.tokenId} cb={refetch} />
          ) : (
            <ApproveButton tokenId={props.tokenId} cb={refetch} />
          )}
        </div>
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
    <div className="text-green-500">You approved the token - tx: {hash}</div>
  ) : (
    <button
      onClick={() => {
        approveToken({
          address: getAddress(BasicNFT.address),
          args: [address, props.tokenId.valueOf()],
        });
      }}
      disabled={isPending}
      className={`px-4 py-2 rounded-md ${
        isPending
          ? "bg-gray-600 text-gray-400 cursor-not-allowed"
          : "bg-blue-500 text-white hover:bg-blue-600"
      }`}
    >
      {isPending ? "Approving..." : "Approve to Borrow"}
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
    <div className="text-green-500">You borrowed money - tx: {hash}</div>
  ) : (
    <button
      onClick={() => {
        stakeToken({
          address: getAddress(Banker.address),
          args: [props.tokenId.valueOf()],
        });
      }}
      disabled={isPending}
      className={`px-4 py-2 rounded-md ${
        isPending
          ? "bg-gray-600 text-gray-400 cursor-not-allowed"
          : "bg-blue-500 text-white hover:bg-blue-600"
      }`}
    >
      {isPending ? "Locking..." : "Lock to Borrow"}
    </button>
  );
}
