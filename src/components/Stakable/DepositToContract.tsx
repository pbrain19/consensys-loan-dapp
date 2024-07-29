import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import {
  useReadBankerAvailableForLending,
  useReadUsdcAllowance,
  useWriteBankerAddFunding,
  useWriteUsdcApprove,
} from "../../generated";
import { getAddress, parseEther } from "viem";
import { Banker, Usdc } from "../../contracts/constant";
import { useEffect } from "react";

type Props = { cb?: () => void };

export function ContractRefillDeposit() {
  const account = useAccount();
  const { data, refetch } = useReadBankerAvailableForLending({
    address: getAddress(Banker.address),
  });

  const { data: allowance, refetch: rfAllowance } = useReadUsdcAllowance({
    address: getAddress(Usdc.address),
    args: [getAddress(account.address!), getAddress(Banker.address)],
  });

  return (
    <div>
      <div>availabel for lending {data?.toString()} - </div>
      <div>
        {allowance && allowance > BigInt(0) ? (
          <DepositButton
            cb={() => {
              refetch();
              rfAllowance();
            }}
          />
        ) : (
          <ApproveButton cb={rfAllowance} />
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
  } = useWriteUsdcApprove();

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
    <div>you approved - tx : {hash}</div>
  ) : (
    <button
      onClick={() => {
        approveToken({
          address: getAddress(Usdc.address),
          args: [address, parseEther("100")],
        });
      }}
      disabled={isPending}
    >
      approve to deposit
    </button>
  );
}

function DepositButton(props: Props) {
  const {
    writeContract: stakeToken,
    isSuccess,
    isPending,
    data: hash,
  } = useWriteBankerAddFunding();

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
    <div>you deposited 100 usdc - tx : {hash}</div>
  ) : (
    <button
      onClick={() => {
        stakeToken({
          address: getAddress(Banker.address),
          args: [parseEther("100")],
        });
      }}
      disabled={isPending}
    >
      Deposit 100 usdc
    </button>
  );
}
