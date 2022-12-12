import { useCallback } from "react";
import { Mainnet } from "configs";
import useBeacon from "./useBeacon";

export const useEscrow = () => {
  const { tezos } = useBeacon();

  const deposit = useCallback(async () => {
    try {
      const contract = await tezos.wallet.at(Mainnet.Escrow);
      const op = await contract.methods.deposit().send({
        amount: 1,
      });
      return op.confirmation();
    } catch (e) {
      console.error(e);
    }
  }, [tezos]);

  return {
    deposit,
  };
};
