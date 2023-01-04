import { useCallback } from "react";
import { useNetwork } from "../contexts/NetworkProvider";
import { useWallet } from "../contexts/WalletProvider";

export const useEscrow = () => {
  const { tezos } = useWallet();
  const { config } = useNetwork();

  const deposit = useCallback(async () => {
    try {
      const contract = await tezos.wallet.at(config.Escrow);
      const op = await contract.methods.deposit().send({
        amount: 1,
      });
      return op.confirmation();
    } catch (e) {
      console.error(e);
    }
  }, [tezos, config]);

  return {
    deposit,
  };
};
